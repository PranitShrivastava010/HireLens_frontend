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
        }),
        saveJobPreference: builder.mutation({
            query: (body) => ({
                url: "/api/job/preference",
                method: "POST",
                body
            })
        }),
        getRoleSkillSuggestion: builder.query({
            query: ({q}) => ({
                url: "/api/job/roleSkill",
                method: "GET",
                params: {q}
            }),
            transformResponse: (response) => response.data,
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/api/job/${id}`,
                method: "GET"
            })
        })
    })
})

export const {
    useLazyGetJobsQuery,
    useSaveJobPreferenceMutation,
    useLazyGetRoleSkillSuggestionQuery,
    useLazyGetJobByIdQuery
} = jobApi