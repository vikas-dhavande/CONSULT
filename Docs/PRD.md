# Product Requirements Document (PRD)

## Industrial Consultancy Agency Platform

**Product:** Consultancy agency website and internal business platform\
**Frontend:** Next.js + TypeScript\
**Backend:** Appwrite\
**Document status:** Baseline PRD for implementation planning\
**Version:** 1.0\
**Last updated:** 17 November 2026

------------------------------------------------------------------------

## 1. Executive summary

The product is a digital platform for an industrial engineering and
manufacturing consultancy. It will help manufacturing businesses
understand the agency's capabilities, explore relevant services, submit
consultation enquiries, and begin an engagement. Internally, it will
provide authorized agency staff with tools to review enquiries, manage
leads, publish technical content, and coordinate projects.

The agency's intended focus includes EMS and electronics manufacturing,
semiconductor ecosystem support, industrial engineering, productivity
improvement, quality and yield, MSME manufacturing development, NPI and
manufacturing engineering, automation feasibility, and smart
manufacturing.

The initial product should prioritize credibility, clarity, lead
generation, security, and maintainability. It should launch as a focused
public website with a secure internal administration capability, then
expand into project delivery and client collaboration.

## 2. Product vision and positioning

**Positioning:** Industrial Engineering & Manufacturing Excellence
Consultancy.

**Suggested brand message:** Engineering better manufacturing. Enabling
smarter industries.

The agency should communicate practical, evidence-led support:
understand the manufacturing challenge, assess the current state,
identify and validate causes, recommend feasible improvements, support
implementation when included in scope, and measure outcomes.

### 2.1 Target customers

-   Electronics manufacturing services (EMS) companies.
-   PCB assembly and SMT manufacturers.
-   Electronics product manufacturers and manufacturing startups.
-   Semiconductor ecosystem businesses, including suppliers and relevant
    manufacturing service providers.
-   OSAT/ATMP and semiconductor-adjacent organizations where qualified
    expertise is available.
-   Industrial MSMEs seeking factory setup, process improvement, or
    productivity support.
-   Manufacturing organizations exploring automation and Industry 4.0.

### 2.2 Primary users

  -----------------------------------------------------------------------
  User                                Main need
  ----------------------------------- -----------------------------------
  Prospective client                  Find a relevant service and contact
                                      the agency

  Returning client                    Make a follow-up enquiry or request
                                      support

  Agency owner                        Manage the platform and business
                                      pipeline

  Sales / business development        Review and qualify enquiries

  Consultant / engineer               Review assigned technical
                                      requirements and project work

  Content editor                      Maintain accurate service and
                                      insight content

  Specialist partner                  Access only the work and
                                      information explicitly shared
  -----------------------------------------------------------------------

## 3. Problem statement

Manufacturing organizations may face challenges such as:

-   Low first-pass yield, recurring defects, scrap, and rework.
-   SMT, SPI, AOI, or inspection process instability.
-   Production bottlenecks, high cycle time, and poor line balance.
-   Low equipment utilization and unclear capacity constraints.
-   Factory setup delays and incomplete production readiness.
-   BOM inaccuracies, NPI handover gaps, and engineering change issues.
-   Supplier, material, and component readiness problems.
-   Limited access to specialized engineering support.
-   Unclear automation feasibility and technology investment decisions.
-   Skills and standard-work gaps across production teams.

Potential customers need a clear way to identify relevant support and
explain their problems. The agency needs a repeatable method to capture,
qualify, and manage those opportunities.

These are problem areas the agency intends to address; the platform must
not claim that every issue can be solved without a site assessment,
evidence, and appropriately qualified resources.

## 4. Goals, objectives, and success metrics

### 4.1 Product goals

1.  Explain the agency's specialization and value proposition within the
    first website visit.
2.  Help visitors find services by industry and manufacturing problem.
3.  Convert suitable visitors into structured, actionable enquiries.
4.  Give agency staff a secure way to qualify, assign, and track leads.
5.  Publish useful technical content that demonstrates genuine
    expertise.
6.  Create a foundation for managing projects, documents, and specialist
    partners.
7.  Keep the application maintainable and economical during the agency's
    early stage.

### 4.2 Success metrics

