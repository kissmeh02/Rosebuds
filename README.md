# Rosebud Cannabis Website

Production-ready static website for Rosebud Cannabis, focused on an Ontario 19+ audience with completed content pages, legal pages, and polished storefront landing experience.

GitHub repository description:
`Rosebud Cannabis website for Ontario adults 19+ with responsive storefront landing page, legal content pages, and SEO-ready metadata.`

## What is included

- Full responsive landing page (`index.html`)
- Externalized styling (`styles.css`) and behavior (`script.js`)
- Age-gate with local persistence (`localStorage`)
- Completed footer links with real local pages:
  - `cannabis-101.html`
  - `strain-guide.html`
  - `responsible-use.html`
  - `producers.html`
  - `careers.html`
  - `privacy-policy.html`
  - `terms-of-use.html`
- Custom `404.html` page
- SEO essentials: `robots.txt`, `sitemap.xml`, `site.webmanifest`
- Deployment configs for Vercel (`vercel.json`) and Netlify (`netlify.toml`)

## Quick start

```bash
npm install
npm run dev
```

Vite will print the local URL (for example `http://localhost:5173` or the next available port).

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - lint JavaScript files
- `npm run lint:fix` - auto-fix lint issues where possible
- `npm run format` - format files with Prettier
- `npm run format:check` - verify formatting

## Key files

- `index.html` - homepage markup and all core content sections
- `styles.css` - primary site styles for the homepage
- `script.js` - age gate, scroll effects, newsletter feedback, dynamic year
- `404.html` - standalone not-found page styling/content
- `privacy-policy.html` - privacy terms page
- `terms-of-use.html` - legal terms page

## Deployment

### Vercel

This project uses [Vite](https://vitejs.dev/); the production bundle is written to `dist/`.

**GitHub → Vercel (recommended):** In the [Vercel dashboard](https://vercel.com/dashboard), import this repository, set **Framework Preset** to Vite (or **Build Command** `npm run build` and **Output Directory** `dist`). Pushes to `main` trigger production deploys; pull requests get preview URLs.

**CLI:**

```bash
npm run build
vercel deploy --prod
```

**How others see the site:** After deploy, Vercel assigns a production URL under **Project → Settings → Domains** (typically `https://<project>.vercel.app`). Anyone with that link can open the live site. You can add a **custom domain** there; DNS propagates in minutes to hours depending on the registrar.

### Netlify

The included `netlify.toml` publishes the repository root. If you build with Vite first and want to ship the `dist` folder instead, align the Netlify **Publish directory** with your chosen output (for example `dist`).

```bash
npm run build
netlify deploy --prod --dir=dist
```
