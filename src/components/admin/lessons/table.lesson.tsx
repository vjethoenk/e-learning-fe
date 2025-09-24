import { useCurrentApp } from "@/components/context/app.context";
import {
  getAllApiLesson,
  getAllChapter,
  getAllCourseByUserId,
} from "@/services/api";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import CreateLesson from "./create.lesson";

const TableLesson = () => {
  const [queryParams, setQueryParams] = useState({
    current: 1,
    pageSize: 6,
    sort: "-createdAt",
  });
  const { user } = useCurrentApp();
  const [course, setCourse] = useState<ICourseTable[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourseTable | null>(
    null
  );
  const [chapter, setChapter] = useState<IChapterTable[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<IChapterTable | null>(
    null
  );
  const [lesson, setLesson] = useState<ILessonTable[]>([]);
  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelUpdate, setOpenModelUpdate] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [openModelDetail, setOpenModelDetail] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const fetchDataCourse = async () => {
    let res = await getAllCourseByUserId(user?._id as string, "");
    if (res.data) {
      setCourse(res.data.result);
    }
  };
  const fetchDataChapter = async (id: string) => {
    let res = await getAllChapter(id);
    if (res) {
      setChapter(res.data);
    }
  };
  const fetchDataLesson = async (id: string) => {
    const { current, pageSize, sort } = queryParams;
    const query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
    setLoading(false);
    const res = await getAllApiLesson(id, query);
    if (res.data) {
      setLesson(res.data.result);
      setLoading(true);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchDataCourse();
  }, []);

  const reloadTable = () => {};
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
                      Lesson
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
              All Lessons
            </h1>
          </div>
          <div className=" sm:flex gap-8 ">
            <Listbox value={selectedCourse} onChange={setSelectedCourse}>
              <div className="w-[318px]">
                <div className="relative">
                  {/* Nút chọn */}
                  <Listbox.Button className="relative w-full h-[45px] cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <span className="block truncate text-sm text-gray-800">
                      {selectedCourse ? selectedCourse.title : "Chọn khóa học"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden
                      />
                    </span>
                  </Listbox.Button>

                  {/* Dropdown */}
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                    {course.map((item) => (
                      <Listbox.Option key={item._id} value={item}>
                        {({ active, selected }) => (
                          <div
                            className={`${
                              active
                                ? "bg-gray-100 cursor-pointer transition"
                                : ""
                            } px-4 py-2 flex items-center justify-between`}
                            onClick={() => fetchDataChapter(item._id)}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.title}
                            </span>
                            {selected && (
                              <CheckIcon className="h-4 w-4 text-cyan-600" />
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </div>
            </Listbox>
            <Listbox value={selectedChapter} onChange={setSelectedChapter}>
              <div className="w-[318px]">
                <div className="relative">
                  {/* Nút chọn */}
                  <Listbox.Button className="relative w-full h-[45px] cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <span className="block truncate text-sm text-gray-800">
                      {selectedChapter
                        ? selectedChapter.title
                        : "Chọn chương học"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden
                      />
                    </span>
                  </Listbox.Button>

                  {/* Dropdown */}
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                    {chapter.map((item) => (
                      <Listbox.Option key={item._id} value={item}>
                        {({ active, selected }) => (
                          <div
                            className={`${
                              active
                                ? "bg-gray-100 cursor-pointer transition"
                                : ""
                            } px-4 py-2 flex items-center justify-between`}
                            onClick={() => {
                              fetchDataLesson(item._id);
                            }}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.title}
                            </span>
                            {selected && (
                              <CheckIcon className="h-4 w-4 text-cyan-600" />
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </div>
            </Listbox>
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
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading === true ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
            {lesson.map((item: any) =>
              item.isDeleted === false || lesson.length > 0 ? (
                <div
                  key={item._id}
                  className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition duration-200 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative flex justify-center mb-3"
                    onClick={() => {
                      //         setOpenModelDetail(true), callApiCourseById(item._id);
                    }}
                  >
                    <img
                      className="h-[250px] w-full object-cover rounded-lg"
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/images/lesson/" +
                        item.thumbnail
                      }
                      alt={item.title}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>

                  {/* Action buttons */}
                  <div className="flex space-x-2 mt-4">
                    <button
                      // onClick={() => {
                      //   setOpenModelUpdate(true);
                      //   callApiCourseById(item._id);
                      // }}
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
                        // setOpenModelDelete(true);
                        // setIdDelete(item._id);
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
        </>
      ) : (
        <>
          <div className="w-full h-[600px] flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
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
        </>
      )}
      <CreateLesson
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
      ></CreateLesson>
    </>
  );
};
export default TableLesson;
