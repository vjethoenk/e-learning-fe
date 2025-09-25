import { useState } from "react";
import {
  FolderIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "@/common/Dropdown";
import { ClockIcon, StarIcon, UserGroupIcon } from "@heroicons/react/20/solid";

export default function CoursePage() {
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
  const courses = [
    {
      id: 1,
      title: "React & Node.js Full-Stack",
      level: "Trung cấp",
      price: "299 đô la",
      duration: "12 tuần",
      students: "2.847",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Thành thạo Python Django",
      level: "Người mới bắt đầu",
      price: "249 đô la",
      duration: "10 tuần",
      students: "1.923",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Vue.js & Express Hoàn thành",
      level: "Trình độ cao",
      price: "349 đô la",
      duration: "14 tuần",
      students: "1.456",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      title: "Vue.js & Express Hoàn thành",
      level: "Trình độ cao",
      price: "349 đô la",
      duration: "14 tuần",
      students: "1.456",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
  ];

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  return (
    <>
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

        {/* Level */}

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
        <div className="flex items-center w-full md:flex-1 border px-3 py-2 rounded-lg bg-gray-50">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full outline-none border-0 text-sm px-2 bg-transparent"
          />
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="rounded-xl object-cover h-48 w-full"
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                {course.level}
              </span>
              <span className="text-lg font-semibold text-indigo-600">
                {course.price}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-gray-900">
              {course.title}
            </h3>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <UserGroupIcon className="w-4 h-4" /> {course.students}
              </span>
              <span className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-500" /> {course.rating}
              </span>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Đăng ký ngay
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
