import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.jpg";
import { getStudentsByTeacher } from "@/services/api"; // API bạn tạo ở backend
import { useCurrentApp } from "@/components/context/app.context";

interface IStudent {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  courses: string[];
}

const StudentList = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentApp();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudentsByTeacher(user?._id);
        console.log("stu", res);
        if (res) {
          setStudents(res);
        }
      } catch (error) {
        console.error("Lỗi khi load danh sách học viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Danh sách học viên đã đăng ký
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">
                #
              </th>
              <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">
                Học viên
              </th>
              <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">
                Email
              </th>
              <th className="px-4 py-3 text-left text-gray-700 text-sm font-semibold">
                Khóa học đã đăng ký
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr
                key={s.user._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>

                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={avatar}
                    alt={s.user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-900">
                    {s.user.name}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {s.user.email}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(s.courses)).map((c, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}

            {/* {students.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  Không có học viên nào đăng ký.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
