# Product Requirements Document (PRD)
**Project Name:** EMS & Semiconductor Consulting Agency Platform (B2B, B2C & Expert Network)  
**Version:** 2.0 (Next.js + Appwrite Stack Edition)  
**Date:** November 16, 2026  
**Target Market:** India (Primary) & Global Hardware/Semiconductor Ecosystems  

---

## 1. Executive Summary
A unified, full-stack consulting and operational delivery web application built with **Next.js (App Router)** and **Appwrite** for an **EMS (Electronics Manufacturing Services) and Semiconductor Consulting Agency**. 

The platform serves three distinct user groups:
1. **B2B Enterprise Clients:** EMS factories, OSAT/ATMP units, and hardware OEMs seeking Mass Production (MP) readiness, NPI-to-MP transitions, DFM/DFX audits, Six Sigma yield optimization, Industry 4.5/AI/Robotics shop-floor integration, and ISO 14644 cleanroom qualification.
2. **B2C Individual Buyers:** Hardware founders, solo inventors, and manufacturing engineers purchasing standardized engineering templates (PFMEA, Control Plans, DFM scorecards) or booking 1-on-1 paid advisory sessions.
3. **Associate Engineers (Expert Bench):** Experienced EMS and semiconductor specialists applying to join the agency's vetted talent pool for project-based execution.

---

## 2. User Roles & Appwrite RBAC Architecture

Role-Based Access Control (RBAC) is enforced using **Appwrite Auth**, **Appwrite Teams**, and **Document-Level Permissions**:

| Role | Appwrite Team / Auth Scope | Core Permissions & Capabilities |
| :--- | :--- | :--- |
| **Super Admin (Founder)** | `team:admins` | Full read/write access across all collections and buckets; vet associates; create B2B projects; assign associates; approve NDAs; manage calendar rules, refunds, and GST invoices. |
| **B2B Client User** | `team:clients` + `team:project_<id>` | Authenticated dashboard access; e-sign Mutual NDAs; schedule/reschedule/cancel meetings; pay audit & milestone invoices; upload/download confidential files in NDA-gated project vaults. |
| **B2C Customer** | Authenticated `users` | Purchase digital engineering templates; book, reschedule, or cancel 1-on-1 paid advisory sessions; download templates and GST invoices. |
| **Associate Engineer** | `team:associates` + `team:project_<id>` | Submit multi-step technical profile; sign Associate NDA upon approval; access assigned client SOWs; upload audit deliverables; log project milestones. |

---

## 3. Core Functional Requirements

### 3.1 Public Agency Portal & Lead Generation
* **Service Pillars Showcase:** Dedicated pages detailing core industrial capabilities:
  * *NPI-to-MP Readiness & DFM/DFX Audits* (Build plans, process flowcharts, PFMEA, Control Plans).
  * *Production Ramp-Up & Six Sigma Yield Optimization* (DMAIC, FPY improvement, SMT/FATP line balancing, OEE sprints).
  * *Industry 4.5, AI & Robotics Integration* (Cobots, AI-driven AOI/SPI defect tuning, predictive maintenance, SECS/GEM connectivity).
  * *World-Class Cleanroom & Facility Standards* (ISO 14644 Class 5–7 qualification, ANSI/ESD S20.20 compliance, OSAT/ATMP layout optimization).
* **Interactive Engineering Calculators (Lead Magnets):** Client-side Next.js tools (*SMT Line Tact-Time & OEE Calculator*, *Six Sigma DPMO/Yield Estimator*, *50-Point MP Readiness Scorecard*) gated behind business email capture before generating downloadable PDF summaries.
* **Case Studies & Proof Vault:** Filterable portfolio highlighting anonymized shop-floor results (e.g., cycle time reduction, First Pass Yield improvements).

### 3.2 B2C Marketplace & Micro-Consulting
* **Digital Template Store:** Instant purchase and secure download of standardized Excel/PDF engineering toolkits stored in Appwrite Storage (`b2c_templates`).
* **1-on-1 Paid Advisory Calls:** 30-minute or 60-minute video consultations for hardware founders and engineers with real-time slot locking and automated meeting link generation.

### 3.3 Associate Network ("Join Our Expert Bench")
* **Multi-Step Technical Application Form (`/join-bench`):**
  * *Step 1 (Profile):* Contact info, industrial hub city (Bengaluru, Chennai, Pune, Gujarat, etc.), years of experience, and travel willingness for on-site factory sprints.
  * *Step 2 (Domain Matrix):* Multi-select skill tags (SMT, FATP, OSAT/ATMP, ISO Cleanrooms, SECS/GEM, AI/AOI, Six Sigma Black Belt) and certifications (IPC-A-610, IPC-2221, PMP).
  * *Step 3 (Track Record & Rate):* Anonymized impact metric, LinkedIn URL, expected daily/hourly consulting rate, and PDF resume upload to `associate_resumes`.
* **Vetting Pipeline:** Admin moves applicants through `Applied` → `Screening Scheduled` → `Technical Vetted` → `NDA Signed` → `Active Bench`. Upon approval, the user is added to `team:associates`.

