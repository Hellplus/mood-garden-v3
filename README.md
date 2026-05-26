# Mood Garden 情绪花园

Mood Garden 是一个本地优先的心情记录花园。当前项目已经进入 V3.1 React / Vite 体验优化阶段，不再是 Vite 默认模板，也不再是原生 HTML/CSS/JS 单页脚本版本。

V3.0 的重点是把原有体验拆成更清楚的 React 组件、hooks、utils 和样式模块，同时保留本地记录、花园浏览、日历、分析、导入导出、主题和移动端基础体验。V3.1 继续围绕真实用户体验做小步优化。

V3.1-A 在稳定版基础上做了一轮首次体验与文案优化，重点让新用户更容易理解如何开始记录、如何备份数据，以及 PWA 安装不等于云同步。

V3.1-B 继续优化每日记录路径：默认突出情绪选择、心情输入和种花按钮，强度与标签保留在可选的更多记录选项里。

V3.1-C 优化移动端信息架构：底部导航调整为记录、花园、回顾、数据，移动端回顾区整合日历和数据回顾，花园筛选默认折叠，数据区按备份和本地说明分组。

V3.1-D 做了一轮 UI 视觉抛光，统一按钮、卡片、空状态、Toast、动画和移动端触控细节，不改变业务数据和核心逻辑。

V3.1-DX.1 根据设计系统文档落地底层设计 token 与基础样式：三套主题基础色、五种情绪色、字体、间距、圆角、阴影、focus-visible 和减少动态效果支持，未修改业务逻辑。

V3.1-DX.2 继续按 UI 实现规范统一原子组件和基础 UI：按钮、表单、chip、基础卡片、Toast 和 EmptyState 视觉更一致，仍未调整页面结构或业务逻辑。

V3.1-DX.2-R 对 DX.2 基础 UI 做返工，要求以项目内 UI 参考图和 `src/assets/ui/` 正式素材作为视觉验收标准，重点校准按钮、表单、chip、card、Toast、EmptyState 和 Modal / Dialog 基础视觉。

V3.1-DX.2-R.1-B 基于裁剪后的正式 PNG 素材重新调整图标尺寸系统，让情绪、花卡、数据、分析、Toast、空状态和移动端导航里的图标更清楚，同时保持页面结构和业务逻辑不变。

V3.1-DX.2-R.1-B.2 修复回顾区、日历和收藏回顾的素材映射：补齐统一 emotion asset map，校准移动端日历小标记尺寸，并让本周 / 本月回顾使用正式 review 素材。
V3.1-DX.2-R-FIX 将 UI PNG 素材集中到 `src/assets/uiAssets.js` 通过 ES import 打包，并更新 service worker 缓存版本，用于修复 GitHub Pages 手机端可能继续使用旧图片路径的问题。
V3.1-DX.2-R-FIX.2 继续收紧手机端缓存更新：service worker 对构建资源改为 network-first，并在注册后主动检查、激活新 worker，减少旧缓存遮挡新图片的情况。

V3.1-DX.3 按 UI 参考图推进核心页面重设计，重点调整 Hero、快速记录、今日状态、最近记录和花卡片的视觉层级，继续使用正式 UI 素材，不改变业务逻辑或 records 数据结构。

V3.1-DX.4 继续按移动端 UI 参考图整理四个底部 tab：记录页保持快速记录优先，花园页前置搜索并折叠筛选，回顾页使用今日 / 本周 / 本月真实切换，数据页按备份、恢复、本地保存、PWA 和非医疗说明分组。该阶段只调整移动端信息层级和布局，不改变 records 数据结构或核心业务逻辑。

V3.1-DX.5 收口反馈层和状态层：补齐表单 0/200 字数计数、今日记录统计、回顾页鼓励 CTA、数据保存说明卡、Toast、空状态和详情弹窗 / 删除确认视觉，不改变 records 数据结构或核心业务逻辑。

V3.1-DX.5.1 修正用户端文案和入口行为：主界面不再展示内部版本号、开发验收式说明模块和英文模块标签，“去记录”会回到记录区并尽量聚焦心情输入框。

V3.1-DX.5-R1 按 05-09 UI 图补齐 P0 结构元素：移动端记录页恢复位于最近记录之后的“花园 / 回顾 / 数据”轻量入口卡，花园页补顶部植物与窗边装饰，回顾今日 tab 补月历卡，详情 bottom sheet 补遮罩和小花强度行。入口卡只切换现有 tab，不新增业务功能。

V3.1-DX.5-R2 按数据页蓝图补齐恢复数据、危险操作和确认弹窗：覆盖导入改为自定义柔和确认 Dialog，本地保存说明拆成三张卡，删除所有数据仅接入已有清空能力并必须二次确认。

V3.1-DX.5-R3 统一字体层级、中文文案和页面气质：记录页、花园页、回顾页、数据页更接近现代治愈手账 App，补齐铅笔输入装饰、今日状态箭头、花卡日期 chip、收藏 badge 和详情“补充日记”区域，不改变业务逻辑或 records 数据结构。

V3.1-DX.5-R4 修正设计文档旧口径：01-09 UI 图统一作为页面元素蓝图和视觉验收标准，不要求 1:1 像素复刻，但必要元素、背景装饰和正式素材必须具备；后续不再引用 `src/assets/ui/patterns/`，用户界面不显示内部 V3.0 版本信息，版本记录以 README / CHANGELOG 为准。

V3.1-DX.6 做上线前最终视觉回归、可访问性和冻结小修：修复 768px 窄平板记录页布局错位，保留移动端底部导航和触控尺寸保护，并补强确认弹窗的 aria、Esc 关闭和焦点恢复。

