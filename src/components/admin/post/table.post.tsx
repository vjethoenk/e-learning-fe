"use client";

import { useEffect, useState } from "react";
import { getAllPost, getPostById } from "@/services/api";
import CreatePost from "./create.post";
import UpdatePost from "./update.post";
import DeletePost from "./delete.post";
import DetailPost from "./detail.post";
import SearchBox from "@/common/SearchBox";
import Pagination from "@/common/Pagination";
import { toast } from "react-toastify";

const TablePost = () => {
  const [posts, setPosts] = useState<IPostTable[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPostTable | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [idDelete, setIdDelete] = useState("");

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
    title: "",
  });

  const fetchPosts = async () => {
    try {
      const { current, pageSize, sort, title } = queryParams;
      let query = `?current=${current}&pageSize=${pageSize}&sort=${sort}`;
      if (title) query += `&title=/${title}/i`;

      const res = await getAllPost(query);
      if (res.data) {
        setPosts(res.data.result || res.data);
        setMeta(res.data.meta);
      }
    } catch (err) {
      toast.error("Lỗi khi tải danh sách bài viết");
    }
  };

  const handleGetDetail = async (id: string) => {
    const res = await getPostById(id);
    if (res.data) setSelectedPost(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [queryParams]);

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
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-1 md:ml-2 text-sm font-medium text-gray-700">
                      Post
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              All Posts
            </h1>
          </div>
          <div className="sm:flex">
            <SearchBox
              placeholder="Search for post"
              onSearch={(value) =>
                setQueryParams((prev) => ({
                  ...prev,
                  current: 1,
                  title: value,
                }))
              }
            />

            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <button
                onClick={() => setOpenCreate(true)}
                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
        {posts.map((item) =>
          item.isDeleted === false ? (
            <div
              key={item._id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <div
                className="relative flex justify-center mb-3"
                onClick={() => {
                  handleGetDetail(item._id);
                  setOpenDetail(true);
                }}
              >
                <img
                  className="h-[250px] w-full object-cover rounded-lg"
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    "/images/post/" +
                    item.thumbnail
                  }
                  alt={item.title}
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                ✍ {item.createBy?.name || item.createBy?.email}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleGetDetail(item._id);
                    setOpenUpdate(true);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => {
                    setIdDelete(item._id);
                    setOpenDelete(true);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        {meta ? (
          <Pagination
            meta={meta}
            onPageChange={(page) => {
              setQueryParams((prev) => ({ ...prev, current: page }));
            }}
          />
        ) : (
          <div className="animate-spin h-6 w-6 text-blue-600 mx-auto">
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
        )}
      </div>

      {/* Modals */}
      <CreatePost
        open={openCreate}
        setOpen={setOpenCreate}
        reload={fetchPosts}
      />
      <UpdatePost
        open={openUpdate}
        setOpen={setOpenUpdate}
        post={selectedPost}
        reload={fetchPosts}
      />
      <DeletePost
        open={openDelete}
        setOpen={setOpenDelete}
        idDelete={idDelete}
        reload={fetchPosts}
      />
      <DetailPost
        open={openDetail}
        setOpen={setOpenDetail}
        post={selectedPost}
      />
    </>
  );
};

export default TablePost;
