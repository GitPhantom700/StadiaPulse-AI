# Original User Request

## Initial Request — 2026-07-24T07:37:46Z

<USER_REQUEST>
Enhance a public GitHub repository for a React Vite project to be highly presentable for the open-source community, and deploy it automatically to GitHub Pages via Actions while ensuring sensitive API keys are strictly excluded.

Working directory: ~/Desktop/google_projects/challenge1
Integrity mode: demo

## Requirements

### R1. Community-Ready Presentation
Implement best practices for open-source repository presentation. This includes creating a highly visual `README.md` with a project overview, screenshots (if applicable), and setup instructions. Additionally, generate community files including `CONTRIBUTING.md`, Issue templates, PR templates, and a basic architecture diagram (mermaid).

### R2. Automated GitHub Pages Deployment
Configure a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the Vite React app to GitHub Pages whenever changes are pushed to the `main` branch.

### R3. API Key Security
Ensure that no sensitive API keys (e.g., Gemini API keys) are committed to the repository or included in the static build. The app must rely on the user providing their own key via the UI at runtime. Ensure `.env` and `.env.local` files are properly ignored.

## Acceptance Criteria

### R1. Presentation
- [ ] `README.md` exists and contains sections for Features, Setup, and Usage.
- [ ] `CONTRIBUTING.md` exists.
- [ ] `.github/ISSUE_TEMPLATE` and `.github/PULL_REQUEST_TEMPLATE.md` exist and contain structured forms.
- [ ] `README.md` contains a mermaid architecture diagram.

### R2. Deployment
- [ ] `.github/workflows/deploy.yml` exists and is configured for Vite to GitHub Pages deployment.
- [ ] `vite.config.js` is correctly configured with a `base` path if necessary for GitHub Pages.

### R3. Security
- [ ] `.gitignore` contains entries for `.env`, `.env.*`.
- [ ] A quick codebase search confirms no raw `AIzaSy...` or `AQ....` strings exist in the tracked source files.
</USER_REQUEST>
