import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLogin } from "@/services/api";
import { useCurrentApp } from "@/components/context/app.context";
import { toast } from "react-toastify";

type LoginValues = {
  email: string;
  password: string;
  remember?: boolean;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useCurrentApp();
  const navigate = useNavigate();

  const onFinish = async (values: LoginValues) => {
    setLoading(true);
    const res = await callLogin(values.email, values.password);

    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      setIsAuthenticated(true);
      setUser(res.data.user);

      navigate("/");
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Đăng nhập thất bại: " + res?.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: LoginValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      remember: formData.get("remember") === "on",
    };
    onFinish(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
          <p className="text-gray-500 text-sm mt-1">
            Nhập email và mật khẩu của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Remember & Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 text-red-500 border-gray-300 rounded"
              />
              Ghi nhớ
            </label>
            <a
              href="#/forgot-password"
              className="text-red-500 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-6">
          <span>Bạn chưa có tài khoản? </span>
          <a href="/register" className="text-red-500 hover:underline">
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
}
