import { useEffect, useState, useRef } from "react";
import { socket } from "@/services/socket";
import { getMessages, getOrCreateChat } from "@/services/api";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  currentUserId: string;
  teacherId: string;
  teacherName: string;
}

export default function ChatModal({
  open,
  onClose,
  currentUserId,
  teacherId,
  teacherName,
}: ChatModalProps) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  //Cuộn xuống cuối
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //Khi mở modal → tạo/lấy phòng chat + load tin nhắn
  useEffect(() => {
    if (!open) return;

    const initChat = async () => {
      try {
        setLoading(true);
        const res = await getOrCreateChat(currentUserId, teacherId);
        const chat = res.data;
        setChatId(chat._id);

        // Join room
        socket.emit("joinChat", chat._id);

        // Lấy tin nhắn cũ
        const msgRes = await getMessages(chat._id);
        setMessages(msgRes.data.reverse());

        setTimeout(scrollToBottom, 200);
      } catch (err) {
        console.error("Không thể tạo/lấy chat:", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup khi đóng modal
    return () => {
      socket.emit("leaveChat", chatId);
      socket.removeAllListeners("newMessage");
    };
  }, [open]);

  //Nhận tin nhắn realtime
  useEffect(() => {
    if (!open || !chatId) return;

    const handleNewMessage = (msg: any) => {
      if (msg.chatId !== chatId) return;

      setMessages((prev) => {
        //Nếu tin đã có (theo _id hoặc cùng nội dung + người gửi) thì bỏ qua
        if (
          prev.some(
            (m) =>
              m._id === msg._id ||
              (m.content === msg.content &&
                m.senderId?._id === msg.senderId?._id)
          )
        ) {
          return prev;
        }
        return [...prev, msg];
      });

      setTimeout(scrollToBottom, 100);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [open, chatId]);

  //Gửi tin nhắn
  const handleSend = () => {
    if (!newMessage.trim() || !chatId) return;

    const message = {
      chatId,
      senderId: currentUserId,
      content: newMessage,
    };

    // Chỉ emit — backend đã tự lưu và broadcast lại
    socket.emit("sendMessage", message);

    // Hiển thị tạm thời trước khi server phản hồi
    setMessages((prev) => [
      ...prev,
      { senderId: { _id: currentUserId }, content: newMessage },
    ]);

    setNewMessage("");
    setTimeout(scrollToBottom, 100);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fadeIn">
      <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-3 border-b flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <h2 className="font-semibold flex items-center gap-2 text-sm">
            <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
            {teacherName}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-lg transition"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 scroll-smooth">
          {loading ? (
            <p className="text-gray-400 text-center py-6 animate-pulse">
              Đang tải tin nhắn...
            </p>
          ) : messages.length > 0 ? (
            messages.map((msg, i) => (
              <div
                key={msg._id || i}
                className={`flex ${
                  msg.senderId?._id === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-sm shadow-sm max-w-[75%] break-words ${
                    msg.senderId?._id === currentUserId
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-6">
              💬 Chưa có tin nhắn nào
            </p>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-2 flex gap-2 bg-white">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition flex items-center justify-center"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}
