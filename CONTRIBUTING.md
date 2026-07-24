# Contributing to StadiaPulse AI 🏟️

First off, thank you for considering contributing to **StadiaPulse AI**! Open-source contributions help make stadium safety and event intelligence better for fans everywhere.

Please read through these guidelines before submitting code or proposing changes.

---

## 📜 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. 
- **Be respectful**: Treat all contributors with kindness and professional courtesy.
- **Be constructive**: Focus feedback on code and technical solutions.
- **Be collaborative**: Assist fellow developers and accept feedback gracefully.

---

## 🚀 How to Contribute

### 1. Reporting Bugs
Before creating a bug report, please check existing issues to avoid duplicates. When filing a bug report, use the **Bug Report** issue template and include:
- A clear, descriptive title.
- Step-by-step instructions to reproduce the issue.
- Expected vs. actual behavior.
- Browser and OS details.

### 2. Suggesting Features
Feature requests are always welcome! Use the **Feature Request** issue template to describe:
- The problem or use case the feature solves.
- Proposed solution or behavior.
- Any alternative solutions considered.

---

## 💻 Development Workflow

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

### Local Setup
1. **Fork the Repository**: Click the **Fork** button at the top right of the GitHub repository.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/stadiapulse-ai.git
   cd stadiapulse-ai
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start local development server**:
   ```bash
   npm run dev
   ```

### Branching Convention
Create a descriptive branch for your work:
- `feat/feature-name` for new features
- `fix/bug-description` for bug fixes
- `docs/documentation-update` for documentation changes

```bash
git checkout -b feat/add-restroom-filter
```

---

## 🔍 Code Style & Quality Standards

- **React 19 & Functional Components**: Write clean, modern functional components using React hooks.
- **Linter Verification**: Run Oxlint before committing to ensure formatting and linting standards:
  ```bash
  npm run lint
  ```
- **Security & API Keys**: **NEVER** commit raw API keys (such as Google Gemini API keys) or `.env` files. Ensure runtime user key prompt behavior is maintained.
- **Build Verification**: Ensure the production build completes without errors:
  ```bash
  npm run build
  ```

---

## 🔀 Pull Request (PR) Process

1. **Keep PRs Focused**: Each PR should address a single feature or bug fix.
2. **Use the PR Template**: Complete all sections in `.github/PULL_REQUEST_TEMPLATE.md`.
3. **Link Related Issues**: Use GitHub keywords (e.g., `Fixes #12`).
4. **Self-Review**: Review your own diff to catch accidental changes or debug statements.
5. **Continuous Integration**: Ensure all automated checks (linter, build) pass.

---

## ❓ Questions?
If you have questions about the codebase or contributing process, feel free to open a discussion or ask in your issue thread. Thank you for making StadiaPulse AI awesome!
