import type { CollectionEntry } from 'astro:content';

/**
 * Sort blog entries by date descending (newest first).
 * Use with getCollection('blog'): (await getCollection('blog')).sort(sortBlogByDateDesc)
 */
export function sortBlogByDateDesc(
  a: CollectionEntry<'blog'>,
  b: CollectionEntry<'blog'>
): number {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

/** Format blog date with time for display (e.g. "Feb 28, 2026, 2:30 PM") */
export function formatBlogDateTime(d: Date): string {
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  });
}
