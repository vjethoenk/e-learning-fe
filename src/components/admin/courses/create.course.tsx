import Dropdown from "@/common/Dropdown";
import InputField from "@/common/InputField";
import { createCourse, getAllCategory, uploadFile } from "@/services/api";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  openModelCreate: boolean;
  setOpenModelCreate: (v: boolean) => void;
  reloadTable: () => void;
}
export interface ICreateCourse {
  title: string;
  description: string;
  categoryId: string;
  thumbnail: string;
  price: number;
}
const defaultFormData: ICreateCourse = {
  title: "",
  description: "",
  categoryId: "",
  thumbnail: "",
  price: 0,
};

const CreateCourse = (props: IProps) => {
  const { openModelCreate, setOpenModelCreate, reloadTable } = props;
  const [category, setCategory] = useState<ICategoryTable[]>([]);
  const [formData, setFormData] = useState<ICreateCourse>(defaultFormData);

  const resetForm = () => setFormData(defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const apiCategory = async () => {
      const res = await getAllCategory("?sort=-createdAt");
      if (res.data) {
        setCategory(res.data.result);
      }
    };
    apiCategory();
  }, []);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createCourse(formData);
      if (res.data) {
        toast.success("Course created successfully!");
        setOpenModelCreate(false);
        reloadTable();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating course", error);
      toast.error("Create course failed!");
    }
  };

  const selectedCategoryName =
    category.find((r) => r._id === formData.categoryId)?.name ||
    "Select a category";

  // Upload thumbnail
  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      //   const url = URL.createObjectURL(file);

      //   setFormData((prev) => ({ ...prev, thumbnail: url }));
      try {
        const res = await uploadFile(file);
        if (res) {
          setFormData((prev) => ({ ...prev, thumbnail: res.fileName }));
        }
        console.log("Uploaded:", res.fileName);
      } catch (error) {
        console.log("Upload failed", error);
      }
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
        <DialogPanel className="w-full max-w-3xl transform rounded-2xl bg-white p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between border-b pb-3 mb-6">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-800"
            >
              Add Course
            </DialogTitle>
            <button
              onClick={() => {
                setOpenModelCreate(false), resetForm();
              }}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-[-20px]">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full h-[40px]  text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {formData.thumbnail && (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/images/course/" +
                      formData.thumbnail
                    }
                    alt="thumbnail preview"
                    className="mt-3 h-[100px] rounded-lg border shadow-sm object-cover"
                  />
                )}
              </div>
              <InputField
                id="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Dropdown
                label="Category"
                selected={selectedCategoryName}
                options={category.map((r) => ({
                  value: r._id,
                  label: r.name,
                }))}
                onSelect={(value) =>
                  setFormData((prev) => ({ ...prev, categoryId: value }))
                }
              />

              <InputField
                id="price"
                label="Price"
                value={formData.price}
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
                className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
              >
                Add Course
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
export default CreateCourse;
