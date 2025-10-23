import { useEffect, useState } from "react";
import { useCurrentApp } from "@/components/context/app.context";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDashboardStats } from "@/services/api";

interface DashboardData {
  totalEnrollments: number;
  totalPayments: number;
  totalRevenue: number;
  pendingPayments: number;
  topCourses: any[];
  monthlyRevenue: { _id: number; total: number }[];
}

const AdminDashboard = () => {
  const { user } = useCurrentApp();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (user?.role.name !== "ADMIN")
    return (
      <div className="text-center mt-10">Xin chào giảng viên {user?.name}</div>
    );

  if (loading)
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Thống kê tổng quan
      </h2>

      {/* --- Cards thống kê --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-2xl p-6 border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500">Tổng lượt đăng ký</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalEnrollments ?? 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border-l-4 border-green-500">
          <h3 className="text-sm text-gray-500">Tổng lượt thanh toán</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalPayments ?? 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border-l-4 border-yellow-500">
          <h3 className="text-sm text-gray-500">Tổng doanh thu</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.totalRevenue.toLocaleString()} ₫
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border-l-4 border-red-500">
          <h3 className="text-sm text-gray-500">Thanh toán đang chờ</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats?.pendingPayments ?? 0}
          </p>
        </div>
      </div>

      {/* --- Biểu đồ doanh thu --- */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Doanh thu theo tháng
        </h3>
        {stats?.monthlyRevenue?.length ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={stats.monthlyRevenue.map((x) => ({
                month: `Tháng ${x._id}`,
                total: x.total,
              }))}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `${v.toLocaleString()} ₫`} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-6">
            Chưa có dữ liệu doanh thu.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
