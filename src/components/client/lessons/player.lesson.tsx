interface LessonPlayerProps {
  currentLesson: ILessonTable | null;
  loading: boolean;
  formatDuration: (seconds: number) => string;
}

export default function LessonPlayer({
  currentLesson,
  loading,
}: LessonPlayerProps) {
  if (loading) {
    return (
      <div className="w-full h-[600px] flex justify-center items-center">
        <svg
          className="animate-spin h-8 w-8 text-white-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!currentLesson) {
    return <p className="text-gray-400">Chọn một bài học để xem</p>;
  }

  return (
    <div className="flex-1 flex items-center justify-center ">
      {/* giữ tỷ lệ video */}
      <div className="w-full max-w-6xl aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
          title={currentLesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
