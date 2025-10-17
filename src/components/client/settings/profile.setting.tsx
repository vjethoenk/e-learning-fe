import { useCurrentApp } from "@/components/context/app.context";
import {
  getByUserId,
  updateProfile,
  updatePassword,
  getCoursesByUser,
} from "@/services/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user } = useCurrentApp();

  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "courses"
  >("profile");
  const [formData, setFormData] = useState<IProfileUser>({
    name: "",
    email: "",
    gender: "",
    phone: "",
    age: 0,
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [courses, setCourses] = useState<any[]>([]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "age" ? Number(value) : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  // Fetch profile
  useEffect(() => {
    const fetchDataUser = async () => {
      if (!user?._id) return;
      const res = await getByUserId(user._id);
      if (res.data) {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          gender: res.data.gender || "",
          phone: res.data.phone || "",
          age: res.data.age || 0,
          address: res.data.address || "",
        });
      }
    };
    fetchDataUser();
  }, [user?._id]);

  // Fetch user courses
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?._id) return;
      const res = await getCoursesByUser(user._id);
      if (res.data) {
        setCourses(res.data);
      }
    };
    if (activeTab === "courses") fetchCourses();
  }, [activeTab, user?._id]);

  // Update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateProfile(formData, user?._id as string);
    if (res.data) toast.success("Cập nhật hồ sơ thành công!");
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return toast.error("Mật khẩu xác nhận không khớp!");

    const res = await updatePassword(user?._id as string, passwordData);
    if (res.data) toast.success("Đổi mật khẩu thành công!");
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Cài đặt hồ sơ</h1>
        <p className="text-gray-500 mb-10">
          Quản lý thông tin tài khoản và tùy chọn của bạn
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A9 9 0 1118.878 6.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{user?.email}</p>

              <div className="w-full space-y-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full py-2 px-4 rounded-xl font-medium ${
                    activeTab === "profile"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Thông tin hồ sơ
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full py-2 px-4 rounded-xl font-medium ${
                    activeTab === "password"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Thay đổi mật khẩu
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`w-full py-2 px-4 rounded-xl font-medium ${
                    activeTab === "courses"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Các khóa học của bạn
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-8">
            {activeTab === "profile" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Thông tin hồ sơ
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Tên</label>
                      <input
                        id="name"
                        type="text"
                        onChange={handleChange}
                        value={formData.name}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Tuổi</label>
                      <input
                        id="age"
                        type="text"
                        onChange={handleChange}
                        value={formData.age}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      onChange={handleChange}
                      value={formData.phone}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Địa chỉ
                      </label>
                      <input
                        id="address"
                        type="text"
                        onChange={handleChange}
                        value={formData.address}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Giới tính
                      </label>
                      <input
                        id="gender"
                        type="text"
                        onChange={handleChange}
                        value={formData.gender}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="text-right pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "password" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Đổi mật khẩu
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      id="password"
                      type="password"
                      onChange={handlePasswordChange}
                      value={passwordData.password}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Mật khẩu mới
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      onChange={handlePasswordChange}
                      value={passwordData.newPassword}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      onChange={handlePasswordChange}
                      value={passwordData.confirmPassword}
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="text-right pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "courses" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Các khóa học của bạn
                </h2>
                {courses.length === 0 ? (
                  <p className="text-gray-500">
                    Bạn chưa đăng ký khóa học nào.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {courses.map((course) => (
                      <li
                        key={course._id}
                        className="p-4 border rounded-xl hover:bg-blue-50 transition"
                      >
                        <h3 className="font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {course.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
