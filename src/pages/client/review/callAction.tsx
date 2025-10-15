export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-20 text-center text-white">
      {/* Background gradient blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-600"></div>

      {/* Nội dung */}
      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Bạn đã sẵn sàng bắt đầu hành trình của mình chưa?
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Tham gia cùng hàng ngàn nhà phát triển đã chuyển đổi sự nghiệp của họ
          với <span className="font-semibold">F4-FullStack</span>
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-50 transition cursor-pointer">
            Bắt đầu ngay hôm nay
          </button>
          <button className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white/10 transition cursor-pointer">
            Duyệt các khóa học
          </button>
        </div>
      </div>
    </section>
  );
}
