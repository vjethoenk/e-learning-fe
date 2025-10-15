// PostDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "@/api/fakeApi";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      getPostById(Number(id)).then((res) => {
        setPost(res);
      });
    }
  }, [id]);

  if (!post) {
    return <p className="text-center py-10">Đang tải bài viết...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-12 gap-8">
      {/* Main content */}
      <div className="col-span-12 lg:col-span-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.readTime}</p>
          </div>
        </div>

        <img src={post.cover} alt={post.title} className="rounded-lg mb-6" />

        {/* Nội dung */}
        {post.content.map((block: any) => {
          if (block.type === "p")
            return (
              <p key={block.id} className="mb-4 text-gray-700">
                {block.text}
              </p>
            );
          if (block.type === "h2")
            return (
              <h2
                key={block.id}
                id={block.id}
                className="text-xl font-semibold mt-6 mb-2"
              >
                {block.text}
              </h2>
            );
          if (block.type === "ul")
            return (
              <ul key={block.id} className="list-disc pl-6 mb-4">
                {block.items?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          return null;
        })}
      </div>

      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* TOC */}
        {post.toc && post.toc.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Mục lục</h3>
            <ul className="space-y-2 text-sm">
              {post.toc.map((item: any) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related posts */}
        {post.related && post.related.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Bài viết liên quan</h3>
            <ul className="space-y-3">
              {post.related.map((rel: any) => (
                <li key={rel.id} className="flex gap-3 items-center">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <p className="text-sm">{rel.title}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
