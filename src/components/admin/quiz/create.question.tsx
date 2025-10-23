"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateQuestion } from "@/services/api";

interface IAnswer {
  _id?: string;
  answerText: string;
  isCorrect: boolean;
}

interface IQuestion {
  _id: string;
  questionText: string;
  answers: IAnswer[];
}

interface EditQuestionModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  question: IQuestion | null;
  onUpdated: () => void; // callback reload table
}

const EditQuestionModal = ({
  open,
  setOpen,
  question,
  onUpdated,
}: EditQuestionModalProps) => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    if (question) {
      setQuestionText(question.questionText);
      setAnswers(question.answers || []);
    }
  }, [question]);

  const handleAddAnswer = () => {
    setAnswers([...answers, { answerText: "", isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!questionText.trim()) {
      toast.error("Vui lòng nhập nội dung câu hỏi");
      return;
    }
    if (answers.length < 2) {
      toast.error("Cần ít nhất 2 đáp án");
      return;
    }

    try {
      await updateQuestion(question!._id, {
        questionText,
        answers,
      });
      toast.success("Cập nhật câu hỏi thành công!");
      setOpen(false);
      onUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi cập nhật câu hỏi");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Chỉnh sửa câu hỏi</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Nội dung câu hỏi
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">Danh sách đáp án</label>
            <button
              onClick={handleAddAnswer}
              className="text-sm text-blue-600 hover:underline"
            >
              ➕ Thêm đáp án
            </button>
          </div>

          {answers.map((ans, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={ans.isCorrect}
                onChange={(e) =>
                  setAnswers(
                    answers.map((a, i) =>
                      i === index ? { ...a, isCorrect: e.target.checked } : a
                    )
                  )
                }
              />
              <input
                type="text"
                placeholder={`Đáp án ${index + 1}`}
                value={ans.answerText}
                onChange={(e) =>
                  setAnswers(
                    answers.map((a, i) =>
                      i === index ? { ...a, answerText: e.target.value } : a
                    )
                  )
                }
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm"
              />
              <button
                onClick={() => handleRemoveAnswer(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
