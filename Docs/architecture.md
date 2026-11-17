# Technical Architecture --- Next.js + TypeScript + Appwrite

**Document type:** Software architecture specification\
**Application:** Industrial Consultancy Agency Platform\
**Frontend / web application:** Next.js + TypeScript\
**Backend platform:** Appwrite (Auth, Databases, Storage, Functions,
Messaging as required)\
**Status:** Production-oriented reference architecture\
**Version:** 1.0

------------------------------------------------------------------------

## 1. Architecture objectives

The architecture should provide:

-   A fast, search-friendly public website.
-   A secure internal administration experience.
-   A clear boundary between public browser code and privileged server
    operations.
-   Appwrite-backed authentication, persistence, file storage, and
    event-driven tasks.
-   Strong authorization at both application and data layers.
-   A modular codebase that can grow from a founder-led consultancy into
    a multi-user agency.
-   Predictable local, staging, and production environments.

### Architectural principles

1.  **Server-first:** use Next.js Server Components for read-heavy pages
    and server-side operations where appropriate.
2.  **Least privilege:** default-deny access; grant only the permissions
    needed.
3.  **No trusted browser input:** validate and authorize every mutation
    on the server.
4.  **Single source of truth:** Appwrite stores business records; avoid
    duplicating authoritative state in browser storage.
5.  **Explicit boundaries:** keep UI, application services, data access,
    and external integrations separate.
6.  **Incremental complexity:** begin with a modular monolith; introduce
    additional services only when justified.
7.  **Secure by default:** no public access to internal collections or
    confidential storage.
8.  **Observable operations:** structured logs, error reporting, audit
    events, backups, and restore testing.

## 2. System context

``` mermaid
flowchart TB
    Visitor[Public Visitor / Prospective Client]
    Staff[Agency Staff / Administrator]
    Browser[Browser]
    Next[Next.js Application]
    Appwrite[Appwrite Platform]
    Auth[Appwrite Auth]
    DB[Appwrite Databases]
    Storage[Appwrite Storage]
    Functions[Appwrite Functions]
    Mail[Email Provider]
    Analytics[Privacy-aware Analytics]
    Monitor[Error and Performance Monitoring]

    Visitor --> Browser
    Staff --> Browser
    Browser --> Next
    Next --> Auth
    Next --> DB
    Next --> Storage
    Next --> Functions
    Functions --> Mail
    Browser --> Analytics
    Next --> Monitor
```

### Main components

  -----------------------------------------------------------------------
  Component                           Responsibility
  ----------------------------------- -----------------------------------
  Browser                             Render UI, collect user input,
                                      maintain non-sensitive interface
                                      state

  Next.js                             Routing, rendering, server-side
                                      validation, authorization,
                                      application services

  Appwrite Auth                       Staff identity and session
                                      lifecycle

  Appwrite Databases                  Content, enquiries, leads,
                                      projects, tasks, audit records

  Appwrite Storage                    Private project and business
                                      documents; public media only when
                                      intentionally published

  Appwrite Functions                  Asynchronous notifications,
                                      scheduled jobs, integrations, and
                                      event processing

  Email provider                      Transactional acknowledgement and
                                      internal notifications

  Analytics                           Aggregate website and conversion
                                      measurement, subject to
                                      consent/legal requirements

  Monitoring                          Error tracking, performance
                                      monitoring, and alerting
  -----------------------------------------------------------------------

## 3. Recommended deployment topology

``` mermaid
flowchart LR
    User[User Browser]
    CDN[CDN / Edge / WAF]
    Web[Next.js Hosting]
    Appwrite[Appwrite Cloud or Self-hosted]
    DB[(Appwrite Database)]
    Bucket[(Appwrite Storage)]
    Fn[Appwrite Functions]
    Email[Transactional Email]

    User --> CDN --> Web
    Web --> Appwrite
    Appwrite --> DB
    Appwrite --> Bucket
    Appwrite --> Fn
    Fn --> Email
```

Recommended initial approach:

-   Deploy Next.js to a managed platform that supports the chosen
    Next.js rendering features.
