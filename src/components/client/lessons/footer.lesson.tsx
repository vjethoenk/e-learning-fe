interface LessonFooterProps {
  goToLesson: (direction: "prev" | "next") => void;
}

export default function LessonFooter({ goToLesson }: LessonFooterProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800">
      <div className="flex items-center gap-6">
        <button
          className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
          onClick={() => goToLesson("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
          </svg>
          Trước
        </button>
        <button
          className="text-sm font-medium text-blue-400 flex items-center gap-1"
          onClick={() => goToLesson("next")}
        >
          Kế tiếp
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-6"></div>
    </div>
  );
}
