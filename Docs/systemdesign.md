# System Design --- Industrial Consultancy Agency Platform

**Document type:** Product and system design specification\
**Application:** Consultancy agency website and business operations
platform\
**Frontend:** Next.js + TypeScript\
**Backend platform:** Appwrite\
**Status:** Production-oriented baseline; validate business decisions
before implementation\
**Version:** 1.0

------------------------------------------------------------------------

## 1. Purpose

This document defines the product scope, user experience, business
workflows, functional requirements, data responsibilities, security
expectations, and operational requirements for a digital platform
serving an industrial engineering and manufacturing consultancy.

The platform should help manufacturing companies discover consultancy
services, understand the agency's capabilities, submit enquiries,
request assessments, and maintain communication with the agency. It
should also give authorized agency staff a secure workspace to manage
enquiries, leads, service content, projects, documents, and operational
activity.

The platform is intended to support an agency focused on:

-   EMS and electronics manufacturing
-   SMT process improvement, AOI/SPI, and production readiness
-   Semiconductor manufacturing ecosystem and specialist support
-   Industrial engineering, productivity, and factory optimization
-   Quality, yield, and process improvement
-   MSME manufacturing development
-   NPI, BOM, and manufacturing engineering
-   Industry 4.0, automation feasibility, and technology adoption
-   Industrial research, innovation, and technical training

The application must not imply that the agency provides regulated,
safety-critical, or highly specialized semiconductor process engineering
unless suitably qualified personnel and partners are assigned to the
engagement.

## 2. Product vision

**Positioning:** Industrial Engineering & Manufacturing Excellence
Consultancy.

**Suggested brand promise:** Engineering better manufacturing. Enabling
smarter industries.

The product should communicate a practical, evidence-led consultancy
approach: understand the factory problem, assess the current state,
identify and validate causes, recommend a feasible improvement, support
implementation where contracted, and measure results.

### Product goals

1.  Generate qualified enquiries from manufacturing businesses in India
    and international markets.
2.  Explain the agency's industry expertise and service offerings
    clearly.
3.  Establish trust through useful technical content, transparent
    processes, and accurate credentials.
4.  Convert enquiries into discovery calls, assessments, proposals, and
    projects.
5.  Provide a secure internal system for managing the consultancy sales
    and delivery lifecycle.
6.  Make the platform maintainable and extensible as the agency adds
    consultants, partners, services, and digital solutions.

### Non-goals for the initial release

-   A public marketplace for consultants.
-   A full ERP, MES, QMS, or PLM replacement.
-   Automated factory control or direct machine connectivity.
-   Automated engineering decisions without qualified human review.
-   Online payment processing unless a later business requirement
    justifies it.
-   Public client portals with project files and live project status in
    the MVP.
-   Claims of guaranteed yield, productivity, cost, or financial
    improvements.

## 3. Users and roles

### Public users

  -----------------------------------------------------------------------
  Role                    Needs                   Allowed capabilities
  ----------------------- ----------------------- -----------------------
  Visitor                 Understand the agency   Browse public pages and
                          and its services        published insights

  Prospective client      Explain a manufacturing Submit enquiry or
                          challenge               consultation request

  Returning client        Contact the agency      Submit a follow-up
                          about an existing       enquiry; client portal
                          engagement              is future scope
  -----------------------------------------------------------------------

### Internal users

  -----------------------------------------------------------------------
  Role                    Responsibilities        Access model
  ----------------------- ----------------------- -----------------------
  Owner / Super Admin     Full business and       All authorized admin
                          platform administration functions

  Administrator           Manage content,         Admin scope, excluding
                          enquiries, users, and   owner-only controls
                          settings                

  Sales / Business        Qualify leads, schedule Assigned leads and
  Development             discovery, manage       related records
                          proposals               

  Consultant / Engineer   Review technical        Assigned
                          requirements and manage enquiries/projects and
                          assigned work           approved documents

  Content Editor          Manage pages, services, Content management only
                          and articles            

  Partner / Specialist    Support assigned work   Explicitly shared
                          packages                project scope only
  -----------------------------------------------------------------------

Use least-privilege access. A role name in the browser is not a security
boundary; permissions must be enforced by Appwrite document permissions
and trusted server-side checks.

## 4. Product modules

### 4.1 Public website

-   Home page with a clear industrial consultancy value proposition.
-   About page describing the agency, approach, and verified team
    credentials.
-   Industry pages for EMS/electronics, semiconductor ecosystem, and
    manufacturing/MSMEs.
