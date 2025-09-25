import {
  DevicePhoneMobileIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BriefcaseIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between gap-16">
        {/* Logo + description */}
        <div className="w-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">F4-FullStack</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Nắm vững kỹ năng phát triển full-stack với các khóa học toàn diện
            của chúng tôi. Học hỏi từ các chuyên gia trong ngành và xây dựng các
            dự án thực tế.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition"
            >
              <DevicePhoneMobileIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition"
            >
              <BriefcaseIcon className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 transition"
            >
              <PlayCircleIcon className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="flex px-6 gap-[150px]">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Các khóa học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Thể loại
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Khám phá</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Phát triển Web
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Khoa học dữ liệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Thiết kế UI/UX
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-sm text-gray-400 flex items-center justify-between max-w-7xl mx-auto">
        <div className="">© 2025 F4-FullStack. Bảo lưu mọi quyền</div>
        <div className=" text-gray-500">Được hỗ trợ bởi Hoang</div>
      </div>
    </footer>
  );
}