Establish a baseline after launch. Do not set arbitrary performance
claims before collecting data.

  -----------------------------------------------------------------------
  Metric                              Definition
  ----------------------------------- -----------------------------------
  Qualified enquiry count             Enquiries accepted as relevant
                                      after internal review

  Enquiry conversion rate             Enquiries divided by eligible
                                      website sessions or form starts;
                                      define the denominator consistently

  Form completion rate                Successful submissions divided by
                                      form starts

  Time to first review                Time between submission and first
                                      internal review

  Lead progression                    Leads moving from new to qualified,
                                      discovery, proposal, and outcome

  Source attribution coverage         Share of enquiries with a known
                                      source or landing page

  Content engagement                  Views and meaningful engagement on
                                      published insights

  Website performance                 Core Web Vitals and key route
                                      response performance

  Platform reliability                Availability and error rate
                                      measured through monitoring
  -----------------------------------------------------------------------

Initial operating targets should be agreed after launch and reviewed
monthly.

## 5. Scope

### 5.1 MVP scope --- launch

**Public website** - Home page. - About page. - Industry pages. -
Service directory and service detail pages. - Solutions / manufacturing
challenges section. - Consulting methodology. - Insights listing and
article detail pages. - Contact / consultation enquiry page. - Privacy
policy and terms pages. - Responsive design, accessibility, and SEO
foundations.

**Enquiry management** - Structured public enquiry form. - Server-side
validation. - Consent capture and privacy notice version. - Secure
storage in Appwrite. - Generic submission confirmation. - Internal view
of submitted enquiries. - Lead status and assignment controls for
authorized staff.

**Administration** - Appwrite Auth for staff sign-in. - Protected admin
routes. - Server-side role verification. - Basic dashboard. - Enquiry
list and detail view. - Basic audit trail for important changes.

### 5.2 Phase 2 scope

-   Content management for services, industries, pages, and articles.
-   Draft, preview, publish, and archive workflow.
-   Email acknowledgement and internal notifications.
-   Private document upload and access controls.
-   Lead notes, follow-up dates, and pipeline reporting.
-   Basic project creation and assignment.

### 5.3 Later scope

-   Client portal with project-specific access.
-   Partner workspace.
-   Project milestones, tasks, risks, and deliverables.
-   Proposal generation and approval.
-   Calendar and CRM integrations.
-   Invoicing and payment integrations.
-   Multilingual content.
-   Advanced analytics and reporting.

### 5.4 Explicitly out of scope

-   Replacing ERP, MES, QMS, PLM, or factory-control systems.
-   Direct machine control or production system integration in the MVP.
-   Automated engineering diagnosis without qualified human validation.
-   Public consultant marketplace.
-   Guaranteed financial, yield, or productivity outcomes.
-   Storing sensitive factory or customer information in public enquiry
    forms.
-   Public self-registration for internal staff accounts.

## 6. Product requirements

Priority: **P0** launch blocker, **P1** next release, **P2** future
enhancement.

### 6.1 Public website

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  PR-001           Provide a clear                     P0 A visitor can
                   homepage value                         identify the
                   proposition                            agency's focus,
                                                          target
                                                          industries, and
                                                          primary CTA
                                                          without
                                                          navigating away

  PR-002           Provide industry                    P0 Each published
                   pages                                  industry page
                                                          explains
                                                          relevant
                                                          customer needs
                                                          and related
                                                          services

  PR-003           Provide a                           P0 Visitors can
                   service                                browse services
                   directory                              and open
                                                          individual
                                                          service details

  PR-004           Provide service                     P0 Each page
                   detail pages                           explains
                                                          problem, scope,
                                                          activities,
                                                          deliverables,
                                                          assumptions, and
                                                          CTA

  PR-005           Provide About                       P0 Agency approach
                   and methodology                        and credentials
                   pages                                  are accurate and
                                                          verifiable

  PR-006           Provide Insights                    P1 Published
                   listing and                            articles are
                   article pages                          accessible;
                                                          drafts are
                                                          private

  PR-007           Support                             P0 Core pages and
                   responsive                             forms work on
                   layouts                                mobile, tablet,
                                                          and desktop

  PR-008           Provide                             P0 Keyboard users
                   accessible                             can navigate;
                   navigation and                         controls have
                   forms                                  labels and
                                                          visible focus

  PR-009           Provide SEO                         P0 Published public
                   metadata and                           pages have
                   sitemap                                unique metadata
                                                          and appear in
                                                          sitemap

  PR-010           Provide legal                       P0 Visitors can
                   and privacy                            access current
                   pages                                  approved notices
  ------------------------------------------------------------------------

