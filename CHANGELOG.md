# 更新日志

## V3.1-DX.6

- 完成上线前最终视觉回归、可访问性和冻结小修，范围限制在阻断错位、触控尺寸、确认弹窗语义和文档收口。
- 修复 768px 窄平板宽度下记录页掉入桌面 / 移动混合布局的问题，让记录页保持单列、底部导航可见，并避免快速记录区被挤窄。
- 补强移动端触控尺寸保护，将筛选折叠、日历控制和回顾 tab 等交互控件纳入 44px 最小触控区域。
- 补强通用确认 Dialog 的可访问性：增加 `aria-describedby`、打开后初始焦点、Esc 关闭和关闭后焦点恢复；确认与取消仍调用原有逻辑。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、搜索、排序、日历、分析或导入导出核心逻辑。

## V3.1-DX.5-R4

- 修正设计系统、UI 实现规范、素材接入规范和素材清单中的旧口径，统一确认 01-09 UI 图是页面元素蓝图和视觉验收标准，不要求 1:1 像素复刻。
- 明确移动端记录页保留位于最近记录之后的“花园 / 回顾 / 数据”三张轻量入口卡；底部导航仍是主导航，入口卡只切换现有 tab，不新增业务功能。
- 明确背景装饰、入口卡、空状态、弹窗、确认 Dialog 和页面级顶部装饰都属于 UI 元素，不应被默认省略。
- 明确第五批不再使用页面氛围纹理 `patterns/`，后续不得引用 `src/assets/ui/patterns/`；背景层优先使用 `backgrounds/`、`decorations/`、`paper/` 和 CSS 柔和渐变。
- 明确用户界面不显示 `Mood Garden V3.0`，版本信息以 README / CHANGELOG 为准。
- 本阶段只修改文档，不修改 src 代码、CSS、package.json、业务逻辑或 records localStorage 主结构。

## V3.1-DX.5-R3

- 统一用户端字体层级和文案气质：主标题更柔和，按钮、chip、badge 和弹窗字重降低，移动端说明文字保持可读。
- 将记录、花园、回顾、数据页的可见文案进一步收口到手账 App 语气，减少后台设置页、开发说明和分析面板感。
- 补齐记录输入铅笔装饰、今日状态卡箭头、花卡日期 chip、收藏独立 badge 和详情弹窗“补充日记”纸感区域。
- 调整数据页分组标题和 Toast 文案，保留必要 JSON / TXT / PWA 边界说明，但不作为主视觉表达。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、搜索、排序、日历、分析或导入导出核心逻辑。

## V3.1-DX.5-R2

- 按 08 数据页和 09 确认弹窗蓝图补齐数据页恢复流程、危险操作和柔和确认 Dialog。
- 覆盖导入不再使用原生 `window.confirm`，改为使用正式素材的自定义确认弹窗；确认后仍调用原有覆盖导入逻辑。
- 恢复数据区拆分“选择 JSON 文件 / 合并导入 / 覆盖导入”，并补充“推荐”和“危险操作”视觉标签。
- 本地保存说明拆成当前浏览器保存、换设备不会自动同步、定期导出 JSON 备份三张说明卡。
- 危险操作区接入已有 `clearRecords` 能力，删除所有数据前必须经过独立确认。
- 未新增后端、云同步或 AI，未改变 records localStorage 主结构，也未修改 JSON 导入导出结构、筛选、日历或分析逻辑。

## V3.1-DX.5-R1

- 按 05-09 UI 图补齐 P0 结构元素：记录页恢复“花园 / 回顾 / 数据”三张轻量入口卡，位置在最近记录之后，不抢首屏快速记录任务。
- 入口卡使用 `src/assets/ui/entries/` 正式素材，点击只切换到底部导航已有 tab，不新增路由、业务功能或数据流。
- 花园页补齐顶部植物、窗边和柔和背景装饰；回顾今日 tab 补完整月历卡；详情 bottom sheet 补遮罩和小花强度行。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、搜索、排序、日历、分析或导入导出核心逻辑。

## V3.1-DX.5.1

- 清理用户端主界面的开发验收式说明：不再在 Hero 区展示“数据位置 / 记录能力 / 发布准备”等大块项目状态模块。
- 主界面不再显示 Mood Garden V3.0，版本信息保留在文档和更新日志中，用户端入口更像正式应用。
- 将可见英文 eyebrow 标签改为中文，减少 DATA / RECORD / READY / CAPABILITY 等开发感表达。
- 修正“去记录”入口：移动端切换到记录 tab，桌面端滚动到 RecordForm，并尽量聚焦心情输入框。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出核心逻辑。

## V3.1-DX.5

