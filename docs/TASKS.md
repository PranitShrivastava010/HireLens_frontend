# HireLens Frontend — Task List

> Work on these tasks **in order**. Complete and test each one before moving to the next.  
> Status: 🔲 Not started | 🔄 In progress | ✅ Done

---

## Phase 1 — Wiring & Core UX Fixes

### TASK-F-01 — Auto-Reload Job Feed (Cron-Driven) 🔲
**Context:** Job fetching from JSearch API is handled **automatically by a backend cron job** (see `TASK-B-05` in backend tasks). The frontend does NOT need a manual "Fetch Jobs" button.  
**Goal:** When the user lands on `/jobs`, the feed should always show fresh data. Implement a silent background poll or a "last updated" indicator with a soft refresh.  
**Files:** `container/job/JobContainer.jsx`, `features/job/jobApi.js`  
**What to build:**
- On mount: `GET /api/job` is called automatically (already done via RTK Query)
- Add a **"Last updated X minutes ago"** timestamp pulled from job `lastFetchedAt`
- Add a subtle **"Refresh"** icon button (not a full fetch — just re-calls `GET /api/job` to get latest from DB)
- No direct call to `POST /api/job/fetch` from the frontend  
**Acceptance:**
- Feed loads on page visit without any manual action
- Refresh icon re-queries the job list from DB (not from JSearch)
- "Last updated" timestamp visible near the filter bar

---

### TASK-F-02 — Implement Proper Logout Flow 🔲
**Problem:** No logout button in the Sidebar (or if present, it only clears Redux state without hitting the backend logout endpoint).  
**Goal:** Sidebar logout calls `POST /api/auth/logout`, clears Redux state, redirects to `/login`.  
**Files:** `component/layout/Sidebar.jsx`, `container/layout/SidebarContainer.jsx`, `features/auth/authApi.js`  
**Acceptance:**
- Logout clears Redux + cookie via API call
- User cannot use old refresh token after logout
- Redirected to `/login`

---

### TASK-F-03 — Add ATS Score UI on Job Detail 🔲
**Problem:** ATS score calculation exists in the backend but is not wired to any UI. Users can't see how well their resume matches a job.  
**Goal:** In `JobDetails` panel, add an "Check ATS Score" button. On click: sends `POST /api/resume/ats` with the current job + user's uploaded resume. Shows score, matched keywords (green), missing keywords (red).  
**Files:** `component/job/JobDetails.jsx`, `container/job/JobDetailsContainer.jsx`, `features/resume/resumeApi.js`  
**Acceptance:**
- ATS button visible on job detail
- Shows loading state while computing
- Renders score (0–100) with color indicator
- Two keyword lists: matched (✅) and missing (❌)

---

### TASK-F-04 — Resume PDF Upload UI 🔲
**Problem:** `POST /api/resume/upload` exists but there's no UI for users to upload their PDF.  
**Goal:** Add a resume upload section in `ResumeBuilderContainer` or a dedicated component. PDF file input → upload → show success with extracted text preview.  
**Files:** `container/resume/ResumeBuilderContainer.jsx`, new `component/resume builder/ResumeUpload.jsx`  
**Acceptance:**
- PDF file picker visible
- Upload progress indicator
- On success: show "Resume uploaded ✅" + preview of extracted text (first 200 chars)
- Uploaded resume ID stored in Redux for ATS use

---

### TASK-F-05 — Dashboard Page — Real Stats ✅
**Problem:** Dashboard page is a scaffold/placeholder with no real data.  
**Goal:** Wire `DashboardContainer` to `GET /api/dashboard/stats` (requires TASK-B-04 backend task). Show:
- Total applications count
- Status breakdown cards
- Upcoming interviews list
- Recent applications list  
**Files:** `container/dashboard/DashboardContainer.jsx`, `component/dashboard/DashboardComponent.jsx`, `features/application/applicationApi.js`  
**Acceptance:** Dashboard shows real user data. Loading + empty states handled.

---

### TASK-F-06 — Job Keywords Display 🔲
**Problem:** `POST /api/job/:jobId/keywords` exists but keywords are not displayed anywhere in the UI.  
**Goal:** In `JobDetails` panel, show a "Key Skills Required" section that displays AI-extracted keywords (typed + scored) for the job.  
**Files:** `component/job/JobDetails.jsx`, `component/job/Keywords.jsx` (exists, wire it up), `container/job/JobDetailsContainer.jsx`  
**Acceptance:**
- Keywords section visible in job detail view
- Grouped by type (ATOMIC / CATEGORY / CONCEPT) or shown as chips
- Score shown as small indicator (e.g., filled dots)

