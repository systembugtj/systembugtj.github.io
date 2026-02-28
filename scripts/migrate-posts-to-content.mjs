#!/usr/bin/env node
/**
 * Migrate Jekyll _posts/*.markdown to Astro src/content/blog/{slug}.md
 * - Slug = filename without date prefix and .markdown (e.g. 2019-09-12-spring-boot-security-oauth2.markdown → spring-boot-security-oauth2)
 * - Preserve front matter: title, date, description, img, tags. Remove layout.
 * - Keep markdown body unchanged.
 * Uses lenient line-based front matter parse so titles with colons work.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, '_posts');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'blog');

function slugFromFilename(filename) {
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.markdown$/i);
  return match ? match[1] : null;
}

function normalizeDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Lenient parse of Jekyll front matter (handles title with colons). */
function parseFrontMatter(raw) {
  const data = {};
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex <= 0) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if (value.includes('#')) value = value.replace(/\s*#.*$/, '').trim();
    if (key === 'tags') {
      const m = value.match(/^\[(.*)\]$/s);
      data.tags = m ? m[1].split(',').map((s) => s.trim()).filter(Boolean) : [];
    } else {
      data[key] = value;
    }
  }
  return data;
}

function splitFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  return { data: parseFrontMatter(match[1]), body: match[2] };
}

function migrate() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.markdown'));
  const results = { created: [], errors: [] };

  for (const file of files) {
    const slug = slugFromFilename(file);
    if (!slug) {
      results.errors.push({ file, message: 'Could not derive slug from filename' });
      continue;
    }
    const srcPath = path.join(POSTS_DIR, file);
    let content;
    try {
      content = fs.readFileSync(srcPath, 'utf8');
    } catch (e) {
      results.errors.push({ file, message: e.message });
      continue;
    }
    const { data, body } = splitFrontMatter(content);

    const title = data.title ?? '';
    const dateStr = normalizeDate(data.date);
    const description = data.description ?? '';
    const img = (data.img ?? '').trim();
    const tags = Array.isArray(data.tags) ? data.tags : [];

    const newFrontMatter = {
      title,
      date: dateStr,
      ...(description && { description }),
      ...(img && { img }),
      ...(tags.length > 0 && { tags }),
    };

    const fmString = YAML.stringify(newFrontMatter).trim();
    const outContent = `---\n${fmString}\n---\n\n${body.trimStart()}\n`;

    const outPath = path.join(OUT_DIR, `${slug}.md`);
    try {
      fs.mkdirSync(OUT_DIR, { recursive: true });
      fs.writeFileSync(outPath, outContent, 'utf8');
      results.created.push(outPath);
    } catch (e) {
      results.errors.push({ file, path: outPath, message: e.message });
    }
  }

  return results;
}

const results = migrate();
console.log('Created:', results.created.length);
results.created.forEach((p) => console.log('  ', p));
if (results.errors.length) {
  console.error('Errors:', results.errors.length);
  results.errors.forEach((e) => console.error('  ', e.file, e.message));
}
process.exit(results.errors.length ? 1 : 0);
