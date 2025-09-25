import { getAllCategory } from "@/services/api";
import { useEffect, useState } from "react";

export default function PopularCategories() {
  const [categories, setCategories] = useState<ICategoryTable[]>([]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      const query = `?current=1&pageSize=8&sort=createdAt`;
      const res = await getAllCategory(query);
      if (res.data) {
        setCategories(res.data.result);
      }
    };
    fetchDataCategory();
  }, []);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Danh mục phổ biến
          </h2>
          <p className="mt-2 text-gray-600">
            Khám phá nhiều loại khóa học của chúng tôi và tìm lộ trình học tập
            hoàn hảo cho mục tiêu của bạn
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-xl border hover:shadow-lg transition p-6 text-center"
            >
              <div
                className={`w-12 h-12 mx-auto flex text-white items-center justify-center rounded-full bg-[${cat.color}]`}
              >
                <div
                  className="w-6 h-6 "
                  dangerouslySetInnerHTML={{ __html: cat.icon }}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {cat.description.length > 80
                  ? cat.description.substring(0, 80) + "..."
                  : cat.description}
              </p>
              <p className="mt-2 text-indigo-600 font-medium cursor-pointer hover:underline">
                171 courses
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