V3.1-DX.6.1 是桌面端布局热修：收紧网页端空状态插画、标签云 chip 和主题外观卡片尺寸；专项补强桌面端空状态 / 去记录 CTA 插画尺寸约束，只调整桌面展示层，不改变移动端、业务逻辑或数据结构。

V3.1-E 优化数据安全提示和备份体验：在数据页、Toast、覆盖导入确认、首次引导和文档中更清楚地区分 TXT 可阅读日记、JSON 完整备份、本地浏览器保存、换设备不自动同步，以及 PWA 安装不代表云同步。

## 线上访问

GitHub Pages 地址：

https://hellplus.github.io/mood-garden-v3/

如果页面显示旧版本，可以尝试刷新浏览器缓存，或在浏览器开发者工具中注销旧的 service worker 后重新访问。

## 核心功能

- React + Vite + JavaScript
- 基于 localStorage 的记录新增、编辑、删除、收藏
- 搜索、筛选、标签、收藏筛选和排序
- 基于真实记录的日历视图
- 基于真实记录的数据分析
- TXT / JSON 导出与 JSON 导入
- 主题切换、Toast 提示、新手引导和移动端底部导航
- V3.0-J PWA 基础能力：manifest、应用图标、service worker 和 GitHub Pages base 路径
- V3.0-K GitHub Actions 自动部署到 GitHub Pages
- V3.0-L 最终回归验收与 React / Vite 稳定版冻结
- V3.1-A 首次使用引导、空状态、数据保存和导入导出说明优化
- V3.1-B 快速记录表单层级优化，保留强度、标签和自定义标签能力
- V3.1-C 移动端信息架构优化，回顾区整合日历和分析，花园筛选移动端折叠
- V3.1-D UI 视觉抛光与交互一致性优化
- V3.1-DX.1 设计 token 与基础样式落地，补充主题、字体、间距、圆角、阴影、focus 和 reduced motion 基础变量
- V3.1-DX.2 原子组件和基础 UI 统一，覆盖按钮、表单、chip、card、Toast 和 EmptyState 基础样式
- V3.1-DX.2-R 基础 UI 视觉返工，接入正式 UI 素材并按参考图校准基础组件视觉
- V3.1-DX.2-R.1-B 裁剪后图标尺寸系统修复，统一正式素材显示尺寸和基础卡片标题图标融合规则
- V3.1-DX.2-R.1-B.2 回顾区、日历与收藏回顾素材映射修复，统一情绪素材映射并校准移动端日历小标记
- V3.1-DX.3 核心页面重设计，按参考图优化 Hero、快速记录、今日状态、最近记录和花卡片层级
- V3.1-DX.4 移动端四页重设计，记录 / 花园 / 回顾 / 数据四个 tab 按参考图重新整理信息层级
- V3.1-DX.5 弹窗、Toast、空状态与细节反馈统一，补齐字数计数、今日统计、删除确认和回顾 CTA
- V3.1-DX.5.1 用户端文案和入口行为修正，清理开发感说明模块、内部版本号和英文模块标签
- V3.1-DX.5-R1 P0 结构元素补齐，记录页恢复最近记录之后的三张轻量入口卡
- V3.1-DX.5-R2 数据页恢复流程、危险操作和确认弹窗补齐，移除覆盖导入的原生确认 UI
- V3.1-DX.5-R3 字体层级、文案气质和手账感统一，补齐记录输入、今日状态、花卡和详情弹窗的轻量视觉细节
- V3.1-DX.5-R4 设计文档冲突修正，统一 UI 蓝图、正式素材和版本口径
- V3.1-DX.6 上线前最终回归和冻结小修，修复 768px 布局错位并补强确认弹窗可访问性
- V3.1-DX.6.1 桌面端布局热修，收紧空状态、标签云和主题外观的桌面尺寸，并专项限制桌面空状态插画尺寸
- V3.1-E 数据安全提示和备份体验优化，明确 TXT / JSON 导出、本地保存、导入风险和 PWA 不同步边界

## 数据存储

记录只保存在当前浏览器的 `localStorage` 中，并继续使用现有 records key。Mood Garden 不提供账号、后端存储、云同步、推送通知或远程备份。

换设备不会自动同步记录；清理浏览器数据也可能删除本地记录。如果需要保留可迁移的数据副本，请定期导出 JSON 备份。

TXT 导出用于保存一份可阅读、可整理的文字日记；JSON 导出才是完整数据备份，适合以后恢复 Mood Garden 或迁移到其他浏览器。合并导入会把备份中的记录追加到当前花园，不会删除已有记录；覆盖导入会用备份文件替换当前浏览器里的全部记录，执行前请先确认已经导出当前 JSON 备份。

## 使用边界

Mood Garden 用于个人情绪记录、整理和回顾。应用中的统计、回顾文案和趋势展示不构成心理诊断、医学判断或医疗建议。如果正在经历持续痛苦、危机或需要专业支持，请寻求可信赖的人或专业机构帮助。

## PWA 说明

V3.0-J 增加了简单、手写的 PWA 层：

- `public/manifest.webmanifest`：提供可安装应用的基础信息。
- `public/icons/icon.svg`：提供 Mood Garden 应用图标。
- `public/service-worker.js`：缓存应用外壳和访问过的构建资源，用于基础离线访问。
- service worker 不缓存、不读取、不管理用户记录；记录仍由 `localStorage` 管理。
- service worker 只会在生产构建中注册，因此 `npm run dev` 不会被缓存行为干扰。
- 如果浏览器提示可以安装，可以把 Mood Garden 添加到手机主屏幕；安装后仍然只是方便打开，不代表账号登录、云同步或远程备份。

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

线上访问地址：

https://hellplus.github.io/mood-garden-v3/

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