-   Service directory and individual service detail pages.
-   Solutions / problems-we-solve section.
-   Consulting methodology and engagement process.
-   Insights / technical articles.
-   Contact and consultation enquiry forms.
-   Privacy policy, terms, cookie policy, and any applicable legal
    disclosures.

### 4.2 Service catalogue

Each service record should include:

-   Service name, slug, summary, and full description.
-   Target industries and customer problems.
-   Scope and activities.
-   Expected deliverables.
-   Inputs required from the client.
-   Typical engagement format, where known.
-   Exclusions and assumptions.
-   Relevant technical tags.
-   Publication status and SEO metadata.

Do not publish invented credentials, client logos, testimonials, case
studies, certifications, or performance metrics. Use only authorized and
verifiable evidence.

### 4.3 Enquiry and lead management

Capture a prospective client's initial request with:

-   Contact name
-   Business email
-   Company name
-   Job title (optional)
-   Country and location
-   Industry
-   Service of interest
-   Problem description
-   Preferred contact method
-   Consent to be contacted and privacy notice version
-   Submission timestamp and source page
-   Status and assigned owner (internal fields)

Suggested lead stages:

`New → Review → Qualified → Discovery Scheduled → Proposal Sent → Won / Lost / On Hold`

A lead may be closed as spam or duplicate. Preserve an audit trail for
status changes.

### 4.4 Consultation and assessment workflow

1.  Visitor reviews services and submits a request.
2.  System validates and stores the enquiry.
3.  System acknowledges receipt without promising acceptance or a
    response time unless an SLA is configured.
4.  Authorized staff review the request.
5.  Staff classify industry, urgency, service, and fit.
6.  Staff arrange discovery and request additional information where
    appropriate.
7.  Consultant performs a preliminary review.
8.  Agency prepares scope, assumptions, deliverables, schedule, and
    commercial proposal.
9.  Client accepts, declines, or requests changes.
10. If accepted, an internal project record is created and assigned.

### 4.5 Project management (internal MVP or Phase 2)

A project record should contain:

-   Project code and title
-   Client organization and primary contact
-   Approved scope and deliverables
-   Assigned internal owner and team
-   Start date, target completion date, and status
-   Milestones and tasks
-   Risks, assumptions, issues, and decisions
-   Deliverable references
-   Completion review and client feedback (where permitted)

Keep project records separate from public enquiries. Create a project
only after an authorized internal action.

### 4.6 Content management

Authorized editors can create, preview, publish, unpublish, and archive:

-   Pages
-   Services
-   Industry pages
-   Articles / insights
-   FAQs
-   Media assets

Content should support drafts, publication timestamps, authorship, SEO
metadata, and a stable slug. Public queries must return only published
content.

### 4.7 Internal dashboard

Dashboard views may include:

-   New and unassigned enquiries
-   Leads by stage and industry
-   Follow-up dates
-   Active projects and milestones
-   Recent activity
-   Content awaiting review
-   Basic conversion and source reporting

Dashboard metrics must be derived from persisted records and clearly
define their date range and calculation.

### 4.8 Document management

Allow authorized staff to attach proposals, assessment reports, and
project deliverables to the appropriate record. Use private Appwrite
Storage buckets, document-level permissions, file size/type validation,
and time-limited access where supported. Never expose confidential
factory data through public URLs.

## 5. Key user journeys

### Journey A --- Find a service and submit an enquiry

1.  Visitor enters the website.
2.  Visitor selects an industry or service.
3.  Service page explains the problem, approach, deliverables, and
    engagement CTA.
4.  Visitor opens the enquiry form.
5.  Form validates required fields and consent.
6.  Server validates the request again, applies abuse controls, and
    stores the record.
7.  Visitor sees a neutral success confirmation and receives an
    acknowledgement if email delivery is configured.

### Journey B --- Staff qualify a lead

1.  Staff signs in.
2.  Server verifies the Appwrite session and internal role.
3.  Staff opens the enquiry queue.
4.  Staff reviews details and records qualification notes.
5.  Staff assigns an owner and changes the lead stage.
6.  System records the actor, timestamp, and change.

### Journey C --- Publish a technical article

1.  Editor creates a draft.
2.  Editor adds title, slug, body, cover media, tags, and SEO metadata.
3.  Editor previews the page.
4.  Authorized editor publishes.
5.  Public website displays the article only after publication.
6.  Sitemap and metadata reflect the published article.

### Journey D --- Convert a qualified lead to a project

