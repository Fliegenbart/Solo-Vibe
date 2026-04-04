# Upload Onboarding Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a believable first-use flow so a solo builder can start a new project, choose how they upload code, and see what Solo-Vibe will do next.

**Architecture:** Keep the current clickable prototype lightweight and client-friendly. Add a dedicated `/new` route with a guided upload wizard, connect the existing sidebar button to it, and keep all content driven by focused mock data plus local component state instead of introducing a backend.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, existing shadcn/Base UI components.

---

### Task 1: Add structured upload-step data

**Files:**
- Modify: `prototype/lib/types.ts`
- Modify: `prototype/lib/mock-data.ts`

- [ ] **Step 1: Add the new types**

Add a small set of types for upload sources, wizard steps, and post-upload checks so the new page can stay data-driven instead of hardcoded.

- [ ] **Step 2: Add demo upload content**

Create a mock set of upload options and a short checklist that explains what Solo-Vibe will inspect after upload:
- ZIP export from AI tools
- local project folder
- GitHub import placeholder marked as “later”

- [ ] **Step 3: Run project checks**

Run: `npm run lint`
Expected: PASS

### Task 2: Build the `/new` onboarding screen

**Files:**
- Create: `prototype/components/onboarding/upload-option-card.tsx`
- Create: `prototype/components/onboarding/upload-flow.tsx`
- Create: `prototype/app/new/page.tsx`

- [ ] **Step 1: Build a reusable upload option card**

Create a small card/button component that shows:
- name
- one-line explanation
- status badge (`Ready now`, `Soon`)
- visual active state when selected

- [ ] **Step 2: Build the multi-step upload flow**

Create a client component with three clear moments:
- choose input type
- review what Solo-Vibe detects and stores
- show success state with next actions

The flow should feel like a product onboarding screen, not a generic admin form.

- [ ] **Step 3: Add the route page**

Create `prototype/app/new/page.tsx` and render the upload flow inside the existing app shell so it feels like a natural part of the prototype.

- [ ] **Step 4: Run project checks**

Run: `npm run lint`
Expected: PASS

### Task 3: Wire the new entry points into the existing prototype

**Files:**
- Modify: `prototype/components/layout/sidebar.tsx`
- Modify: `prototype/app/page.tsx`
- Modify: `prototype/components/layout/header.tsx`

- [ ] **Step 1: Connect the sidebar button**

Turn the existing `New Project` button into a real navigation action to `/new`.

- [ ] **Step 2: Improve dashboard guidance**

Add a small helper line or CTA on the dashboard so first-time users understand that they can upload code, not write it inside Solo-Vibe.

- [ ] **Step 3: Make the header aware of the new route**

Show a helpful title/subtitle on `/new` so the user immediately understands what this page is for.

- [ ] **Step 4: Run project checks**

Run: `npm run lint`
Expected: PASS

### Task 4: Final verification

**Files:**
- Verify only

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Smoke-check the flow**

Run: `npm run dev`
Expected: Dashboard opens, `New Project` goes to `/new`, and the wizard can move through all states without errors.
