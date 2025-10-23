"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById, getAllPost } from "@/services/api";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // 🧠 Lấy chi tiết bài viết
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const res = await getPostById(id);
          if (res.data) setPost(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 🧩 Lấy bài viết khác (tối đa 3, trừ bài hiện tại)
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const res = await getAllPost("?current=1&pageSize=4&sort=-createdAt");
        const data = res.data?.result || [];
        const filtered = data
          .filter((item: any) => item._id !== id)
          .slice(0, 3);
        setRelated(filtered);
      } catch (error) {
        console.error("Lỗi khi tải bài viết liên quan:", error);
      }
    };
    fetchRelatedPosts();
  }, [id]);

  // 🪄 Tạo mục lục từ các thẻ H1-H3
  useEffect(() => {
    if (!contentRef.current) return;
    const selector = "h1, h2, h3";
    const elements = Array.from(contentRef.current.querySelectorAll(selector));

    const headingList = elements.map((el) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "") || "";
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.replace("H", "")),
      };
    });
    setHeadings(headingList);
  }, [post]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Đang tải bài viết...</p>
    );

  if (!post)
    return (
      <p className="text-center py-10 text-gray-500">
        Không tìm thấy bài viết.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-12 gap-8">
      {/* ===== Main content ===== */}
      <div className="col-span-12 lg:col-span-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-6">
          <div>
            <p className="font-medium">{post.createBy?.name || "Admin"}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/post/${
            post.thumbnail
          }`}
          alt={post.title}
          className="rounded-lg mb-6 w-full h-80 object-cover"
        />

        {/* Nội dung bài viết */}
        <div
          ref={contentRef}
          className="prose max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* ===== Sidebar ===== */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* TOC (mục lục tự động) */}
        {headings.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Mục lục</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {headings.map((h) => (
                <li key={h.id} className={`ml-${(h.level - 1) * 4}`}>
                  <a
                    href={`#${h.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Bài viết khác</h3>
            <ul className="space-y-3 text-sm">
              {related.map((rel) => (
                <li key={rel._id}>
                  <Link
                    to={`/posts/${rel._id}`}
                    className="flex gap-3 items-center hover:opacity-80"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/post/${
                        rel.thumbnail
                      }`}
                      alt={rel.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <p className="line-clamp-2">{rel.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
