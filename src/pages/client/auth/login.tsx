import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callLogin } from "@/services/api";
import { useCurrentApp } from "@/components/context/app.context";
import { toast } from "react-toastify";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

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

    if (res?.data && res.data.user.isDeleted === false) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border border-sky-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-sky-600">Đăng nhập</h2>
          <p className="text-gray-500 text-sm mt-2">
            Nhập email và mật khẩu của bạn để tiếp tục
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-sky-400 absolute top-3 left-3" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
            </div>
          </div>

          {/* Remember & Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 text-sky-500 border-gray-300 rounded"
              />
              Ghi nhớ
            </label>
            <a
              href="#/forgot-password"
              className="text-sky-600 font-medium hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:from-sky-500 hover:to-sky-700 transition transform hover:scale-[1.02] duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-6">
          <span>Bạn chưa có tài khoản? </span>
          <a
            href="/register"
            className="text-sky-600 font-semibold hover:underline"
          >
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
}
