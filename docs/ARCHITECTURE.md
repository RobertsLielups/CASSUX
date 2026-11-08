# Architecture

## Current shape

CASSUX uses a compact pnpm workspace:

```text
apps/web             Next.js App Router UI
packages/game-core   framework-independent deterministic game rules/content
packages/shared      transport-safe domain contracts
e2e                  black-box browser flows
docs                 product and technical decisions
```

This is deliberately a modular monolith, not a distributed system. The boundaries needed for future authoritative multiplayer are present without operating an empty server.

## Technology

- TypeScript in strict mode.
- Next.js and React for routing/rendering.
- Tailwind CSS for responsive visual composition plus a small token layer in global CSS.
- Vitest for pure logic and component tests.
- Playwright for navigation and complete user flows.
- `localStorage` behind `ProgressRepository` for the Milestone 001 guest adapter.

No runtime secrets or external services are required.

## Dependency direction

`apps/web → packages/game-core → packages/shared`

The UI may orchestrate interactions, but scoring, question selection, and progression updates live in `game-core`. `shared` holds stable contracts that a future browser and server can both consume. Packages do not import the web app.

## Current data flow

1. UI requests a randomized session from `selectSessionQuestions`.
2. The selector prefers questions outside the guest’s recent-ID window.
3. `evaluateAnswer` returns correctness and points; the UI locks the choice and reveals the explanation.
4. On completion, `applyCompletedSession` calculates XP and aggregate totals.
5. `LocalStorageProgressRepository` persists a versioned record.

The repository interface is the replacement seam for future authenticated server persistence. Invalid local data fails safely to an empty profile.

## Security boundary

Question keys are bundled client-side only because this is local solo training. Browser state and client scores are never suitable for ranked competition. Before online play, the server must select questions, hold answer keys, accept one idempotent submission, calculate scores/clocks, append match events, and publish only authorized views.

## Accessibility and responsive behavior

Semantic landmarks, fieldsets/radios, visible focus outlines, text labels accompanying color feedback, high-contrast tokens, and `prefers-reduced-motion` support are baseline requirements. Layout is mobile-first, with bottom navigation on small screens and a persistent sidebar on desktop.

## Future infrastructure decisions

PostgreSQL/Supabase is the preferred persistence/auth direction and an authoritative TypeScript game server (Colyseus or equivalent) is the starting candidate. These are not dependencies yet. The team should validate hosting, observability, recovery, privacy, latency, and operational cost before selection.
