import avatar from "@/assets/avatar.jpg";
import { useEffect, useState } from "react";
import CreateUser from "./create.user";
import { callUserApi, getAllRole, getByUserId } from "@/services/api";
import UpdateUser from "./update.user";
import DeleteUser from "./delete.user";
import Pagination from "@/common/Pagination";
import SearchBox from "@/common/SearchBox";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
const TableUser = () => {
  const [openModelCreate, setOpenModelCreate] = useState<boolean>(false);
  const [openModelUpdate, setOpenModelUpdate] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<IUserTable | null>(null);
  const [user, setUser] = useState<IUserTable[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
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
    role: "",
  });
  const reloadTable = async () => {
    const query = `?current=1&pageSize=5&sort=-createdAt`;
    const res = await callUserApi(query);
    if (res && res.data.result) {
      setUser(res.data.result);
    }
  };

  const fetchData = async () => {
    try {
      const { current, pageSize, sort, name, role } = queryParams;
      let query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
      if (name) query += `&name=/${name}/i`;
      if (role) query += `&role=${role}`;

      const res = await callUserApi(query);
      if (res?.data?.result) {
        setUser(res.data.result);
        setMeta(res.data.meta);
      }

      const roleRes = await getAllRole();
      if (roleRes?.data) {
        setRoles(roleRes.data);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [queryParams]);

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r._id === roleId);
    return role ? role.name : "Unknown";
  };

  const callApiUserById = async (id: string) => {
    const res = await getByUserId(id);
    if (res.data) {
      setDataUser(res.data);
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
                      Users
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
              All users
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
              <Listbox
                value={queryParams.role}
                onChange={(val) =>
                  setQueryParams((prev) => ({ ...prev, current: 1, role: val }))
                }
              >
                <div className="w[38px]">
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <span className="block truncate text-sm text-gray-800">
                        {roles.find((r) => r._id === queryParams.role)?.name ??
                          "All Roles"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden
                        />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                      <Listbox.Option value="">
                        {({ active, selected }) => (
                          <div
                            className={`${
                              active ? "bg-gray-100" : ""
                            } px-4 py-2`}
                          >
                            <span
                              className={`block truncate ${
                                selected
                                  ? "font-medium text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              All Roles
                            </span>
                          </div>
                        )}
                      </Listbox.Option>

                      {roles.map((role) => (
                        <Listbox.Option key={role._id} value={role._id}>
                          {({ active, selected }) => (
                            <div
                              className={`${
                                active
                                  ? "bg-gray-100 cursor-pointer transition"
                                  : ""
                              } px-4 py-2 flex items-center justify-between`}
                            >
                              <span
                                className={`${
                                  selected
                                    ? "font-medium text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {role.name}
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
                Add user
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      <div className="ml-1">Role</div>
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                {user.map((item: any) => (
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
                          <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={avatar}
                              alt=""
                            />
                            <div className="text-sm font-normal text-gray-500">
                              <div className="text-base font-semibold text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm font-normal text-gray-500">
                                {item.email}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900 ">
                            <div className="ml-1">{item.gender}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900">
                            0{item.phone}
                          </td>
                          <td className="p-4 whitespace-nowrap text-base font-semibold text-gray-900">
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  getRoleName(item.role) === "ADMIN"
                                    ? "bg-red-400"
                                    : getRoleName(item.role) === "USER"
                                    ? "bg-green-400"
                                    : "bg-blue-400"
                                }`}
                              ></div>
                              <div className="font-semibold">
                                <div className="font-semibold">
                                  {getRoleName(item.role)}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              data-modal-toggle="user-modal"
                              onClick={() => {
                                setOpenModelUpdate(true),
                                  callApiUserById(item._id);
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

      <CreateUser
        openModelCreate={openModelCreate}
        setOpenModelCreate={setOpenModelCreate}
        reloadTable={reloadTable}
      ></CreateUser>

      <UpdateUser
        openModelUpdate={openModelUpdate}
        setOpenModelUpdate={setOpenModelUpdate}
        reloadTable={reloadTable}
        dataUser={dataUser}
        setDataUser={setDataUser}
      ></UpdateUser>

      <DeleteUser
        openModelDelete={openModelDelete}
        setOpenModelDelete={setOpenModelDelete}
        reloadTable={reloadTable}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      ></DeleteUser>
    </>
  );
};
export default TableUser;
