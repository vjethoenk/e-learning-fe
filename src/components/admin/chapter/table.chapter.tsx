import Pagination from "@/common/Pagination";
import SearchBox from "@/common/SearchBox";
import { useCurrentApp } from "@/components/context/app.context";
import {
  getAllChapter,
  getAllCourseByUserId,
  getByChapterId,
} from "@/services/api";
import { useEffect, useState } from "react";
import CreateChapter from "./create.chapter";
import UpdateChapter from "./update.chapter";
import DeleteChapter from "./delete.chapter";

const TableChapter = () => {
  const { user } = useCurrentApp();
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [course, setCourse] = useState<ICourseTable[]>([]);
  const [chapter, setChapter] = useState<IChapterTable[]>([]);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
  const [dataChapter, setDataChapter] = useState<IChapterTable | null>(null);
  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelUpdate, setOpenModelUpdate] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");

  const [meta, setMeta] = useState<{
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  } | null>(null);
  const [queryParams, setQueryParams] = useState({
    current: 1,
    pageSize: 5,
    sort: "-createdAt",
    name: "",
  });
  const fetchData = async () => {
    const { current, pageSize, sort, name } = queryParams;
    let query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
    if (name) {
      query += `&title=/${name}/i`;
    }

    const res = await getAllCourseByUserId(user?._id as string, query);
    if (res.data) {
      setMeta(res.data.meta);
      setCourse(res.data.result);
    }
  };
  const callApiChapter = async (id: string) => {
    const res = await getAllChapter(id);

    if (res) {
      setChapter(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [queryParams]);

  const reloadTable = async (id: string) => {
    const res = await getAllChapter(id);
    if (res) {
      setChapter(res.data);
    }
  };

  const callApiByChapterId = async (id: string) => {
    const res = await getByChapterId(id);

    setDataChapter(res.data);
  };

  const toggleCourse = async (courseId: string) => {
    const isOpening = openCourse === courseId;
    if (isOpening) {
      setOpenCourse(null);
      return;
    }
    setOpenCourse(courseId);
    setLoadingCourseId(courseId);
    await callApiChapter(courseId);
    setLoadingCourseId(null);
  };
  return (
    <>
      {" "}
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
                      Chapter
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
              All chapter
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
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mt-5">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden  shadow-md bg-white">
              {course.map((item) => {
                const isOpen = openCourse === item._id;
                const isLoading = loadingCourseId === item._id;

                return (
                  <div
                    key={item._id}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    <li className="group list-none">
                      <button
                        className="w-full flex items-center justify-between px-4 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                        onClick={() => toggleCourse(item._id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-100 text-[#0891b2] rounded-lg flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                              />
                            </svg>
                          </div>
                          <span className="whitespace-nowrap">
                            {item.title}
                          </span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Danh sách chapter */}
                      <ul
                        className={`overflow-hidden transition-all duration-500 ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex justify-center py-6">
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
                        ) : (
                          <>
                            {chapter.map((chap) => (
                              <li
                                key={chap._id}
                                className="flex items-center justify-between px-6 py-3 border-b last:border-0 hover:bg-gray-50 transition-colors"
                              >
                                <span className="text-gray-800 font-medium">
                                  {chap.title}
                                </span>

                                <div className="flex items-center">
                                  <button
                                    className="p-2 rounded-full hover:bg-blue-100 text-[#0891b2] transition-colors "
                                    title="Chỉnh sửa"
                                    onClick={() => {
                                      setOpenModelUpdate(true),
                                        callApiByChapterId(chap._id);
                                    }}
                                  >
                                    <svg
                                      className=" h-5 w-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                      <path
                                        fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>

                                  <button
                                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                                    title="Xóa"
                                    onClick={() => {
                                      setOpenModelDelete(true),
                                        setIdDelete(chap._id),
                                        setCourseId(item._id as string);
                                    }}
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={1.5}
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </li>
                            ))}
                            <div className="px-12 py-3 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              <span
                                onClick={() => {
                                  setOpenModelCreate(true),
                                    setIdDelete(item._id);
                                }}
                              >
                                Thêm chapter
                              </span>
                            </div>
                          </>
                        )}
                      </ul>
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        {meta ? (
          <Pagination
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
      <CreateChapter
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      ></CreateChapter>
      <UpdateChapter
        openModelUpdate={openModelUpdate}
        setOpenModelUpdate={setOpenModelUpdate}
        reloadTable={reloadTable}
        dataChapter={dataChapter}
        setDataChapter={setDataChapter}
      ></UpdateChapter>
      <DeleteChapter
        openModelDelete={openModelDelete}
        setOpenModelDelete={setOpenModelDelete}
        reloadTable={reloadTable}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
        courseId={courseId}
        setCourseId={setCourseId}
      ></DeleteChapter>
    </>
  );
};
export default TableChapter;
