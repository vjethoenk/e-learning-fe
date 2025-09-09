import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/api/fakeApi";

const PostPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);
  const categories = [
    "Front-end / Mobile apps",
    "Back-end / Devops",
    "UI / UX / Design",
    "Others",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8">
        <h2 className="text-2xl font-bold mb-2">Bài viết nổi bật</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="block bg-white border rounded-2xl p-5 flex items-start justify-between hover:shadow-md transition"
            >
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {post.author.name}
                </p>
                <h3 className="font-bold text-lg leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.desc}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>· {post.readTime}</span>
                </div>
              </div>
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-36 h-24 object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Xem các bài viết theo chủ đề
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selected === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Banner (dummy) */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl">
          <h4 className="text-lg font-bold mb-3">Khóa học HTML CSS PRO</h4>
          <ul className="space-y-2 text-sm">
            <li>✔ Thực hành 8 dự án</li>
            <li>✔ Hơn 300 bài tập thử thách</li>
            <li>✔ Tặng ứng dụng Flashcards</li>
            <li>✔ Tặng 3 Games luyện HTML CSS</li>
            <li>✔ Tặng 20+ thiết kế trên Figma</li>
          </ul>
          <button className="mt-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
            Tham gia ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
