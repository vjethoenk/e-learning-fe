import InputField from "@/common/InputField";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ICreateCategory } from "./create.category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateCategory, uploadFileCategory } from "@/services/api";

interface IProps {
  openModelUpdate: boolean;
  setOpenModelUpdate: (v: boolean) => void;
  reloadTable: () => void;
  dataCategory: ICategoryTable | null;
  setDataCategory: (v: ICategoryTable | null) => void;
}

const defaultFormData: ICreateCategory = {
  name: "",
  thumbnail: "",
  description: "",
  color: "",
  icon: "",
};

const UpdateCategory = (props: IProps) => {
  const {
    openModelUpdate,
    setOpenModelUpdate,
    reloadTable,
    dataCategory,
    setDataCategory,
  } = props;

  const [formData, setFormData] = useState<ICreateCategory>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const res = await uploadFileCategory(file);
        if (res) {
          setFormData((prev) => ({ ...prev, thumbnail: res.fileName }));
        }
      } catch (error) {
        console.log("Upload failed", error);
      }
    }
  };

  useEffect(() => {
    if (dataCategory) {
      setFormData({
        name: dataCategory.name || "",
        thumbnail: dataCategory.thumbnail || "",
        description: dataCategory.description || "",
        color: dataCategory.color || "",
        icon: dataCategory.icon || "",
      });
    }
  }, [dataCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataCategory?._id) return;

    try {
      const res = await updateCategory(formData, dataCategory._id);
      if (res.data) {
        toast.success("Category updated successfully!");
        setOpenModelUpdate(false);
        setDataCategory(null);
        reloadTable();
      }
    } catch (error) {
      console.error("Error updating category", error);
      toast.error("Update category failed!");
    }
  };

  return (
    <Dialog
      open={openModelUpdate}
      onClose={() => {
        setOpenModelUpdate(false);
        setDataCategory(null);
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
              Edit Category
            </DialogTitle>
            <button
              onClick={() => {
                setOpenModelUpdate(false);
                setDataCategory(null);
              }}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                {formData.thumbnail && (
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/images/category/" +
                      formData.thumbnail
                    }
                    alt="thumbnail preview"
                    className="mt-3 h-[100px] rounded-lg border shadow-sm object-cover"
                  />
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-12 h-10 cursor-pointer border rounded"
                  />
                  <input
                    type="text"
                    id="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <InputField
              id="name"
              label="Category Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="sm:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg h-24"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Icon (SVG)
              </label>
              <textarea
                id="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder='<svg xmlns="http://www.w3.org/2000/svg" ...></svg>'
                className="w-full px-3 py-2 border rounded-lg h-24"
              />
              {formData.icon && (
                <div
                  className="mt-3 w-10 h-10 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formData.icon }}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setOpenModelUpdate(false);
                  setDataCategory(null);
                }}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
              >
                Update Category
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateCategory;