-   Use Appwrite Cloud for the initial release unless there is a
    concrete need and operational capability to self-host.
-   Select a data region based on customer commitments, applicable law,
    latency, and provider availability.
-   Put a CDN/WAF or equivalent edge protection in front of the public
    application.
-   Use separate Appwrite projects for development, staging, and
    production.
-   Do not assume that a Next.js edge runtime can use every Appwrite
    server SDK or Node.js dependency. Use a Node.js runtime for server
    routes that require Node-compatible SDK behavior, or use supported
    REST APIs where appropriate.

The exact hosting provider, Appwrite plan, region, and runtime must be
confirmed before deployment.

## 4. Next.js application architecture

### 4.1 Rendering strategy

  -----------------------------------------------------------------------
  Route type              Recommended strategy    Reason
  ----------------------- ----------------------- -----------------------
  Home, about, industry,  Static generation or    SEO and performance
  service pages           cached server rendering 

  Published insights      Static generation with  Fast public content
                          controlled revalidation 

  Contact/enquiry form    Server Action or Route  Server validation and
                          Handler                 controlled mutation

  Admin dashboard         Authenticated dynamic   Private, user-specific
                          rendering               data

  Lead/project detail     Authenticated dynamic   Authorization and
                          rendering               current records

  Preview/draft content   Authenticated server    Never expose drafts
                          rendering               publicly

  File download           Authorized server route Permission checks
                          or secure Appwrite      
                          access flow             
  -----------------------------------------------------------------------

Use the current supported Next.js release and pin dependencies through a
lockfile. Revalidate cached public content after authorized publishing
actions. Do not cache personalized admin responses in a shared cache.

### 4.2 Route structure

Suggested App Router structure:

``` text
src/
  app/
    (marketing)/
      page.tsx
      about/page.tsx
      industries/
        page.tsx
        [slug]/page.tsx
      services/
        page.tsx
        [slug]/page.tsx
      solutions/page.tsx
      insights/
        page.tsx
        [slug]/page.tsx
      contact/page.tsx
      privacy/page.tsx
      terms/page.tsx
    (auth)/
      admin-login/page.tsx
    (admin)/
      admin/
        layout.tsx
        page.tsx
        enquiries/page.tsx
        enquiries/[id]/page.tsx
        projects/page.tsx
        projects/[id]/page.tsx
        services/page.tsx
        insights/page.tsx
        users/page.tsx
        settings/page.tsx
    api/
      health/route.ts
      webhooks/
        appwrite/route.ts
  components/
    marketing/
    admin/
    forms/
    shared/
    ui/
  features/
    auth/
    content/
    enquiries/
    leads/
    projects/
    documents/
    audit/
  lib/
    appwrite/
    auth/
    validation/
    security/
    email/
    env/
  types/
  middleware.ts
```

This is a suggested structure, not a requirement to create every folder
immediately. Keep domain-specific logic inside its feature module.

### 4.3 Component boundaries

-   Server Components are the default for page composition and data
    reads.
-   Client Components are used only where browser interaction is needed
    (form state, dialogs, tables with interactive controls).
-   Do not pass Appwrite server clients, API keys, secrets, or
    privileged data-access objects to Client Components.
-   Do not rely on hidden buttons or route middleware as the only
    authorization mechanism.
-   Keep reusable form schemas and domain types outside presentation
    components.

## 5. Appwrite integration

### 5.1 Appwrite services

  -----------------------------------------------------------------------
  Appwrite capability                 Use
  ----------------------------------- -----------------------------------
  Auth                                Staff accounts, sessions, password
                                      recovery, optional MFA

  Databases                           Published content and internal
                                      business records

  Storage                             Publicly approved media and private
                                      business documents

  Functions                           Email notifications, webhooks,
                                      scheduled maintenance, integrations

  Messaging                           Optional managed messaging channel
                                      where supported and appropriate

  Teams                               Optional grouping of
                                      staff/partners; application roles
                                      still require explicit policy
  -----------------------------------------------------------------------

