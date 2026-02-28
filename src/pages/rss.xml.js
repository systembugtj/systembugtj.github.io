/**
 * RSS feed (replaces jekyll-feed).
 * Output: /rss.xml
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';

export async function GET(context) {
  const blog = await getCollection('blog');
  const sorted = blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: `/${post.id}/`,
    })),
    customData: '<language>zh-cn</language>',
  });
}
