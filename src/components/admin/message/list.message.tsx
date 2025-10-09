import { useCurrentApp } from "@/components/context/app.context";
import {
  getByUserId,
  getUserChats,
  getMessages,
  markAsRead,
} from "@/services/api";
import { socket } from "@/services/socket";
import { useEffect, useState, useRef } from "react";

export default function ListMessages() {
  const { user } = useCurrentApp();
  const [chats, setChats] = useState<IListChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IListChat | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const selectedChatRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchChats = async () => {
      try {
        const { data } = await getUserChats(user._id);
        const chatsWithInfo = await Promise.all(
          data.map(async (chat: any) => {
            const otherId = chat.participants.find(
              (id: string) => id !== user._id
            );
            const { data: otherUser } = await getByUserId(otherId);
            return { ...chat, otherUser };
          })
        );

        chatsWithInfo.sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt ?? 0).getTime() -
            new Date(a.lastMessage?.updatedAt ?? 0).getTime()
        );

        setChats(chatsWithInfo);

        // Join tất cả phòng chat sau khi có danh sách
        chatsWithInfo.forEach((c) => socket.emit("joinChat", c._id));

        if (chatsWithInfo.length > 0 && !selectedChat)
          setSelectedChat(chatsWithInfo[0]);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh sách chat:", error);
      }
    };

    fetchChats();
  }, [user?._id]);

  // 🟢 Khi chọn chat mới → join room, load messages & đánh dấu đã đọc
  useEffect(() => {
    if (!selectedChat || !user?._id) return;

    selectedChatRef.current = selectedChat._id;
    socket.emit("joinChat", selectedChat._id);

    const loadMessages = async () => {
      try {
        const res = await getMessages(selectedChat._id);
        setMessages(res.data.reverse());
        await markAsRead(selectedChat._id, user._id);

        // Cập nhật readBy trong sidebar
        setChats((prev) =>
          prev.map((c) =>
            c._id === selectedChat._id
              ? {
                  ...c,
                  lastMessage: {
                    ...c.lastMessage,
                    readBy: [
                      ...new Set([...(c.lastMessage.readBy ?? []), user._id]),
                    ],
                  },
                }
              : c
          )
        );
      } catch (err) {
        console.error("❌ Lỗi khi tải tin nhắn:", err);
      }
    };

    loadMessages();

    return () => {
      socket.emit("leaveChat", selectedChat._id);
    };
  }, [selectedChat?._id, user?._id]);

  // 🟢 Lắng nghe socket realtime (setup 1 lần)
  useEffect(() => {
    if (!user?._id) return;

    const handleNewMessage = (msg: any) => {
      console.log("📩 Nhận tin nhắn mới:", msg);

      // Nếu đang mở đúng chat → thêm tin nhắn
      if (msg.chatId === selectedChatRef.current) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
        // Đánh dấu là đã đọc
        markAsRead(msg.chatId, user._id);
      }

      // ✅ Cập nhật sidebar ngay lập tức (không cần reload)
      setChats((prevChats) => {
        const exists = prevChats.find((c) => c._id === msg.chatId);
        let updatedChats: any[];

        if (exists) {
          updatedChats = prevChats.map((c) =>
            c._id === msg.chatId ? { ...c, lastMessage: msg } : c
          );
        } else {
          // Nếu là cuộc trò chuyện mới → fetch user đối phương
          updatedChats = [...prevChats];
          getByUserId(
            msg.senderId === user._id ? msg.receiverId : msg.senderId
          ).then(({ data: otherUser }) => {
            updatedChats.unshift({
              _id: msg.chatId,
              participants: [msg.senderId, msg.receiverId],
              otherUser,
              lastMessage: msg,
            });
            setChats([...updatedChats]);
          });
          return prevChats;
        }

        // sắp xếp lại theo thời gian
        updatedChats.sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt ?? 0).getTime() -
            new Date(a.lastMessage?.updatedAt ?? 0).getTime()
        );

        return [...updatedChats];
      });
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [user?._id]);

  // 🟢 Gửi tin nhắn
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat || !user?._id) return;

    socket.emit("sendMessage", {
      chatId: selectedChat._id,
      senderId: user._id,
      content: newMessage.trim(),
    });

    setNewMessage("");
  };

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 pb-2">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <p className="text-gray-600">Chat with instructors and students</p>
      </div>

      <div className="flex flex-1 gap-6 p-6 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Conversations</h2>
          <div className="space-y-2 overflow-y-auto flex-1">
            {chats.map((conv) => {
              const isActive = selectedChat?._id === conv._id;
              const initials = conv.otherUser?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const senderId =
                typeof conv.lastMessage.senderId === "object"
                  ? conv.lastMessage.senderId._id
                  : conv.lastMessage.senderId;

              const isUnread =
                senderId !== user?._id &&
                !conv.lastMessage.readBy?.includes(user?._id as string);

              return (
                <div
                  key={conv._id}
                  onClick={() => setSelectedChat(conv)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition ${
                    isActive ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conv.otherUser?.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {formatTime(conv.lastMessage.updatedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate flex items-center gap-2">
                      {isUnread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                      )}
                      {conv.lastMessage.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-2xl shadow flex flex-col h-full">
          {selectedChat && (
            <div className="flex items-center gap-3 p-6 border-b">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                {selectedChat.otherUser?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedChat.otherUser?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.otherUser?.email}
                </p>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => {
              const isMine =
                (typeof msg.senderId === "object"
                  ? msg.senderId._id
                  : msg.senderId) === user?._id;
              return (
                <div
                  key={idx}
                  className={`flex ${isMine ? "justify-end" : ""}`}
                >
                  <div
                    className={`max-w-md p-3 rounded-xl ${
                      isMine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t p-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
