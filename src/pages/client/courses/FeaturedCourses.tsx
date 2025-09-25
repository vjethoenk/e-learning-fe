import { ClockIcon, UserGroupIcon, StarIcon } from "@heroicons/react/24/solid";

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
];

export default function FeaturedCourses() {
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
                  <StarIcon className="w-4 h-4 text-yellow-500" />{" "}
                  {course.rating}
                </span>
              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Đăng ký ngay
              </button>
            </div>
          ))}
        </div>

        {/* Xem tất cả */}
        <div className="text-center mt-12 flex justify-center">
          <a className="text-blue-600 rounded-lg hover:text-blue-800 transition flex justify-center items-center gap-1 cursor-pointer">
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
          </a>
        </div>
      </div>
    </section>
  );
}
