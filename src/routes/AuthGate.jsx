import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "../features/auth/authApi";
import { setCredentials, logout } from "../features/auth/authSlice";

export default function AuthGate({ children }) {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await refreshToken().unwrap();

        dispatch(
          setCredentials({
            accessToken: res.accessToken,
            user: res.user,
          })
        );
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  if (loading) return null; // or spinner

  return children;
}
