# CASSUX

**Think. Play. Outsmart. / Domā. Spēlē. Pārspēj.**

CASSUX is the foundation of a competitive reasoning and multiplayer strategy platform. Milestone 001 is a local-first Latvian web application with two complete solo training loops, 24 reviewed original questions, transparent scoring, mistake review, and guest progression saved in the browser.

## What works now

- Responsive Home, Play, Learn, Progress, Profile, and Settings areas.
- Solo Case and Premise Training: randomized five-question sessions, three choices, locked submissions, explanations, results, restart, and incorrect-answer review.
- 12 case questions and 12 premise questions across three difficulty levels.
- Local guest XP, level, sessions, answer totals, and accuracy.
- Original accessible SVG Stickman.
- Pure TypeScript game rules and future multiplayer contracts.
- Unit, component, and browser end-to-end tests.

Online multiplayer, authentication, ratings, premium games, payments, notifications, AI generation, and cross-device synchronization are **planned, not available**. Future modes are labelled `Drīzumā` in the interface.

## Requirements

- Node.js 20.19 or newer (Node 22 LTS recommended; the repository includes an `.nvmrc`)
- pnpm 12.18.0 (Corepack can install the pinned version)

No API keys, paid services, database, or `.env` file are required.

## Run locally

```bash
corepack enable
corepack prepare pnpm@12.18.0 --activate
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright install chromium  # first browser-test run only
pnpm test:e2e
```

`pnpm check` runs type checking, linting, unit/component tests, and the production build.

## Repository layout

```text
apps/web/              Next.js UI and browser integration
packages/game-core/    Questions, scoring, selection, and progression rules
packages/shared/       Cross-boundary game and multiplayer contracts
e2e/                   Playwright user-flow tests
docs/                  Product and engineering decisions
```

The correct-answer keys are bundled into the browser application for this local solo prototype. This is intentionally **not** the security model for ranked play; verified questions and scoring must move to an authoritative server before multiplayer is released.

Start with [Product Spec](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), and [Roadmap](docs/ROADMAP.md).

## Data and privacy

Guest progress is stored under `cassux.guest-progress.v1` in browser `localStorage`. It is not an account, is not synchronized, and can be cleared from Settings or with browser site-data controls.
