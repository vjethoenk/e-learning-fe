const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Nhà phát triển giao diện người dùng tại Google",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: `"F4-FULLSTACK đã thay đổi sự nghiệp của tôi. Các dự án thực hành và sự hướng dẫn chuyên môn đã giúp tôi có được công việc mơ ước tại Google."`,
  },
  {
    name: "Michael Trần",
    role: "Kỹ sư Full-Stack tại Stripe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: `"Chương trình giảng dạy toàn diện và cộng đồng hỗ trợ đã giúp việc học phát triển toàn diện trở nên thú vị và hiệu quả rất thích hợp cho sinh viên."`,
  },
  {
    name: "Emily Rodriguez",
    role: "Trưởng nhóm kỹ thuật tại Airbnb",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: `"Phương pháp tiếp cận dựa trên dự án đã mang lại cho tôi kinh nghiệm thực tế có thể áp dụng trực tiếp vào vai trò hiện tại của tôi là trưởng nhóm kỹ thuật."`,
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Những câu chuyện thành công
        </h2>
        <p className="mt-2 text-gray-600">
          Hãy lắng nghe những sinh viên tốt nghiệp của chúng tôi đã thay đổi sự
          nghiệp của họ
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 text-left relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" h-8 w-8 text-blue-500 absolute -top-4 -left-4 bg-white p-2 rounded-full shadow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              <p className="text-gray-700 italic mb-4">{t.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-gray-900 font-semibold">{t.name}</h4>
                  <p className="text-sm text-blue-600">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
