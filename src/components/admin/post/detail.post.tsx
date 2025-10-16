"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  post: IPostTable | null;
}

const DetailPost = ({ open, setOpen, post }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-lg font-semibold mb-4">
            {post?.title || "Chi tiết bài viết"}
          </DialogTitle>
          {post ? (
            <div className="prose max-w-none">
              <p className="text-gray-500 text-sm mb-3">
                Tác giả: {post.createBy?.email ?? "Không rõ"}
              </p>
              <div
                className="prose max-w-none max-h-[400px] overflow-y-auto p-2 border rounded-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ) : (
            <p>Không có dữ liệu</p>
          )}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Đóng
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DetailPost;
