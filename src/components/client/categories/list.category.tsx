import PaginationPage from "@/common/PaginationPage";
import { getAllCategory } from "@/services/api";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [category, setCategory] = useState<ICategoryTable[]>([]);

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
  useEffect(() => {
    const fetchDataCategory = async () => {
      const { current, pageSize, sort } = queryParams;
      const query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
      const res = await getAllCategory(query);
      if (res.data) {
        setCategory(res.data.result);
        setMeta(res.data.meta);
      }
    };
    fetchDataCategory();
  }, [queryParams]);

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
        <div className="relative z-10 max-w-7xl mx-auto px-6  py-40 text-white">
          <div className="w-[700px]">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Khám phá các danh mục học tập tại
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
      <div className="py-10 bg-gray-50 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Tất cả các danh mục học tập
          </h2>
          <div className="text-center text-xl">
            Chọn từ bộ sưu tập toàn diện các danh mục khóa học của chúng tôi để
            bắt đầu hành trình học tập của bạn
          </div>

          {/* Grid Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-8">
            {category.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-[220px]">
                  <img
                    src={
                      import.meta.env.VITE_BACKEND_URL +
                      "/images/category/" +
                      item.thumbnail
                    }
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-4 left-4 p-2 flex text-white items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    <div
                      className="w-6 h-6"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                      18 khóa học
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description.length > 150
                      ? item.description.substring(0, 150) + "..."
                      : item.description}
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
                    Khám phá các khóa học
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12">
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
        </div>
      </div>
    </>
  );
}
