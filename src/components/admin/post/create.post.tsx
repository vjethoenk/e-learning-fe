"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { createPost, uploadFilePost } from "@/services/api";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  reload: () => void;
}

export interface ICreatePost {
  title: string;
  content: string;
  thumbnail: string;
}

const defaultForm: ICreatePost = {
  title: "",
  content: "",
  thumbnail: "",
};

const CreatePost = ({ open, setOpen, reload }: Props) => {
  const [form, setForm] = useState<ICreatePost>(defaultForm);

  // ✅ Upload ảnh thumbnail
  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const res = await uploadFilePost(file);
        console.log("Upload response:", res);
        if (res) {
          setForm((prev) => ({ ...prev, thumbnail: res.fileName }));
        }
      } catch (error) {
        console.error("Upload thumbnail thất bại", error);
        toast.error("Upload ảnh thất bại");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(form);
      console.log("form:", form); // 👈 Không cần gửi createBy
      toast.success("Tạo bài viết thành công");
      setOpen(false);
      reload();
      setForm(defaultForm);
    } catch (error) {
      console.error(error);
      toast.error("Tạo bài viết thất bại");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex justify-center items-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-xl p-6">
          <DialogTitle className="text-lg font-semibold mb-4">
            Thêm bài viết
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
                    "/images/post/" + // 👈 nên tách riêng thư mục ảnh cho post
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
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | bullist numlist | alignleft aligncenter alignright | outdent indent | removeformat",
                block_formats:
                  "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",
                content_style: `
                  body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
                  h1 { font-size: 2em; margin: .67em 0; }
                  h2 { font-size: 1.5em; margin: .75em 0; }
                  h3 { font-size: 1.17em; margin: .83em 0; }
                `,
                advlist_bullet_styles: "default,circle,disc,square",
                advlist_number_styles:
                  "default,lower-alpha,lower-roman,upper-alpha,upper-roman",
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
                Lưu
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreatePost;
