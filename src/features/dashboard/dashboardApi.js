import { rtkApi } from "../../services/rtkApi";

export const dashboardApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: "/api/dashboard/stats",
                method: "GET"
            }),
            transformResponse: (response) => response.data,
            providesTags: ["DashboardStats"]
        }),
        updateWeeklyGoal: builder.mutation({
            query: (goal) => ({
                url: "/api/dashboard/goal",
                method: "PATCH",
                body: { goal }
            }),
            invalidatesTags: ["DashboardStats"]
        })
    })
})

export const { useGetDashboardStatsQuery, useUpdateWeeklyGoalMutation } = dashboardApi

