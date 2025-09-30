import { useState } from "react";
import { createQuiz } from "@/services/api";
import { toast } from "react-toastify";

interface IProps {
  openModelCreate: boolean;
  setOpenModelCreate: (v: boolean) => void;
  reloadTable: (quiz: string) => void;
  selectedChapter: IChapterTable | null;
}

export default function CreateQuiz({
  openModelCreate,
  setOpenModelCreate,
  reloadTable,
  selectedChapter,
}: IProps) {
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 1. Thêm câu hỏi
      const quizRes = await createQuiz(selectedChapter?._id as string, {
        title,
      });
      if (quizRes.data) {
        toast.success("Thêm quiz thành công!");
        reloadTable(selectedChapter?._id as string);
        resetForm();
        setOpenModelCreate(false);
      }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your question..."
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
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
