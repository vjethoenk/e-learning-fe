"use client";

import { useCurrentApp } from "@/components/context/app.context";
import {
  getAllChapter,
  getAllCourseByUserId,
  getAllQuestions,
  getAllQuiz,
  importQuizFromWord,
  updateQuiz, // ✅ thêm
  deleteQuiz, // 🟡 API import quiz từ Word
} from "@/services/api";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import CreateQuestion from "./create.question";
import CreateQuiz from "./create.quiz";
import { toast } from "react-toastify";

const TableQuiz = () => {
  const { user } = useCurrentApp();

  const [course, setCourse] = useState<ICourseTable[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourseTable | null>(
    null
  );
  const [chapter, setChapter] = useState<IChapterTable[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<IChapterTable | null>(
    null
  );

  const [quiz, setQuiz] = useState<IQuizTable[]>([]);
  const [question, setQuestion] = useState<IQuestionsTable[]>([]);
  const [idQuiz, setIdQuiz] = useState("");
  const [openQuiz, setOpenQuiz] = useState<string | null>(null);
  const [loadingQuizId, setLoadingQuizId] = useState<string | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState<boolean>(false);

  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelCreateQuiz, setOpenModelCreateQuiz] =
    useState<boolean>(false);
  const [openImportModal, setOpenImportModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  // 🔸 Fetch khóa học
  const fetchDataCourse = async () => {
    let res = await getAllCourseByUserId(user?._id as string, "");
    if (res.data) setCourse(res.data.result);
  };

  // 🔸 Fetch chương học theo khóa
  const fetchDataChapter = async (id: string) => {
    let res = await getAllChapter(id);
    if (res) setChapter(res.data);
  };

  // 🔸 Fetch quiz theo chương
  const fetchDataQuiz = async (chapterId: string) => {
    setLoadingQuiz(true);
    let res = await getAllQuiz(chapterId);
    if (res?.data) {
      if (Array.isArray(res.data)) {
        setQuiz(res.data);
      } else if (Array.isArray(res.data.result)) {
        setQuiz(res.data.result);
      } else {
        setQuiz([]);
      }
    }
    setLoadingQuiz(false);
  };

  // 🔸 Tự động fetch quiz khi chọn chương
  useEffect(() => {
    if (selectedChapter?._id) {
      fetchDataQuiz(selectedChapter._id);
    } else {
      setQuiz([]);
    }
  }, [selectedChapter]);

  // 🔸 Tải câu hỏi trong quiz khi expand
  const toggleQuestions = async (quizId: string) => {
    if (openQuiz === quizId) {
      setOpenQuiz(null);
      return;
    }
    setOpenQuiz(quizId);
    setLoadingQuizId(quizId);
    const res = await getAllQuestions(quizId);
    if (res) setQuestion(res.data);
    setLoadingQuizId(null);
  };

  const reloadTable = async (quizId: string) => {
    const res = await getAllQuestions(quizId);
    if (res) setQuestion(res.data);
  };

  // 🟡 Gửi file import
  const handleImport = async () => {
    if (!selectedChapter?._id) {
      toast.error("Vui lòng chọn chương học trước khi import");
      return;
    }
    if (!file) {
      toast.error("Vui lòng chọn file Word (.docx)");
      return;
    }

    try {
      const res = await importQuizFromWord(selectedChapter._id, file);
      toast.success("Import quiz thành công!");
      setOpenImportModal(false);
      setFile(null);

      const newQuizId = res.data?.quizId;
      await fetchDataQuiz(selectedChapter._id);

      // 🟢 Tự động mở quiz vừa import
      if (newQuizId) {
        setOpenQuiz(newQuizId);
        await toggleQuestions(newQuizId);
      }
    } catch (err) {
      console.error(err);
      toast.error("Import quiz thất bại");
    }
  };

  useEffect(() => {
    fetchDataCourse();
  }, []);

  return (
    <>
      {/* 🔸 Header chọn khóa & chương */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            All Quiz
          </h1>
          <div className="sm:flex gap-8">
            {/* Khóa học */}
            <Listbox value={selectedCourse} onChange={setSelectedCourse}>
              <div className="w-[318px]">
                <div className="relative">
                  <Listbox.Button className="relative w-full h-[45px] cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <span className="block truncate text-sm text-gray-800">
                      {selectedCourse ? selectedCourse.title : "Chọn khóa học"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                    {course.map((item) => (
                      <Listbox.Option key={item._id} value={item}>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? "bg-gray-100 cursor-pointer" : ""
                            } px-4 py-2`}
                            onClick={() => fetchDataChapter(item._id)}
                          >
                            {item.title}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </div>
            </Listbox>

            {/* Chương */}
            <Listbox value={selectedChapter} onChange={setSelectedChapter}>
              <div className="w-[318px]">
                <div className="relative">
                  <Listbox.Button className="relative w-full h-[45px] cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <span className="block truncate text-sm text-gray-800">
                      {selectedChapter
                        ? selectedChapter.title
                        : "Chọn chương học"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                    {chapter.map((item) => (
                      <Listbox.Option key={item._id} value={item}>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? "bg-gray-100 cursor-pointer" : ""
                            } px-4 py-2`}
                          >
                            {item.title}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </div>
            </Listbox>

            {/* Nút thêm & import */}
            <div className="flex items-center space-x-2 ml-auto">
              <button
                onClick={() => setOpenModelCreateQuiz(true)}
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 rounded-lg text-sm px-3 py-2"
              >
                ➕ Add Quiz
              </button>
              <button
                onClick={() => setOpenImportModal(true)}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 rounded-lg text-sm px-3 py-2"
              >
                📄 Import từ Word
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Danh sách Quiz */}
      <div className="p-4">
        {loadingQuiz ? (
          <p>Đang tải quiz...</p>
        ) : quiz.length === 0 ? (
          <p>Chưa có quiz nào trong chương này.</p>
        ) : (
          <div className="space-y-2">
            {quiz.map((q) => (
              <div key={q._id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => toggleQuestions(q._id)}
                  >
                    <span className="font-semibold">{q.title}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newTitle = prompt(
                          "Nhập tiêu đề mới cho quiz:",
                          q.title
                        );
                        if (newTitle) {
                          updateQuiz(q._id, { title: newTitle })
                            .then(() => {
                              toast.success("Cập nhật quiz thành công!");
                              fetchDataQuiz(selectedChapter?._id || "");
                            })
                            .catch(() => toast.error("Lỗi khi cập nhật quiz"));
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa quiz này không?")) {
                          deleteQuiz(q._id)
                            .then(() => {
                              toast.success("Đã xóa quiz");
                              fetchDataQuiz(selectedChapter?._id || "");
                            })
                            .catch(() => toast.error("Xóa quiz thất bại"));
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {openQuiz === q._id && (
                  <div className="mt-2 pl-4 border-l">
                    {loadingQuizId === q._id ? (
                      <p>Đang tải câu hỏi...</p>
                    ) : question.length === 0 ? (
                      <p className="text-sm text-gray-500">Chưa có câu hỏi.</p>
                    ) : (
                      question.map((ques) => (
                        <div key={ques._id} className="mb-2">
                          <p className="font-medium">{ques.questionText}</p>
                          <ul className="list-disc pl-6 text-sm">
                            {Array.isArray(ques.answers) &&
                            ques.answers.length > 0 ? (
                              ques.answers.map((ans) => (
                                <li
                                  key={ans._id}
                                  className={
                                    ans.isCorrect ? "text-green-600" : ""
                                  }
                                >
                                  {ans.answerText}
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-400 italic">
                                Chưa có đáp án
                              </li>
                            )}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🟡 Modal Import */}
      {openImportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Import Quiz từ Word</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setOpenImportModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Chọn file .docx
              </label>
              <input
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenImportModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 Modal tạo câu hỏi + quiz */}
      <CreateQuestion
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
        idQuiz={idQuiz}
      />
      <CreateQuiz
        openModelCreate={openModelCreateQuiz}
        setOpenModelCreate={setOpenModelCreateQuiz}
        reloadTable={(id: string) => fetchDataQuiz(id)}
        selectedChapter={selectedChapter}
      />
    </>
  );
};

export default TableQuiz;