### 6.2 Enquiry capture

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  PR-011           Capture contact                     P0 Required fields
                   name and                               are validated on
                   business email                         client and
                                                          server

  PR-012           Capture company                     P0 Required or
                   and industry                           explicitly
                                                          optional fields
                                                          follow the
                                                          approved form
                                                          policy

  PR-013           Capture service                     P0 User can select
                   interest and                           a service and
                   problem                                describe the
                   description                            manufacturing
                                                          challenge

  PR-014           Capture contact                     P1 Optional fields
                   preference and                         can be omitted
                   location                               without blocking
                                                          submission

  PR-015           Capture consent                     P0 Submission
                   and notice                             records the
                   version                                consent state
                                                          and notice
                                                          version shown

  PR-016           Prevent common                      P0 Rate limiting
                   form abuse                             and appropriate
                                                          bot controls are
                                                          applied

  PR-017           Store enquiries                     P0 Public users
                   securely                               cannot list,
                                                          read, or modify
                                                          submitted
                                                          enquiries

  PR-018           Confirm                             P0 User receives a
                   successful                             clear
                   submission                             confirmation
                                                          without exposure
                                                          of internal
                                                          records

  PR-019           Notify staff by                     P1 Notification is
                   email                                  sent
                                                          asynchronously
                                                          when provider
                                                          configuration is
                                                          active
  ------------------------------------------------------------------------

Recommended form fields:

-   Name
-   Business email
-   Company
-   Job title (optional)
-   Country / location
-   Industry
-   Service of interest
-   Manufacturing challenge / project description
-   Preferred contact method
-   Consent to be contacted and privacy notice acknowledgement

Do not ask visitors to upload confidential factory files through the
public form in the MVP.

### 6.3 Admin and lead management

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  PR-020           Provide staff                       P0 Only provisioned
                   authentication                         staff accounts
                                                          can sign in

  PR-021           Protect admin                       P0 Anonymous users
                   routes                                 are redirected
                                                          or denied

  PR-022           Enforce role                        P0 Unauthorized
                   permissions                            users cannot
                                                          perform
                                                          restricted
                                                          operations
                                                          through direct
                                                          API calls

  PR-023           List and inspect                    P0 Authorized staff
                   enquiries                              can search,
                                                          filter,
                                                          paginate, and
                                                          open records

  PR-024           Assign enquiry                      P1 Authorized staff
                   owner                                  can assign an
                                                          owner and the
                                                          action is
                                                          audited

  PR-025           Track lead stage                    P0 Authorized staff
                                                          can update
                                                          stages using
                                                          allowed
                                                          transitions

  PR-026           Add internal                        P1 Notes are
                   notes                                  visible only to
                                                          authorized
                                                          internal users

  PR-027           Record key audit                    P0 Sensitive state
                   events                                 changes record
                                                          actor, action,
                                                          entity, and
                                                          timestamp

  PR-028           Show dashboard                      P1 Metrics are
                   summaries                              derived from
                                                          records and
                                                          display a clear
                                                          date range
  ------------------------------------------------------------------------

Suggested pipeline:

`New → Review → Qualified → Discovery Scheduled → Proposal Sent → Won / Lost / On Hold`

A lead can also be marked as spam or duplicate. Stage changes should be
validated server-side.

### 6.4 Content management

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  PR-029           Create and edit                     P1 Authorized
                   services                               editors can
                                                          manage service
                                                          content

  PR-030           Create and edit                     P1 Authorized
                   articles                               editors can
                                                          manage article
                                                          content and
                                                          metadata

  PR-031           Support draft                       P1 Public queries
                   and publish                            return only
                   states                                 published
                                                          content

  PR-032           Preview                             P1 Preview requires
                   unpublished                            an authorized
                   content                                session

  PR-033           Manage SEO                          P1 Editors can set
                   metadata                               title,
                                                          description,
                                                          slug, and
                                                          canonical
                                                          metadata where
                                                          appropriate
  ------------------------------------------------------------------------

### 6.5 Projects and documents

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  PR-034           Create projects                     P1 Authorized staff
                   from qualified                         can create a
                   leads                                  project with an
                                                          explicit scope

  PR-035           Assign project                      P1 Only authorized
                   members                                users can change
                                                          membership

  PR-036           Store private                       P1 Files are
                   project                                private by
                   documents                              default and
                                                          access is
                                                          checked

  PR-037           Track milestones                    P2 Project owners
                   and tasks                              can create and
                                                          update delivery
                                                          records

  PR-038           Provide client                      P2 Clients can
                   portal                                 access only
                                                          their explicitly
                                                          authorized
                                                          project data
  ------------------------------------------------------------------------

## 7. User experience requirements

### 7.1 Homepage content order

1.  Hero: clear industrial consultancy positioning and primary CTA.
2.  Industry focus: EMS/electronics, semiconductor ecosystem,
    manufacturing/MSME.
3.  Core services: show the most credible initial capabilities first.
4.  Problems solved: yield loss, cycle time, bottlenecks, setup
    readiness, quality, BOM/NPI challenges.