Check current Appwrite documentation for the selected SDK/API version,
feature availability, quotas, and permission semantics before
implementation.

### 5.2 Project and environment separation

Create separate Appwrite projects:

-   `agency-dev`
-   `agency-staging`
-   `agency-production`

Each project must have its own endpoint, project ID, database IDs,
bucket IDs, function IDs, and secrets. Never use production credentials
in local development.

Use environment variables:

``` bash
# Public values; safe to expose to the browser if required by the SDK
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=

# Server-only values
APPWRITE_API_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_PUBLIC_MEDIA_BUCKET_ID=
APPWRITE_PRIVATE_DOCUMENTS_BUCKET_ID=

# Application configuration
APP_URL=
SESSION_COOKIE_NAME=
EMAIL_FROM=
EMAIL_PROVIDER_API_KEY=
TURNSTILE_SECRET_KEY=
```

The Appwrite endpoint and project ID are generally public configuration,
but API keys and provider secrets are not. Do not prefix secrets with
`NEXT_PUBLIC_`. Validate required variables at startup and fail safely
if production configuration is incomplete.

### 5.3 Client separation

Use separate Appwrite client factories:

1.  **Browser client:** initialized with public endpoint and project ID;
    used only for operations intentionally allowed to the signed-in user
    under Appwrite permissions.
2.  **Server session client:** initialized per request with the user's
    session credential/cookie where supported; used for user-scoped
    server operations.
3.  **Privileged server client:** initialized with a server-only API key
    for narrowly defined administrative or trusted operations.

Do not share a user session client across requests. Do not use a
privileged API-key client to perform routine operations that should be
authorized as the user. If a privileged operation is necessary, enforce
the user's role and record an audit event before using the elevated
client.

Illustrative server-only setup (adapt to the installed Appwrite SDK and
current SSR guidance):

``` ts
// src/lib/appwrite/server.ts
import "server-only";
import { Client, Account, Databases } from "node-appwrite";

export function createSessionClient(sessionSecret: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession(sessionSecret);

  return {
    account: new Account(client),
    databases: new Databases(client),
  };
}
```

The exact session API and cookie flow can change between Appwrite SDK
versions. Follow the current Appwrite SSR authentication guide, use
secure cookies, and test session renewal and logout. The snippet is
illustrative, not a complete authentication implementation.

### 5.4 Authentication and session flow

Recommended staff sign-in flow:

1.  User submits credentials to a server endpoint or supported Appwrite
    authentication flow.
2.  Appwrite authenticates the user and returns the appropriate session
    material.
3.  The server sets a secure, HTTP-only, same-site cookie according to
    Appwrite's SSR integration guidance.
4.  Each protected request resolves the current user from the session.
5.  The server loads or verifies the user's internal role and account
    status.
6.  The server authorizes the requested operation.
7.  Logout invalidates the Appwrite session and clears the cookie.

Cookie requirements:

-   `Secure` in production.
-   `HttpOnly`.
-   Appropriate `SameSite` setting.
-   Narrow path and suitable lifetime.
-   No session tokens in localStorage, sessionStorage, URLs, or logs.

Consider MFA for privileged users. Disable public self-registration for
the admin area unless a deliberate onboarding workflow exists. Staff
accounts should be provisioned by an authorized administrator.

## 6. Authorization model

### 6.1 Core rule

Authorization must be checked in two places:

-   Application layer: server verifies identity, active status, role,
    and requested action.
-   Appwrite layer: database document and storage permissions prevent
    unauthorized access even if an endpoint is called directly.

Never trust a role, user ID, owner ID, or permission list supplied by
the browser.

