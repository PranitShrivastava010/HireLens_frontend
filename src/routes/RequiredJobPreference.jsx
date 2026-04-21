import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireJobPreferences({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  if (!user.hasCompletedPref) {
    return <Navigate to="/job-preferences" replace />;
  }

  return children;
}
