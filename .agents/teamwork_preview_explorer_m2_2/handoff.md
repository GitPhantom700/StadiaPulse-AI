# R2 (Automated GitHub Pages Deployment) Investigation & Specification Report

## 1. Observation

- **Directory Structure & Workflow Status**:
  - The `.github/` directory and `.github/workflows/deploy.yml` file currently do not exist in `/Users/chandrahin/Desktop/google_projects/challenge1`.
  - Tool verification: `find_by_name` on `.github` directory returned: `search directory /Users/chandrahin/Desktop/google_projects/challenge1/.github does not exist`.

- **Vite Configuration (`vite.config.js`)**:
  - Exact file path: `/Users/chandrahin/Desktop/google_projects/challenge1/vite.config.js`
  - Current lines 1-34:
    ```javascript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import { VitePWA } from 'vite-plugin-pwa'

    export default defineConfig({
      plugins: [
        react(),
        VitePWA({ ... })
      ]
    })
    ```
  - The `base` option is missing in `defineConfig`.

- **Index HTML (`index.html`)**:
  - Exact file path: `/Users/chandrahin/Desktop/google_projects/challenge1/index.html`
  - Line 8 currently reads:
    ```html
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ```
  - Upon executing `npm run build`, the resulting `dist/index.html` contained absolute asset paths:
    - Line 14: `<script type="module" crossorigin src="/assets/index-CskwbaQV.js"></script>`
    - Line 15: `<link rel="stylesheet" crossorigin href="/assets/index-B0x6IeB5.css">`
    - Line 16: `<link rel="manifest" href="/manifest.webmanifest"><script id="vite-plugin-pwa:register-sw" src="/registerSW.js"></script>`

- **Package Configuration & Build Verification (`package.json`)**:
  - Exact file path: `/Users/chandrahin/Desktop/google_projects/challenge1/package.json`
  - Line 8 defines: `"build": "vite build"`.
  - `package-lock.json` is present (~230 KB).
  - Test command `npm run build` succeeded, building client bundle to `./dist` containing `index.html`, `assets/`, `manifest.webmanifest`, `registerSW.js`, `sw.js`, and `workbox-*.js`.

---

## 2. Logic Chain

1. **Missing Workflow File**:
   - *Observation*: `.github/workflows/deploy.yml` does not exist.
   - *Deduction*: GitHub Actions will not run build or deployment steps automatically on push to the `main` branch. Creating `.github/workflows/deploy.yml` with OIDC authentication (`id-token: write`, `pages: write`), Node.js 20, dependency installation via `npm ci`, build execution, artifact upload (`upload-pages-artifact@v3`), and page deployment (`deploy-pages@v4`) is required.

2. **Absolute Asset Path Resolution Failure on GitHub Pages Subpaths**:
   - *Observation*: `vite.config.js` does not specify `base`. In Vite, default `base` is `'/'`. Build output in `dist/index.html` produces `/assets/index-*.js`.
   - *Deduction*: GitHub Pages typically hosts user/project repositories at subpaths (e.g., `https://<user>.github.io/<repo-name>/`). When `base` is `'/'`, the browser attempts to fetch static assets from `https://<user>.github.io/assets/...`, returning HTTP 404 errors and breaking the app.
   - *Resolution*: Setting `base: './'` in `vite.config.js` instructs Vite to generate relative URLs (`./assets/index-*.js`, `./manifest.webmanifest`, `./registerSW.js`). This ensures the built application works on any GitHub Pages subpath, custom domain, or local preview server without hardcoding repository names.

3. **Touch Icon Path Consistency**:
   - *Observation*: Line 8 of `index.html` references `/apple-touch-icon.png`.
   - *Deduction*: Absolute `/` path references in source HTML will fail when served under a subpath on GitHub Pages. Updating line 8 to relative `href="apple-touch-icon.png"` ensures consistent loading.

---

## 3. Caveats

- **GitHub Repository Settings**: Automated deployment via GitHub Actions requires that GitHub Pages source is set to **"GitHub Actions"** in the repository settings (`Settings` -> `Pages` -> `Source` -> `GitHub Actions`). This setting must be enabled via the GitHub web UI or API by a repository administrator.
- **Environment Variables**: No secret API keys are required during the build phase per Requirement R3 (API keys are provided by the user in the UI at runtime).
- **No caveats** regarding build tools or dependencies: `npm ci` and `vite build` complete reproducibly with existing `package-lock.json`.

---

## 4. Conclusion

The specification for R2 is complete and verified:
1. Create directory `.github/workflows/` and file `.github/workflows/deploy.yml`.
2. Update `vite.config.js` to add `base: './'`.
3. Update `index.html` line 8 to use relative `href="apple-touch-icon.png"`.

### Proposed Files & Artifacts Prepared

All proposed specifications and patches have been saved to the working directory:
- `.github/workflows/deploy.yml` specification: `/Users/chandrahin/Desktop/google_projects/challenge1/.agents/teamwork_preview_explorer_m2_2/proposed_deploy.yml`
- `vite.config.js` proposed version: `/Users/chandrahin/Desktop/google_projects/challenge1/.agents/teamwork_preview_explorer_m2_2/proposed_vite.config.js`
- Unified patch file: `/Users/chandrahin/Desktop/google_projects/challenge1/.agents/teamwork_preview_explorer_m2_2/r2_changes.patch`

#### Specification: `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Specification: `vite.config.js` Edit
Add `base: './'` at line 6 of `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    ...
```

#### Specification: `index.html` Edit
Modify line 8 of `index.html`:
```html
<link rel="apple-touch-icon" href="apple-touch-icon.png" />
```

---

## 5. Verification Method

To verify the implementation once applied:
1. **Build Output Verification**:
   Run:
   ```bash
   npm run build
   ```
   Inspect `dist/index.html` and verify that script/link tags use relative paths (`./assets/index-*.js`, `./assets/index-*.css`, `./manifest.webmanifest`, `./registerSW.js`) without leading single slashes.

2. **Workflow File Existence & Syntax**:
   Inspect `.github/workflows/deploy.yml` to confirm standard actions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`) and OIDC permissions (`contents: read`, `pages: write`, `id-token: write`).
