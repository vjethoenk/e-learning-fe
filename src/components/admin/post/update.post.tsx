"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { updatePost, uploadFilePost } from "@/services/api";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  post: IPostTable | null;
  reload: () => void;
}

interface IUpdatePost {
  title: string;
  content: string;
  thumbnail: string;
}

const defaultForm: IUpdatePost = {
  title: "",
  content: "",
  thumbnail: "",
};

const UpdatePost = ({ open, setOpen, post, reload }: Props) => {
  const [form, setForm] = useState<IUpdatePost>(defaultForm);

  // ⚡ Khi modal mở ra, set dữ liệu của post vào form
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        thumbnail: post.thumbnail || "",
      });
    }
  }, [post]);

  // ✅ Upload ảnh thumbnail mới
  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const res = await uploadFilePost(file);
        if (res) {
          setForm((prev) => ({ ...prev, thumbnail: res.fileName }));
        }
      } catch (error) {
        console.error("Upload thumbnail thất bại", error);
        toast.error("Upload ảnh thất bại");
      }
    }
  };

  // 📝 Submit form update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post?._id) return;

    try {
      await updatePost(post._id, form);
      toast.success("Cập nhật bài viết thành công");
      setOpen(false);
      reload();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật bài viết thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex justify-center items-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-xl p-6">
          <DialogTitle className="text-lg font-semibold mb-4">
            Cập nhật bài viết
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tiêu đề */}
            <input
              type="text"
              placeholder="Tiêu đề"
              className="w-full border px-3 py-2 rounded-lg"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            {/* Thumbnail */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full h-[40px] text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {form.thumbnail && (
                <img
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    "/images/post/" +
                    form.thumbnail
                  }
                  alt="thumbnail preview"
                  className="mt-3 h-[100px] rounded-lg border shadow-sm object-cover"
                />
              )}
            </div>

            {/* Editor */}
            <Editor
              apiKey="pt8q2fis0sjh9hrgaifxrstpfcfx0j89li8b5amx0ceqjdcv"
              value={form.content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link",
                  "charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | bullist numlist outdent indent | removeformat",
              }}
              onEditorChange={(content) => setForm({ ...form, content })}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdatePost;
