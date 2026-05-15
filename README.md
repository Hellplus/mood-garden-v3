# Mood Garden V3

Mood Garden 是一个本地优先的 React + Vite 心情记录花园。它支持记录每日情绪，把记录展示成花园，并通过筛选、日历、数据分析、导入导出、主题、Toast、新手引导、移动端导航和轻量 PWA 外壳来组成完整体验。

## 当前范围

- React + Vite + JavaScript
- 基于 localStorage 的记录新增、编辑、删除、收藏
- 搜索、筛选、标签、收藏筛选和排序
- 基于真实记录的日历视图
- 基于真实记录的数据分析
- TXT / JSON 导出与 JSON 导入
- 主题切换、Toast 提示、新手引导和移动端底部导航
- V3.0-J PWA 基础能力：manifest、应用图标、service worker 和 GitHub Pages base 路径
- V3.0-K GitHub Actions 自动部署到 GitHub Pages

## 数据存储

记录只保存在当前浏览器的 `localStorage` 中，并继续使用现有 records key。Mood Garden 不提供账号、后端存储、云同步、推送通知或远程备份。

如果需要保留可迁移的数据副本，请定期导出 JSON 备份。

## PWA 说明

V3.0-J 增加了简单、手写的 PWA 层：

- `public/manifest.webmanifest`：提供可安装应用的基础信息。
- `public/icons/icon.svg`：提供 Mood Garden 应用图标。
- `public/service-worker.js`：缓存应用外壳和访问过的构建资源，用于基础离线访问。
- service worker 不缓存、不读取、不管理用户记录；记录仍由 `localStorage` 管理。
- service worker 只会在生产构建中注册，因此 `npm run dev` 不会被缓存行为干扰。

## GitHub Pages

当前 Vite base 路径已按仓库名 `mood-garden-v3` 配置：

```bash
/mood-garden-v3/
```

如果仓库名发生变化，需要同步更新：

- `vite.config.js` 中的 `base`
- `public/manifest.webmanifest` 中的 PWA 路径
- `public/service-worker.js` 中的 `BASE_PATH`

## GitHub Actions 部署

V3.0-K 新增 `.github/workflows/deploy.yml`，用于通过 GitHub Actions 自动发布 `dist` 到 GitHub Pages。

部署方式：

1. 将代码推送到 GitHub 仓库 `mood-garden-v3` 的 `main` 分支。
2. 打开仓库 `Settings` → `Pages`。
3. 将 Source 选择为 `GitHub Actions`。
4. 推送到 `main` 后，workflow 会自动执行：
   - checkout 仓库；
   - 使用 Node 22；
   - 执行 `npm ci`；
   - 执行 `npm run lint`；
   - 执行 `npm run build`；
   - 上传 `dist`；
   - 部署到 GitHub Pages。

线上访问地址格式：

```text
https://<你的 GitHub 用户名>.github.io/mood-garden-v3/
```

如果仓库属于组织，则将用户名替换为组织名。

## 开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm run lint
npm run build
```

如需测试 PWA，请使用生产构建和预览：

```bash
npm run build
npm run preview
```

然后打开 `/mood-garden-v3/` 路径，在浏览器 DevTools 的 Application 面板检查 manifest、service worker 和 cache storage。首次在线访问后，再切换到离线状态并刷新，确认基础页面仍可访问。

## 部署验证

GitHub Pages 部署完成后，请检查：

- Actions 中 `Deploy to GitHub Pages` workflow 成功；
- Pages 访问地址无 404；
- JS/CSS 资源路径以 `/mood-garden-v3/assets/` 开头；
- `manifest.webmanifest` 可以访问；
- `service-worker.js` 可以访问并注册；
- 新增、编辑、删除、筛选、日历、分析、导入导出、主题、Toast、新手引导和移动端导航仍正常；
- 浏览器刷新后 records 仍从本地 `localStorage` 恢复。
