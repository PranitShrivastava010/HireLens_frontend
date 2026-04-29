import { rtkApi } from "../../services/rtkApi";
import "../dashboard/dashboardApi";

const updateStatusSummaryCount = (statusSummary, statusKey, delta) => {
    const summaryItem = statusSummary?.find((item) => item.key === statusKey);

    if (!summaryItem) return;

    summaryItem.count = Math.max(0, (summaryItem.count || 0) + delta);
};

const matchesApplicationId = (item, applicationId) =>
    String(item?.applicationId ?? item?.id) === String(applicationId);

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
            invalidatesTags: (_result, error) =>
                error ? [] : ["Applications", "DashboardStats"],
            async onQueryStarted({ applicationId, currentStatusKey, newStatusKey, interviewDate }, { dispatch, queryFulfilled }) {
                let previousStatusKey = currentStatusKey || null;

                // Create optimistic patch
                const applicationsPatchResult = dispatch(
                    applicationApi.util.updateQueryData('getUserApplications', undefined, (draft) => {
                        // Find and move the application to new status
                        let application = null;
                        
                        // Find the app in its current status and remove it
                        for (const [statusKey, apps] of Object.entries(draft)) {
                            const index = apps.findIndex((app) => matchesApplicationId(app, applicationId));
                            if (index !== -1) {
                                previousStatusKey = previousStatusKey || statusKey;
                                [application] = apps.splice(index, 1);
                                break;
                            }
                        }
                        
                        // Add it to the new status
                        if (application && draft[newStatusKey]) {
                            application.status = newStatusKey;
                            if (interviewDate) {
                                application.interviewDate = interviewDate;
                            }
                            draft[newStatusKey].push(application);
                        }
                    })
                );

                const dashboardPatchResult = dispatch(
                    rtkApi.util.updateQueryData("getDashboardStats", undefined, (draft) => {
                        if (!draft || !previousStatusKey || previousStatusKey === newStatusKey) {
                            return;
                        }

                        updateStatusSummaryCount(draft.statusSummary, previousStatusKey, -1);
                        updateStatusSummaryCount(draft.statusSummary, newStatusKey, 1);

                        const recentApplication = draft.recentApplications?.find((item) =>
                            matchesApplicationId(item, applicationId)
                        );

                        if (recentApplication) {
                            recentApplication.status = newStatusKey;

                            if (interviewDate) {
                                recentApplication.interviewDate = interviewDate;
                            }
                        }
                    })
                );
                
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error("Status update failed, reverting:", error);
                    // Revert on error
                    applicationsPatchResult.undo();
                    dashboardPatchResult.undo();
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
