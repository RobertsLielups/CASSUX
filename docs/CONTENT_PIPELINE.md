# Content Pipeline

## Current content

Milestone 001 contains 24 original Latvian questions in source control. Each is marked `original` and `verified`, has a stable ID/version, one type/category/difficulty, exactly three options, one answer index, and an explanation. Automated tests enforce structural invariants. Human editorial review remains essential for meaning and ambiguity.

Because this is local solo training, answer keys are delivered to the browser. Ranked play must store and evaluate them server-side.

## Planned validated pipeline

1. Generate a structured scenario with AI or adapt a suitably licensed source.
2. Freeze all relevant facts.
3. Produce exactly three distinct answer choices.
4. Identify the intended answer.
5. Write a logical explanation.
6. Independently validate the reasoning.
7. test ambiguity, contradictions, factual accuracy, cultural/linguistic quality, and sensitivity.
8. Review, revise, or reject.
9. Store approved version and provenance.
10. Release only eligible versions to the correct pool.

Required metadata: ID, language, type, category, difficulty, scenario, choices, answer, explanation, source type, source URL when relevant, rights/license record, review status, reviewer/audit timestamps, and version. Ranked pools accept only approved immutable versions.

## AI and visual assets — planned, review required

AI output is a draft, never automatic truth. A second model can assist but does not replace accountable review. Image/video assets (including a possible future Higgsfield integration) should be pre-generated and reviewed, visually consistent, rights-cleared, and stored before a match. Critical labels, timestamps, and diagrams should be added deterministically. Visual-generation errors cannot determine ranked outcomes, and credentials remain server-side.

External sources require provenance and commercial-use rights. Do not copy protected characters, maps, artwork, branding, or source code.
