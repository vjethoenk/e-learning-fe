import {
  checkCourse,
  getAllChapter,
  getByCategoryId,
  getByCourseId,
} from "@/services/api";
import { AcademicCapIcon, UserIcon } from "@heroicons/react/20/solid";
import {
  StarIcon,
  LanguageIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "@/assets/avatar.jpg";
import { useCurrentApp } from "@/components/context/app.context";

export default function CourseDetail() {
  const [course, setCourse] = useState<ICourseTable | null>(null);
  const [category, setCategory] = useState<ICategoryTable | null>(null);
  const [chapter, setChapter] = useState<IChapterTable[]>([]);
  const { id } = useParams<{ id: string }>();
  const [overview, setOverview] = useState<boolean>(true);
  const [curriculum, setCurriculum] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const { user } = useCurrentApp();

  useEffect(() => {
    const fetchDataCourse = async () => {
      const res = await getByCourseId(id as string);
      if (res.data) {
        setCourse(res.data);

        const cat = await getByCategoryId(res.data.categoryId as string);
        if (cat.data) {
          setCategory(cat.data);
        }

        const chap = await getAllChapter(res.data._id as string);
        if (chap.data) {
          setChapter(chap.data);
        }
        const check = await checkCourse(user?._id as string, id as string);
        if (check.data.isEnrolled === true) {
          setIsEnrolled(true);
        }
      }
    };
    fetchDataCourse();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            {category?.name}
          </span>

          <h1 className="text-3xl font-bold mt-3">{course?.title}</h1>
          <p className="text-gray-600 mt-2">
            Xây dựng ứng dụng web chuyên nghiệp từ Frontend đến Backend
          </p>

          {/* Rating & Info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">4.9</span>
              <span>(1.256 đánh giá)</span>
            </div>
            {/* <div>29 sinh viên</div> */}
            {/* <div className="flex items-center gap-1">
              <ClockIcon className="w-5 h-5 text-gray-400" />
              12 tuần
            </div> */}
            <div className="flex items-center gap-1">
              <LanguageIcon className="w-5 h-5 text-gray-400" />
              Tiếng Việt
            </div>
          </div>

          {/* Course Image */}
          <div className="mt-6">
            <img
              src={
                import.meta.env.VITE_BACKEND_URL +
                "/images/course/" +
                course?.thumbnail
              }
              alt="Course preview"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-md border rounded-xl p-6">
          <div className="text-3xl font-bold text-blue-600">
            {course
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(course.price)
              : "N/A"}

            <span className="text-gray-400 text-lg line-through ml-2">
              499.000 đ
            </span>
          </div>
          <p className="text-green-600 text-sm font-medium mt-1">
            GIẢM GIÁ 40% trong thời gian có hạn
          </p>
          {isEnrolled === false ? (
            <Link to={"/checkout"} state={{ course }}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 font-medium">
                Đăng ký ngay
              </button>
            </Link>
          ) : (
            <Link to={`/lesson/${course?._id}`} state={{ course }}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4 font-medium">
                Vào học ngay
              </button>
            </Link>
          )}
          <p className="text-xs text-gray-500 text-center mt-2">
            Đảm bảo hoàn tiền trong 30 ngày
          </p>

          <h3 className="font-semibold mt-5 mb-3">Khóa học này bao gồm:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              "45 giờ video theo yêu cầu",
              "8 dự án thực hành",
              "Truy cập trọn đời",
              "Giấy chứng nhận hoàn thành",
              "Cộng đồng Discord riêng tư",
              "Đảm bảo hoàn tiền trong 30 ngày",
              "Truy cập di động và máy tính để bàn",
              "Tài nguyên có thể tải xuống",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 my-12">
        <div className="flex-1">
          {/* Tab */}
          <div className="bg-gray-50 border rounded-lg mb-8 px-6">
            <ul className="flex gap-6 text-sm font-medium">
              <li
                className={`cursor-pointer py-2 ${
                  overview === true
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setCurriculum(false),
                    setOverview(true),
                    setTeacher(false),
                    setReview(false);
                }}
              >
                Tổng quan
              </li>
              <li
                className={`cursor-pointer py-2 ${
                  curriculum === true
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setCurriculum(true),
                    setOverview(false),
                    setTeacher(false),
                    setReview(false);
                }}
              >
                Chương trình giảng dạy
              </li>
              <li
                className={`cursor-pointer py-2 ${
                  teacher === true
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setCurriculum(false),
                    setOverview(false),
                    setTeacher(true),
                    setReview(false);
                }}
              >
                Giảng viên
              </li>
              <li
                className={`cursor-pointer py-2 ${
                  review === true
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setCurriculum(false),
                    setOverview(false),
                    setTeacher(false),
                    setReview(true);
                }}
              >
                Đánh giá
              </li>
            </ul>
          </div>{" "}
          {/* Overview */}
          {overview === true ? (
            <div
              className="prose prose-sm text-gray-700 text-[16px] leading-[2.2] [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{
                __html: course?.description as string,
              }}
            />
          ) : (
            <></>
          )}
          {/* Curriculum */}
          {curriculum === true ? (
            <div className="">
              <h2 className="text-xl font-semibold mb-4">
                Chương trình giảng dạy
              </h2>
              {chapter.map((item) => (
                <div className="mt-8 border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">4 Bài học</p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {/* Teacher */}
          {teacher === true ? (
            <section className="max-w-7xl mx-auto px-4">
              <h2 className="text-xl font-semibold mb-4">
                Giảng viên thực hiện
              </h2>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
                <img
                  src={avatar}
                  alt="Instructor"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{course?.createBy.name}</h3>
                  <p className="text-blue-600 font-medium">
                    Senior Full-Stack Developer at Google
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      4.9 rating
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      15,247 students
                    </div>
                    <div className="flex items-center gap-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      12 courses
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm">
                    Sarah has 8+ years of experience building scalable web
                    applications at top tech companies. She has mentored over
                    5,000 developers and is passionate about making complex
                    concepts accessible.
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <></>
          )}
        </div>

        <div className="lg:w-80 h-80 bg-gray-50 border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Chi tiết khóa học</h3>
          <ul className="space-y-4">
            <li className="flex justify-between ">
              <span>Khoảng thời gian</span>
              <span className="font-medium">12 tuần</span>
            </li>
            <li className="flex justify-between ">
              <span>Chương học</span>
              <span className="font-medium">{chapter.length}</span>
            </li>
            <li className="flex justify-between">
              <span>Bài học</span>
              <span className="font-medium">88</span>
            </li>
            <li className="flex justify-between">
              <span>Mực độ</span>
              <span className="font-medium">Trung bình</span>
            </li>
            <li className="flex justify-between">
              <span>Ngôn ngữ</span>
              <span className="font-medium">Tiếng Việt</span>
            </li>
            <li className="flex justify-between">
              <span>Cập nhập ngày</span>
              <span className="font-medium">
                {course?.createdAt
                  ? new Intl.DateTimeFormat("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(course.createdAt))
                  : "N/A"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
