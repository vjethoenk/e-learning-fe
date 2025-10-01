import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callRegister } from "@/services/api";
import { toast } from "react-toastify";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

type RegisterValues = {
  name: string;
  email: string;
  phone: number | string;
  password: string;
};

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await callRegister(
      values.name,
      values.email,
      values.password,
      Number(values.phone)
    );

    if (res.data) {
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } else {
      toast.error(res.message || "Đăng ký thất bại");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-sky-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-sky-600">Đăng ký</h2>
          <p className="text-gray-500 text-sm mt-2">
            Tạo tài khoản mới để bắt đầu
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-sky-400 absolute top-3 left-3" />
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-sky-400 absolute top-3 left-3" />
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <div className="relative">
              <PhoneIcon className="h-5 w-5 text-sky-400 absolute top-3 left-3" />
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                pattern="^\d{9,11}$"
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="0912345678"
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-sky-400 absolute top-3 left-3" />
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                minLength={6}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white py-2 rounded-lg font-medium shadow-md hover:from-sky-500 hover:to-sky-700 transition transform hover:scale-[1.02] duration-200"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <a
            href="/login"
            className="text-sky-600 font-semibold hover:underline"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
