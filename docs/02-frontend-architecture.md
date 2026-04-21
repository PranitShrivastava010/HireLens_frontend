# HireLens Frontend — Architecture

## Tech Stack
| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 (Vite) | Fast HMR dev server |
| State — Global | Redux Toolkit | Auth state (user, accessToken) |
| State — Server | RTK Query | API calls, cache, loading states |
| UI Library | Material UI v5 | Component library + theming |
| Routing | React Router v6 | Client-side navigation + route guards |
| Animations | Framer Motion / Motion One | Page transitions, reveals |
| 3D / Visual | Three.js | Hero background animation |
| HTTP | Axios | Base client configured in `rtkApi.js` |

---

## Folder Structure

```
src/
├── app/
│   └── store.js                    → Redux store (auth slice + RTK Query APIs)
│
├── routes/
│   ├── Routes.jsx                  → App route tree
│   ├── AppLayout.jsx               → Protected layout wrapper (Sidebar + Outlet)
│   ├── AuthGate.jsx                → Runs token refresh on app boot
│   ├── AuthRedirect.jsx            → Redirects logged-in users away from /login
│   ├── ProtectedRoute.jsx          → Redirects unauthenticated users to /login
│   └── RequiredJobPreference.jsx   → Redirects to /job-preferences if pref not set
│
├── pages/                          → Thin page wrappers (just render a Container)
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── JobPage.jsx
│   ├── JobPreferencePage.jsx
│   ├── StatsPage.jsx
│   └── (ResumeBuilderContainer is used directly in Routes)
│
├── container/                      → Smart components — data fetching + handlers
│   ├── homeContainer/HomeContainer.jsx
│   ├── login/LoginContainer.jsx
│   ├── register/RegisterContainer.jsx
│   ├── dashboard/DashboardContainer.jsx
│   ├── job/
│   │   ├── JobContainer.jsx            → Main job feed
│   │   ├── JobDetailsContainer.jsx     → Single job view
│   │   ├── JobPreferenceContainer.jsx  → Preference selector
│   │   └── KeywordsContainer.jsx       → Keyword extraction view
│   ├── layout/SidebarContainer.jsx
│   ├── stats/StatsContainer.jsx
│   └── resume/ResumeBuilderContainer.jsx
│
├── component/                      → Dumb UI components (pure props → render)
│   ├── common/
│   │   ├── Ai3dButton.jsx
│   │   ├── Ai3dModel.jsx
│   │   ├── CommonBox.jsx
│   │   ├── CommonButton.jsx
│   │   ├── CommonCard.jsx
│   │   ├── CommonSearchPopup.jsx
│   │   ├── LensAi.jsx
│   │   └── ThreeBackground.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── HeroHeadline.jsx
│   │   ├── HeroSubtitle.jsx
│   │   ├── HeroVisual.jsx
│   │   ├── Features.jsx
│   │   ├── FeatureContent.jsx
│   │   ├── FeatureImage.jsx
│   │   ├── CardFeature.jsx
│   │   └── ParallaxText.jsx
│   ├── job/
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── JobDetails.jsx
│   │   ├── JobPreference.jsx
│   │   ├── Keywords.jsx
│   │   └── ApplicationStatusModal.jsx
│   ├── resume builder/
│   │   ├── ResumeBuilder.jsx
│   │   ├── ResumePreview.jsx
│   │   ├── ResumeSectionCard.jsx
│   │   └── sections/
│   │       ├── BasicsCard.jsx
│   │       ├── ExperienceSection.jsx
│   │       ├── EducationSection.jsx
│   │       ├── SkillsSection.jsx
│   │       ├── ProjectsSection.jsx
│   │       └── CertificationsSection.jsx
│   ├── stats/
│   │   ├── Stats.jsx
│   │   ├── StatsCard.jsx
│   │   ├── StatsColumn.jsx
│   │   └── InterviewDateModal.jsx
│   ├── dashboard/DashboardComponent.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── HomeNavbar.jsx
│   └── register/RegisterComponent.jsx
│
├── features/                       → RTK Query API slices
│   ├── auth/
│   │   ├── authSlice.js            → Redux slice (user + accessToken in-memory)
│   │   └── authApi.js              → register, verifyOtp, login, refresh endpoints
│   ├── job/
│   │   └── jobApi.js               → fetchJobs, getJobs, preferences, getById, keywords
│   ├── application/
│   │   └── applicationApi.js       → apply, getApplications, updateStatus
│   └── resume/
│       └── resumeApi.js            → all resume CRUD + upload + ATS
│
├── services/
│   ├── apiBase.js                  → Axios base URL config
│   └── rtkApi.js                   → RTK Query baseQuery with auth header + token refresh
│
└── utils/
    ├── fullScreeenCelebration.js   → Confetti/celebration on job apply
    └── jobAge.js                   → Format job posted date (e.g. "3 days ago")
```

---

## State Management

### Redux Store (`src/app/store.js`)

```
store
├── auth (authSlice)
│   ├── user: { id, email, name, hasCompletedPref }
│   └── accessToken: string | null
│
├── authApi (RTK Query)
├── jobApi (RTK Query)
├── applicationApi (RTK Query)
└── resumeApi (RTK Query)
```

### In-Memory Auth (No localStorage)
- `accessToken` lives only in Redux memory — lost on page refresh
- On page refresh → `AuthGate` fires `POST /auth/refresh` using the cookie
- If cookie is valid → new access token is set in Redux → user stays logged in
- If cookie is invalid/expired → user is redirected to login

---

## RTK Query Base Config (`rtkApi.js`)

Custom `baseQuery` that:
1. Attaches `Authorization: Bearer <token>` to every request
2. On 401 response: fires `POST /api/auth/refresh`
3. If refresh succeeds: updates Redux with new token, retries original request
4. If refresh fails: dispatches `logout()`, redirects to `/login`

---

## Route Tree

```
/                         → HomePage (public)
/register                 → RegisterPage (public)
/login                    → LoginPage (redirects if already logged in)

<AppLayout> (ProtectedRoute + Sidebar)
  /dashboard              → DashboardPage
  /jobs                   → JobPage (requires hasCompletedPref)
  /job-preferences        → JobPreferencePage
  /stats                  → StatsPage
  /resume                 → ResumeBuilderContainer
```

---

## Key User Flows

### Registration Flow
```
/register → fill form → POST /auth/register → OTP sent to email
         → enter OTP → POST /auth/verify-otp → tokens set
         → redirect to /job-preferences (hasCompletedPref = false)
         → set preferences → POST /job/preference
         → redirect to /jobs
```

### Job Search Flow
```
/jobs → GET /job (scored feed) → scroll/filter list
      → click job → GET /job/:id → see details
      → click Apply → POST /application/apply (statusKey = "APPLIED")
      → job card shows status badge
```

### Resume + ATS Flow
```
/resume → POST /resume (init) → GET /resume (load)
        → fill sections (basics, experience, education, skills, projects, certs)
        → optionally: POST /resume/upload (PDF)
        → go to job → POST /resume/ats (compare resume vs keywords)
        → see score + matched/missing keywords
```
