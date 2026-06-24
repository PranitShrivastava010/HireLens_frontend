# HireLens Outreach — UI Design Mockups

> All designs match the existing HireLens design system: `#0a0f16` background, `#1A1E2C` sidebar, glassmorphism cards, `#6c4cff` purple + `#27C4D6` cyan accents, `Heading`/`MyFont` custom fonts, framer-motion animations.

---

## Design System Reference

Extracted from your existing codebase:

| Token | Value | Used In |
|-------|-------|---------|
| Background | `#0a0f16` | `.app-background` |
| Sidebar | `#1A1E2C` | `Sidebar.jsx` Drawer |
| Primary Accent | `#6c4cff` | Buttons, charts, active states |
| Cyan Accent | `#27C4D6` | Logo, active icons, glow effects |
| Card BG | `rgba(255,255,255,0.10)` → `rgba(255,255,255,0.03)` gradient | `.glass-card` |
| Card Border | `rgba(255,255,255,0.16)` | `.glass-card` |
| Card Hover Border | `rgba(0,220,255,0.35)` | `.glass-card:hover` |
| Text Primary | `#fff` | All headings |
| Text Secondary | `rgba(255,255,255,0.6)` | Subtitles, labels |
| Text Muted | `rgba(255,255,255,0.5)` | Captions, timestamps |
| Heading Font | `"Heading"` (Clash Display) | Titles, buttons |
| Body Font | `"MyFont"` (Plus Jakarta Sans) | Body text |
| Card Radius | `16px` | `.glass-card` |
| Button Radius | `8px` / `12px` | `CommonButton`, sidebar items |
| Animation | Framer Motion `whileHover: scale(1.05)`, `whileTap: scale(0.97)` | Buttons, cards |
| Film Grain | SVG fractalNoise overlay | `.app-background::after` |
| Glow Pulse | `@keyframes glowPulse` on cyan | Active sidebar icons |

### Status Color Palette (New for Outreach)

| Status | Color | Context |
|--------|-------|---------|
| `DISCOVERED` | `#6b7280` (gray) | New contact, no action taken |
| `CONNECTION_NOTE_READY` | `#27C4D6` (cyan) | AI note generated, ready to connect |
| `CONNECTION_SENT` | `#f59e0b` (amber) | Waiting for acceptance |
| `CONNECTION_ACCEPTED` | `#22c55e` (green) | They accepted! |
| `CONNECTION_DECLINED` | `#ef4444` (red) | Declined or expired |
| `DM_READY` | `#27C4D6` (cyan) | DM generated, ready to send |
| `DM_SENT` | `#6c4cff` (purple) | Message delivered |
| `REPLIED` | `#22c55e` (green) | They responded |
| `EMAIL_ONLY` | `#3b82f6` (blue) | No LinkedIn, email channel |

---

## Page 1 — Outreach Dashboard

The main morning overview page. Shows email stats, connection request batches, pending connections, and DMs ready for accepted contacts.

![Outreach Dashboard — Morning overview with emails sent, connection request batches, pending connections tracker, and DMs ready for accepted contacts](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_dashboard_1781081786128.png)

### Key Elements
- **3 stat cards** at the top: Emails Sent, Connections Pending, DMs Ready
- **Connection Requests section**: Grouped by company with "Start Batch ▶" buttons
- **DMs Ready section**: Only shows contacts who accepted connection requests
- **Pending Connections table**: Shows each contact's wait status with timestamps

### Implementation Notes
- Uses `MotionCard` (framer-motion wrapped `CommonCard`) with `fadeInOut` variants
- `Grid` layout from MUI matching existing `DashboardComponent.jsx` patterns
- Stat cards use colored left-border accent (same as existing status colors)

---

## Page 2 — Target Companies

Company management page where users add/import target companies and see outreach progress per company.

![Target Companies — Grid of company cards with contact counts, connection stats, active job postings, and status badges](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_companies_1781081903847.png)

### Key Elements
- **Action buttons**: "Add Company" (purple filled) + "Auto-Detect from Jobs" (cyan outlined)
- **Filter pills**: All / Active / Paused / Completed with counts
- **Company cards**: Glass cards with logo avatar, domain, stat badges, status, and active job count
- **Stat badges**: Tiny colored pills showing "5 contacts" / "3 connected" / "2 emails"

### Implementation Notes
- Card grid uses `Grid container spacing={3}` with `size={{ xs: 12, sm: 6, md: 4 }}`
- Company logos use `Avatar` with first letter + company brand color
- Filter pills use `Chip` component with `onClick` and active state via purple bg
- "Auto-Detect" pulls unique companies from the existing `Jobs` table

---

## Page 3 — Contacts List

Data table showing all discovered contacts with their LinkedIn lifecycle status, channels available, and company info.

![Contacts List — Filterable table with avatar, name, role, company, channel icons, LinkedIn status badges with lifecycle colors, and timestamps](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_contacts_1781081916063.png)

### Key Elements
- **Filter row**: Company dropdown, Contact Type dropdown, LinkedIn Status dropdown, Search bar
- **Contact rows**: Avatar + Name + Role + Company + Channel icons + Status badge + Timestamp + Actions
- **Channel icons**: LinkedIn (blue) and Email (green/gray) availability indicators
- **Status badges**: Color-coded pills matching the `LinkedinStatus` enum lifecycle
- **Three-dot menu**: View Profile, Edit, Regenerate Note, Skip Contact

