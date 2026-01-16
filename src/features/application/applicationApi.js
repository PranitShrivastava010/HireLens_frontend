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
        }),
    }),
});

export const { useApplyJobMutation } = applicationApi;
export default applicationApi;
