# Project Plan: StadiaPulse AI Repo Enhancement

## Architecture
Vite + React open-source application with PWA capabilities and Google Antigravity integration.
Deployed via GitHub Actions to GitHub Pages.

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | R1 Community-Ready Presentation | README.md (with Mermaid diagram & Usage), CONTRIBUTING.md, .github issue/PR templates | None | IN_PROGRESS |
| 2 | R2 Automated GitHub Pages Deployment | .github/workflows/deploy.yml, vite.config.js base path | M1 | PLANNED |
| 3 | R3 API Key Security | .gitignore .env rules, raw API key scan, UI runtime key check | None | PLANNED |
| 4 | Final Milestone & Verification | E2E build, review, challenge, and forensic audit | M1, M2, M3 | PLANNED |

## Interface Contracts & Layout
- GitHub Actions workflow: `.github/workflows/deploy.yml` triggered on push to `main`.
- Vite config base path: `base: './'` or `base: process.env.GITHUB_PAGES === 'true' ? '/challenge1/' : '/'` (or relative path `./` compatible with GitHub Pages subpath hosting).
- Templates: `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/feature_request.md`, `.github/PULL_REQUEST_TEMPLATE.md`.
