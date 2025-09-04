import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callRegister } from "@/services/api";

type RegisterValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterValues>({
    fullName: "",
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
      values.fullName,
      values.email,
      values.password,
      values.phone
    );

    if (res.data) {
      alert("Đăng ký thành công!");
      navigate("/login");
    } else {
      alert(res.message || "Đăng ký thất bại");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đăng ký</h2>
          <p className="text-gray-500 text-sm">Tạo tài khoản mới</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              pattern="^\d{9,11}$"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
