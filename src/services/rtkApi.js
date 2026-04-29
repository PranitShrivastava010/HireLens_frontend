import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include", // 🔥 sends refresh token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * 🔥 THIS IS THE INTERCEPTOR
 */
let isRefreshing = false;
let refreshPromise = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // If a refresh is already in progress, wait for it before making any new request
  if (isRefreshing && refreshPromise) {
    await refreshPromise;
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          console.log("Access token expired. Refreshing...");
          const refreshResult = await baseQuery(
            { url: "/api/auth/refresh", method: "POST" },
            api,
            extraOptions
          );

          if (refreshResult?.data?.accessToken) {
            api.dispatch(
              setCredentials({
                accessToken: refreshResult.data.accessToken,
                user: api.getState().auth.user,
              })
            );
            return true;
          } else {
            api.dispatch(logout());
            return false;
          }
        } catch (error) {
          api.dispatch(logout());
          return false;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      const success = await refreshPromise;
      if (success) {
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      // Wait for the existing refresh to finish and retry
      await refreshPromise;
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ResumePreview", "DashboardStats", "Applications"],
  endpoints: () => ({}),
});
