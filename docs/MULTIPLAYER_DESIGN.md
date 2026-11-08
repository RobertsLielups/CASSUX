# Authoritative Multiplayer Design

**Status: planned; no online matchmaking or multiplayer is implemented.**

## Trust model

The server owns match state, timers, deadlines, question selection, answer keys, legal transitions, score calculation, results, and rating updates. Client timestamps, scores, roles, and entitlement claims are untrusted. Clients receive only information authorized for that player and phase.

Shared contracts already define `Match`, `MatchParticipant`, `GameMode`, `Question`, `AnswerSubmission`, `MatchState`, `MatchEvent`, `TimeControl`, `RatingCategory`, and `GameResult`. They are design seeds, not a deployed protocol; introduce schema validation and protocol versioning before network use.

## Match lifecycle

1. Server creates room and immutable match configuration.
2. Authorized participants join and receive player-specific snapshots.
3. Server unlocks a round and records its authoritative timestamp/deadline.
4. Commands are authenticated, authorized, schema-validated, idempotent, and checked against current state.
5. Accepted commands create append-only match events and a new state version.
6. Private answers stay hidden until the reveal condition.
7. Server resolves timeout/disconnection rules and final results.
8. Ratings update only after validated completion; audit events remain available for disputes and abuse detection.

Snapshots plus ordered events support reconnection. Each command needs a client command ID; retries must not duplicate submissions or increments.

## Simultaneous live duels

Planned presets: `1+0`, `2+5`, `3+2`, `5+0`, `10+0`, `15+10`. `2+5` means 120 seconds initial time and five seconds added once after an accepted answer. Both clocks start when the question unlocks and stop independently upon accepted submission. Answers remain private until both submit or the round resolves. Correctness dominates scoring: provisional 100 points correct, 0 incorrect, optionally 0–20 speed points.

Initial configurable classification proposal:

| Category | Presets |
|---|---|
| Bullet | 1+0, 2+5 |
| Blitz | 3+2, 5+0 |
| Rapid | 10+0, 15+10 |

Classification and scoring are product configuration, not hard-coded protocol truth.

## Correspondence

Planned per-question deadlines: 1, 3, 8, or 24 hours. A new deadline begins when that question becomes available. State and deadlines persist server-side; players may hold multiple matches. The UI shows who is pending. Correspondence has a separate rating category. Notification delivery and precise forfeit policy remain later decisions.

## Hidden information

Database rows and serialized views must be partitioned by authorization. Never broadcast Mafia roles, culprit identity, confidential character facts, unrevealed answers, or answer keys. Logging must avoid leaking secrets to client-visible telemetry.

## Operational requirements

Authenticated sockets, rate limits, reconnection tokens, monotonic server timing, transactional state changes, moderation for communication, anti-collusion/abuse signals, metrics, tracing, audit retention, recovery tests, and deterministic rule tests are release gates—not optional polish.
