import Pagination from "@/common/Pagination";
import SearchBox from "@/common/SearchBox";
import { getAllCategory, getByCategoryId } from "@/services/api";
import { useEffect, useState } from "react";
import CreateCategory from "./create.category";
import UpdateCategory from "./update.category";
import DeleteCategory from "./delete.category";

const TableCategory = () => {
  const [category, setCategory] = useState<ICategoryTable[]>([]);
  const [dataCategory, setDataCategory] = useState<ICategoryTable | null>(null);
  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelUpdate, setOpenModelUpdate] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>("");
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
    try {
      const { current, pageSize, sort, name } = queryParams;
      let query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
      if (name) query += `&name=/${name}/i`;

      const res = await getAllCategory(query);
      if (res?.data?.result) {
        setCategory(res.data.result);
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
    const query = `?current=1&pageSize=5&sort=-createdAt`;
    const res = await getAllCategory(query);
    if (res && res.data.result) {
      setCategory(res.data.result);
    }
  };
  const callApiCategoryById = async (id: string) => {
    const res = await getByCategoryId(id);
    if (res.data) {
      setDataCategory(res.data);
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
                      Category
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
              All category
            </h1>
          </div>
          <div className="sm:flex">
            <SearchBox
              placeholder="Search for users"
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
                Add category
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Create By
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Created At
                    </th>

                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                {category.map((item: any) => (
                  <>
                    {item.isDeleted === false ? (
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-100">
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-{{ .id }}"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                              />
                              <label
                                htmlFor="checkbox-{{ .id }}"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900 ">
                            <div className="ml-1 text-[#0a83f3] font-medium cursor-pointer">
                              {item._id}
                            </div>
                          </td>

                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900 ">
                            <div className="ml-1">{item.name}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900">
                            {item.createBy.email}
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900">
                            {new Date(item.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>

                          <td className="p-4 whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              data-modal-toggle="user-modal"
                              onClick={() => {
                                setOpenModelUpdate(true),
                                  callApiCategoryById(item._id);
                              }}
                              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                            >
                              <svg
                                className="mr-2 h-5 w-5"
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
                              Edit
                            </button>
                            <button
                              type="button"
                              data-modal-toggle="delete-user-modal"
                              onClick={() => {
                                setOpenModelDelete(true);
                                setIdDelete(item._id);
                              }}
                              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                            >
                              <svg
                                className="mr-2 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <div></div>
                    )}
                  </>
                ))}
              </table>
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
          <p className="text-gray-500 text-sm">Loading...</p>
        )}
      </div>

      <CreateCategory
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
      ></CreateCategory>

      <UpdateCategory
        openModelUpdate={openModelUpdate}
        setOpenModelUpdate={setOpenModelUpdate}
        reloadTable={reloadTable}
        dataCategory={dataCategory}
        setDataCategory={setDataCategory}
      ></UpdateCategory>

      <DeleteCategory
        openModelDelete={openModelDelete}
        setOpenModelDelete={setOpenModelDelete}
        reloadTable={reloadTable}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      ></DeleteCategory>
    </>
  );
};
export default TableCategory;
