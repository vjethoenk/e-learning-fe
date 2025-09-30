import { useState } from "react";
import { createAnswers, createQuestions } from "@/services/api";
import { toast } from "react-toastify";

interface IProps {
  openModelCreate: boolean;
  setOpenModelCreate: (v: boolean) => void;
  reloadTable: (quiz: string) => void;
  idQuiz: string | null;
}

export default function CreateQuestion({
  openModelCreate,
  setOpenModelCreate,
  reloadTable,

  idQuiz,
}: IProps) {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setQuestionText("");
    setAnswers([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  const handleSubmit = async () => {
    if (!idQuiz) return toast.error("Quiz ID is missing!");
    if (!questionText.trim()) return toast.error("Question cannot be empty!");

    const hasCorrect = answers.some((a) => a.isCorrect);
    if (!hasCorrect) return toast.error("Please select a correct answer!");
    if (answers.some((a) => !a.text.trim()))
      return toast.error("All answer options must be filled!");

    try {
      setLoading(true);

      // 1. Thêm câu hỏi
      const questionRes = await createQuestions(idQuiz, { questionText });
      const questionId = questionRes.data._id;

      // 2. Thêm các đáp án
      await Promise.all(
        answers.map((a, i) =>
          createAnswers(questionId, {
            answerText: a.text,
            order: i + 1,
            isCorrect: a.isCorrect,
          })
        )
      );

      toast.success("Thêm câu hỏi thành công!");
      reloadTable(idQuiz);
      resetForm();
      setOpenModelCreate(false);
    } catch (err) {
      toast.error("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {openModelCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Add New Question</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setOpenModelCreate(false)}
              >
                ✕
              </button>
            </div>

            {/* Question */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Question</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question..."
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>

            {/* Answer Options */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Answer Options
              </label>
              <div className="space-y-2">
                {answers.map((ans, idx) => (
                  <label
                    key={idx}
                    className="flex items-center border rounded-lg px-2 py-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                      checked={ans.isCorrect}
                      onChange={() =>
                        setAnswers((prev) =>
                          prev.map((a, i) => ({
                            ...a,
                            isCorrect: i === idx,
                          }))
                        )
                      }
                    />
                    <input
                      type="text"
                      value={ans.text}
                      placeholder={`Option ${idx + 1}`}
                      onChange={(e) =>
                        setAnswers((prev) =>
                          prev.map((a, i) =>
                            i === idx ? { ...a, text: e.target.value } : a
                          )
                        )
                      }
                      className="flex-1 outline-none"
                    />
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Select the radio button next to the correct answer
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                disabled={loading}
                onClick={() => setOpenModelCreate(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Add Question"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
