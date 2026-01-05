import { rtkApi } from "../../services/rtkApi";

export const authApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/api/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (otp) => ({
                url: "/api/auth/verify-otp",
                method: "POST",
                body: otp,
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/api/auth/login",
                method: "POST",
                body: data
            })
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "/api/auth/refresh",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyOtpMutation,
    useLoginMutation,
    useRefreshTokenMutation
} = authApi;