- 按 03、05、07、08、09 UI 参考图收口反馈层和状态层，补齐表单字数计数、今日状态统计、回顾鼓励 CTA、数据说明卡、Toast、空状态和详情弹窗基础体验。
- RecordForm 增加 0/200 字数计数器，只限制心情输入长度，不新增记录字段，也不改变提交数据结构。
- TodayStatusCard 增加“记录 N 条 · 种了 N 朵花”，统计由当前 records 派生，不写入 localStorage。
- 回顾今日 tab 增加轻量今日小日历和“去记录”按钮，按钮只切换到现有记录 tab。
- DataPanel 将本地保存说明拆成当前浏览器保存、换设备不会同步、建议 JSON 备份，并继续明确 PWA 不代表云同步。
- FlowerDetailModal 补充 dialog aria、Esc 关闭、移动端 bottom sheet 视觉和独立删除确认 Dialog；确认删除仍只调用原有删除逻辑。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出核心逻辑。

## V3.1-DX.4

- 按移动端 UI 参考图调整记录、花园、回顾、数据四个 tab 的页面级信息层级，让移动端更接近小 App 体验。
- 记录 tab 继续突出快速记录路径，保留“选择情绪、写一句心情、种下一朵花”的主任务；后续 DX.5-R1 已按 05 图恢复最近记录之后的三张轻量入口卡。
- 花园 tab 将搜索入口前置，筛选与排序保持默认折叠，标签云在移动端保持轻量展示。
- 回顾 tab 增加今日 / 本周 / 本月 UI-only 切换，移动端不再把全部日历和分析内容一次性堆在同一页。
- 数据 tab 拆分为备份与导出、恢复数据、本地保存说明、PWA 说明、非医疗建议和危险操作区域，并明确 PWA 不代表云同步。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出核心逻辑。

## V3.1-DX.3

- 按 UI 参考图推进核心页面重设计，重点优化 HeroSection、RecordForm、TodayStatusCard、RecentRecords、GardenView 和 FlowerCard。
- Hero 区接入品牌小花、柔和云朵、窗边植物和花园装饰素材，让首页更接近现代治愈手账 App 的视觉方向。
- 快速记录卡继续保持情绪选择、心情输入和“种下这朵花”为主路径，强度和标签仍保留在可选更多细节中。
- 今日状态卡和花卡片继续使用正式 flower 素材，并补充小花强度展示，避免使用爱心或旧 emoji 作为核心视觉。
- 最近记录改为轻量预览卡，继续使用正式 mood 素材和时间图标，不新增操作入口。
- FlowerCard 降低删除操作的视觉优先级，保留原有删除逻辑，不新增删除确认弹窗。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-DX.2-R-FIX.2

- 更新 service worker 缓存版本为 `mood-garden-v3-cache-v3-1-dx2-r-fix2`。
- 将 `/mood-garden-v3/assets/` 等构建资源请求改为 network-first，网络失败时再回退缓存，避免手机端长期命中旧 JS、CSS 或 PNG。
- 增加 `SKIP_WAITING` message 支持，并在注册逻辑中主动检查更新、激活 waiting worker、在已有 controller 更新后刷新一次页面。
- 未修改 UI 组件结构、业务功能、records localStorage 主结构或 CRUD / 筛选 / 日历 / 分析 / 导入导出核心逻辑。

## V3.1-DX.2-R-FIX

- 新增统一 UI 素材入口 `src/assets/uiAssets.js`，让情绪、花朵、导航、操作、Toast、空状态、数据、分析、新手引导和装饰素材都通过 ES import 进入 Vite 构建。
- 将仍在组件中分散引用的 PNG 素材改为从统一素材映射读取，避免线上 GitHub Pages 环境出现 `/src/assets` 或错误绝对路径导致的图片加载问题。
- 更新 service worker 缓存版本，降低手机端继续使用旧 JS 或旧图片路径的风险。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出核心逻辑。

## V3.1-DX.2-R.1-B.2

- 新增轻量 UI 素材映射文件，统一开心、平静、焦虑、疲惫、兴奋到正式 mood / flower 素材的映射。
- 修复收藏回顾中情绪图标可能与记录 emotion 不对应的问题，避免继续依赖旧的 moodIcon / emoji 展示。
- 将本周回顾和本月回顾接入 `review-week.png` 与 `review-month.png`，并优化回顾区图标与标题的组合样式。
- 针对移动端 CalendarView 缩小日期格内的 `calendar-*` 小标记，减少多标记挤压和溢出风险。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历计算、分析计算或导入导出逻辑。

## V3.1-DX.2-R.1-B

