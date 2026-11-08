# Roadmap

## Milestone 001 — Solo foundation (implemented)

- Responsive Latvian product shell and eight requested views (the two solo modes are separate views).
- 24 reviewed original questions, pure selection/scoring/progression rules, full session/review loop.
- Versioned local guest adapter, progression/profile/settings, original SVG Stickman.
- Shared multiplayer type foundation, unit/component/E2E tests, production build, and product/engineering documentation.

## Recommended Milestone 002 — Accounts and secure content foundation

1. Add schema-validated content records and a server-only answer/evaluation API.
2. Add PostgreSQL/Supabase migrations, authentication, guest-to-account migration, row-level access policy tests, and cross-device progress.
3. Store session history and topic-level performance, with a durable mistake-review queue.
4. Add an internal review workflow for draft/approved/retired question versions and provenance.
5. Expand Playwright accessibility and mobile regression coverage; add CI.

This milestone should secure the content and persistence boundary before competitive matchmaking.

## Milestone 003 — Authoritative unranked duels

Build one real Case/Premise Duel vertical slice on an authoritative TypeScript server: private rooms, exact shared question, hidden simultaneous submissions, server clocks, event log, reconnection, timeout rules, and explicit bot/human identity. Start unranked; load/abuse test it.

## Milestone 004 — Competitive system

Verified ranked pools, matchmaking, rating categories, result audit, anti-abuse measures, moderation foundations, configurable time controls/scoring, correspondence matches, and notifications. Launch only after fairness and recovery testing.

## Later product milestones

- Immutable-case Solo Detective, then Detective Race and human-controlled suspects.
- Original Mafia and hidden-role sabotage game.
- Original economic strategy and systems simulation.
- Friends, private groups, tournaments, achievements, expanded Stickman cosmetics/animation.
- Validated AI-assisted content and pre-generated reviewed visual pipeline.
- CASSUX Pass/payments only after the documented legal/security gates.

## Experimental backlog

Justify Your Decision mechanics, limited speed bonus, preset classifications, trading marketplace, and open-ended AI evaluation all require research, safety/fairness criteria, and playtesting before ranked use.