### Implementation Notes
- Table uses `Box` with `border: 1px solid rgba(255,255,255,0.05)` per row
- Avatar uses `Avatar` from MUI with `bgcolor: rgba(108,76,255,0.1)`
- Status badges use the status color palette defined above
- Hover state: `bgcolor: rgba(255,255,255,0.08)` matching existing `DashboardComponent` pattern

---

## Page 4 — LinkedIn Batch Sender

The core LinkedIn outreach page with two tabs: Connections (Phase 1) and DMs (Phase 2).

![LinkedIn Batch Sender — Connections tab showing ready batches by company with progress bars, pending connections list with acceptance status, safety mode indicator](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_linkedin_batch_1781081937033.png)

### Key Elements
- **Tab toggle**: 🔗 Connections / 💬 DMs with active underline
- **Ready to Connect**: Company batches with progress bars and "Start Batch ▶"
- **Pending Connections**: Contact list with days elapsed, acceptance highlights (green glow on accepted rows), expiry warnings (amber)
- **Check Acceptances button**: Opens LinkedIn My Network for extension to check
- **Safety indicator banner**: Shows daily limit, sent count, remaining — green when safe

### Implementation Notes
- Tab component: two `Button` components with active underline border
- Progress bars: MUI `LinearProgress` with custom colors
- Accepted row: `border: 1px solid rgba(34,197,94,0.3)` + `bgcolor: rgba(34,197,94,0.05)`
- Safety banner: Fixed bottom card with green dot indicator

---

## Page 5 — Message Center

Split-panel view for reviewing, editing, and approving AI-generated messages before they're sent.

![Message Center — Split panel with message list on left showing drafts/sent/replied filters, and full message preview on right with approve/edit/regenerate/skip action buttons](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_message_preview_1781082001544.png)

### Key Elements
- **Filter tabs**: All / Drafts / Approved / Sent / Replied with counts
- **Left panel (40%)**: Scrollable message list with contact info, channel badge, status
- **Right panel (60%)**: Full message preview with recipient info, subject line, message body
- **Action bar**: Approve (green), Edit (white outline), Regenerate (cyan), Skip (red/muted)
- **AI attribution**: "Generated by Llama 3.3 70B via Groq" in muted text

### Implementation Notes
- Split layout: `Box display="flex"` with left `width: 40%` and right `width: 60%`
- Selected message: left border glow `borderLeft: 3px solid #6c4cff`
- Message body: `TextField multiline` with dark styling matching existing Dialog patterns
- Regenerate calls your existing Groq API integration

---

## Page 6 — Outreach Analytics

Performance tracking with funnel metrics, charts, and per-company breakdowns.

![Outreach Analytics — Four stat cards with trends, email performance bar chart, connection funnel visualization, and company performance comparison table](C:\Users\DELL\.gemini\antigravity\brain\35c87db1-aa74-4a5d-abf4-9038579151df\outreach_analytics_1781082015426.png)

### Key Elements
- **4 stat cards**: Emails Sent, Emails Opened, Connections Sent, Replies — each with trend indicator
- **Email Performance chart**: Bar chart (Recharts) matching existing `WeeklyActivity` chart style
- **Connection Funnel**: Horizontal bar funnel: Discovered → Sent → Accepted → DM'd → Replied
- **Company Performance table**: Per-company metrics with color-coded accept rates

### Implementation Notes
- Charts use `Recharts` (already in your stack) with the same styling from `DashboardComponent`:
  - `barGradient` from `#6c4cff` to `#6c4cff` at 0.4 opacity
  - Dark tooltip: `backgroundColor: "#1e1e1e"`, no border, `borderRadius: "8px"`
  - Grid: `strokeDasharray="3 3"`, `stroke="rgba(255,255,255,0.1)"`
- Funnel chart: Custom horizontal bars using `Box` components with percentage widths
- Table: Same row styling as Contacts page

---

## Navigation: Sidebar Addition

Add "Outreach" as a new sidebar item with sub-navigation:

```jsx
// Add to menuItems array in your layout container
{
  label: "Outreach",
  icon: "linkedin",    // Already mapped to LinkedInIcon in Sidebar.jsx
  path: "/outreach",
  children: [
    { label: "Dashboard", path: "/outreach" },
    { label: "Companies", path: "/outreach/companies" },
    { label: "Contacts", path: "/outreach/contacts" },
    { label: "Messages", path: "/outreach/messages" },
    { label: "LinkedIn", path: "/outreach/linkedin" },
    { label: "Analytics", path: "/outreach/analytics" },
  ]
}
```

> [!TIP]
> The `LinkedInIcon` is already imported in your `Sidebar.jsx` and mapped to the `"linkedin"` key. The sidebar already supports this icon.

---

## Responsive Considerations

| Breakpoint | Layout Change |
|-----------|--------------|
| `md+` (960px+) | Full sidebar + grid layouts as shown |
| `sm` (600-960px) | Collapsible sidebar, 2-column grids become 1-column, split panels stack vertically |
| `xs` (<600px) | Hidden sidebar with hamburger menu, single column, bottom action bar on message preview |
