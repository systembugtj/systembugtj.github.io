# Jekyll → Astro 迁移计划

目标：将 `systembugtj.github.io` 从 Jekyll 迁移到 Astro，保持 GitHub Pages + 自定义域名 `www.systembug.me`，保持现有 URL 与外观行为。

---

## 当前状态摘要

| 项目 | 现状 |
|------|------|
| 文章 | 46 篇，`_posts/YYYY-MM-DD-slug.markdown`，front matter: title, date, description, img, tags |
| 页面 | 首页（分页 8 篇/页）、标签页 `/tags/`、404 |
| 布局 | default → main（侧栏 + 内容区）→ post（单篇）/ index 列表 |
| 样式 | SCSS（main.scss + variables, normalize, syntax, parts, media）|
| 静态资源 | `assets/img`（配图、favicon）、`assets/fonts`（Font Awesome）|
| 域名 | CNAME: www.systembug.me |
| 部署 | GitHub Pages（当前 Jekyll 构建）|

---

## 阶段 0：准备（约 10 分钟）

- [ ] **0.1** 创建迁移分支：`git checkout -b migrate/astro`
- [ ] **0.2** 确认主分支可随时回滚（或备份 `_posts`、`_config.yml`、`_layouts`、`_includes`、`assets`）
- [ ] **0.3** 本地记录当前首页与若干文章 URL，便于迁移后对比

---

## 阶段 1：初始化 Astro 项目（约 15 分钟）

- [ ] **1.1** 在仓库根目录执行：`npm create astro@latest . -- --template minimal --install --no-git --typescript strict`
  - 若提示目录非空，选 “Continue” 或先在空子目录创建再合并
- [ ] **1.2** 安装依赖：  
  `npm install @astrojs/sitemap @astrojs/rss`（sitemap + RSS 替代 jekyll-sitemap / jekyll-feed）
- [ ] **1.3** 如需 SCSS：`npm install sass`（Astro 内置支持）
- [ ] **1.4** 在 `astro.config.mjs` 中配置：
  - `site: 'https://www.systembug.me'`（与 CNAME 一致）
  - `base: '/'`（用户页根路径）
  - 集成 `@astrojs/sitemap`
- [ ] **1.5** 确认 `package.json` 中有 `"build": "astro build"`，输出目录为 `dist/`

---

## 阶段 2：内容层（Content Collections）（约 30 分钟）

- [ ] **2.1** 创建博客集合目录：`src/content/blog/`
- [ ] **2.2** 在 `src/content/config.ts` 中定义集合 `blog`：
  - 字段：`title`(string), `date`(date), `description`(string, 可选), `img`(string, 可选), `tags`(array)
  - 与现有 Jekyll front matter 对齐
- [ ] **2.3** 迁移文章：
  - 将 `_posts/*.markdown` 复制到 `src/content/blog/`
  - 文件名改为 `slug.md`（用原文件名中的 slug 部分，如 `spring-boot-security-oauth2.md`）
  - 在 front matter 中保留 `title`, `date`, `description`, `img`, `tags`；若原为 `layout: post` 可删除（由 Astro 路由决定）
- [ ] **2.4** 配置 `src/pages/blog/[...slug].astro` 动态路由，使文章 URL 为 `/:slug/`（与当前 Jekyll `permalink: ':title/'` 一致）
  - 从 collection 按 slug 取文章，渲染单篇布局
- [ ] **2.5** 若需保持“日期+标题”文件名风格，可在 front matter 中用 `slug` 覆盖 URL，或统一在代码里用 front matter 的 title 转 slug；优先保证现有链接不破（可做 301 或保持一致）

---

## 阶段 3：布局与页面组件（约 45 分钟）

- [ ] **3.1** 抽站点配置：创建 `src/config.ts` 或 `src/data/site.ts`，从 `_config.yml` 迁入：
  - title, description, author, author-img, about-author, twitter, facebook, github, linkedin, email
- [ ] **3.2** **BaseLayout**（对应 Jekyll `default`）：
  - `src/layouts/BaseLayout.astro`：`<html>`, `<head>`（meta、OG、Twitter、字体、FA、全局 CSS），`<body>` 只包 `slot`
- [ ] **3.3** **Sidebar**（对应 main 的 aside）：
  - `src/components/Sidebar.astro`：作者头像、名字、about-author、Contact me、社交链接、版权年份
  - 数据来自站点 config
- [ ] **3.4** **MainLayout**：
  - `src/layouts/MainLayout.astro`：左侧 Sidebar + 右侧 content box，中间放 `<slot />`
- [ ] **3.5** **首页** `src/pages/index.astro`：
  - 使用 MainLayout
  - 从 `getCollection('blog')` 取文章，按 date 降序，分页（每页 8 篇）
  - 第一页 `/`，后续页 `/page/2`, `/page/3`…（需 `src/pages/page/[page].astro`）
  - 每篇展示：缩略图（若有）、标题链接、摘要、日期、阅读时间（可按字数估算）
