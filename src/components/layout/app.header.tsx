import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/el.png";
import { useCurrentApp } from "../context/app.context";
import { Link } from "react-router-dom";
import { callLogout } from "@/services/api";

const AppHeader: React.FC = () => {
  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useCurrentApp();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    const res = await callLogout();
    if (res.statusCode === 201) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      setOpenUserMenu(false);
    }
  };

  return (
    <header className="w-full shadow-sm bg-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 container">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-11" />
          <span className="font-bold text-xl text-gray-900">
            F4 <span className="text-red-600">FullStack</span>
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700 relative">
          {/* Dropdown */}
          <div className="relative group">
            <button className="hover:text-red-500 flex items-center space-x-1 focus:outline-none">
              <span>Chương trình học</span>
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Submenu */}
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Lập trình Web
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Lập trình Mobile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Khoa học dữ liệu
              </a>
            </div>
          </div>

          <a href="#" className="hover:text-red-500">
            Giảng viên
          </a>
          <a href="#" className="hover:text-red-500">
            Tin tức
          </a>
          <a href="#" className="hover:text-red-500">
            Sự kiện
          </a>
          <a href="#" className="hover:text-red-500">
            Về chúng tôi
          </a>
        </nav>

        {/* Auth Buttons */}
        {isAuthenticated ? (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="hover:text-red-500 flex items-center space-x-3 focus:outline-none"
            >
              <div className="flex px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>{user?.name || "Tài khoản"}</span>
              </div>
            </button>

            {openUserMenu && (
              <div className="absolute top-full left-0 mt-2 w-36 bg-white border rounded-lg shadow-lg transition duration-200 z-50">
                <Link
                  to={"/admin"}
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Trang quản lý
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Khóa học của bạn
                </a>
                <button
                  onClick={logout}
                  className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <Link to={"/login"} style={{ color: "#494949ff" }}>
                Đăng nhập
              </Link>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
              <Link to={"/register"} style={{ color: "#ffffffff" }}>
                Đăng ký
              </Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
