# CLAUDE.md

Agent context for the Badminton New Zealand Team Events frontend. This is the frontend repository of a two-repository project.

## What this is

The browser UI for digitising Badminton New Zealand Team Event submissions (Ranked Team Lists and Tie Lineups), built for non-technical officials to use under time pressure at venues. The API, domain rules, and database live in the separate backend repository.

## Stack

TypeScript, React, Next.js (App Router), TanStack Query for server state. The API client is generated from the backend's OpenAPI schema; do not hand-write API types or calls, regenerate the client from the schema.

## Where the project context lives

The authoritative project documentation lives in the backend repository and is not duplicated here. Read it there:

- `CLAUDE.md`: project summary, stack, key decisions, and engineering standards.
- `docs/non-technical.md`: problem, domain, and requirements.
- `docs/technical.md`: architecture, API design, security, and the ERD.
- `docs/glossary.md`: domain terms.
- `docs/rules.md`: the domain rules.

## Engineering standards

The same bar as the backend: clean, simple, straightforward code, not over-engineered, reliable and production ready, tested where it carries risk. One point specific to the frontend: it may hide what a role cannot do, but it is never the security boundary. The backend enforces authorisation and validation on every request, so never rely on client-side checks for access control or correctness.

## Source of truth

If the code and the docs disagree, the code is the source of truth. Update the doc to match.
