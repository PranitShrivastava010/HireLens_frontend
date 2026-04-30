import { rtkApi } from "../../services/rtkApi";

const unwrapData = (response) => response?.data ?? response;

export const resumeApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getResume: builder.query({
      query: () => ({
        url: "/api/resume",
        method: "GET",
      }),
      transformResponse: unwrapData,
      providesTags: ["ResumePreview"],
    }),
    createResume: builder.mutation({
      query: (payload) => ({
        url: "/api/resume",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateResumeTitle: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/title",
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateResumeBasics: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/basics",
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateResumeLayout: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/layout",
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
    }),
    createExperience: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/experience",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateExperience: builder.mutation({
      query: ({ experienceId, ...payload }) => ({
        url: `/api/resume/experience/${experienceId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    deleteExperience: builder.mutation({
      query: (experienceId) => ({
        url: `/api/resume/experience/${experienceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    reorderExperiences: builder.mutation({
      query: (experienceIds) => ({
        url: "/api/resume/experience/reorder",
        method: "POST",
        body: { experienceIds },
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    createEducation: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/education",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateEducation: builder.mutation({
      query: ({ educationId, ...payload }) => ({
        url: `/api/resume/education/${educationId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    deleteEducation: builder.mutation({
      query: (educationId) => ({
        url: `/api/resume/education/${educationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    createSkill: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/skill",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateSkill: builder.mutation({
      query: ({ skillId, ...payload }) => ({
        url: `/api/resume/skill/${skillId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    deleteSkill: builder.mutation({
      query: (skillId) => ({
        url: `/api/resume/skill/${skillId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    createProject: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/project",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, ...payload }) => ({
        url: `/api/resume/project/${projectId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/api/resume/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    createCertification: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/certification",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    updateCertification: builder.mutation({
      query: ({ certificationId, ...payload }) => ({
        url: `/api/resume/certification/${certificationId}`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: unwrapData,
      invalidatesTags: ["ResumePreview"],
    }),
    deleteCertification: builder.mutation({
      query: (certificationId) => ({
        url: `/api/resume/certification/${certificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResumePreview"],
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: "/api/resume/upload",
        method: "POST",
        body: formData,
      }),
      transformResponse: unwrapData,
    }),
    calculateAts: builder.mutation({
      query: (payload) => ({
        url: "/api/resume/ats",
        method: "POST",
        body: payload,
      }),
      transformResponse: unwrapData,
    }),
  }),
});

export const {
  useGetResumeQuery,
  useCreateResumeMutation,
  useUpdateResumeTitleMutation,
  useUpdateResumeBasicsMutation,
  useUpdateResumeLayoutMutation,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useReorderExperiencesMutation,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
  useUploadResumeMutation,
  useCalculateAtsMutation,
} = resumeApi;
