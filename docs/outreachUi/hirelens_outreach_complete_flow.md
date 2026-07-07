# HireLens Smart Outreach System: Complete End-to-End Flow

This document details the complete architecture and user workflow for the HireLens Smart Outreach System. It is divided into two primary subsystems: **LinkedIn Discovery** (for finding contacts) and **Email Outreach** (for engaging them).

---

## Part 1: LinkedIn Discovery Flow

The LinkedIn Discovery system utilizes a Chrome Extension working in tandem with the HireLens backend to automate the tedious process of finding relevant contacts (recruiters, engineers, hiring managers) at your target companies.

### 1. Target Company Setup
1. **Frontend Action:** The user adds a "Target Company" (e.g., Google, Meta) to their outreach dashboard. 
2. **Backend Storage:** Saved in the `TargetCompany` table. The backend can also auto-detect target companies based on the jobs the user has interacted with.

### 2. Creating a Discovery Queue
1. **User Action:** The user selects one or more Target Companies and chooses which types of contacts they want to find (e.g., Recruiters, Hiring Managers, Engineers). They click "Start Discovery".
2. **Backend Action (`POST /api/outreach/discovery-queues`):**
   - Creates an `OutreachDiscoveryQueue`.
   - Generates individual `OutreachDiscoveryTask` rows for each company-role combination. Each task contains a pre-built LinkedIn search URL (e.g., searching for "Google Recruiter" on LinkedIn).

### 3. Extension Execution (The Chrome Extension)
The HireLens Chrome Extension acts as the automation engine running on the user's browser, utilizing their active LinkedIn session.

1. **Fetch Task:** The extension polls the backend (`GET /discovery-queues/:id/next`) to get the next pending task.
2. **Execute Search:** The extension automatically opens a new background tab and navigates to the LinkedIn search URL provided by the task.
3. **Capture Data:** The extension scrapes the LinkedIn search results, extracting names, roles, profile URLs, and current companies.
4. **Send to Backend:** The extension sends the scraped data back to the server (`POST /discovery-queues/tasks/:taskId/capture`).

### 4. Contact Saving
1. **Backend Processing:** The backend receives the scraped profiles.
2. **Storage:** Saves them as `OutreachContact` rows linked to the `TargetCompany`.
3. **Status:** The contacts are initialized with `linkedinStatus = DISCOVERED` and `outreachStatus = PENDING`.

*(Future Expansion: The extension can be instructed to navigate to a specific contact's profile and auto-send a connection request using an AI-generated connection note.)*

---

## Part 2: Email Outreach Flow

Once contacts are discovered (or manually added), the Email Outreach system handles automated, staggered cold-email campaigns using the user's own personal Gmail account (via SMTP App Passwords) and BullMQ for precise scheduling.

### 1. User Setup (Connecting Email)
Before a user can launch a campaign, they must authorize HireLens to send emails on their behalf.

1. **User Input:** The user provides their `Email Address` and a `16-digit Google App Password` in the HireLens dashboard.
2. **Backend Security:** The backend encrypts the App Password using Node's `crypto` module (AES-256-GCM).
3. **Storage:** The backend saves the email to `User.outreachEmail` and the encrypted password to `User.outreachAppPassword`.

### 2. Campaign Creation
The user selects a list of contacts and drafts their outreach messaging.

1. **User Input:** User provides the subject, initial message, an optional follow-up message, and the list of target email addresses.
2. **Backend Action (`POST /api/outreach/email/campaigns`):**
   - Validates the payload using Zod.
   - Verifies the user has configured their SMTP credentials.
3. **Database Transaction:**
   - Creates an `EmailOutreachCampaign` (status: `ACTIVE`).
   - Uses `createMany` to generate an `EmailOutreachRecipient` row for each email address (status: `PENDING`).
4. **Queueing:**
   - Adds a "send-email" job to the **BullMQ** `email-sender-queue` for every recipient created.

### 3. The Sending Queue (BullMQ Worker)
BullMQ runs as a background worker process, handling rate limits, retries, and actual email dispatch.

1. **Pickup:** A BullMQ worker picks up a pending email job.
2. **Daily Limit Check (Redis):**
   - Checks a Redis counter (`outreach_limit:USER_ID:DATE`) to ensure the user hasn't exceeded the strict limit of **15 emails per day**.
   - If limit reached: The job is delayed by 24 hours and re-queued.
   - If under limit: The counter is incremented.
3. **Decryption & Sending:**
   - The worker decrypts the `User.outreachAppPassword`.
   - Connects to `smtp.gmail.com` via Nodemailer.
   - Sends the initial email.
4. **Update DB:** Updates recipient status to `INITIAL_SENT` and logs the `initialSentAt` timestamp.
5. **Schedule Follow-up:** If the campaign includes a follow-up message, the worker adds a *new* job to the BullMQ queue with a strict delay of exactly 7 days (`delay: 7 * 24 * 60 * 60 * 1000`).

### 4. Reply Detection (MVP)
Because the system uses SMTP rather than the Gmail API, it does not automatically read the user's inbox to detect replies. This is handled manually.

1. **User Action:** When a user receives a reply in their Gmail inbox, they go to the HireLens dashboard and click "Mark as Replied" next to that contact.
2. **Backend Action (`PUT /api/outreach/email/recipients/:id/replied`):** Updates the recipient status to `REPLIED`.

### 5. The Follow-Up Queue (7 Days Later)
Exactly 7 days after the initial email, BullMQ wakes up the delayed follow-up job.

1. **Verification Check (Crucial):**
   - The worker fetches the recipient from the database.
   - **If status is `REPLIED` or `STOPPED`:** The user received a reply. The worker immediately exits and does nothing.
   - **If status is still `INITIAL_SENT`:** The worker proceeds.
2. **Daily Limit Check:** Validates the 15-email Redis limit for today.
3. **Decryption & Sending:** Decrypts password, connects via Nodemailer, and sends the follow-up email.
4. **Update DB:** Updates recipient status to `FOLLOWUP_SENT`. The outreach sequence is complete.