---

### TASK-F-07 — Improve Job Feed UX — Pagination 🔲
**Problem:** Job feed likely loads one page. No "Load More" or pagination controls.  
**Goal:** Add pagination or infinite scroll to `JobList`. Pass `page` query param to `GET /api/job`.  
**Files:** `container/job/JobContainer.jsx`, `component/job/JobList.jsx`  
**Acceptance:**
- "Load More" button or page number controls visible
- Correct page passed to API
- Total pages shown (e.g., "Page 2 of 9")

---

### TASK-F-08 — Application Status Update from Stats Page 🔲
**Problem:** Status update UI may not be fully wired — clicking a stat card should allow drag-and-drop or modal status change.  
**Goal:** Ensure `PATCH /api/application/status` is called when user changes status on the stats page. `InterviewDateModal` should save interview date correctly.  
**Files:** `container/stats/StatsContainer.jsx`, `component/stats/InterviewDateModal.jsx`  
**Acceptance:**
- Status change updates the board in real time
- Interview date saved and displayed on card
- Optimistic UI or refetch after update

---

## Phase 2 — polish & New Features

### TASK-F-09 — Auth Form Validation (Client-Side) 🔲
**Problem:** Register and login forms submit with no client-side validation.  
**Goal:** Add field-level validation (email format, password length, required fields) before API call.  
**Files:** `component/register/RegisterComponent.jsx`, `container/login/LoginContainer.jsx`  
**Acceptance:**
- Invalid email → inline error shown
- Password < 8 chars → error shown
- No API call made for invalid form

---

### TASK-F-10 — Resume Builder — Live Preview Panel 🔲
**Problem:** `ResumePreview` component exists but may not reflect live edits (it may need a re-fetch after each section save).  
**Goal:** Ensure the preview panel auto-refreshes after any section update. OR: Implement a "Refresh Preview" button.  
**Files:** `component/resume builder/ResumePreview.jsx`, `container/resume/ResumeBuilderContainer.jsx`  
**Acceptance:** Preview updates after saving any section without manual page reload

---

### TASK-F-11 — ATS Score History Page or Modal 🔲
**Problem:** ATS scores are stored per resume+job but there's no UI to view past scores.  
**Goal:** Add an ATS history section in Resume Builder page showing past analyses (once TASK-B-07 backend is done). List: job title, date, score.  
**Files:** `container/resume/ResumeBuilderContainer.jsx`, new `component/resume builder/AtsHistory.jsx`  
**Acceptance:** Table or list of past ATS checks with clickable details

---

### TASK-F-12 — Empty States for All Pages 🔲
**Problem:** Job list, stats, and dashboard likely show blank/broken UI when there's no data (new user).  
**Goal:** Add proper empty state components for:
- Job feed (no jobs fetched yet)
- Stats (no applications)
- Dashboard (brand new user)  
**Acceptance:** Friendly empty state with CTA (e.g., "Fetch Jobs →", "Apply to your first job →")

---

### TASK-F-13 — Toast Notification System 🔲
**Problem:** Success/error feedback is inconsistent — some actions give no visual feedback.  
**Goal:** Add a global toast/snackbar system using MUI `Snackbar`. Trigger on:
- Job applied ✅
- Preferences saved ✅
- Resume section saved ✅
- Any API error ❌  
**Files:** Root `App.jsx` or layout, shared notification utility  
**Acceptance:** Toast appears for every meaningful action with correct message and color

---

### TASK-F-14 — Job Filters UI Polish 🔲
**Problem:** Filter bar (search, location, remote) may not be visually polished or may not show active filter state clearly.  
**Goal:** Redesign filter bar with clear active states, easy-to-reset filters, and smooth animated transitions.  
**Files:** `container/job/JobContainer.jsx`, `component/job/JobList.jsx`  
**Acceptance:** Filters clearly show active state; reset button clears all; filtered results update in real time

---

### TASK-F-15 — Mobile Responsive Layout 🔲
**Problem:** App probably looks broken on mobile (sidebar, job cards, etc.).  
**Goal:** Ensure all pages are usable on mobile (≥320px). Sidebar becomes a hamburger drawer on mobile.  
**Files:** `component/layout/Sidebar.jsx`, `AppLayout`, all major pages  
**Acceptance:** No horizontal scroll, readable text, usable buttons on 375px screen width
