# Content

Editorial content for the platform lives here as later phases ship:

- `journal/`   — The Slayton Home Journal articles (Part 7)
- `projects/`  — Project Library records using the Part 8 template
- `resources/` — Downloadable homeowner guides and checklists

Content shapes are defined in `src/types/content.ts` so authored
content and rendering components share one contract. Directories are
created by the phase that first populates them — no empty scaffolding.
