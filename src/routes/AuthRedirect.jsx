import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRedirect({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  // 🔥 If already logged in → go to dashboard
  if (accessToken && user.hasCompletedPref) {
    return <Navigate to="/jobs" replace />;
  }

  // Otherwise show login / register page
  return children;
}
