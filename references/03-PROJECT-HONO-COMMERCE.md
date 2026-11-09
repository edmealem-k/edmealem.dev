# Project Content — hono-commerce

**Destination:** `src/content/projects/hono-commerce.mdx` (adapt header to your actual MDX schema).
**Status:** Under active development; source repository currently private.
**Owner:** Edmealem Kassahun.
**Display rule:** Content below separates inspected architectural elements from roadmap/intent. Do **not** infer current release readiness or live features from project descriptions.

## Suggested metadata

```yaml
title: "hono-commerce"
slug: "hono-commerce"
tagline: "A multi-tenant e-commerce platform built with TypeScript"
summary: "An evolving commerce platform exploring tenant-aware architecture, authentication, APIs, background processing, and modern full-stack TypeScript."
category: "Full-stack / SaaS"
status: "In development"
featured: true
order: 1
tags: ["TypeScript", "Next.js", "Hono", "Bun", "PostgreSQL", "Drizzle", "Redis", "BullMQ"]
coverImage: "/images/projects/hono-commerce-cover-placeholder.webp"
repositoryUrl: null
liveUrl: null
published: true
```

Do not invent `date`, `completedAt`, metrics, stars, users, revenue, or production link. A private GitHub link may be stored for owner reference but must **not** appear as an actionable public GitHub button. If the UI must show a button, use a neutral disabled state rather than a broken link.

## Main case study body

# hono-commerce

*A multi-tenant e-commerce platform built with modern TypeScript tools.*

## Overview

hono-commerce is a personal engineering project I'm building to explore how a multi-tenant commerce application can be structured across a storefront, an administrative dashboard, an API, and background services.

The project brings together technologies I use for full-stack development while giving me space to work through problems that arise beyond a simple CRUD application: tenant-aware permissions, data ownership, service boundaries, file storage, asynchronous work, and maintainable database design.

The platform is **under active development**. I use it as an evolving architecture and implementation project, rather than presenting it as a fully launched production e-commerce service.

## Why I started it

Commerce applications touch many connected workflows. A single user action may involve authorization, data validation, a database update, an external service, and a background task. In a multi-tenant product, all of those operations also need to respect the organization or workspace that owns the data.

I wanted a project where I could design those boundaries intentionally and learn from implementing them.

## Technology stack

- **Language and runtime:** TypeScript, Bun.
- **Frontend:** Next.js and React.
- **API:** Hono, with typed client/API integration patterns.
- **Database:** PostgreSQL with Drizzle ORM.
- **Authentication:** Better Auth in shared authentication infrastructure.
- **Asynchronous processing:** Redis, BullMQ, dedicated worker application.
- **Storage workflows:** S3-based file upload and lifecycle-related operations.
- **Project organization:** Multi-application monorepo with reusable packages.

Only mention components verified to exist in the inspected codebase. The **presence of a package or service is not proof every connected business workflow works end to end.**

## Architecture and design

The codebase is organized around applications and shared packages. The frontend applications cover different responsibilities, while shared code centralizes cross-cutting concerns such as data models, authentication, types, and queue integration.

Typical architectural responsibilities include:

- Separating user-facing storefront experiences from administrative workflows.
- Exposing backend functionality through a dedicated Hono API.
- Representing organization membership and permissions explicitly.
- Designing tenant-scoped operations to avoid accidental cross-organization access.
- Using background workers for work that does not belong in the critical request path.
- Keeping database queries, validation, and domain behavior organized for maintainability.

[TODO: add an owner-approved architecture diagram showing only the components actually in the current revision.]

## Engineering focus

### Tenant-aware access control

A core concern is ensuring that a user can access only the resources permitted within their current organization or tenant. This requires more than checking whether a user is logged in: requests must establish tenant context, resolve membership, enforce permissions, and scope data operations accordingly.

### Type-safe API contracts

I use TypeScript and Hono to make API interactions easier to reason about across the frontend and backend. Validation, response shapes, and clear boundaries help prevent integration mistakes as the project grows.

### File-upload lifecycle

The repository includes upload-session and confirmation concepts around S3-style storage workflows. I use this area to think about permission checks, incomplete uploads, status transitions, cleanup, and how to avoid leaving inconsistent application records.

### Background processing

The project includes a worker/queue architecture built around BullMQ and Redis. A reliable background task needs more than an enqueue call: retry behavior, deduplication/idempotency, failure visibility, and recovery all matter.

These sections describe engineering areas explored in the codebase; they are **not** claims that every edge case has been solved.

## Current status and next steps

hono-commerce is still being developed and refined. My near-term focus is on completing coherent business flows, hardening authorization and transaction boundaries, improving test coverage, and validating behavior through real application scenarios.

Planned or not-yet-verified capabilities should remain labeled **planned** in case-study copy. Do not claim fully operational product catalogs, order processing, payment checkout, customer storefronts, subscriptions, or enterprise readiness until verified and demonstrated.

## What I'm learning

The most useful part of the project is treating backend features as connected systems rather than isolated endpoints. Authentication decisions influence query design, queue semantics influence data consistency, and seemingly simple actions like an upload confirmation raise questions about concurrency and recovery.

Working through these tradeoffs is why I continue investing in the project.

## Explore the project

- **Source:** private during active development — no public source link at this time.
- **Demo:** `[TODO: insert a real public demonstration only after one is available]`.
- **Screenshots:** `[TODO: provide genuine screenshots of working flows]`.
- **Technical notes:** `[TODO: link related blog articles after publication]`.

---

## Implementation notes for the agent (do not render)

The upstream design has a basic project detail page with title, image, optional Live URL/GitHub links and Portable Text body. Convert this copy into the chosen MDX format while preserving that layout. If the migration supports rich headings/lists and code callouts, format them within existing typography. Make the private repository button non-clickable or omit safely. Use neutral placeholder image; **no screenshots of another app pretending to be this project**.

Status claims must be reconciled against the latest private repository when access is available. Do not use examples or historical repo snapshots to claim deployed or completed functionality.
