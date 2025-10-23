import React, { useState, useEffect, useRef } from "react";
import { useCurrentApp } from "../context/app.context";
import { Link, NavLink } from "react-router-dom";
import { callLogout } from "@/services/api";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons

const AppHeader: React.FC = () => {
  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useCurrentApp();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { to: "/", label: "Trang chủ" },
    { to: "/courses", label: "Các khóa học" },
    { to: "/category", label: "Thể loại" },
    { to: "/post", label: "Bài viết" },
    { to: "/contact", label: "Liên hệ" },
  ];

  // Đóng user menu khi click ngoài
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-wide">
            <span className="text-blue-600">F4</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent ml-1">
              FullStack
            </span>
          </span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User/Auth */}
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>{user?.name || "Tài khoản"}</span>
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden animate-fadeIn z-50">
                  <Link
                    to={"/admin"}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Trang quản lý
                  </Link>
                  <Link
                    to={"/profile"}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Tài khoản của bạn
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to={"/login"}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to={"/register"}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col space-y-1 px-4 py-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to={"/admin"}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Trang quản lý
                </Link>
                <Link
                  to={"/profile"}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Tài khoản
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left w-full"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={"/register"}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default AppHeader;
