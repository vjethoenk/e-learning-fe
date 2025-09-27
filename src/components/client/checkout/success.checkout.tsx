import { useSearchParams, Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4"
    >
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

        {/* Icon */}
        <div className="flex justify-center relative z-10">
          <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-purple-700 mt-4 relative z-10">
          Thanh toán thành công!
        </h2>

        {/* Payment info */}
        <p className="mt-3 text-gray-700 relative z-10">
          Mã thanh toán của bạn:{" "}
          <span className="font-semibold text-indigo-700">{paymentId}</span>
        </p>

        <p className="mt-2 text-gray-500 text-sm leading-relaxed relative z-10">
          Cảm ơn bạn đã mua khóa học 🎉. Vui lòng kiểm tra email để nhận thông
          tin chi tiết và hướng dẫn tham gia.
        </p>

        {/* Action button */}
        <Link
          to="/courses"
          className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
            text-white text-lg font-semibold rounded-xl shadow hover:opacity-90 transition-all duration-200 relative z-10"
        >
          Về trang khóa học
        </Link>
      </div>
    </div>
  );
}
