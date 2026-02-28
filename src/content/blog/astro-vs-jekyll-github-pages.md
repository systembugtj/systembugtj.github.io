---
title: Why I Chose Astro Over Jekyll for GitHub Pages
date: 2026-02-28 13:15
img: astro-vs-jekyll.jpg
tags:
  - Astro
  - Jekyll
  - GitHub Pages
  - static site
---

I’ve been hosting this blog on [GitHub Pages](https://pages.github.com/) for years, first with [Jekyll](https://jekyllrb.com/) and then with [Astro](https://astro.build/). Here’s why I switched and why I’d pick Astro again for a static blog on GitHub Pages.

## Same outcome, different stack

Both Jekyll and Astro give you a **static site**: HTML, CSS, and assets. GitHub Pages can serve either. So the “why Astro?” question is really about tooling, workflow, and long-term maintenance, not about what the reader sees.

## Why I moved away from Jekyll

**Ruby and the environment** — Jekyll runs on Ruby. I didn’t want to manage Ruby versions, `bundler`, and Gemfile quirks just to build a blog. With Astro it’s `npm install` and `npm run build`; the same Node/npm setup I already use for other front-end work.

**Older ecosystem** — Many Jekyll plugins and themes were built for an older web. Keeping dependencies and Liquid templates in good shape felt like more friction than I wanted for a personal blog.

**Limited type safety and structure** — Front matter is flexible but not validated. Content lives in `_posts` with date-prefixed filenames; there’s no first-class “content collection” with a schema. I wanted something that could scale to more structure and optional TypeScript without fighting the tool.

## What I get with Astro on GitHub Pages

**Content collections with a schema** — Blog posts live in `src/content/blog/` and are validated with Zod (e.g. `title`, `date`, `tags`, `img`). Typos in front matter or wrong types show up at build time instead of as odd behavior in production.

**TypeScript and modern JS** — Layouts, components, and config are in TypeScript. I get type checking, better editor support, and consistency with the rest of my JS/TS work.

**Zero JS by default** — Astro ships HTML and CSS unless you opt in to client-side JS. For a blog, that means fast loads and no framework runtime. Jekyll is already static; Astro keeps that property while giving a component-based workflow.

**Familiar tooling** — One `package.json`, npm scripts, and optional SCSS (which I kept from the Jekyll setup). Sitemap and RSS are handled by `@astrojs/sitemap` and `@astrojs/rss`; no extra Jekyll plugins to maintain.

**Same URLs and deployment** — I kept the same URL structure (`/:slug/`) and still deploy by pushing the built `dist/` to the `gh-pages` branch (or use GitHub Actions to build from the repo). So the move was mostly a build and source change, not a change for readers or hosting.

## Trade-offs

**Jekyll is built into GitHub Pages** — If you use “GitHub Pages from branch” with the default Jekyll build, you don’t need a separate CI step. With Astro you build locally or in CI and push the output (or use a workflow that builds and deploys). For me, the gain in DX and structure is worth that step.

**Theme and plugin ecosystem** — Jekyll has a long history of themes and plugins. Astro has a smaller but growing set. I was already using a custom layout and SCSS, so I wasn’t relying on a ready-made theme; your mileage may vary if you want a drop-in theme.

## Summary

I chose Astro over Jekyll for this blog because I wanted: no Ruby dependency, TypeScript and content collections, modern tooling, and the same static, fast site. GitHub Pages still hosts it the same way; only the generator changed. If you’re considering a static blog or a Jekyll-to-something migration on GitHub Pages, Astro is a strong option to try.
