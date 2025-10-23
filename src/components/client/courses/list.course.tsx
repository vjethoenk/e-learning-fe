import { useEffect, useState } from "react";
import {
  FolderIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "@/common/Dropdown";
import { checkCourse, getAllCourse } from "@/services/api";
import PaginationPage from "@/common/PaginationPage";
import { Link } from "react-router-dom";
import { useCurrentApp } from "@/components/context/app.context";

export default function CourseList() {
  const categoryOptions = [
    { value: "all", label: "Tất cả khóa học" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "data", label: "Data" },
    { value: "design", label: "Design" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
  ];
  const [queryParams, setQueryParams] = useState({
    current: 1,
    pageSize: 6,
    sort: "-createdAt",
  });
  const [meta, setMeta] = useState<{
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  } | null>(null);
  const [category, setCategory] = useState("all");
  const { user } = useCurrentApp();
  const [courses, setCourses] = useState<ICourseTable[]>([]);
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const fetchDataCourse = async () => {
      const { current, pageSize } = queryParams;
      const query = `?current=${current}&pageSize=${pageSize}`;
      const res = await getAllCourse(query);
      if (res.data) {
        setMeta(res.data.meta);
        if (user?._id === undefined) {
          setCourses(res.data.result);
        } else {
          const checkPayment = await Promise.all(
            res.data.result.map(async (c: ICourseTable) => {
              const daThanhToan = await checkCourse(user?._id as string, c._id);
              return { ...c, kiemTraThanhToan: daThanhToan.data.isEnrolled };
            })
          );
          setCourses(checkPayment);
        }
      }
    };
    fetchDataCourse();
  }, []);

  return (
    <>
      <section className="relative bg-blue-700">
        {/* Background overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-800/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-40 text-white">
          <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight animate-fadeIn">
              Khám phá tất cả các khóa học của
              <span className="text-blue-300 ml-3">F4-FullStack</span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-3xl animate-fadeIn delay-150">
              Khám phá các khóa học thuộc nhiều lĩnh vực đa dạng và tìm kiếm đam
              mê của bạn. Từ công nghệ đến nghệ thuật, kinh doanh đến khoa học -
              chúng tôi có khóa học dành cho tất cả mọi người.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-12 mt-12">
        {courses.map((course) => (
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

            {course.kiemTraThanhToan === false || user?._id === undefined ? (
              <Link
                to={`/courses/${course._id}`}
                className="mt-6 w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Đăng ký ngay
              </Link>
            ) : (
              <Link
                to={`/lesson/${course?._id}`}
                state={{ course }}
                className="mt-6 w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Vào học ngay
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="mb-12">
        {meta ? (
          <PaginationPage
            meta={meta}
            onPageChange={(page) => {
              setQueryParams((prev) => ({ ...prev, current: page }));
            }}
          />
        ) : (
          <div className="animate-spin h-6 w-6 text-blue-600 mx-auto">
            <div>
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
