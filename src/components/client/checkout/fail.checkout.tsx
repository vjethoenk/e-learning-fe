import { useSearchParams, Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentFail() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4"
    >
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

        {/* Icon */}
        <div className="flex justify-center relative z-10">
          <XCircleIcon className="w-20 h-20 text-red-500 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-red-600 mt-4 relative z-10">
          Thanh toán thất bại!
        </h2>

        {/* Payment info */}
        {paymentId && (
          <p className="mt-3 text-gray-700 relative z-10">
            Mã giao dịch:{" "}
            <span className="font-semibold text-gray-900">{paymentId}</span>
          </p>
        )}

        <p className="mt-2 text-gray-500 text-sm leading-relaxed relative z-10">
          Rất tiếc, giao dịch của bạn không thành công ❌. Vui lòng thử lại hoặc
          liên hệ bộ phận hỗ trợ nếu gặp sự cố.
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center relative z-10">
          <Link
            to="/checkout"
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 
              text-white font-semibold rounded-xl shadow hover:opacity-90 transition-all duration-200"
          >
            Thử thanh toán lại
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 
              font-medium rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
