# My Blog

Personal blog powered by [Astro](https://astro.build), deployed on GitHub Pages.

- **Site:** [www.systembug.me](https://www.systembug.me)
- **Local:** `npm run dev` → http://localhost:4321
- **Build:** `npm run build` → output in `dist/`
- **Deploy:** Push to `master` triggers GitHub Actions → GitHub Pages

## Structure

- `src/content/blog/` — Markdown posts (content collection)
- `src/pages/` — Home, pagination, tags, RSS, 404, post routes
- `src/layouts/` — BaseLayout, MainLayout (sidebar + content)
- `src/styles/` — SCSS (from original Jekyll theme)
- `public/assets/` — Images, fonts, CNAME

## RSS

Feed: `/rss.xml`
