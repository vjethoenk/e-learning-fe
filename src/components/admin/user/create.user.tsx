import Dropdown from "@/common/Dropdown";
import InputField from "@/common/InputField";
import { createUser, getAllRole } from "@/services/api";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  openModelCreate: boolean;
  setOpenModelCreate: (v: boolean) => void;
  reloadTable: () => void;
}

const defaultFormData: ICreateUser = {
  name: "",
  email: "",
  role: "",
  gender: "",
  phone: "",
  age: 0,
  password: "123456",
};

const CreateUser = (prop: IProps) => {
  const { openModelCreate, setOpenModelCreate, reloadTable } = prop;
  const [roles, setRoles] = useState<IRole[]>([]);
  const [formData, setFormData] = useState<ICreateUser>(defaultFormData);
  const resetForm = () => setFormData(defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "age" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    const getApiRole = async () => {
      const res = await getAllRole();
      if (res.data) {
        setRoles(res?.data);
      }
    };
    getApiRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUser(formData);
      if (res.data) {
        toast.success("User created successfully!");
        setOpenModelCreate(false);
        reloadTable();
        resetForm();
      }
    } catch (error) {
      console.error("Error creating user", error);
      alert("Create user failed!");
    }
  };
  const genderOptions = ["Male", "Female"];
  const selectedRoleName =
    roles.find((r) => r._id === formData.role)?.name || "Select a role";

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
              Add User
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <InputField
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bonnie"
                required
              />

              {/* Email */}
              <InputField
                id="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@company.com"
                required
              />

              {/* Role */}
              <Dropdown
                label="Role"
                selected={selectedRoleName}
                options={roles.map((r) => ({ value: r._id, label: r.name }))}
                onSelect={(value) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              />

              {/* Gender */}
              <Dropdown
                label="Gender"
                selected={formData.gender || "Select a gender"}
                options={genderOptions.map((g) => ({ value: g, label: g }))}
                onSelect={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              />

              {/* Phone */}
              <InputField
                id="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+84 123 456 789"
                required
              />

              {/* Age */}
              <InputField
                id="age"
                type="number"
                label="Age"
                value={formData.age}
                onChange={handleChange}
                placeholder="18"
                required
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
                Add User
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateUser;
