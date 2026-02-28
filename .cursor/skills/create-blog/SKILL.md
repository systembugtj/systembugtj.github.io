---
name: create-blog
description: Creates or edits blog posts in this Astro site. Use when the user asks to create a blog post, add a post, write an article, or references @blog or the blog collection.
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
5. **Place file** at `src/content/blog/{slug}.md`.

## Conventions (from existing posts)

- Titles can be English or Chinese; slugs are usually English/kebab-case.
- Tags can be mixed English and Chinese (e.g. `阿里云`, `Scuplture`).
- Short tips: minimal sections; longer posts use `# Introduction` and `## Section` headings.
- For code in posts: prefer concise snippets with language tag; add brief comments if it helps clarity.

## Checklist before finishing

- [ ] File is at `src/content/blog/{slug}.md`.
- [ ] Frontmatter has `title` and `date` (YYYY-MM-DD).
- [ ] No extra properties in frontmatter (only title, date, description, img, tags).
- [ ] Body is valid Markdown; code blocks have language identifiers; images use `/assets/img/...` if needed.