### 6.2 Role permissions matrix

  ------------------------------------------------------------------------------------------
  Capability            Super        Admin      Sales   Consultant         Editor    Partner
                        Admin                                                     
  ---------------- ---------- ------------ ---------- ------------ -------------- ----------
  Manage platform         Yes      Limited         No           No             No         No
  settings                                                                        

  Manage staff            Yes      Limited         No           No             No         No
  roles                                                                           

  View all                Yes          Yes        Yes     Assigned             No         No
  enquiries                                                   only                

  Assign leads            Yes          Yes   Assigned           No             No         No
                                                scope                             

  Update lead             Yes          Yes        Yes      Limited             No         No
  stage                                                                           

  View assigned           Yes          Yes   Assigned     Assigned             No     Shared
  projects                                      scope        scope                     scope

  Manage all              Yes          Yes    Limited           No             No         No
  projects                                                                        

  Manage                  Yes          Yes         No           No            Yes         No
  services/pages                                                                  

  Publish content         Yes          Yes         No           No   Policy-based         No

  Access project          Yes          Yes   Explicit     Explicit             No   Explicit
  documents                                     scope        scope                    shared
                                                                                       scope

  View audit log          Yes   Authorized         No           No             No         No
  ------------------------------------------------------------------------------------------

The matrix is a business policy starting point. Confirm the final roles
and access boundaries before creating Appwrite permissions.

### 6.3 Permission strategy

-   Public content: public read only after publication; writes
    restricted to trusted server/admin workflows.
-   Enquiries: no public read; creation only through a validated
    server-side workflow or tightly constrained create permission.
-   Leads: internal access only; scope by assigned staff/team as
    required.
-   Projects: assigned team and authorized administrators only.
-   Documents: private by default; grant access to explicitly authorized
    users or teams.
-   Audit events: append-only from trusted server workflows; read
    restricted to authorized administrators.

Avoid broad collection-level read/write grants for internal records.
Where document-level permissions are used, ensure every created document
receives the intended permissions. Test the behavior with real
low-privilege accounts.

## 7. Data architecture

Use Appwrite Databases with collections and documents. Choose collection
attributes, indexes, required fields, size limits, and relationships
based on actual query patterns and current Appwrite limits. Use stable
application-generated IDs or Appwrite document IDs consistently.

### 7.1 Recommended collections

  -----------------------------------------------------------------------
  Collection              Purpose                 Public access
  ----------------------- ----------------------- -----------------------
  `users`                 Internal profile and    None
                          role metadata linked to 
                          Auth user ID            

  `industries`            Industry landing page   Read published only
                          content                 

  `services`              Consultancy service     Read published only
                          catalogue               

  `pages`                 Managed static pages    Read published only

  `articles`              Technical insights      Read published only

  `enquiries`             Incoming contact and    No public read
                          consultation requests   

  `leads`                 Qualification and sales No public access
                          pipeline records        

  `lead_notes`            Internal notes and      No public access
                          follow-up records       

  `projects`              Approved client         No public access
                          engagements             

  `project_members`       Project-to-user access  No public access
                          mapping                 

  `tasks`                 Project tasks and       No public access
                          assignments             

  `milestones`            Project delivery        No public access
                          checkpoints             

  `documents`             Metadata for uploaded   No public access
                          business files          

  `audit_events`          Security and business   No public access
                          audit trail             

  `site_settings`         Controlled public       Read selected values
                          configuration           only
  -----------------------------------------------------------------------

Avoid storing the same information in multiple collections unless there
is a defined consistency strategy. Store references such as `leadId`,
`projectId`, and `userId` rather than copying large nested objects.

### 7.2 Example document fields

**users** - `authUserId` (string, unique) - `displayName` (string) -
`email` (string) - `role` (enum/string) - `teamIds` (array, if supported
and justified) - `status` (`active`, `invited`, `disabled`) -
`createdAt`, `updatedAt`

**services** - `title`, `slug`, `summary`, `description` - `industryIds`
(array of IDs or relation documents) - `problemStatements` (array) -
`activities` (array) - `deliverables` (array) - `status` (`draft`,
`published`, `archived`) - `publishedAt`, `authorId` - `seoTitle`,
`seoDescription`

**enquiries** - `name`, `businessEmail`, `company` - `jobTitle`
(optional) - `country`, `location` - `industryId`, `serviceId` -
`problemDescription` - `preferredContactMethod` - `consentAccepted`,
`privacyNoticeVersion` - `sourcePath`, `submittedAt` - `status`,
`assignedTo` (internal workflow fields, not client-controlled)

