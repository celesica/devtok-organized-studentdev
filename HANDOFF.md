# Handoff

*Written 2026-08-14 on jazzyb's Mac. Overwritten every session — git history holds the older ones.*

## Where we stopped
Finished the Architect phase and set up project scaffolding. Read every planning input, wrote `docs/prd.md` and `docs/architecture.md`, resolved two owner decisions (dark ground matching the Claude Design exports; fully-built visuals with zero images), initialized the git repo on `main`, and wrote the three doc-system files (`CLAUDE.md`, `PROGRESS.md`, `HANDOFF.md`). No site code exists yet.

## State: working
Nothing half-applied. Docs and repo scaffolding are complete and consistent. `site/` does not exist yet — the build has not begun.

## The next action
Create the GitHub repo and push `main`, then finalize the host. `gh` CLI is **not installed** on this machine — either install it (`brew install gh`) or create the repo via github.com and add the remote. After that, start the `site/` build with the shell + tab bar + router + keyboard nav.

## Files touched, and why
- `docs/prd.md`, `docs/architecture.md` — the Architect deliverables.
- `CLAUDE.md` — invariants, motive, hard rules, settled decisions, the session ritual.
- `PROGRESS.md` — the durable board (phase: planning complete).
- `HANDOFF.md` — this file.
- `.gitignore` — ignore `.DS_Store`, editor dirs, logs.

## Decisions made
- Palette: dark Ink-Plum ground, match the `.dc.html` exports (owner overrode the brief's cream page).
- Assets: fully built, zero image files; real screenshots addable to slots later.
- Docs: `CLAUDE.md` + `PROGRESS.md` + `HANDOFF.md` now; root `README.md` last; skip `.claude/rules/`.
- Hosting: undecided between GitHub Pages and Cloudflare Pages; both deploy from the repo, so the choice doesn't affect the build.

## Open questions needing me (owner)
- Confirm the GitHub repo name/visibility (public, since the site is meant to be shared).
- Final host pick: GitHub Pages (simplest) or Cloudflare Pages (fastest on mobile data).

## Machine state
- Branch `main`, no commits yet at time of writing (initial commit is the immediate next git action).
- Needs on a fresh machine: git; optionally `gh` for repo creation; Python 3 for local preview.
- No remote configured yet.