5.  Methodology: Assess → Analyze → Engineer → Implement (where
    contracted) → Validate.
6.  Why work with the agency: practical engineering, measurable scope,
    specialist network, transparent delivery.
7.  Insights / technical resources.
8.  Contact CTA and footer.

### 7.2 Messaging rules

-   Use clear, specific manufacturing language.
-   Explain customer problems and expected deliverables.
-   Avoid generic claims such as "best in the industry" or "guaranteed
    results."
-   Do not publish client logos, testimonials, case studies,
    certifications, or quantified outcomes without permission and
    evidence.
-   Clearly distinguish services delivered directly from those delivered
    through qualified partners.
-   Do not represent semiconductor fab process expertise as available
    unless the relevant qualified specialist is engaged.

### 7.3 Design and accessibility

-   Consistent typography, spacing, color, and component behavior.
-   Strong contrast and visible focus states.
-   Semantic HTML and logical heading hierarchy.
-   Accessible form labels and field-level errors.
-   Keyboard-operable menus, dialogs, and controls.
-   Respect reduced-motion preferences.
-   Avoid animation that delays access to important content.
-   Provide meaningful alt text for informative images.

## 8. Business rules

1.  Only published content is visible to public users.
2.  Public users cannot read or update enquiries after submission.
3.  Internal roles are assigned by authorized administrators, never by
    public form input.
4.  Lead stage transitions are validated on the server.
5.  A project is created only through an authorized action.
6.  Project membership controls access to project data and files.
7.  Private documents are not publicly addressable.
8.  Every sensitive administrative change creates an audit event.
9.  Notification failures must not silently discard a successfully
    stored enquiry.
10. A duplicate enquiry may be flagged for review; do not automatically
    discard legitimate repeat requests.
11. Enquiry and project retention must follow an approved policy.
12. Performance or savings outcomes must be described as targets or
    measured results, never guarantees without contractual evidence.

## 9. Data and integrations

### 9.1 Platform

-   Next.js App Router and TypeScript.
-   Appwrite Auth for staff identity and sessions.
-   Appwrite Databases for content and business records.
-   Appwrite Storage for public media and private business files.
-   Appwrite Functions for asynchronous work and integrations.

### 9.2 Logical data entities

-   User profile
-   Industry
-   Service
-   Page
-   Article
-   Enquiry
-   Lead
-   Lead note
-   Project
-   Project member
-   Task
-   Milestone
-   Document metadata
-   Audit event
-   Site setting

Refer to `architecture.md` for the proposed collection design,
authorization model, API boundaries, and deployment architecture. Refer
to `systemdesign.md` for detailed user roles and business workflows.

### 9.3 External integrations

MVP: - Transactional email provider, if configured. - Privacy-aware
analytics, subject to applicable consent requirements. - Error and
performance monitoring.

Later: - Calendar scheduling. - CRM. - Proposal/e-signature. - Invoicing
and payment provider. - Customer support or messaging platform.

Integrations must use server-side credentials, explicit scopes, and
documented failure handling.

## 10. Security, privacy, and compliance requirements

-   Use secure Appwrite SSR authentication and HTTP-only cookies.
-   Enforce authorization in server code and Appwrite permissions.
-   Keep API keys and secrets out of browser bundles and source control.
-   Validate all requests server-side.
-   Apply rate limiting and bot protection to public forms.
-   Use secure headers, HTTPS, and appropriate CSRF protections.
-   Restrict file type, size, and access.
-   Do not log secrets or unnecessary personal/confidential information.
-   Define data retention and deletion processes.
-   Provide accurate privacy and terms information.
-   Review applicable Indian and international privacy requirements with
    qualified counsel.

The PRD does not constitute legal advice or a security certification.

## 11. Non-functional requirements

  -----------------------------------------------------------------------
  Area                                Requirement
  ----------------------------------- -----------------------------------
  Performance                         Public content should use static
                                      generation or suitable caching
                                      where possible; monitor Core Web
                                      Vitals

  Availability                        Set an availability target after
                                      selecting hosting and Appwrite
                                      deployment model

  Security                            Default-deny permissions,
                                      server-side authorization, secret
                                      management, audit events

  Accessibility                       Target WCAG 2.2 AA

  Compatibility                       Support current major desktop and
                                      mobile browsers

  Scalability                         Start with a modular monolith;
                                      scale components when measured
                                      demand requires it

  Maintainability                     Strict TypeScript, reusable
                                      schemas, documented modules,
                                      automated tests

  SEO                                 Unique metadata, canonical URLs,
                                      sitemap, robots rules, structured
                                      data where accurate

  Recovery                            Backups and tested restore process;
                                      define RPO and RTO

  Observability                       Structured logs, request IDs, error
                                      monitoring, and operational alerts
  -----------------------------------------------------------------------

