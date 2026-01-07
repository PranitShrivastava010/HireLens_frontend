import { rtkApi } from "../../services/rtkApi";

export const jobApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: ({page = 1, limit = 10, search, location}) => {
                const params = new URLSearchParams()

                params.append("page", page);
                params.append("limit", limit)

                if(search) params.append("search", search)
                if(location) params.append("location", location)

                return{
                    url: `/api/job?${params.toString()}`,
                    method: "GET"
                }
            }
        })
    })
})

export const {
    useLazyGetJobsQuery
} = jobApi