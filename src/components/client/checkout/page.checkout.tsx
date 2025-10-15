import { useCurrentApp } from "@/components/context/app.context";
import { createPayment, getByUserId } from "@/services/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { user } = useCurrentApp();
  const location = useLocation();
  const { course } = location.state || {};
  const [client, setClient] = useState<IUserTable | null>(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      const res = await getByUserId(user?._id as string);
      if (res.data) {
        setClient(res.data);
      }
    };
    fetchDataUser();
  }, []);
  const handleCheckout = async () => {
    try {
      const res = await createPayment(
        user?._id as string,
        course._id,
        course.price
      );
      if (res.data?.paymentUrl) {
        // Chuyển hướng sang VNPay
        window.location.href = res.data.paymentUrl;
      }
    } catch (error) {
      console.error("Thanh toán thất bại", error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Thanh Toán */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-6">
          Hoàn tất giao dịch mua của bạn
        </h2>

        {/* Thông tin liên lạc */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Thông tin liên lạc</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <input
              type="email"
              value={user?.email}
              placeholder="Địa chỉ email *"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={user?.name}
              placeholder="Tên *"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={`0${client?.phone}`}
              placeholder="SĐT *"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={client?.gender}
              placeholder="Giới tính*"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Địa chỉ thanh toán */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Địa chỉ thanh toán</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={client?.address}
              placeholder="Địa chỉ *"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700"
          onClick={handleCheckout}
        >
          Thanh toán khóa học -{" "}
          {new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
          }).format(course.price)}
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Thông tin thanh toán của bạn được bảo mật và mã hóa
        </p>
      </div>

      {/* Tóm tắt đơn hàng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-medium mb-4">Tóm tắt đơn hàng</h3>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              import.meta.env.VITE_BACKEND_URL +
              "/images/course/" +
              course.thumbnail
            }
            alt="Course"
            className="w-20 h-14 rounded object-cover"
          />
          <div>
            <p className="font-medium text-sm">{course.title}</p>
            <p className="text-xs text-gray-500">bởi {course.createBy.name}</p>
          </div>
        </div>

        <p className="text-blue-600 font-bold text-lg mb-2">
          {new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
          }).format(course.price)}
          <span className="line-through text-gray-400 font-normal ml-1 text-sm">
            499 đô la
          </span>{" "}
          <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
            GIẢM GIÁ 40%
          </span>
        </p>

        <ul className="space-y-2 text-sm text-gray-700 mb-4">
          <li>✔ 45 giờ video theo yêu cầu</li>
          <li>✔ 8 dự án thực hành</li>
          <li>✔ Truy cập trọn đời</li>
          <li>✔ Giấy chứng nhận hoàn thành</li>
          <li>✔ Cộng đồng Discord riêng tư</li>
          <li>✔ Đảm bảo hoàn tiền trong 30 ngày</li>
        </ul>

        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng tiền</span>
            <span>
              {new Intl.NumberFormat("vn-VN", {
                style: "currency",
                currency: "VND",
              }).format(course.price)}
            </span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-700 text-sm p-3 rounded-lg">
          <strong>Đảm bảo hoàn tiền trong 30 ngày</strong> <br />
          Không hài lòng? Được hoàn tiền đầy đủ trong vòng 30 ngày kể từ ngày
          mua.
        </div>
      </div>
    </div>
  );
}
