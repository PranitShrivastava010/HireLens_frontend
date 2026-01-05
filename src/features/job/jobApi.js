import { rtkApi } from "../../services/rtkApi";

export const jobApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: ({page = 1, limit = 10}) => ({
                url: `/api/job?page=${page}&limit=${limit}`,
                method: "GET"
            })
        })
    })
})

export const {
    useLazyGetJobsQuery
} = jobApi