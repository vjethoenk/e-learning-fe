import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ChatModal from "./chat.modal";
import { useCurrentApp } from "@/components/context/app.context";

interface LessonSidebarProps {
  chapter: IChapterTable[];
  quiz: { [chapterId: string]: IQuizTable[] };
  lesson: { [chapterId: string]: ILessonTable[] };
  openChapters: { [id: string]: boolean };
  toggleChapter: (chapterId: string) => void;
  setCurrentLesson: (lesson: ILessonTable) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string) => void;
  formatDuration: (seconds: number) => string;
  loading: boolean;
  setOpenQuiz: (v: boolean) => void;
  setSelectedQuiz: (v: IQuizTable) => void;
}

export default function LessonSidebar({
  chapter,
  quiz,
  lesson,
  openChapters,
  toggleChapter,
  setCurrentLesson,
  selectedLessonId,
  setSelectedLessonId,
  formatDuration,
  loading,
  setOpenQuiz,
  setSelectedQuiz,
}: LessonSidebarProps) {
  const [openChat, setOpenChat] = useState(false);
  const { user } = useCurrentApp();

  const teacher = { id: "68c5b17b19076e226eac4b6d", name: "GV Nguyễn Văn A" };
  const currentUserId = user?._id as string; // ID user đang đăng nhập

  return (
    <aside className="w-96 bg-white text-gray-900 border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Nội dung khóa học</h3>
      </div>

      <div className="flex-1 overflow-y-auto divide-y">
        {loading ? (
          <p className="p-4 text-gray-500 animate-pulse">
            Đang tải chapters...
          </p>
        ) : (
          chapter.map((chap) => (
            <div key={chap._id} className="p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleChapter(chap._id)}
              >
                <p className="font-semibold">{chap.title}</p>
                {openChapters[chap._id] ? (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {openChapters[chap._id] && lesson[chap._id] && (
                <ul className="mt-2 space-y-2 text-sm">
                  {lesson[chap._id].map((les) => (
                    <li
                      key={les._id}
                      onClick={() => {
                        setCurrentLesson(les);
                        setSelectedLessonId(les._id);
                      }}
                      className={`cursor-pointer p-2 rounded-md flex items-center justify-between
                        ${
                          selectedLessonId === les._id
                            ? "bg-green-100 text-green-600 font-semibold"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4" />
                        {les.title}
                      </div>
                      <span className="text-xs">
                        {les?.duration ? formatDuration(les.duration) : "0:00"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {openChapters[chap._id] && quiz[chap._id] && (
                <ul className="mt-2 space-y-2 text-sm">
                  {(quiz[chap._id] || []).map((qz) => (
                    <li
                      key={qz._id}
                      onClick={() => {
                        setSelectedLessonId(qz._id);
                        setSelectedQuiz(qz);
                        setOpenQuiz(true);
                      }}
                      className={`cursor-pointer p-2 rounded-md flex items-center justify-between
              ${
                selectedLessonId === qz._id
                  ? "bg-green-100 text-green-600 font-semibold"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>

                        {qz.title}
                      </div>
                      <span className="text-xs">Quiz</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chat Support */}
      <div className="p-4 border-t">
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setOpenChat(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fill-rule="evenodd"
              d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
              clip-rule="evenodd"
            />
          </svg>
          Nhắn tin trao đổi với
        </button>
      </div>
      <ChatModal
        open={openChat}
        onClose={() => setOpenChat(false)}
        teacherId={teacher.id}
        currentUserId={currentUserId}
        teacherName={teacher.name}
      />
    </aside>
  );
}
