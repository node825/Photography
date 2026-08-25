# Change Pipeline

How a change moves from an idea to merged code, using the OpenSpec intake
flow and the GitHub Copilot cloud agent.

## Flow

```
intake issue (change-request.yml)
  → spec agent (openspec.agent.md, Copilot cloud agent)
  → [spec] PR, touches only openspec/
  → Gate 1: human merges (Spec PR Guard + CI/openspec must be green)
  → implementation issue, referencing the merged change
  → Copilot cloud agent opens a Draft PR
  → Gate 2: human clicks "Approve and run workflows"
  → CI runs (client / server / openspec) + code review
  → Gate 3: human approval, merge to main
```

## Components

| File | Role |
|---|---|
| `.github/ISSUE_TEMPLATE/change-request.yml` | Intake form: `intent`, `scope`, `acceptance`, `boundaries`. Labeled `needs-spec`. |
| `.github/agents/openspec.agent.md` | Cloud agent instructions: turns an intake issue into an OpenSpec change and a `[spec]` PR; scoped away from `client/`, `server/`, and `.github/`. |
| `.github/workflows/spec-pr-guard.yml` | Path guard for `[spec]`-titled PRs. |
| `.github/workflows/ci.yml` | Build/validate checks on every push or PR to `main`. |
| `.github/workflows/copilot-setup-steps.yml` | Environment bootstrap for the cloud agent: Node 24.11.0, `npm ci` in `client/` and `server/`, OpenSpec CLI pinned to `1.10.0`. |
| `openspec/config.yaml` | OpenSpec project config; `githubCopilot.cloudAgent: true`. |
| `openspec/changes/`, `openspec/specs/` | Where spec artifacts land once a change runs. Empty today. |
| `AGENTS.md` + `.github/instructions/*.instructions.md` | Real build/lint commands for `client/` and `server/`; definition of done for a `[spec]` PR. |
| `needs-spec` label | Created manually in repo settings; not auto-created by the issue template. |
| Copilot cloud agent | Enabled per `openspec/config.yaml`; actual activation is a GitHub org/repo setting. |
| Branch ruleset | Not yet configured; intended to require the four checks below. |

## Checks and what they enforce

- **`CI / client`** — `npm ci` + `npm run build` in `client/`. No test step (none exists).
- **`CI / server`** — `npm ci` in `server/`. No test step (placeholder script only exits 1).
- **`CI / openspec`** — installs OpenSpec CLI `1.10.0`, runs `openspec validate --all --strict`.
- **`Spec PR Guard / spec-pr-guard`** — on PRs titled `[spec]` only: fails if any changed file is outside `openspec/`.

## Known limitations

- No test suite in `client/` or `server/`. Adding one is intended to be the first change run through this pipeline end to end.
- `CI / openspec` passes vacuously today — `openspec/changes/` and `openspec/specs/` are empty, so there is nothing to validate yet.
- `Spec PR Guard` checks file paths only, not spec content, and only runs on PRs already titled `[spec]` — a PR that never uses that prefix is not checked by it at all. Not yet closed.
- None of the four checks are required yet — no branch ruleset enforces them.

## Runbook (browser only)

1. Open a new issue using the **"Change request (pre-spec)"** template. Fill `intent`, `scope`, `acceptance`, `boundaries`.
2. Assign the issue to the Copilot coding agent. It drafts an OpenSpec change and opens a PR titled `[spec] ...` touching only `openspec/`.
3. **Gate 1**: review the PR. `Spec PR Guard` and `CI / openspec` must be green. Merge to `main`.
4. Open (or let the agent open) an implementation issue referencing the merged change. Assign it to the Copilot coding agent.
5. The agent opens a Draft PR with the implementation.
6. **Gate 2**: on the PR, click **"Approve and run workflows"** so `CI / client` and `CI / server` execute.
7. Review the PR (code review, CI status).
8. **Gate 3**: approve and merge to `main`.
