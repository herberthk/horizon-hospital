# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Dev server (Turbopack, port 9002):
```bash path=null start=null
npm run dev
```
- Build:
```bash path=null start=null
npm run build
```
- Start (production):
```bash path=null start=null
npm start
```
- Lint:
```bash path=null start=null
npm run lint
```
- Type-check:
```bash path=null start=null
npm run typecheck
```
- GenKit (AI flows) dev:
```bash path=null start=null
npm run genkit:dev
```
- GenKit with watch:
```bash path=null start=null
npm run genkit:watch
```

Notes:
- No test runner is configured in package.json; running a single test is not applicable until a test framework (e.g., Jest/Playwright) is added.
- TypeScript and ESLint errors are ignored during builds (see next.config.ts) — be mindful when validating changes locally.

## Environment

Copy env.example to your local env file and fill values before running:
```bash path=null start=null
cp env.example .env.local   # On Windows PowerShell: Copy-Item env.example .env.local
```
Required keys (see README.md and usage in code):
- Firebase: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, etc.
- Google AI: GOOGLE_GENERATIVE_AI_API_KEY
- Vapi: NEXT_PUBLIC_VAPI_API_KEY, VAPI_PRIVATE_KEY

## High-level Architecture

- Framework: Next.js 15 (App Router) with React 18, Tailwind, shadcn/ui.
- AuthN/AuthZ: Firebase Authentication on the client; server-side verification via Firebase Admin SDK.
- Data: Firestore (client SDK for reads/writes, Admin SDK on server actions for privileged ops).
- AI Layer: GenKit configured with Google Gemini 2.0 Flash; flows live under src/ai/flows.
- Voice Agent: Vapi.ai web SDK (initialized with NEXT_PUBLIC_VAPI_API_KEY) surfaced via a floating action button component.

### Key Modules and Responsibilities

- Routing and Layouts (App Router)
  - src/app/layout.tsx: Root HTML, global providers, Toaster, floating call button.
  - src/app/dashboard/layout.tsx: Server component layout that enforces authentication (redirects unauthenticated users to /login) and renders dashboard UI via a client shell.

- Authentication
  - src/lib/firebase.ts: Client SDK initialization (Auth, Firestore) from NEXT_PUBLIC_* and fallback FIREBASE_* envs.
  - src/lib/firebase-admin.ts: Admin SDK initialization using service account values (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY with \n normalization).
  - Server action guard used by dashboard layout to check session and redirect unauthenticated users.

- AI/Agent Integrations
  - src/ai/genkit.ts: Central GenKit config with googleAI() plugin and default model googleai/gemini-2.0-flash.
  - src/ai/flows/flag-risky-calls.ts: Zod-typed GenKit flow to classify call transcripts as risky, returning { isRisky, riskFactors, summary }.
  - src/ai/vapi.ts: Vapi web client initialized from NEXT_PUBLIC_VAPI_API_KEY; throws early if missing.

- UI Composition
  - src/components/ui: shadcn/ui primitives (accordion, dialog, table, toast, etc.).
  - src/components/dashboard: dashboard shell, call log and details views, user/menu components.
  - src/components/landing: public website sections (hero, departments, header/footer).
  - src/components/shared: cross-cutting components including the voice-call FAB and animations.

- Types and Constants
  - src/types/index.d.ts: Domain types for calls, messages, risk analysis output, and charting.
  - src/constants/index.ts: Shared constants used across features.

### Data and Analytics

- Call entities include id, type, status, cost, timestamp, duration, transcript, recordingUrl, and risk analysis fields.
- Trend and distribution data models (CallTrendData, StatusDistributionData) power charts in the dashboard.

### Notable Config

- next.config.ts: Ignores build-time TS/ESLint errors; enables remote images from Firebase Storage.
- Tailwind + shadcn: Design system and utility classes across components.

## What’s Missing / Not Configured

- Tests: No test scripts or config present; add a test runner before assuming test commands exist.
- CI/CD: No workflows or CI config detected.
- Project rules for other agents: No CLAUDE.md, Cursor rules, or Copilot instruction files found.

## Quick Start

1) Install deps:
```bash path=null start=null
npm install
```
2) Configure .env.local from env.example.
3) Run dev server:
```bash path=null start=null
npm run dev
```
4) Optional: start GenKit flow dev alongside the app for AI workflows:
```bash path=null start=null
npm run genkit:dev
```

## References

- README.md: Screenshots, project overview, tech stack, and deployment commands.
- src/ai/flows/flag-risky-calls.ts: Example GenKit flow pattern for AI features.
- src/lib/firebase-admin.ts and src/lib/firebase.ts: Dual Firebase setup (server vs client).

