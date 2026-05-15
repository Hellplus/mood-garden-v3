# 更新日志

## V3.0-K

- 新增 GitHub Actions 部署 workflow：`.github/workflows/deploy.yml`。
- workflow 会在推送到 `main` 分支时自动安装依赖、运行 lint、构建项目并上传 `dist`。
- 部署方式改为 GitHub Pages 的 GitHub Actions Source，不使用 `gh-pages` 包，也不从分支根目录直接发布源码。
- 文档补充 GitHub Pages 后台设置步骤、线上访问地址和部署验证清单。
- 确认 Vite base 继续使用 `/mood-garden-v3/`，适配仓库同名 Pages 路径。

## V3.0-J

- 新增 `manifest.webmanifest`，提供 PWA 安装所需的基础元数据。
- 新增简单的 Mood Garden SVG 应用图标。
- 新增手写 service worker，用于缓存基础应用外壳和构建资源。
- service worker 只在生产构建中注册，避免影响本地开发缓存。
- 配置 Vite `base`，适配 GitHub Pages 路径 `/mood-garden-v3/`。
- 文档补充 PWA 行为、本地 localStorage 数据存储边界，以及不提供云同步或推送通知的说明。

## V3.0-I

- 新增真实主题切换、Toast 提示、新手引导持久化和移动端底部导航交互。

## V3.0-H

- 新增 TXT / JSON 导出和 JSON 导入能力。
- 支持覆盖导入与合并导入。

## V3.0-D 至 V3.0-G

- 迁移 localStorage 记录 CRUD。
- 迁移筛选、搜索、排序、标签和收藏管理。
- 迁移基于真实记录的日历视图。
- 迁移基于真实记录的数据分析逻辑。
