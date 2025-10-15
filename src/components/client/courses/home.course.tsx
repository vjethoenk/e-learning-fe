import { getAllCourse } from "@/services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedCourses() {
  const [course, setCourse] = useState<ICourseTable[]>([]);
  useEffect(() => {
    const fetchDataCourse = async () => {
      const query = "?current=1&pageSize==3";
      const res = await getAllCourse(query);
      if (res.data) {
        setCourse(res.data.result);
      }
    };
    fetchDataCourse();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Các khóa học nổi bật
          </h2>
          <p className="mt-2 text-gray-600">
            Bắt đầu hành trình của bạn với các khóa học phổ biến và toàn diện
            nhất của chúng tôi
          </p>
        </div>

        {/* Courses */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {course.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/images/course/" +
                  course.thumbnail
                }
                alt={course.title}
                className="rounded-xl object-cover h-48 w-full"
              />

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-indigo-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(course.price)}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {course.title}
              </h3>

              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                  {course.createBy.name}
                </span>
              </div>

              <Link
                to={`/courses/${course._id}`}
                className="mt-6 w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Đăng ký ngay
              </Link>
            </div>
          ))}
        </div>

        {/* Xem tất cả */}
        <div className="text-center mt-12 flex justify-center">
          <Link
            to={"/courses"}
            className="text-blue-600 rounded-lg hover:text-blue-800 transition flex justify-center items-center gap-1 cursor-pointer"
          >
            Xem tất cả các khóa học{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
