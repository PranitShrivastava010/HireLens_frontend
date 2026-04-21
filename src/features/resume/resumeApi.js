import { rtkApi } from "../../services/rtkApi";

export const resumeApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getResumePreview: builder.query({
            query: () => ({
                url: "/api/resume/preview",
                method: "GET"
            }),
            providesTags: ["ResumePreview"]
        }),
        saveResumeBasics: builder.mutation({
            query: (payload) => ({
                url: "/api/resume/basics",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["ResumePreview"]
        })
    })
})

export const{
    useGetResumePreviewQuery,
    useSaveResumeBasicsMutation
} = resumeApi;