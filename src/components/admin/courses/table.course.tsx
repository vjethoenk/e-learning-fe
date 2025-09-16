import Pagination from "@/common/Pagination";
import SearchBox from "@/common/SearchBox";

import { useEffect, useState } from "react";

import CreateCourse from "./create.course";
import UpdateCourse from "./update.course";
import { getAllCourse, getByCourseId } from "@/services/api";
import DeleteCourse from "./delete.course";
import DetailCourse from "./detail.course";

const TableCourse = () => {
  const [course, setCourse] = useState<ICourseTable[]>([]);
  const [dataCourse, setDataCourse] = useState<ICourseTable | null>(null);
  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelUpdate, setOpenModelUpdate] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [openModelDetail, setOpenModelDetail] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const [meta, setMeta] = useState<{
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  } | null>(null);

  const [queryParams, setQueryParams] = useState({
    current: 1,
    pageSize: 6,
    sort: "-createdAt",
    name: "",
  });
  const fetchData = async () => {
    try {
      const { current, pageSize, sort, name } = queryParams;
      console.log("Name", name);
      let query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
      if (name) query += `&title=/${name}/i`;

      const res = await getAllCourse(query);
      if (res?.data?.result) {
        console.log("Result:", res.data.result);
        console.log("Meta:", res.data.meta);
        setCourse(res.data.result);
        setMeta(res.data.meta);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [queryParams]);
  const reloadTable = async () => {
    const query = `?current=1&pageSize=6&sort=-createdAt`;
    const res = await getAllCourse(query);
    if (res && res.data.result) {
      setCourse(res.data.result);
    }
  };

  const callApiCourseById = async (id: string) => {
    const res = await getByCourseId(id);
    if (res.data) {
      setDataCourse(res.data);
    }
  };
  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                    >
                      Course
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                      aria-current="page"
                    >
                      List
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              All course
            </h1>
          </div>
          <div className="sm:flex">
            <SearchBox
              placeholder="Search for course"
              onSearch={(value) => {
                console.log("Search value:", value);
                setQueryParams((prev) => ({
                  ...prev,
                  current: 1,
                  name: value,
                }));
              }}
            />

            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <button
                type="button"
                data-modal-toggle="add-user-modal"
                onClick={() => setOpenModelCreate(true)}
                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add course
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
        {course.map((item: any) =>
          item.isDeleted === false ? (
            <div
              key={item._id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition duration-200 cursor-pointer"
            >
              {/* Thumbnail */}
              <div
                className="relative flex justify-center mb-3"
                onClick={() => {
                  setOpenModelDetail(true), callApiCourseById(item._id);
                }}
              >
                <img
                  className="h-[250px] w-full object-cover rounded-lg"
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    "/images/course/" +
                    item.thumbnail
                  }
                  alt={item.title}
                />

                <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  {item.categoryId.name || "No Course"}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>

              {/* Teacher */}
              <p className="text-sm text-gray-600 mb-1">
                <div className="flex gap-2 items-center ">
                  {" "}
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
                  </svg>
                  <div> {item.createBy.name}</div>
                </div>
              </p>

              {/* Price */}
              <p className="text-base font-bold text-cyan-600 mb-3">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </p>

              {/* Action buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setOpenModelUpdate(true);
                    callApiCourseById(item._id);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenModelDelete(true);
                    setIdDelete(item._id);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="bg-white  sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        {meta ? (
          <Pagination
            meta={meta}
            onPageChange={(page) => {
              setQueryParams((prev) => ({ ...prev, current: page }));
            }}
          />
        ) : (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}
      </div>

      <CreateCourse
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
      ></CreateCourse>

      <UpdateCourse
        openModelUpdate={openModelUpdate}
        setOpenModelUpdate={setOpenModelUpdate}
        reloadTable={reloadTable}
        dataCourse={dataCourse}
        setDataCourse={setDataCourse}
      ></UpdateCourse>

      <DeleteCourse
        openModelDelete={openModelDelete}
        setOpenModelDelete={setOpenModelDelete}
        reloadTable={reloadTable}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      ></DeleteCourse>

      <DetailCourse
        openModelDetail={openModelDetail}
        setOpenModelDetail={setOpenModelDetail}
        dataCourse={dataCourse}
        setDataCourse={setDataCourse}
      ></DetailCourse>
    </>
  );
};
export default TableCourse;