**leads** - `enquiryId` - `company`, `primaryContact` - `industryId`,
`serviceIds` - `stage`, `priority`, `ownerId` - `nextFollowUpAt` -
`qualificationSummary` - `createdAt`, `updatedAt`

**projects** - `projectCode`, `title`, `clientName` - `leadId`
(optional) - `scopeSummary`, `deliverables` - `ownerId`, `memberIds` -
`status`, `startDate`, `targetEndDate` - `createdAt`, `updatedAt`

**audit_events** - `actorUserId` - `action` - `entityType`, `entityId` -
`timestamp` - `requestId` - `metadata` (allowlisted, non-secret fields
only)

These are logical fields. Confirm Appwrite attribute types, maximum
lengths, indexes, relationship support, and query limits in the chosen
version.

### 7.3 Indexes and query design

Create indexes for common filters and sorting, such as:

-   `services.slug`, `services.status`
-   `articles.slug`, `articles.status`, `articles.publishedAt`
-   `enquiries.submittedAt`, `enquiries.status`
-   `leads.stage`, `leads.ownerId`, `leads.nextFollowUpAt`
-   `projects.status`, `projects.ownerId`
-   `tasks.projectId`, `tasks.assigneeId`, `tasks.status`
-   `audit_events.entityId`, `audit_events.timestamp`

Create only indexes that match actual query patterns. Review Appwrite's
current index and compound query requirements. Paginate every admin list
and avoid unbounded collection reads.

### 7.4 Relationships and consistency

Appwrite document databases are not a substitute for assuming relational
database transactions. For multi-step workflows:

-   Use idempotent operations.
-   Store workflow state explicitly.
-   Create an audit event for important state changes.
-   If multiple writes must succeed together, use supported transaction
    capabilities only after verifying their availability and constraints
    in the selected Appwrite version.
-   Otherwise implement a recoverable sequence with status markers and
    reconciliation jobs.
-   Prevent duplicate enquiry-to-lead or lead-to-project conversion
    using a unique business key or explicit conversion state.

## 8. API and application service design

Prefer domain-oriented server functions rather than exposing generic
database operations.

Suggested endpoints (names are illustrative):

  ---------------------------------------------------------------------------------------------
  Method            Endpoint                             Purpose             Authorization
  ----------------- ------------------------------------ ------------------- ------------------
  GET               `/api/health`                        Health check        Public, minimal
                                                         without sensitive   
                                                         details             

  POST              `/api/enquiries`                     Validate and create Public with abuse
                                                         enquiry             controls

  GET               `/api/admin/enquiries`               List enquiries      Staff role

  GET               `/api/admin/enquiries/:id`           View enquiry        Authorized staff

  PATCH             `/api/admin/enquiries/:id`           Update              Authorized staff
                                                         status/assignment   

  POST              `/api/admin/enquiries/:id/convert`   Convert enquiry to  Authorized role
                                                         lead                

  GET               `/api/admin/leads`                   List leads          Sales/admin

  PATCH             `/api/admin/leads/:id`               Update lead         Assigned
                                                                             owner/admin

  POST              `/api/admin/projects`                Create project      Admin/authorized
                                                                             owner

  POST              `/api/admin/documents`               Upload private      Project permission
                                                         document            

  POST              `/api/admin/content/:id/publish`     Publish content     Editor with
                                                                             publish permission
  ---------------------------------------------------------------------------------------------

Use Next.js Server Actions or Route Handlers where appropriate. Keep a
consistent response shape, avoid returning stack traces, and use correct
HTTP status codes. Do not expose raw Appwrite errors or internal
collection details to public users.

### 8.1 Enquiry submission sequence

