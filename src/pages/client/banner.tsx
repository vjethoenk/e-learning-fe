import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative bg-blue-700">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-800/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-40 text-white">
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight animate-fadeIn">
            Làm chủ phát triển Full-Stack với{" "}
            <span className="text-blue-300">F4-FullStack</span>
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-3xl animate-fadeIn delay-150">
            Tham gia cùng hàng ngàn nhà phát triển đã thay đổi sự nghiệp của
            mình với nền tảng học tập toàn diện theo dự án của chúng tôi.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeIn delay-300">
            <Link
              to="#courses"
              className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 text-center transition"
            >
              Khám phá các khóa học
            </Link>
            <Link
              to={"/login"}
              className="px-6 py-3 bg-white rounded-lg text-blue-700 font-semibold hover:bg-gray-100 text-center transition"
            >
              Bắt đầu trải nghiệm ứng dụng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
