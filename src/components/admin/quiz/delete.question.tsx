import { deleteQuestion } from "@/services/api";
import { toast } from "react-toastify";

const DeleteQuestion = ({ open, setOpen, idDelete, reloadTable, quizId }: any) => {
  const handleDelete = async () => {
    try {
      await deleteQuestion(idDelete);
      toast.success("Xóa câu hỏi thành công!");
      setOpen(false);
      reloadTable(quizId);
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-[360px]">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Bạn có chắc muốn xóa câu hỏi này không?
        </h3>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-md border border-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestion;
