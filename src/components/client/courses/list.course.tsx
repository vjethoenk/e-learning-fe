import { useEffect, useState } from "react";
import {
  FolderIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "@/common/Dropdown";
import { getAllCourse } from "@/services/api";
import PaginationPage from "@/common/PaginationPage";
import { Link } from "react-router-dom";

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
  const [courses, setCourses] = useState<ICourseTable[]>([]);
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const fetchDataCourse = async () => {
      const { current, pageSize } = queryParams;
      const query = `?current=${current}&pageSize=${pageSize}`;
      const res = await getAllCourse(query);
      if (res.data) {
        setCourses(res.data.result);
        setMeta(res.data.meta);
      }
    };
    fetchDataCourse();
  }, []);

  return (
    <>
      {" "}
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
        <div className="relative z-10 max-w-7xl mx-auto px-6  py-40 text-white">
          <div className="w-[700px]">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Khám phá tất cả các khóa học của
              <span className="text-blue-300 ml-3">F4-FullStack</span>
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-3xl">
              Khám phá các khóa học thuộc nhiều lĩnh vực đa dạng và tìm kiếm đam
              mê của bạn. Từ công nghệ đến nghệ thuật, kinh doanh đến khoa học -
              chúng tôi có khóa học dành cho tất cả mọi người.
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto my-12 bg-white border rounded-xl p-3 flex flex-col md:flex-row items-center gap-2 shadow-sm">
        {/* Category */}
        <div className="flex items-center gap-2 w-full md:w-52">
          <FolderIcon className="w-5 h-5 text-blue-600 shrink-0" />
          <Dropdown
            label=""
            selected={
              categoryOptions.find((o) => o.value === category)?.label ?? ""
            }
            options={categoryOptions}
            onSelect={setCategory}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-52">
          <Bars3BottomLeftIcon className="w-5 h-5 text-blue-600 shrink-0" />
          <Dropdown
            label=""
            selected={sortOptions.find((o) => o.value === sort)?.label ?? ""}
            options={sortOptions}
            onSelect={setSort}
          />
        </div>

        {/* Search */}
        <div className="relative w-full md:flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-12">
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

            <Link to={`/courses/${course._id}`}>
              {" "}
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Đăng ký ngay
              </button>
            </Link>
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
