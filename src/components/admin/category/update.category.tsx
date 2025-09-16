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
import { updateCategory } from "@/services/api";

interface IProps {
  openModelUpdate: boolean;
  setOpenModelUpdate: (v: boolean) => void;
  reloadTable: () => void;
  dataCategory: ICategoryTable | null;
  setDataCategory: (v: ICategoryTable | null) => void;
}
const UpdateCategory = (props: IProps) => {
  const {
    openModelUpdate,
    setOpenModelUpdate,
    reloadTable,
    dataCategory,
    setDataCategory,
  } = props;

  const [formData, setFormData] = useState<ICreateCategory>({
    name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  useEffect(() => {
    if (dataCategory) {
      setFormData({
        name: dataCategory.name,
      });
    }
  }, [dataCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = dataCategory?._id as string;

      const res = await updateCategory(formData, id);
      if (res.data) {
        toast.success("User update successfully!");
        setOpenModelUpdate(false);
        setDataCategory(null);
        reloadTable();
      }
    } catch (error) {
      console.error("Error creating user", error);
      alert("Create user failed!");
    }
  };
  return (
    <>
      <>
        <Dialog
          open={openModelUpdate}
          onClose={() => {
            setOpenModelUpdate(false), setDataCategory(null);
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
                  onClick={() => setOpenModelUpdate(false)}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-1 ">
                  <InputField
                    id="name"
                    label=" Category Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="IT"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {setOpenModelUpdate(false), setDataCategory(null)}}
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
      </>
    </>
  );
};
export default UpdateCategory;
