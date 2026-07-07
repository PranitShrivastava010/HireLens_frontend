import { rtkApi } from "../../services/rtkApi";

export const linkedOutreachApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Companies ─────────────────────────────────────────────────────────
    /** POST /api/outreach/companies  { companies: string[] } */
    addCompany: builder.mutation({
      query: (payload) => ({
        url: "/api/outreach/companies",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["OutreachCompanies", "OutreachAnalytics"],
    }),

    /** GET /api/outreach/companies  → { data: TargetCompany[] } */
    getCompanies: builder.query({
      query: () => ({
        url: "/api/outreach/companies",
        method: "GET",
      }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["OutreachCompanies"],
    }),

    // ── Discovery Queues ──────────────────────────────────────────────────
    /**
     * POST /api/outreach/discovery-queues
     * Body: { companyIds: string[], roles: string[] }
     * → Creates a discovery queue + per-company-role tasks
     */
    createDiscoveryQueue: builder.mutation({
      query: (payload) => ({
        url: "/api/outreach/discovery-queues",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["OutreachCompanies"],
    }),

    /**
     * GET /api/outreach/discovery-queues
     * → { data: OutreachDiscoveryQueue[] }
     */
    getDiscoveryQueues: builder.query({
      query: () => ({
        url: "/api/outreach/discovery-queues",
        method: "GET",
      }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["OutreachDiscoveryQueues"],
    }),

    // ── Contacts ──────────────────────────────────────────────────────────
    /**
     * GET /api/outreach/contacts
     * Query params: companyId?, linkedinStatus?, search?
     * → { data: OutreachContact[], total: number }
     */
    getContacts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.companyId) searchParams.set("companyId", params.companyId);
        if (params.linkedinStatus) searchParams.set("linkedinStatus", params.linkedinStatus);
        if (params.search) searchParams.set("search", params.search);
        const qs = searchParams.toString();
        return {
          url: `/api/outreach/contacts${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data ?? response,
      providesTags: ["OutreachContacts"],
    }),

    /**
     * GET /api/outreach/contacts/:id
     * → { data: OutreachContact }
     */
    getContactById: builder.query({
      query: (contactId) => ({
        url: `/api/outreach/contacts/${contactId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data ?? response,
      providesTags: (_result, _err, contactId) => [
        { type: "OutreachContacts", id: contactId },
      ],
    }),

    // ── Analytics ─────────────────────────────────────────────────────────
    /**
     * GET /api/outreach/analytics?range=7d|30d|all
     * → { data: { stats, funnel, emailPerformance, companyPerformance } }
     */
    getOutreachAnalytics: builder.query({
      query: (range = "7d") => ({
        url: `/api/outreach/analytics?range=${range}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["OutreachAnalytics"],
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetCompaniesQuery,
  useCreateDiscoveryQueueMutation,
  useGetDiscoveryQueuesQuery,
  useGetContactsQuery,
  useGetContactByIdQuery,
  useGetOutreachAnalyticsQuery,
} = linkedOutreachApi;