- 基于裁剪后的 `src/assets/ui/` 正式 PNG 素材，重新校准图标和插画显示尺寸，避免沿用裁剪前的过度放大规则。
- 新增并整理 `.ui-icon--xs/sm/md/lg/xl`、`.mood-icon`、`.flower-visual`、`.ui-illustration`、`.data-icon`、`.analytics-icon`、`.toast-icon`、`.nav-icon` 等基础尺寸 class。
- 优化 RecordForm、TodayStatusCard、RecentRecords、FlowerCard、AnalyticsDashboard、DataPanel、Toast、EmptyState、MobileBottomNav、ThemeSwitcher 和 OnboardingModal 的图标尺寸。
- 补充基础 card header 图标融合规则，让图标与标题形成同一视觉组，减少孤立漂浮感。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-DX.2-R

- 对 V3.1-DX.2 基础 UI 做视觉返工，明确以 `pic/ui-reference/02-component-style-board.png`、`03-empty-state-system.png`、`04-emotion-icon-system.png` 和 `09-mobile-detail-modal.png` 作为验收标准。
- 接入 `src/assets/ui/` 中的正式素材，用于情绪 chip、花卡片、Toast、空状态、日历标记、分析卡、数据面板、主题切换和基础操作按钮。
- 返工主按钮、次按钮、文本按钮、图标按钮和危险按钮的基础视觉，使其更接近柔和绿色胶囊按钮、浅底描边按钮和弱危险按钮。
- 返工 input、textarea、chip、segmented control、基础 card、Toast、EmptyState 和 Modal / Dialog 外壳的基础样式。
- 保留 focus-visible 与 prefers-reduced-motion，不新增业务功能，不改变 records localStorage 主结构，也不修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-DX.2

- 按 `UI_IMPLEMENTATION_SPEC_V3_1.md` 和 02 UI 组件样式板统一原子组件基础视觉。
- 统一主按钮、次按钮、文本按钮、图标按钮和危险按钮的基础样式、hover、active、focus 和 disabled 状态。
- 统一 input、textarea、select、label、helper text 和提示文案的基础视觉。
- 统一情绪 chip、标签 chip、筛选 chip、segmented control 和标签云按钮的基础样式。
- 统一 surface panel、tile、分析卡、日历记录卡和数据说明卡的圆角、边框、背景和阴影。
- 抛光 Toast success / error / info 与 EmptyState 的基础卡片、文字层级和留白。
- 未新增业务功能，未改变 records localStorage 主结构，未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-DX.1

- 根据 `DESIGN_SYSTEM_V3_1.md` 落地底层设计 token，补充 light / dark / cozy 三套主题基础变量。
- 新增五种现有情绪的低饱和色变量：开心、平静、焦虑、疲惫、兴奋。
- 补充字体、字号、间距、圆角、阴影、动效和底部安全区等基础变量，并保留旧变量别名以兼容现有组件。
- 优化全局 body 背景、文字基础样式和统一 focus-visible 覆盖范围。
- 完善 prefers-reduced-motion 基础支持，减少动态效果时关闭位移和持续动画。
- 未修改 React 业务逻辑，未改变 records localStorage 主结构，也未调整 CRUD、筛选、日历、分析或导入导出逻辑。

## V3.1-D

- 统一按钮系统的基础视觉、hover、active、focus 和移动端触控尺寸。
- 统一卡片、花卡片、日历记录卡、分析卡和数据说明卡的边框、阴影和 hover 反馈。
- 优化标签、筛选按钮、表单输入、更多记录选项和错误提示的视觉一致性。
- 统一空状态视觉，增加轻量标识，让无记录、无结果、无标签和分析不足状态更协调。
- 抛光 Toast success / error / info 样式，并补充 prefers-reduced-motion 动画降级。
- 微调移动端底部安全区、按钮触控区域和 Toast 顶部安全距离。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

## V3.1-C

- 优化移动端底部导航命名，将“分析”调整为更用户友好的“回顾”。
- 调整移动端内容归属：记录区保留快速记录路径，花园区聚焦花卡和筛选，回顾区整合日历与数据回顾，数据区聚焦备份和本地说明。
- 在移动端将花园筛选与排序默认折叠，展开后仍保留搜索、情绪、排序、强度、收藏和重置筛选能力。
- 优化移动端标签云为横向轻量展示，减少花园 tab 的纵向拥挤。
- 将数据面板分为备份与恢复、本地数据说明和应用说明三组，导入导出逻辑保持不变。
- 增强移动端底部导航选中态和底部安全区域，降低内容被遮挡的风险。
- 未新增业务功能，未改变 records localStorage 主结构，也未修改 CRUD、筛选、日历、分析或导入导出的核心逻辑。

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
