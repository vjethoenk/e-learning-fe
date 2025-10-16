"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { deletePost } from "@/services/api";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  idDelete: string;
  reload: () => void;
}

const DeletePost = ({ open, setOpen, idDelete, reload }: Props) => {
  const handleDelete = async () => {
    try {
      await deletePost(idDelete);
      toast.success("Xoá bài viết thành công");
      setOpen(false);
      reload();
    } catch {
      toast.error("Xoá bài viết thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Xác nhận xoá</h2>
          <p className="text-gray-600 mb-6">Bạn có chắc muốn xoá bài viết này?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border"
            >
              Huỷ
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white"
            >
              Xoá
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeletePost;
