import { getByCategoryId } from "@/services/api";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface IProps {
  openModelDetail: boolean;
  setOpenModelDetail: (v: boolean) => void;
  dataCourse: ICourseTable | null;
  setDataCourse: (v: ICourseTable | null) => void;
}
const DetailCourse = (props: IProps) => {
  const { openModelDetail, setOpenModelDetail, dataCourse, setDataCourse } =
    props;
  const [category, setCategory] = useState<ICategoryTable | null>(null);
  useEffect(() => {
    const apiCategory = async () => {
      const res = await getByCategoryId(dataCourse?.categoryId as string);
      if (res.data) {
        setCategory(res.data);
      }
    };
    apiCategory();
  }, [dataCourse?.categoryId]);
  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          openModelDetail ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-30"
          onClick={() => {
            setOpenModelDetail(false), setDataCourse(null);
          }}
        />

        {/* Drawer */}
        <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl p-6 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Chi tiết khóa học
            </h2>
            <button
              onClick={() => setOpenModelDetail(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {dataCourse?.thumbnail && (
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/images/course/" +
                  dataCourse.thumbnail
                }
                className="w-full h-56 object-cover rounded-lg border"
              />
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Tên khóa học - Giáo viên
              </h3>
              <p className="text-gray-700 mt-1">
                {dataCourse?.title} - {dataCourse?.createBy.name}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Danh mục</h3>
              <p className="text-gray-700 mt-1">{category?.name}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Giá</h3>
              <p className="text-green-600 font-medium mt-1">
                {dataCourse?.price.toLocaleString("vi-VN")} VND
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mô tả</h3>
              <div
                className="prose prose-sm mt-2 text-gray-700 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: dataCourse?.description as string,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailCourse;
