import InputField from "@/common/InputField";
import { useCurrentApp } from "@/components/context/app.context";
import {
  createLesson,
  uploadFileLesson,
  uploadYoutubeVideo,
} from "@/services/api";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  openModelCreate: boolean;
  setOpenModelCreate: (v: boolean) => void;
  reloadTable: () => void;
  selectedChapter: IChapterTable | null;
  setSelectedChapter: (v: IChapterTable | null) => void;
}

export interface ICreateLesson {
  title: string;
  description: string;
  sectionId: string;
  videoId: string;
  thumbnail: string;
  duration: number;
  order: number;
}

const defaultFormData: ICreateLesson = {
  title: "",
  description: "",
  sectionId: "",
  videoId: "",
  thumbnail: "",
  duration: 0,
  order: 0,
};

const CreateLesson = (props: IProps) => {
  const { user } = useCurrentApp();
  const {
    openModelCreate,
    setOpenModelCreate,
    reloadTable,
    selectedChapter,
    setSelectedChapter,
  } = props;

  const [formData, setFormData] = useState<ICreateLesson>(defaultFormData);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData(defaultFormData);
    setVideoFile(null);
    setLoading(false);
    setSelectedChapter(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (selectedChapter) {
      setFormData({ ...defaultFormData, sectionId: selectedChapter.title });
    }
  }, []);

  // upload ảnh thumbnail
  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const res = await uploadFileLesson(file); // gọi /files/upload
        if (res) {
          setFormData((prev) => ({ ...prev, thumbnail: res.fileName }));
        }
      } catch (error) {
        console.log("Upload thumbnail failed", error);
      }
    }
  };

  // chọn video
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!videoFile) {
        toast.error("Please select a video file!");
        return;
      }
      const plainDescription = formData.description
        .replace(/<[^>]+>/g, "") // bỏ thẻ HTML
        .substring(0, 5000);
      setLoading(true); // bật loading

      // 1. Upload video lên YouTube
      const uploadRes = await uploadYoutubeVideo(videoFile, {
        title: formData.title,
        description: plainDescription, // chỉ plain text gửi lên YouTube
        userId: user?._id as string,
      });

      if (!uploadRes?.videoId) {
        toast.error("Upload video failed");
        return;
      }

      // 2. Tạo lesson
      console.log("SectionID:", selectedChapter?._id);
      const lessonPayload = {
        ...formData,
        sectionId: selectedChapter?._id as string,
        videoId: uploadRes.videoId,
        duration: uploadRes.duration,
        thumbnail: formData.thumbnail || uploadRes.thumbnail,
      };

      const res = await createLesson(lessonPayload);
      if (res.data) {
        toast.success("Lesson created successfully!");
        setOpenModelCreate(false);
        reloadTable();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating lesson", error);
      toast.error("Create lesson failed!");
    } finally {
      setLoading(false); // ✅ tắt loading
    }
  };

  return (
    <Dialog
      open={openModelCreate}
      onClose={() => {
        setOpenModelCreate(false), resetForm();
      }}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-800"
            >
              Add Lesson
            </DialogTitle>
            <button
              onClick={() => setOpenModelCreate(false)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  ">
              {/* Thumbnail */}
              <div>
                <label className="block mb- font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full h-[41px] text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {formData.thumbnail && (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/images/lesson/" +
                      formData.thumbnail
                    }
                    alt="thumbnail preview"
                    className="mt-3 h-[100px] rounded-lg border shadow-sm object-cover"
                  />
                )}
              </div>

              {/* Video */}
              <div>
                <label className="block mb- font-medium text-gray-700">
                  Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="block w-full h-[41px] text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {videoFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {videoFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 ">
              {" "}
              <InputField
                id="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  ">
              <InputField
                id="sectionId"
                label="Section"
                // placeholder={selectedChapter?.title}
                value={selectedChapter?._id}
                disabled
                onChange={handleChange}
                required
              />
              <InputField
                id="order"
                label="Order"
                value={formData.order}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <Editor
                apiKey="pt8q2fis0sjh9hrgaifxrstpfcfx0j89li8b5amx0ceqjdcv"
                value={formData.description}
                init={{
                  height: 250,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                }}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, description: content }))
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setOpenModelCreate(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Add Lesson"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateLesson;