1.  Authorized user confirms that a proposal has been accepted.
2.  User creates a project from the lead.
3.  System copies only the required client and engagement details.
4.  Project owner assigns team members, milestones, and tasks.
5.  Project documents remain private and permission-scoped.

## 6. Functional requirements

Priority definitions: **P0** = required for secure launch; **P1** =
important next release; **P2** = later enhancement.

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-001                  Public pages render     P0
                          responsively on mobile, 
                          tablet, and desktop     

  FR-002                  Visitors can browse     P0
                          published industries    
                          and services            

  FR-003                  Visitors can submit a   P0
                          validated enquiry       

  FR-004                  Enquiry submissions are P0
                          stored server-side in   
                          Appwrite                

  FR-005                  Public users cannot     P0
                          read internal enquiries 
                          or project records      

  FR-006                  Admin authentication    P0
                          uses Appwrite Auth      

  FR-007                  Admin routes verify     P0
                          session and role on the 
                          server                  

  FR-008                  Admin can view, assign, P0
                          and update leads        

  FR-009                  Important lead changes  P0
                          create audit events     

  FR-010                  Admin can create and    P1
                          publish service and     
                          article content         

  FR-011                  Private files can be    P1
                          uploaded and accessed   
                          by authorized users     

  FR-012                  Email acknowledgement   P1
                          and internal            
                          notification are        
                          configurable            

  FR-013                  Admin can create        P1
                          projects from qualified 
                          leads                   

  FR-014                  Dashboard reports lead  P1
                          and project summaries   

  FR-015                  Content supports        P1
                          preview, draft,         
                          publish, and archive    

  FR-016                  Client portal with      P2
                          scoped project access   

  FR-017                  Online payments and     P2
                          invoices                

  FR-018                  External CRM, calendar, P2
                          or accounting           
                          integrations            
  -----------------------------------------------------------------------

## 7. Non-functional requirements

### Security and privacy

-   Enforce authorization on the server and in Appwrite permissions.
-   Keep Appwrite API keys and secrets out of browser bundles and source
    control.
-   Validate all inputs on the server; client validation is for
    usability only.
-   Apply rate limiting, bot mitigation, and abuse monitoring to public
    forms.
-   Use secure session cookies and HTTPS in production.
-   Minimize personal data collection and define retention/deletion
    procedures.
-   Record administrative actions involving sensitive records.
-   Do not store passwords, payment card data, or unnecessary sensitive
    personal data.
-   Do not upload customer-confidential factory documents without an
    approved agreement and access policy.

### Performance

-   Prefer static generation or cached server rendering for public
    content where suitable.
-   Use pagination for admin lists.
-   Optimize images and fonts.
-   Avoid loading admin bundles on public pages.
-   Set measurable performance budgets and monitor Core Web Vitals.

### Availability and recovery

-   Define availability targets based on the selected Appwrite hosting
    plan and deployment model.
-   Configure backups for databases and storage according to Appwrite
    deployment capabilities.
-   Test restoration, not just backup creation.
-   Document recovery owners, recovery point objective (RPO), and
    recovery time objective (RTO).

### Accessibility

-   Target WCAG 2.2 AA.
-   Ensure keyboard navigation, visible focus, semantic headings, form
    labels, and useful error messages.
-   Do not communicate state by color alone.
-   Provide alt text for meaningful images and captions/transcripts for
    relevant media.

### Maintainability

-   Use strict TypeScript.
-   Keep business rules out of presentation components.
-   Validate environment variables at startup/build time.
-   Use shared schemas and typed data-access functions.
-   Add automated tests for critical workflows and authorization
    boundaries.

## 8. Information architecture

Suggested public navigation:

-   Home
-   About
-   Industries
-   Services
-   Solutions
-   Insights
-   Contact

Suggested admin navigation:

-   Overview
-   Enquiries / Leads
-   Projects
-   Services
-   Industries
-   Insights
-   Documents
-   Team & Roles
-   Activity Log
-   Settings

Keep the public website focused. Avoid exposing internal operational
terminology in customer-facing navigation.

