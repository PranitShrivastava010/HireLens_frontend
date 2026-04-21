# HireLens Frontend — Pages & Components Reference

## Pages Overview

| Route | Page | Container | Description |
|---|---|---|---|
| `/` | `HomePage` | `HomeContainer` | Landing page with hero, features |
| `/register` | `RegisterPage` | `RegisterContainer` | Registration + OTP form |
| `/login` | `LoginPage` | `LoginContainer` | Login form |
| `/dashboard` | `DashboardPage` | `DashboardContainer` | User dashboard |
| `/jobs` | `JobPage` | `JobContainer` | Personalized job feed |
| `/job-preferences` | `JobPreferencePage` | `JobPreferenceContainer` | Select roles + skills |
| `/stats` | `StatsPage` | `StatsContainer` | Application tracker board |
| `/resume` | — | `ResumeBuilderContainer` | Resume builder |

---

## Page + Container Details

### Home Page (`/`)
**Container:** `HomeContainer.jsx`  
**Components:** `HomeNavbar`, `Hero`, `Features`, `CardFeature`, `ParallaxText`  
- Fully public, no auth required
- Three.js background animation
- Parallax scrolling effect

---

### Register Page (`/register`)
**Container:** `RegisterContainer.jsx`  
**Component:** `RegisterComponent.jsx`  
**Flow:**
1. User fills name/email/password → `POST /auth/register`
2. OTP input appears → `POST /auth/verify-otp`
3. On success: Redux stores tokens, redirect to `/job-preferences`

---

### Login Page (`/login`)
**Container:** `LoginContainer.jsx`  
**Flow:**
1. Email + password → `POST /auth/login`
2. On success: Redux stores tokens, redirect to `/dashboard` (or `/job-preferences` if not set)
- Wrapped in `AuthRedirect` — logged in users are auto-redirected away

---

### Dashboard Page (`/dashboard`)
**Container:** `DashboardContainer.jsx`  
**Component:** `DashboardComponent.jsx`  
- Currently a scaffold — placeholder content
- Intended future: quick stats, recent activity, AI suggestions

---

### Job Page (`/jobs`)
**Container:** `JobContainer.jsx`  
**Components:** `JobList`, `JobCard`, `JobDetails`, `ApplicationStatusModal`, `CommonSearchPopup`  
**Features:**
- Fetches paginated job feed from `GET /api/job`
- Search bar (title/company), location filter, remote toggle
- Each `JobCard` shows: title, company, location, salary, posted date, application status badge
- Click job → slides in `JobDetails` panel with full description, qualifications, responsibilities
- Apply button → shows `ApplicationStatusModal` (pick status, optionally set interview date)

---

### Job Preferences Page (`/job-preferences`)
**Container:** `JobPreferenceContainer.jsx`  
**Component:** `JobPreference.jsx`  
**Features:**
- Loads all roles + skills from `GET /api/job/roleSkill`
- Multi-select chips for roles and skills
- Saves with `POST /api/job/preference`
- After save: `hasCompletedPref` becomes true → user can access `/jobs`

---

### Stats Page (`/stats`)
**Container:** `StatsContainer.jsx`  
**Components:** `Stats`, `StatsColumn`, `StatsCard`, `InterviewDateModal`  
**Features:**
- Loads all applications from `GET /api/application/get`
- Kanban-style columns grouped by application status
- Each card shows: job title, company, applied date
- Click card → `InterviewDateModal` to update interview date
- Status updates via `PATCH /api/application/status`

---

### Resume Builder Page (`/resume`)
**Container:** `ResumeBuilderContainer.jsx`  
**Components:** `ResumeBuilder`, `ResumeSectionCard`, `ResumePreview`  
**Section Components:**
- `BasicsCard.jsx` — personal info
- `ExperienceSection.jsx` — work history (draggable reorder)
- `EducationSection.jsx` — education
- `SkillsSection.jsx` — skills with level + category
- `ProjectsSection.jsx` — projects with tech stack
- `CertificationsSection.jsx` — certifications

**Features:**
- GET /resume on load → populates all sections
- Each section: inline edit, save per item, delete per item
- Experience reorder: `POST /resume/experience/reorder`
- Live preview panel (`ResumePreview`)

---

## Common Components

### `CommonCard`
Reusable styled card wrapper. Used throughout the app.

### `CommonButton`
Styled MUI Button variant. Consistent CTA styling.

### `CommonSearchPopup`
Autocomplete search dropdown. Used in job preferences chip selector.

### `CommonBox`
Styled container box with padding/background tokens.

### `LensAi`
Visual AI indicator element (animated lens icon branding).

### `Ai3dButton`
Animated 3D-styled button for primary CTAs on homepage.

### `Ai3dModel`
Three.js-based 3D model component for hero visual.

### `ThreeBackground`
Full-screen Three.js canvas for animated hero background.

---

## Layout Components

### `Sidebar` (`component/layout/Sidebar.jsx`)
- Left-side navigation drawer
- Links: Dashboard, Jobs, Stats, Resume
- Shows user name/email
- Logout handler (dispatches `logout()` action)

### `HomeNavbar` (`component/layout/HomeNavbar.jsx`)
- Top navbar for the public home page
- Links to Login / Register

### `AppLayout` (`routes/AppLayout.jsx`)
- Wraps all protected pages
- Renders `Sidebar` + `<Outlet />`
- Is itself wrapped in `ProtectedRoute`

---

## Route Guard Components

### `ProtectedRoute`
- Checks Redux `auth.user`
- If null: redirects to `/login`
- If present: renders children

### `AuthRedirect`
- Wraps `/login` page
- If user already logged in: redirects to `/dashboard`

### `AuthGate`
- Runs on app boot (wraps entire `<Routes>`)
- Calls `POST /auth/refresh` if no user in Redux but cookie may exist
- Sets user in Redux if refresh succeeds
- Renders children after check completes

### `RequireJobPreferences`
- Wraps the `/jobs` route
- Checks `user.hasCompletedPref`
- If false: redirects to `/job-preferences`

---

## Utilities

### `jobAge.js`
Converts UTC date string to human-readable "X days ago", "Today", etc.

### `fullScreeenCelebration.js`
Triggers a confetti/celebration animation on job apply (applied status).
