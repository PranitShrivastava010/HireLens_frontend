# HireLens — Frontend

<div align="center">
  <h3>AI-Powered Job Search & Career Management Platform</h3>
  <p>React 18 · Redux Toolkit · Material UI · Vite · Three.js</p>
</div>

---

## 📖 Overview

HireLens is an AI-powered career platform that helps developers and tech professionals find relevant jobs, track applications, build resumes, and measure ATS compatibility — all in one place.

This repository contains the **React frontend SPA** built with Vite, Redux Toolkit (RTK Query), and Material UI.

> **Backend repo:** [HireLens_backend](https://github.com/PranitShrivastava010/HireLens_backend)

---

## ✨ Features

### 🏠 Landing Page
- Animated hero section with Three.js visual effects
- Feature highlights and call-to-action

### 🔐 Authentication
- Register with email/password + OTP verification flow
- Login with persistent session via HTTP-only refresh token cookies
- Protected routes with auth guard — unauthenticated users redirect to login

### 🎯 Job Preference Onboarding
- First-time users complete a preference setup before accessing the job feed
- Select target **roles** (e.g., "Backend Developer") and **skills** (e.g., "Node.js", "React")
- Preferences persist and drive the personalized ranking algorithm

### 📋 Smart Job Feed
- Personalized, AI-ranked list of real job listings
- Search by keyword, filter by location, filter for remote roles
- Relevance score shown per job card
- Infinite scroll / pagination

### 📄 Job Details
- Full job description, company info, required skills
- Apply directly from the detail page
- ATS score check against your uploaded resume

### 📁 Application Tracker
- Track every job you've applied to with a status pipeline
- Update status (Applied → Interview → Offer / Rejected)
- Set interview dates per application
- View full application history

### 📊 Dashboard
- Weekly application goal progress bar
- Day-by-day activity chart for the current week
- Application pipeline breakdown by status
- Upcoming interviews panel
- Recent applications list

### 📝 Resume Builder
- Build your resume entirely in-app — no template files needed
- Sections: Basics, Work Experience, Education, Skills, Projects, Certifications
- Drag-and-drop reordering of experience entries
- Live structured preview

### 📈 ATS Score Calculator
- Upload your PDF resume once, use it for all ATS checks
- Run ATS analysis on any job to see your match score
- View matched and missing keywords with explanations

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| State Management | Redux Toolkit + RTK Query |
| UI Library | Material UI (MUI v5) |
| Routing | React Router v6 |
| Animations | Framer Motion / Motion One |
| 3D / Visual | Three.js |
| HTTP Client | Axios (via RTK Query base query) |
| Forms | Controlled components + local state |
| Build Tool | Vite |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- HireLens backend running locally or deployed ([backend repo](https://github.com/PranitShrivastava010/HireLens_backend))

### Installation

```bash
git clone https://github.com/PranitShrivastava010/HireLens_frontend.git
cd HireLens_frontend
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production, set this to your deployed backend URL:

```env
VITE_API_BASE_URL=https://your-api.vercel.app/api
```

### Development

```bash
npm run dev
```

The app starts at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
HireLens_frontend/
├── public/                      # Static assets
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component
│   ├── app/
│   │   └── store.js             # Redux store configuration
│   ├── routes/                  # Route definitions
│   │   ├── AuthGate.jsx         # Redirect logged-in users away from auth pages
│   │   └── ProtectedRoute.jsx   # Redirect unauthenticated users to login
│   ├── pages/                   # Page-level thin wrapper components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── JobFeedPage.jsx
│   │   ├── JobDetailPage.jsx
│   │   ├── ApplicationsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ResumeBuilderPage.jsx
│   ├── container/               # Smart components (data-fetching, state logic)
│   │   ├── JobFeedContainer.jsx
│   │   ├── ApplicationsContainer.jsx
│   │   ├── DashboardContainer.jsx
│   │   └── ResumeBuilderContainer.jsx
│   ├── component/               # Pure UI components
│   │   ├── common/              # Shared UI (buttons, cards, loaders, search bar)
│   │   ├── home/                # Landing page sections
│   │   ├── job/                 # Job card, list, detail, preferences UI
│   │   ├── resume builder/      # Individual resume section UIs
│   │   ├── stats/               # Application stats & chart components
│   │   └── layout/              # Sidebar, Navbar, Shell
│   ├── features/                # RTK Query API slices
│   │   ├── auth/                # authSlice, authApi (login, register, OTP, refresh)
│   │   ├── job/                 # jobApi (feed, details, fetch, preferences)
│   │   ├── application/         # applicationApi (apply, list, update)
│   │   └── resume/              # resumeApi (builder, ATS, upload)
│   └── services/                # Axios base configuration + RTK setup
└── package.json
```

---

## 🔐 Authentication Flow

1. User registers → OTP sent to email → user verifies OTP → access + refresh tokens issued
2. Access token stored in Redux state (in-memory)
3. Refresh token stored in HTTP-only cookie (handled by browser)
4. RTK Query base query automatically retries with refreshed token on 401
5. On logout, tokens are cleared and user is redirected to login

---

## 🎨 Design Principles

- **Material UI** for consistent, accessible component library
- **Framer Motion** for smooth page transitions and micro-animations
- **Three.js** for the immersive landing page hero experience
- Responsive layout — works on desktop and tablet
- Dark/light mode support (via MUI theming)

---

## 🚀 Coming Soon — Outreach Dashboard

A full outreach management UI is planned as part of the Smart Outreach System:
- Target company board
- Contact discovery and email pipeline
- LinkedIn connection tracking
- AI-generated outreach message editor

---

## 📄 License

ISC