## 9. Data ownership and lifecycle

  -----------------------------------------------------------------------
  Data              Owner             Visibility        Lifecycle
  ----------------- ----------------- ----------------- -----------------
  Public page       Content team      Public when       Draft → Published
  content                             published         → Archived

  Service catalogue Admin/content     Public when       Draft → Published
                    team              published         → Archived

  Enquiries         Sales/admin       Internal only     New → Qualified →
                                                        Closed

  Lead notes        Assigned staff    Restricted        Active engagement
                                      internal          → Retention
                                                        policy

  Projects          Project owner     Assigned team     Planned → Active
                                      only              → Completed /
                                                        Cancelled

  Project documents Project owner     Explicitly        Project
                                      authorized users  lifecycle +
                                                        retention policy

  Audit events      System            Admin/auditor     Append-only
                                                        retention policy

  User              Super Admin       Internal          Active → Disabled
  profiles/roles                                        
  -----------------------------------------------------------------------

## 10. Validation and acceptance criteria

The MVP is ready for production review only when:

-   All public pages work on supported screen sizes.
-   Published content is visible and draft content is not.
-   Enquiry form handles valid, invalid, duplicate, and abusive
    submissions safely.
-   An unauthenticated visitor cannot access admin pages or private
    data.
-   A signed-in user without the required role cannot perform privileged
    actions.
-   Direct API calls cannot bypass the UI's access restrictions.
-   File uploads enforce size, type, and authorization rules.
-   Secrets are absent from client-side JavaScript and repository
    history.
-   Backups and a restore procedure have been tested.
-   Privacy, terms, and contact details are reviewed and accurate.
-   Logging, error monitoring, and a production rollback process are in
    place.

## 11. Risks and mitigations

  -----------------------------------------------------------------------
  Risk                    Impact                  Mitigation
  ----------------------- ----------------------- -----------------------
  Overly broad service    Low conversion and      Lead with strongest
  positioning             unclear differentiation verifiable
                                                  capabilities; expand
                                                  service pages
                                                  progressively

  False or unverified     Reputational and legal  Publish only
  credibility claims      risk                    substantiated
                                                  credentials and case
                                                  studies

  Public enquiry spam     Operational noise and   Rate limiting,
                          cost                    CAPTCHA/Turnstile where
                                                  appropriate, honeypot,
                                                  validation

  Misconfigured Appwrite  Data exposure           Default-deny
  permissions                                     permissions, automated
                                                  authorization tests,
                                                  periodic review

  API key leakage         Full backend compromise Server-only secrets,
                                                  key scopes, rotation,
                                                  secret scanning

  Customer factory data   Confidentiality breach  Private storage, least
  exposure                                        privilege, retention
                                                  and access logs

  Scope creep             Delayed launch          MVP boundaries and
                                                  phased roadmap

  Reliance on one         Delivery risk           Maintain partner
  technical specialist                            qualification and
                                                  documented review
                                                  process
  -----------------------------------------------------------------------

## 12. Delivery roadmap

### Phase 0 --- Foundation

-   Confirm agency name, legal entity details, contact channels, and
    service claims.
-   Confirm hosting, Appwrite Cloud or self-hosted deployment, region,
    and backup approach.
-   Define privacy notice, terms, cookie behavior, and retention.
-   Create development, staging, and production environments.

### Phase 1 --- Public MVP

-   Public website and responsive navigation.
-   Industries and services pages.
-   Contact/enquiry form.
-   SEO metadata, sitemap, robots rules, and social sharing metadata.
-   Basic analytics with consent-aware configuration.
-   Error monitoring and deployment pipeline.

### Phase 2 --- Internal operations

-   Appwrite Auth and admin dashboard.
-   Role-based access and lead pipeline.
-   Activity log.
-   Content management.
-   Email notifications.
-   Private document storage.

### Phase 3 --- Delivery management

-   Project creation and assignment.
-   Milestones, tasks, risks, and deliverables.
-   Reporting and operational dashboards.
-   Partner access with narrowly scoped permissions.

### Phase 4 --- Client experience and integrations

-   Client portal.
-   Secure document exchange.
-   Calendar/CRM integrations.
-   Proposal acceptance and payment integration if commercially
    required.

## 13. Open decisions

Resolve these before implementation or record the selected answer in the
architecture decision log:

1.  Appwrite Cloud or self-hosted Appwrite?
2.  Which region will host production data?
3.  Will the MVP include an admin dashboard or only the public website?
4.  Which email provider will send acknowledgements and notifications?
5.  Will projects and private document storage be included in the first
    release?
6.  What are the enquiry response expectations and lead retention
    period?
7.  Which analytics solution and consent model will be used?
8.  Who is the designated data/privacy contact for the business?

## 14. Definition of done

A feature is complete when its requirements, design, validation,
authorization, error handling, accessibility, tests, documentation, and
deployment configuration are complete. A feature is not production-ready
merely because it works in a local browser.