``` mermaid
sequenceDiagram
    participant U as Visitor
    participant N as Next.js Server
    participant V as Validation / Abuse Controls
    participant A as Appwrite
    participant F as Appwrite Function
    participant E as Email Provider

    U->>N: Submit enquiry
    N->>V: Validate schema, consent, rate limit
    V-->>N: Valid / rejected
    N->>A: Create enquiry (trusted server workflow)
    A-->>N: Enquiry ID
    N-->>U: Generic success response
    N->>F: Trigger notification (or event trigger)
    F->>E: Send acknowledgement / internal alert
```

The public response should not reveal whether an email address or
company already exists in internal records. Notifications should be
asynchronous where possible so an email outage does not cause a valid
enquiry to be lost.

## 9. Security architecture

### 9.1 Threat model

Protect against:

-   Unauthorized access to leads, projects, and client documents.
-   Privilege escalation through manipulated role or owner fields.
-   API key leakage and misuse.
-   Cross-site scripting (XSS), CSRF, and injection.
-   Spam, automated form abuse, and resource exhaustion.
-   Insecure direct object references (IDOR).
-   Malicious file uploads and unsafe document sharing.
-   Accidental disclosure through logs, analytics, error messages, or
    public caches.
-   Account takeover and weak administrative authentication.

### 9.2 Required controls

**Secrets** - Store secrets in the hosting provider's secret manager and
Appwrite function environment. - Keep secrets out of Git, client
bundles, logs, screenshots, and error responses. - Rotate credentials
after suspected exposure and on a documented schedule. - Use the
narrowest Appwrite API key scopes possible.

**Authentication** - Use Appwrite Auth and secure SSR session
handling. - Require strong passwords and consider MFA for
administrators. - Disable or tightly control public account creation. -
Implement session invalidation, account disablement, and recovery
procedures. - Rate-limit authentication attempts.

**Authorization** - Check role and record scope on every server mutation
and protected read. - Apply Appwrite permissions to documents and
files. - Never accept permission arrays from a browser. - Verify
ownership/assignment from trusted stored records. - Test access with
anonymous, standard staff, and admin accounts.

**Input and output** - Use schema validation (for example, Zod) on the
server. - Enforce length, type, format, and allowed-value constraints. -
Render user-generated content safely; sanitize rich HTML if rich text is
allowed. - Escape output in email templates. - Avoid unsafe HTML
injection APIs.

**Public forms** - Rate-limit by IP and other privacy-appropriate
signals. - Use honeypot and CAPTCHA/Turnstile where justified. - Enforce
server-side validation and request size limits. - Add idempotency or
duplicate detection. - Do not let the visitor set internal status,
owner, role, or permission fields.

**File uploads** - Allowlist file extensions and MIME types; verify file
signatures where feasible. - Enforce maximum file size and count. -
Store private documents in a private bucket. - Do not execute uploaded
files. - Consider malware scanning for client-provided files. - Use
short-lived access URLs or authorized proxy downloads where supported. -
Define document retention and deletion.

**HTTP and browser** - Enforce HTTPS. - Configure Content Security
Policy, HSTS, frame restrictions, MIME sniffing protection, and suitable
referrer policy. - Configure CSRF protection for cookie-authenticated
mutations, including origin checks and appropriate same-site cookie
settings. - Avoid permissive CORS. - Do not cache authenticated
responses publicly.

### 9.3 Privacy and compliance

The agency must obtain appropriate legal review for the jurisdictions
and customer contracts it serves. The application should:

-   Collect only necessary personal information.
-   Explain purpose, lawful basis/consent where applicable, retention,
    and contact details in a privacy notice.
-   Record the privacy notice version shown at enquiry submission.
-   Support data access, correction, and deletion requests where legally
    required.
-   Set retention periods for enquiries, leads, user accounts, and
    project files.
-   Avoid collecting sensitive factory, employee, or customer data in a
    public form.
-   Use consent-aware analytics and cookies where required.
-   Review applicable Indian data protection requirements and
    international obligations based on actual operations.

This document is technical guidance, not legal advice.

## 10. File storage design

Use separate buckets or clearly separated storage policies:

1.  `public-media`: approved public logos, service images, and article
    covers.
2.  `private-business-documents`: proposals, reports, drawings, and
    client files.

