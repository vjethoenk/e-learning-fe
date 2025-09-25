import InputField from "@/common/InputField";
import { useCurrentApp } from "@/components/context/app.context";
import {
  updateLesson,
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
  openModelUpdate: boolean;
  setOpenModelUpdate: (v: boolean) => void;
  reloadTable: () => void;
  selectedLesson: ILessonTable | null;
}

const UpdateLesson = (props: IProps) => {
  const { user } = useCurrentApp();
  const { openModelUpdate, setOpenModelUpdate, reloadTable, selectedLesson } =
    props;

  const [formData, setFormData] = useState<any>(selectedLesson || {});
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLesson) {
      setFormData(selectedLesson);
    }
  }, [selectedLesson]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const res = await uploadFileLesson(e.target.files[0]);
        if (res) {
          setFormData((prev: any) => ({ ...prev, thumbnail: res.fileName }));
        }
      } catch (error) {
        console.log("Upload thumbnail failed", error);
      }
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let videoId = formData.videoId;
      let duration = formData.duration;

      // nếu user chọn video mới thì upload lên YouTube
      if (videoFile) {
        const plainDescription = formData.description
          ?.replace(/<[^>]+>/g, "")
          .substring(0, 5000);

        const uploadRes = await uploadYoutubeVideo(videoFile, {
          title: formData.title,
          description: plainDescription,
          userId: user?._id as string,
        });

        if (!uploadRes?.videoId) {
          toast.error("Upload video failed");
          return;
        }

        videoId = uploadRes.videoId;
        duration = uploadRes.duration;
      }

      const payload = {
        ...formData,
        videoId,
        duration,
      };

      const res = await updateLesson(formData._id, payload);
      if (res.data) {
        toast.success("Lesson updated successfully!");
        setOpenModelUpdate(false);
        reloadTable();
      }
    } catch (error) {
      console.error("Error updating lesson", error);
      toast.error("Update lesson failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openModelUpdate}
      onClose={() => setOpenModelUpdate(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-800"
            >
              Update Lesson
            </DialogTitle>
            <button
              onClick={() => setOpenModelUpdate(false)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  ">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
                {formData.thumbnail && (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/images/lesson/" +
                      formData.thumbnail
                    }
                    alt="thumbnail"
                    className="mt-2 h-[100px] rounded border"
                  />
                )}
              </div>

              {/* Video */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                {videoFile ? (
                  <p className="mt-1 text-sm text-gray-500">
                    Selected: {videoFile.name}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">
                    Current VideoId: {formData.videoId}
                  </p>
                )}
              </div>

              <InputField
                id="title"
                label="Title"
                value={formData.title}
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
              <label className="block mb-1 font-medium text-gray-700">
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
                  setFormData((prev: any) => ({
                    ...prev,
                    description: content,
                  }))
                }
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenModelUpdate(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-cyan-600 text-white rounded-lg"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateLesson;