- [ ] **3.6** **分页组件**：`src/components/Pagination.astro`，接收当前页、总页数、basePath（`/` 或 `/page/`），渲染上一页/下一页链接
- [ ] **3.7** **文章页布局**：
  - 使用 MainLayout，正文区：封面图（若有）、标题、日期、Markdown 内容、标签、分享链接（Twitter/Facebook）、Disqus 占位（若保留）
- [ ] **3.8** **标签页** `src/pages/tags.astro`：
  - 从 collection 聚合所有 tags，按标签分组列出文章，链接到 `/:slug/` 和锚点 `#tagName`
- [ ] **3.9** **404**：`src/pages/404.astro`，使用 BaseLayout 或 MainLayout，简单提示

---

## 阶段 4：样式（约 30 分钟）

- [ ] **4.1** 将 `assets/css/scss/` 拷贝到 `src/styles/`（或保留在 `public/` 仅全局引入；推荐放入 `src` 便于按需导入）
- [ ] **4.2** 在 BaseLayout 或全局入口中引入主样式：`import '../styles/main.scss'`（Astro 支持 SCSS）
- [ ] **4.3** 若有语法高亮：Astro 默认 Markdown 代码块可配 `shiki` 或 `prism`，对应替换原 `_syntax.scss` 的类名
- [ ] **4.4** 检查响应式与首页/文章/标签样式是否与现站一致，按需微调

---

## 阶段 5：静态资源与 SEO（约 15 分钟）

- [ ] **5.1** 将 `assets/img` 放入 `public/assets/img`（favicon 保持 `public/assets/img/favicon/`）
- [ ] **5.2** 将 `assets/fonts` 放入 `public/assets/fonts`
- [ ] **5.3** 文章中引用图片路径统一为 `/assets/img/xxx`（与现有一致）
- [ ] **5.4** 在 BaseLayout 的 `<head>` 中保留 favicon、apple-touch-icon、theme-color 等
- [ ] **5.5** 每页 SEO：文章页用 `Astro.props` 或 front matter 生成 title、description、og:image（若 `img` 存在）；首页/标签用站点 config

---

## 阶段 6：GitHub Pages 部署与域名（约 20 分钟）

- [ ] **6.1** 在仓库创建 `.github/workflows/deploy.yml`：
  - 使用官方 `withastro/action@v3` 构建
  - 使用 `actions/deploy-pages` 部署
  - 触发：push 到默认分支（如 main）
  - 仓库 Settings → Pages → Source 选 “GitHub Actions”
- [ ] **6.2** 保留仓库根目录 `CNAME` 内容为 `www.systembug.me`（或把 CNAME 放到构建输出根，依 Actions 习惯；多数做法是 `CNAME` 在 `public/` 或构建后复制到 dist）
- [ ] **6.3** 确认 `astro.config.mjs` 的 `site` 为 `https://www.systembug.me`，构建出的绝对 URL 正确
- [ ] **6.4** 提交并 push 迁移分支，在 Actions 中确认 build 成功且 Pages 部署正常

---

## 阶段 7：清理与收尾（约 15 分钟）

- [x] **7.1** 删除或归档 Jekyll 相关：`_config.yml`, `_layouts/`, `_includes/`, `_posts/`（已迁到 content collection）、`Gemfile` / `Gemfile.lock`、`gulpfile.js`、`index.html`、`tags.html`、`404.html`；Astro 的 `package.json` 已无 Gulp/Jekyll 依赖
- [ ] **7.2** 若保留 Forestry/Tina：后续在 Astro 中对接其配置；迁移阶段可只保留内容与 URL
- [x] **7.3** 全站自测：首页、分页、标签页、若干文章、404、RSS/sitemap（用户确认通过）
- [x] **7.4** 将 `migrate/astro` 合并到主分支并推送，启用 GitHub Pages (Source: GitHub Actions)

---

## 实施检查清单（按顺序执行）

1. 阶段 0：创建分支、备份、记录 URL
2. 阶段 1：`npm create astro`、安装 sitemap/rss/sass、配置 `astro.config.mjs`
3. 阶段 2：定义 blog collection、迁移 46 篇文章、实现 `[...slug].astro` 与 URL 一致
4. 阶段 3：站点 config → BaseLayout → Sidebar → MainLayout → index + 分页 → 文章页 → tags → 404
5. 阶段 4：迁移 SCSS、全局引入、语法高亮
6. 阶段 5：`public/assets`、favicon、SEO meta
7. 阶段 6：GitHub Actions workflow、CNAME、Pages 源
8. 阶段 7：删除 Jekyll 文件、测试、合并

---

## 风险与注意事项

- **URL 一致性**：文章链接必须与现网一致（如 `/:title/`），避免外链和搜索引擎失效；可在 Astro 中通过 `getStaticPaths` + slug 映射保证。
- **Disqus**：若继续使用，在文章布局中保留 Disqus 脚本与 `page.identifier`（可用当前 URL 或 slug）。
- **RSS**：用 `@astrojs/rss` 在 `src/pages/rss.xml.js` 生成 feed，替代 jekyll-feed。
- **Tina/ Forestry**：迁移完成后再接；Astro 有 Tina 方案，Forestry 也可对接 Git 仓库中的 Markdown。

完成以上步骤后，站点将运行在 Astro + GitHub Pages 上，并继续使用 `www.systembug.me`。
