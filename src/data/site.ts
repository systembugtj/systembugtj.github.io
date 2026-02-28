/**
 * Site configuration from _config.yml
 */
export const siteConfig = {
  title: '行进在旅途中，别忘了带干粮',
  description:
    '程序员：一个脑力劳动者社会价值无从体现的职业。',
  author: 'ALBERT LI',
  authorImg: 'albert-li.jpg',
  aboutAuthor:
    'I am a full stack developer focusing on end-end development. Always hungry to keep learning.',
  twitter: 'systembug',
  facebook: 'albert.lee.739978',
  github: 'systembugtj',
  linkedin: 'albert-li-3534468',
  email: 'albert_lee@hotmail.com',
} as const;

export type SiteConfig = typeof siteConfig;