## 12. Analytics and reporting

Track only what is needed to understand product performance:

-   Landing page and service page visits.
-   CTA interactions.
-   Enquiry form starts and successful submissions.
-   Enquiry source and landing page.
-   Lead stage movement.
-   Time to first review.
-   Article engagement.
-   Form validation and submission errors.

Avoid collecting sensitive form contents in analytics. Apply consent and
retention settings appropriate to the chosen analytics provider and
applicable law.

## 13. Release plan

### Release 0 --- Foundation

-   Confirm agency identity, legal details, contact information, and
    verified service claims.
-   Select hosting and Appwrite deployment model.
-   Create dev, staging, and production environments.
-   Establish environment variable and secret management.
-   Define privacy and data retention policy.

### Release 1 --- Public website and enquiry capture

-   Homepage, about, industries, services, solutions, insights, contact.
-   Responsive and accessible UI.
-   SEO and sitemap.
-   Enquiry form with server validation and abuse controls.
-   Secure Appwrite persistence.
-   Legal pages and monitoring.

### Release 2 --- Internal admin and lead pipeline

-   Staff authentication and roles.
-   Protected admin dashboard.
-   Enquiry list/detail.
-   Lead assignment and stage management.
-   Audit events.
-   Email notifications.

### Release 3 --- Content and project operations

-   Content management and publishing workflow.
-   Private document storage.
-   Project creation and assignment.
-   Tasks, milestones, and basic reporting.

### Release 4 --- Client and partner experience

-   Client portal.
-   Partner access.
-   Secure document exchange.
-   Integrations and advanced analytics.

## 14. Risks and dependencies

  -----------------------------------------------------------------------
  Risk / dependency                   Mitigation
  ----------------------------------- -----------------------------------
  Agency service scope is too broad   Prioritize the strongest verifiable
  at launch                           EMS/SMT, AOI/SPI, BOM/NPI, and
                                      industrial productivity
                                      capabilities

  Unverified claims damage trust      Require evidence and approval
                                      before publishing claims

  Appwrite permission                 Default-deny policy, permission
  misconfiguration                    matrix, and direct API tests

  Spam overwhelms the enquiry         Rate limiting, bot protection,
  workflow                            validation, and triage

  Email provider failure              Persist enquiry first; process
                                      notification asynchronously and
                                      retry

  Confidential customer data exposure Private storage, least privilege,
                                      access logging, retention policy

  Founder capacity limits delivery    Start with a narrow service
                                      catalogue and qualified specialist
                                      partners

  Feature scope delays launch         Keep MVP boundaries and defer
                                      client portal, payments, and
                                      complex integrations
  -----------------------------------------------------------------------

Dependencies: - Confirmed agency name, brand assets, and domain. -
Verified business contact information. - Final service descriptions and
scope boundaries. - Appwrite project and hosting configuration. -
Privacy/terms review. - Email provider configuration. - Approved admin
users and role assignments.

## 15. Acceptance and launch criteria

The MVP may proceed to production only when:

-   Public pages and navigation work across supported device sizes.
-   Visitors can find services and submit an enquiry.
-   Form validation works on both client and server.
-   Enquiries persist even if email notification fails.
-   Anonymous users cannot access internal records.
-   Staff without appropriate roles cannot access privileged actions
    through direct API calls.
-   Draft content and private files are inaccessible publicly.
-   Secrets are absent from client bundles and repository history.
-   Critical flows have automated tests.
-   Accessibility and responsive checks are completed.
-   Monitoring and alerting are configured.
-   Backup and restore have been tested.
-   Privacy, terms, contact details, and published business claims are
    reviewed.
-   A production rollback plan and operational owner are documented.

## 16. Open product decisions

Resolve and record these before production:

1.  Final agency name, legal entity, and public contact details.
2.  Exact first-release service catalogue and services delivered
    directly versus through partners.
3.  Appwrite Cloud or self-hosted deployment and production region.
4.  Whether the admin dashboard is included in the first public launch.
5.  Email provider and acknowledgement wording.
6.  Enquiry response expectations and retention period.
7.  Analytics provider and consent model.
8.  Whether private documents and project management are Phase 2 or MVP.
9.  Staff roles, approval authority, and account provisioning process.
10. Backup frequency, RPO, RTO, and restore owner.

## 17. Definition of done

A requirement is complete only when its implementation, authorization,
validation, error handling, accessibility, tests, documentation, and
deployment configuration are complete. A feature that works only in a
developer's browser is not considered production-ready.
