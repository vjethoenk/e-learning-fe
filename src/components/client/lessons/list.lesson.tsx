import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getAllApiLesson,
  getAllChapter,
  getChapterLessonCount,
} from "@/services/api";

import LessonPlayer from "./player.lesson";
import LessonSidebar from "./sidebar.lesson";
import LessonFooter from "./footer.lesson";

export default function ListLesson() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { course } = location.state || {};

  const [chapter, setChapter] = useState<IChapterTable[]>([]);
  const [lesson, setLesson] = useState<{ [chapterId: string]: ILessonTable[] }>(
    {}
  );
  const [openChapters, setOpenChapters] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [currentLesson, setCurrentLesson] = useState<ILessonTable | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataChapter = async () => {
      setLoading(true);
      const res = await getAllChapter(id as string);
      if (res.data) {
        const chaptersWithCount = await Promise.all(
          res.data.map(async (chap: IChapterTable) => {
            const countRes = await getChapterLessonCount(chap._id);
            return { ...chap, lessonCount: countRes.data.lessonCount || 0 };
          })
        );

        setChapter(chaptersWithCount);

        // mở chapter đầu tiên + chọn lesson đầu tiên
        if (chaptersWithCount.length > 0) {
          const firstChapterId = chaptersWithCount[0]._id;
          setOpenChapters({ [firstChapterId]: true });

          const lessonRes = await getAllApiLesson(firstChapterId, "");
          if (lessonRes.data) {
            setLesson({ [firstChapterId]: lessonRes.data.result });
            if (lessonRes.data.result.length > 0) {
              setCurrentLesson(lessonRes.data.result[0]);
              setSelectedLessonId(lessonRes.data.result[0]._id);
            }
          }
        }
      }
      setLoading(false);
    };
    fetchDataChapter();
  }, [id]);

  const toggleChapter = async (chapterId: string) => {
    setOpenChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));

    if (!lesson[chapterId]) {
      const res = await getAllApiLesson(chapterId, "");
      if (res.data) {
        setLesson((prev) => ({ ...prev, [chapterId]: res.data.result }));
      }
    }
  };

  const goToLesson = (direction: "prev" | "next") => {
    if (!currentLesson) return;
    const currentChap = chapter.find((chap) =>
      lesson[chap._id]?.some((les) => les._id === currentLesson._id)
    );
    if (!currentChap) return;

    const currentLessonList = lesson[currentChap._id] || [];
    const currentIndex = currentLessonList.findIndex(
      (l) => l._id === currentLesson._id
    );

    if (direction === "prev" && currentIndex > 0) {
      const prevLesson = currentLessonList[currentIndex - 1];
      setCurrentLesson(prevLesson);
      setSelectedLessonId(prevLesson._id);
    } else if (
      direction === "next" &&
      currentIndex < currentLessonList.length - 1
    ) {
      const nextLesson = currentLessonList[currentIndex + 1];
      setCurrentLesson(nextLesson);
      setSelectedLessonId(nextLesson._id);
    }
  };

  //Format sang phút
  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm hover:text-blue-400">
            <Link to={`/courses/${id}`}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Link>
          </button>
          <div>
            <h2 className="font-semibold">{course?.title}</h2>
            <p className="text-xs text-gray-400">{currentLesson?.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-gray-700">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700">
            <ArrowsPointingOutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Video player */}
        <div className="flex-1 flex items-center justify-center">
          <LessonPlayer
            currentLesson={currentLesson}
            loading={loading}
            formatDuration={formatDuration}
          />
        </div>

        {/* Sidebar */}

        <LessonSidebar
          chapter={chapter}
          lesson={lesson}
          openChapters={openChapters}
          toggleChapter={toggleChapter}
          setCurrentLesson={setCurrentLesson}
          selectedLessonId={selectedLessonId}
          setSelectedLessonId={setSelectedLessonId}
          formatDuration={formatDuration}
          loading={loading}
        />
      </div>

      {/* Footer */}
      <LessonFooter goToLesson={goToLesson} />
    </div>
  );
}
