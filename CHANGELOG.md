# 更新日志

## V3.1-B

- 优化记录表单默认层级，打开后优先显示情绪选择、心情输入框和“种下这朵花”按钮。
- 将心情强度、标签和自定义标签放入“添加更多细节（可选）”折叠区。
- 保持默认强度为 3，用户不展开更多选项也能正常新增记录。
- 收起更多选项时不会清空已填写的强度、标签或自定义标签。
- 补充移动端表单间距与按钮层级样式，让每日记录路径更短。
- 未新增业务字段，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-A

- 优化首次使用引导文案，用更普通的话说明选择情绪、写一句话、种下记录、浏览器本地保存和 JSON 备份。
- 优化无记录、最近记录为空、花园为空、筛选无结果、日历当天无记录、分析不足和标签为空等空状态文案。
- 补充数据管理说明，区分 TXT 阅读导出、JSON 备份、合并导入和覆盖导入。
- 补充 PWA 安装说明，明确添加到主屏幕后仍然是本地保存，不代表云同步。
- 未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.0-L

- 完成 V3.0 最终回归验收，重点检查数据层、CRUD、筛选、日历、分析、导入导出、体验层交互、PWA 和部署配置。
- 冻结 Mood Garden V3.0 React / Vite 稳定版，作为后续 V3.1 迭代的基础版本。
- 完成 GitHub Pages 部署配置与线上访问地址确认：`https://hellplus.github.io/mood-garden-v3/`。

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
