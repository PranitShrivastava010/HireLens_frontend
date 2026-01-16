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
        updateApplicationStatus: builder.mutation({
            query: ({ applicationId, newStatusKey, interviewDate }) => ({
                url: "/api/application/status",
                method: "PATCH",
                body: {
                    applicationId,
                    newStatusKey,
                    interviewDate,
                },
            }),
            async onQueryStarted({ applicationId, newStatusKey }, { dispatch, queryFulfilled }) {
                // Create optimistic patch
                const patchResult = dispatch(
                    applicationApi.util.updateQueryData('getUserApplications', undefined, (draft) => {
                        // Find and move the application to new status
                        let application = null;
                        
                        // Find the app in its current status and remove it
                        for (const [_statusKey, apps] of Object.entries(draft)) {
                            const index = apps.findIndex(app => app.applicationId === applicationId);
                            if (index !== -1) {
                                [application] = apps.splice(index, 1);
                                break;
                            }
                        }
                        
                        // Add it to the new status
                        if (application && draft[newStatusKey]) {
                            draft[newStatusKey].push(application);
                        }
                    })
                );
                
                try {
                    await queryFulfilled;
                    // Small delay to prevent flickering before refetch
                    await new Promise(resolve => setTimeout(resolve, 500));
                    // After server confirms, refetch to ensure data consistency
                    dispatch(applicationApi.util.invalidateTags(['Applications']));
                } catch (error) {
                    console.error("Status update failed, reverting:", error);
                    // Revert on error
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { 
    useApplyJobMutation, 
    useGetUserApplicationsQuery,
    useUpdateApplicationStatusMutation
} = applicationApi;
export default applicationApi;