### 3.4 Online Meeting Scheduling & Cancellation Engine
* **Availability Management:** Admin configures working days, time slots (`Asia/Kolkata` IST default with auto-conversion), buffer times between meetings, and blackout dates.
* **Automated Video Conferencing:** Appwrite Function (`onAppointmentCreated`) triggers Google Calendar API to generate a Google Meet link and dispatches `.ics` calendar invites via email.
* **Self-Serve Reschedule & Cancellation Rules:**
  * Users can reschedule or cancel via their dashboard or a secure tokenized link.
  * **Policy Enforcement:** Free rescheduling or 100% refund/credit if cancelled **>24 hours** before the scheduled start time. Cancellations within 24 hours forfeit the booking fee (or deduct a configurable cancellation fee), enforced via a Next.js API route (`/api/meetings/cancel`) linked to Razorpay Refunds.

### 3.5 Payments & Indian GST Compliance
* **Payment Gateway:** **Razorpay** integration supporting UPI, NetBanking, Indian Credit/Debit Cards, and International Cards (with optional Stripe fallback for global OEMs).
* **Checkout & Billing Flows:**
  * *B2C:* 100% upfront payment for templates and 1-on-1 calls.
  * *B2B:* Fixed-fee upfront checkout for 3-to-5-day On-Site Diagnostic Audits, plus milestone-based payment links (e.g., 40% Kickoff, 30% Mid-Audit, 30% Final Sign-off) for multi-week SOWs.
* **Automated GST Invoicing:** Appwrite Function (`generateGstInvoice`) generates compliant PDF tax invoices stored in `generated_invoices` using SAC codes (`998313` / `998349`):
  * Intra-state (Karnataka): `9% CGST + 9% SGST`.
  * Inter-state (Rest of India): `18% IGST`.
  * International Export (under LUT): `0% IGST`.

### 3.6 NDA-Gated Secure File Sharing Vault
* **Strict NDA Gate:** Both frontend UI and Next.js server routes verify `project.ndaSigned === true` before permitting uploads or downloads in `client_vault`.
* **Supported Formats & Limits:** Encrypted storage supporting `.zip`, `.gbr` (Gerber), `.step`/`.iges` (CAD), `.xlsx` (BOMs), and `.pdf` up to **500MB** per file.
* **Security & Immutable Audit Trail:**
  * Appwrite Storage encryption at rest + TLS 1.3 in transit.
  * Isolated per-project permissions (`team:project_<id>` and `team:admins`).
  * Every upload, preview, and download routes through `/api/vault/...` to log `userId`, `fileId`, `projectId`, `action`, `ipAddress`, and `timestamp` into an append-only `audit_logs` collection.

---

## 4. Dashboard Specifications

### 4.1 Client Dashboard (`/dashboard/client`)
* **Project Progress Tracker:** Visual timeline displaying active SOW phases (e.g., *DFM Audit* → *Line Balancing* → *MP Sign-Off*) and completion percentage.
* **Legal & NDA Center:** One-click digital acceptance/e-signature for Mutual NDAs and Statements of Work with downloadable executed PDFs.
* **Engineering Data Room (File Vault):** Structured folders (`01_Client_Inputs`, `02_Audit_Findings`, `03_Final_Deliverables`) with drag-and-drop upload, file version tracking, and comment notes.
* **Meetings & Schedule:** Upcoming calls with "Join Meeting" links and one-click "Reschedule / Cancel" buttons.
* **Billing & GST Invoices:** View paid and pending milestone invoices, trigger Razorpay milestone payments, and download GST tax PDFs.

### 4.2 Associate Dashboard (`/dashboard/associate`)
* **Profile & Compliance Status:** View vetting status, update availability/daily rate, and sign the Associate Mutual NDA.
* **Assigned Projects:** View assigned client SOW scope (with sensitive client identities masked until NDA execution), upload draft audit reports for Admin review, and mark assigned tasks complete.

### 4.3 Admin Dashboard (`/admin`)
* **Executive Overview:** Real-time metrics for B2B pipeline value, B2C digital/call revenue, active factory projects, and associate bench utilization.
* **Lead & CRM Pipeline:** View leads captured from OEE/MP calculators and convert qualified leads into B2B Client workspaces.
* **Project & SOW Manager:** Create client workspaces, generate `team:project_<id>`, define payment milestones, assign vetted associates, and approve associate deliverables before releasing them to the client folder.
* **Associate Bench Directory:** Filter applicants by skill tag, city, certification, and daily rate; approve/reject applications and trigger Associate NDA workflows.
* **Vault Security & Audit Monitor:** Inspect file storage usage and immutable download/upload audit logs across all client data rooms; revoke user access immediately if needed.
* **Calendar & Finance Controls:** Set scheduling availability, process Razorpay refunds for cancelled meetings, and issue custom B2B payment links.

---

## 5. Appwrite Database & Storage Schema (`consulting_db`)

### 5.1 Database Collections
1. **`users_profile`:** `userId` (string), `name` (string), `email` (string), `phone` (string), `role` (enum: `client`, `associate`, `b2c`), `company` (string), `gstin` (string), `stateCode` (string).