For public media: - Only trusted content editors can upload or
replace. - Publish only rights-cleared assets. - Generate optimized
derivatives where appropriate.

For private files: - Default deny. - Grant access to the project owner,
authorized team members, and admins. - Store metadata in the `documents`
collection. - Validate access before download. - Log sensitive access
events where appropriate. - Never put private file IDs into public page
data without authorization.

## 11. Background processing and integrations

Use Appwrite Functions for work that should not block the user request:

-   Enquiry acknowledgement emails.
-   Internal lead notifications.
-   Follow-up reminders.
-   Scheduled cleanup of expired temporary records.
-   Webhook processing.
-   CRM or calendar synchronization if introduced later.

Function requirements:

-   Verify webhook signatures or shared secrets.
-   Make handlers idempotent.
-   Retry transient failures with bounded backoff.
-   Record failed events for review.
-   Do not log secrets or full confidential payloads.
-   Use least-privilege credentials.
-   Monitor execution failures and quotas.

## 12. Caching and performance

-   Cache public published content with an explicit revalidation
    strategy.
-   Revalidate relevant paths/tags after publishing or unpublishing.
-   Never share-cache admin pages, private APIs, or user-specific data.
-   Paginate admin tables and use server-side filtering.
-   Use responsive images and modern formats.
-   Lazy-load below-the-fold media.
-   Avoid large client-side bundles.
-   Monitor Core Web Vitals and server response times.
-   Set request timeouts and bounded payload sizes.

## 13. SEO and discoverability

-   Use unique page titles and descriptions.
-   Add canonical URLs.
-   Generate sitemap entries only for published public pages.
-   Exclude admin, draft, preview, and private routes from indexing.
-   Configure robots rules.
-   Add suitable structured data only when it accurately represents the
    business.
-   Use descriptive image alt text.
-   Create industry- and service-specific landing pages with genuinely
    useful content.
-   Avoid doorway pages, keyword stuffing, and unsupported claims.

## 14. Observability and audit

### Application logs

Use structured logs with: - Timestamp - Environment - Severity -
Request/correlation ID - Route or operation - Actor ID where
appropriate - Result and duration - Sanitized error category

Never log passwords, session secrets, API keys, full payment data, or
unnecessary personal/confidential content.

### Metrics

Track: - Request volume and error rate - Server response latency -
Enquiry submission success/failure - Notification delivery failures -
Authentication failures - Admin authorization denials - Function
execution failures - Storage usage and database quotas - Lead stage
counts and conversion over time

### Audit events

Record: - Role and user status changes - Lead assignment and stage
changes - Project creation and membership changes - Document upload,
deletion, and permission changes - Content publication/unpublication -
Sensitive settings changes

Audit records should be written by trusted server code and be
append-only to normal application users.

## 15. Testing strategy

### Unit tests

-   Schema validation
-   Business rules and lead-stage transitions
-   Role policy functions
-   Content publication rules
-   File validation helpers

### Integration tests

-   Appwrite data access
-   Session resolution
-   Enquiry creation
-   Lead conversion
-   Document permission handling
-   Function notification behavior

### End-to-end tests

-   Public service discovery and enquiry submission
-   Admin login/logout
-   Lead review and assignment
-   Unauthorized route and API access
-   Content draft and publish
-   Private document access and denial

### Security tests

-   Anonymous access to internal collections
-   Low-privilege user access to another user's records
-   Manipulated role/owner fields
-   IDOR attempts
-   CSRF and XSS checks
-   Rate-limit behavior
-   File upload abuse
-   Secret scanning and dependency vulnerability checks

Authorization tests must include direct API requests, not just UI
navigation tests.

## 16. CI/CD and release management

Recommended pipeline:

1.  Install dependencies from the lockfile.
2.  Run formatting and lint checks.
3.  Run TypeScript type checks.
4.  Run unit and integration tests.
5.  Run production build.
6.  Run dependency and secret scans.
7.  Deploy to staging.
8.  Run smoke and end-to-end tests.
9.  Require approval for production deployment.
10. Deploy and verify health checks.
11. Monitor errors and roll back if release criteria fail.

