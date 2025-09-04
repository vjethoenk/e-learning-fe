import { useCurrentApp } from "../context/app.context";
import { useLocation, useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: string[];
};
interface ErrorPageProps {
  code: number;
  message: string;
  buttonText?: string;
  redirectTo?: string;
}

// Component hiển thị trang lỗi
const ErrorPage = ({
  code,
  message,
  buttonText = "Back Home",
  redirectTo = "/",
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">{code}</h1>
      <p className="text-lg text-gray-500 mt-2">{message}</p>
      <button
        onClick={() => navigate(redirectTo)}
        className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

// Component bảo vệ route
const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useCurrentApp();

  if (!isAuthenticated) {
    return (
      <ErrorPage
        code={401}
        message="Bạn cần đăng nhập để truy cập trang này!"
      />
    );
  }

  if (roles && !roles.includes(user?.role.name ?? "")) {
    return (
      <ErrorPage code={403} message="Bạn không có quyền truy cập trang này!" />
    );
  }
  return children;
};
export default ProtectedRoute;
