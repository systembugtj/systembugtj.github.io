---
name: create-blog
description: Creates or edits blog posts in this Astro site. Use when the user asks to create a blog post, add a post, write an article, or references @blog or the blog collection. Includes adding a free hero image (Pexels) when creating a new post.
---

# Create Blog Post (systembug.me)

Creates Markdown posts under the `blog` content collection. Follow this skill so new posts match the project schema and conventions.

## File location

- **Path**: `src/content/blog/{slug}.md`
- **Slug**: Lowercase, hyphen-separated (kebab-case), e.g. `add-apt-repository-command-not-found`, `aliyun-docker-issue-quickfix`. Derive from the post title or topic.

## Frontmatter (YAML)

Use this schema (from `src/content.config.ts`):

| Field         | Required | Type   | Notes |
|---------------|----------|--------|--------|
| `title`       | Yes      | string | Display title (can differ from slug) |
| `date`        | Yes      | string | `YYYY-MM-DD` (e.g. `2017-01-03`) |
| `description`| No       | string | Short summary for listings |
| `img`         | No       | string | Hero/thumbnail filename only, e.g. `linux.jpg` (site resolves under assets) |
| `tags`        | No       | array  | Default `[]`, e.g. `['linux']` or `['Spring Boot','OAuth2']` |

Example:

```yaml
---
title: add-apt-repository command not found
date: 2017-01-03
img: linux.jpg
tags:
  - linux
---
```

## Body

- Standard Markdown after the frontmatter.
- Use `#` for main heading, `##` for sections when the post has structure.
- Code blocks: use fenced blocks with language (e.g. `shell`, `groovy`, `javascript`).
- Images in body: use path `/assets/img/yourfile.png` (leading slash), e.g. `![alt](/assets/img/20190211_164155506_iOS.png)`.

## Workflow when creating a new post

1. **Slug**: Pick a kebab-case filename from the topic (e.g. "Aliyun Docker quickfix" → `aliyun-docker-issue-quickfix.md`).
2. **Date**: Use today in `YYYY-MM-DD` unless the user specifies another date.
3. **Frontmatter**: Set at least `title` and `date`; add `description`, `img`, and `tags` when relevant.
4. **Content**: Write Markdown; use code blocks and `/assets/img/...` for images as above.
5. **Hero/thumbnail image (recommended)**: Add a free image so the post has a card image on the home page and article header. Follow "Adding a hero/thumbnail image" below.
6. **Place file** at `src/content/blog/{slug}.md`.

## Adding a hero/thumbnail image

Each new post should include an `img` in frontmatter so it shows a thumbnail on the home page. Use a **free, open-source** image (no attribution required for use; attribution appreciated).

### Source: Pexels

- **Site**: [pexels.com](https://www.pexels.com/) — free for personal and commercial use; attribution not required.
- **Search**: Use a query that matches the post topic (e.g. "code programming", "javascript", "web development", "laptop code").
- **Pick**: Choose a landscape or square image that works as a card thumbnail (code on screen, browser, dev setup, etc.).

### Steps

1. **Choose filename**: Use a short, slug-like name, e.g. `wsxjs.jpg`, `docker-fix.jpg`. Store under `public/assets/img/`.
2. **Download**: Download the image from Pexels (or use a direct URL with `curl`). Save as `public/assets/img/{filename}` (e.g. `public/assets/img/wsxjs.jpg`).
   - Example Pexels direct URL (code/programming): `https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max`
   - Example curl: `curl -sL -o "public/assets/img/wsxjs.jpg" "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&fit=max"`
3. **Frontmatter**: Add `img: {filename}` to the post (e.g. `img: wsxjs.jpg`). The site resolves it as `/assets/img/{filename}`.
4. **Attribution (optional)**: You may add a line at the end of the post, e.g. `*Cover image: [Photographer Name](Pexels photo URL) / Pexels*`.

### Alternative sources

- **Unsplash** (unsplash.com): Free; prefer linking from their CDN per their guidelines, or download and self-host if the user prefers.
- **Pixabay** (pixabay.com): Free; allows download and reuse; no attribution required.

## Conventions (from existing posts)

- Titles can be English or Chinese; slugs are usually English/kebab-case.
- Tags can be mixed English and Chinese (e.g. `阿里云`, `Scuplture`).
- Short tips: minimal sections; longer posts use `# Introduction` and `## Section` headings.
- For code in posts: prefer concise snippets with language tag; add brief comments if it helps clarity.

## Checklist before finishing

- [ ] File is at `src/content/blog/{slug}.md`.
- [ ] Frontmatter has `title` and `date` (YYYY-MM-DD).
- [ ] No extra properties in frontmatter (only title, date, description, img, tags).
- [ ] **Hero image**: If adding an image, file is in `public/assets/img/{filename}` and frontmatter has `img: {filename}`. Image is from a free source (e.g. Pexels).
- [ ] Body is valid Markdown; code blocks have language identifiers; images use `/assets/img/...` if needed.
