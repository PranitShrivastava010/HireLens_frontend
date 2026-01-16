import { rtkApi } from "../../services/rtkApi";

const applicationApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        applyJob: builder.mutation({
            query: ({ jobId, statusKey, interviewDate }) => ({
                url: "/api/application/apply",
                method: "POST",
                body: {
                    jobId,
                    statusKey,
                    interviewDate,
                },
            }),
            invalidatesTags: ["Applications"],
        }),
        getUserApplications: builder.query({
            query: () => ({
                url: "/api/application/get",
                method: "GET",
            }),
            transformResponse: (response) => {
                // If the API returns { success, data, ... }, unwrap the data
                return response?.data || response;
            },
            providesTags: ["Applications"],
        }),
    }),
});

export const { useApplyJobMutation, useGetUserApplicationsQuery } = applicationApi;
export default applicationApi;
