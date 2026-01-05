import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRedirect({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  // 🔥 If already logged in → go to dashboard
  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise show login / register page
  return children;
}
