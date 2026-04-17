# Rosebuds Website Setup

Production-ready static website baseline for improving Rosebud Cannabis with best-practice quality checks and launch essentials.

## Included

- Complete responsive homepage UI
- Dynamic product catalog (search, category filter, sort)
- 19+ age gate with local verification state
- FAQ and contact form interactions
- ESLint flat config for browser JavaScript
- Prettier formatting config
- `.editorconfig` for editor consistency
- GitHub Actions CI (`format:check` + `lint`)
- SEO and web essentials: `robots.txt`, `sitemap.xml`, `site.webmanifest`, `404.html`

## Quick start

```bash
npm install
npm run dev
npm run format
npm run lint
```

Open the local URL shown in terminal (usually `http://localhost:5173`) to view the site.

## Environment setup

1. Keep local secrets in `.env` (already ignored by git).
2. Share required variable names in `.env.example`.
3. Never commit real credentials to the repository.

Example variables:

```bash
APP_ENV=development
VITE_API_BASE_URL=https://api.example.com
VITE_PRODUCTS_ENDPOINT=/products
VITE_CONTACT_ENDPOINT=https://api.example.com/contact
```

Notes:

- `VITE_API_BASE_URL` + `VITE_PRODUCTS_ENDPOINT` are reserved for API integration if you later externalize data loading.
- The current homepage is self-contained in `index.html` and does not fetch `data/products.json`.

## Scripts

- `npm run lint` - lint JavaScript files
- `npm run lint:fix` - auto-fix lint issues where possible
- `npm run format` - format files with Prettier
- `npm run format:check` - check formatting without modifying files
- `npm run dev` - start local development server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally

## Project files

- `index.html` - full storefront-style page structure
- `styles.css` - styles used by `404.html`
- `data/products.json` - API-ready product data source
- `assets/product-placeholder.svg` - fallback product image
- `docs/toronto-dispensary-web-requirements.md` - compliance + API architecture checklist
- `robots.txt` - crawler directives
- `sitemap.xml` - XML sitemap
- `site.webmanifest` - web app manifest metadata
- `404.html` - not found page
- `vercel.json` - Vercel deployment and security headers config
- `netlify.toml` - Netlify deployment and headers config

## Launch checklist

- [ ] Replace placeholder product data in `data/products.json` or API endpoint.
- [ ] Add real business info (address, contact channels, hours) in `index.html`.
- [ ] Add favicon and PWA icons, then update `site.webmanifest`.
- [ ] Connect contact form to backend email/CRM endpoint.
- [ ] Run `npm run format:check` and `npm run lint` before each push.
- [ ] Confirm CI passes in GitHub Actions on `main`.
- [ ] Verify age gate behavior and legal wording with compliance requirements.
- [ ] Replace placeholder AGCO seal/CRSA details in the compliance section.

## Design benchmark references

These references were used to benchmark modern dispensary UX and integration patterns:

- [Kushology](https://www.kushology.com/)
- [Tokyo Smoke](https://ca.tokyosmoke.com/)
- [One Plant (Toronto)](https://www.oneplant.ca/locations/toronto-yonge-and-dundas)
- [CAFE Toronto](https://iamcafe.com/)
- [Dutchie POS API](https://api.pos.dutchie.com/pages/overview.html)
- [Weedmaps Menu API](https://developer.weedmaps.com/docs/wm-menu-api-getting-started)

## Deploy

### Vercel

```bash
npm run build
vercel deploy --prod
```

Uses `vercel.json` for headers and clean URLs.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=.
```

Uses `netlify.toml` for headers and 404 behavior.

## Connect to GitHub

1. Initialize git (already done in this setup if you followed assistant steps):
   ```bash
   git init -b main
   ```
2. Commit:
   ```bash
   git add .
   git commit -m "chore: bootstrap website best-practice setup"
   ```
3. Create a new empty repo on GitHub (via web UI), then connect it:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

If you use GitHub CLI:

```bash
gh repo create --source . --private --push
```
