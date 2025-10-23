import { updateQuestion } from "@/services/api";
import { toast } from "react-toastify";
import { useState } from "react";

const UpdateQuestion = ({ open, setOpen, question, reloadTable }: any) => {
  const [questionText, setQuestionText] = useState(question?.questionText || "");

  const handleUpdate = async () => {
    try {
      await updateQuestion(question._id, { questionText });
      toast.success("Cập nhật thành công!");
      setOpen(false);
      reloadTable(question.quizId);
    } catch (err) {
      toast.error("Cập nhật thất bại!");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Chỉnh sửa câu hỏi</h3>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 h-24"
        />
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-md border border-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
