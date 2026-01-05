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
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Access token expired
  if (result?.error?.status === 401) {
    console.log("Access token expired. Refreshing...");

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      { url: "/api/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      // Save new access token
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
          user: api.getState().auth.user, // keep existing user
        })
      );

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed → logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: baseQueryWithReauth, // 👈 interceptor attached here
  endpoints: () => ({}),
});