Keep database/schema changes versioned and reviewed. Prefer
backward-compatible changes: add new optional attributes first, deploy
compatible code, backfill data, then remove obsolete fields in a later
release. Maintain a release and rollback procedure.

## 17. Backup, disaster recovery, and operations

Define and document:

-   Database backup frequency and retention.
-   Storage backup or replication approach.
-   Backup encryption and access controls.
-   Recovery Point Objective (RPO).
-   Recovery Time Objective (RTO).
-   Restore owner and escalation contacts.
-   Restore test cadence.
-   Incident communication process.

Do not assume a provider's backup feature alone is sufficient. Test
restoration of both database records and storage objects in a
non-production environment.

## 18. Scalability and future evolution

Start with a modular monolith:

-   One Next.js application.
-   One Appwrite project per environment.
-   Domain-separated application modules.
-   Appwrite Functions for asynchronous tasks.

Potential future additions:

-   Client portal with tenant-scoped access.
-   CRM integration.
-   Calendar scheduling.
-   Proposal generation and e-signature.
-   Invoicing and payment provider integration.
-   Project document collaboration.
-   Partner workspace.
-   Analytics warehouse and business intelligence.
-   Multi-language public pages.

Do not introduce microservices, a second database, or a message broker
until load, reliability, compliance, or integration needs justify the
operational cost.

## 19. Architecture decision records

Record decisions in `docs/adr/` using a short template:

``` text
# ADR-0001: Decision title

- Status: Proposed | Accepted | Superseded
- Date:
- Context:
- Decision:
- Alternatives considered:
- Consequences:
- Security / privacy impact:
- Owner:
```

Initial decisions to record:

-   Appwrite Cloud versus self-hosted.
-   Production region and hosting provider.
-   SSR session implementation.
-   Public enquiry write path.
-   Role and document permission model.
-   Email delivery provider.
-   Analytics and consent approach.
-   Backup and recovery objectives.

## 20. Production readiness checklist

### Infrastructure

-   [ ] Separate development, staging, and production environments.
-   [ ] Production region and data residency reviewed.
-   [ ] Domain, DNS, TLS, CDN, and WAF configured.
-   [ ] Environment variables stored securely.
-   [ ] Appwrite quotas and limits reviewed.

### Application

-   [ ] Strict TypeScript and production build pass.
-   [ ] Public pages are responsive and accessible.
-   [ ] Draft content is not publicly accessible.
-   [ ] Admin routes are server-protected.
-   [ ] No secrets appear in browser bundles or repository history.
-   [ ] Error handling and request correlation are configured.

### Security

-   [ ] Appwrite permissions follow default-deny.
-   [ ] Direct API authorization tests pass.
-   [ ] Admin MFA policy decided.
-   [ ] Public form rate limiting and abuse controls enabled.
-   [ ] File type/size/access controls tested.
-   [ ] CSP and security headers configured.
-   [ ] Dependency and secret scans pass.

### Data and operations

-   [ ] Data retention and deletion policy approved.
-   [ ] Backup schedule configured.
-   [ ] Restore test completed.
-   [ ] Monitoring and alerting enabled.
-   [ ] Incident and rollback procedures documented.
-   [ ] Privacy and terms reviewed for operating jurisdictions.

## 21. References to verify during implementation

Use the official documentation for the exact versions deployed:

-   Next.js documentation: https://nextjs.org/docs
-   Appwrite documentation: https://appwrite.io/docs
-   Appwrite Authentication: https://appwrite.io/docs/products/auth
-   Appwrite Databases: https://appwrite.io/docs/products/databases
-   Appwrite Storage: https://appwrite.io/docs/products/storage
-   Appwrite Functions: https://appwrite.io/docs/products/functions
-   TypeScript documentation: https://www.typescriptlang.org/docs/

SDK APIs, platform limits, hosting compatibility, and security
recommendations can change. Verify all implementation details against
the official documentation and the versions pinned in the project.
