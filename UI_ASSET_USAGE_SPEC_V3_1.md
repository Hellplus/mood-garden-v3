# Mood Garden V3.1 UI 素材接入规范

## 1. 文档目的

本文档用于约束 Mood Garden V3.1 后续 UI 实现中如何接入正式素材。

当前项目已经具备：

- UI 参考图：`pic/ui-reference/`
- 实际 UI 素材库：`src/assets/ui/`
- 设计系统：`DESIGN_SYSTEM_V3_1.md`
- UI 实现规范：`UI_IMPLEMENTATION_SPEC_V3_1.md`
- 素材清单：`ASSET_MANIFEST_V3_1.md`

后续 Codex 实现 UI 时，必须按图实现，而不是只参考风格。01-09 UI 图是页面元素蓝图和视觉验收标准；不要求 1:1 像素复刻，但蓝图中明确存在的必要元素、结构层级、背景装饰、入口卡、空状态、弹窗、确认 Dialog 和页面级顶部装饰必须具备。已经存在正式素材的地方，必须优先使用正式素材，不允许自由发挥新的图标、插画或装饰风格。

---

## 2. 素材接入原则

1. Codex 后续实现 UI 时，必须优先使用 `src/assets/ui/` 中的正式素材。
2. 不允许用 emoji、临时 SVG、随机 CSS 图形、浏览器默认图标替代已经存在的正式素材。
3. 如果某个组件需要素材但素材库缺失，必须先报告缺失素材，不能自由替代。
4. UI 实现必须以 `pic/ui-reference/` 中的 01-09 参考图作为视觉验收标准。
5. 素材接入不得改变业务功能、records localStorage 主结构、导入导出格式或核心计算逻辑。
6. 不得引入第三方图标库、第三方 UI 库、Tailwind、date-fns 或动画库来替代现有素材。
7. 正式素材只用于视觉表达，不得为接入素材新增业务字段或改变组件职责。
8. 第五批不再使用页面氛围纹理 `patterns/`；后续不得引用 `src/assets/ui/patterns/`。
9. 背景层优先使用 `src/assets/ui/backgrounds/`、`src/assets/ui/decorations/`、`src/assets/ui/paper/` 和 CSS 柔和渐变。

---

## 3. 素材与组件映射

### 3.1 ThemeSwitcher

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `theme-light.png` | 浅色主题入口 |
| `theme-dark.png` | 深色主题入口 |
| `theme-cozy.png` | cozy 主题入口 |

接入规则：

- `ThemeSwitcher` 必须优先使用 `theme-*` 图标。
- 不新增主题 key，继续保持 `light` / `dark` / `cozy`。
- 图标只表达主题选择，不改变主题切换逻辑。

### 3.2 RecordForm

路径：

- `src/assets/ui/icons/`
- `src/assets/ui/decorations/`
- `src/assets/ui/strength/`

| 素材 | 用途 |
| --- | --- |
| `mood-happy.png` | 开心情绪选择 |
| `mood-calm.png` | 平静情绪选择 |
| `mood-anxious.png` | 焦虑情绪选择 |
| `mood-tired.png` | 疲惫情绪选择 |
| `mood-excited.png` | 兴奋情绪选择 |
| `record-sprout.png` | 快速记录区小芽装饰 |
| `record-pencil-note.png` | 输入区便签 / 铅笔装饰 |
| `chevron-down.png` | 展开更多记录选项 |
| `chevron-up.png` | 收起更多记录选项 |
| `strength-flower-empty.png` | 未选中的小花强度 |
| `strength-flower-filled.png` | 已选中的小花强度 |

接入规则：

- 情绪选择必须使用 `mood-*` 图标，并保留情绪文字。
- 强度展示优先使用 `strength-flower-*`，不得用爱心替代。
- 展开 / 收起必须使用 `chevron-*`。
- `record-sprout.png` 和 `record-pencil-note.png` 只做轻量装饰，不得抢占快速记录主路径。

### 3.3 FlowerCard

路径：

- `src/assets/ui/flowers/`
- `src/assets/ui/icons/`
- `src/assets/ui/decorations/`

| 素材 | 用途 |
| --- | --- |
| `flower-happy.png` | 开心记录花朵 |
| `flower-calm.png` | 平静记录花朵 |
| `flower-anxious.png` | 焦虑记录花朵 |
| `flower-tired.png` | 疲惫记录花朵 |
| `flower-excited.png` | 兴奋记录花朵 |
| `action-star-empty.png` | 未收藏状态 |
| `action-star-filled.png` | 已收藏状态 |
| `action-more.png` | 更多操作入口 |
| `action-clock.png` | 记录时间标识 |
| `record-date-pin.png` | 日期装饰标识 |
| `flower-card-corner-leaf.png` | 花卡角落叶片装饰 |
| `flower-card-paper-corner.png` | 花卡纸张角标装饰 |
| `favorite-ribbon.png` | 收藏状态轻量装饰 |

接入规则：

- 花卡片必须优先使用 `flower-*` 呈现记录情绪。
- 收藏必须使用星星素材，不得使用爱心。
- 装饰素材只用于加强花卡片手账感，不得改变卡片操作结构。
- DX.2-C 只制定规范，不调整 FlowerCard 操作层级；操作结构留到对应实施阶段处理。

### 3.4 MobileBottomNav

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `nav-record.png` | 记录 tab |
| `nav-garden.png` | 花园 tab |
| `nav-review.png` | 回顾 tab |
| `nav-data.png` | 数据 tab |

接入规则：

- 底部导航固定为：记录 / 花园 / 回顾 / 数据。
- 图标必须和文字同时出现。
- 不引入 React Router，不新增第五个入口。

### 3.5 FilterPanel / TagCloud

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `action-search.png` | 搜索入口 |
| `action-filter.png` | 筛选入口 |
| `action-sort.png` | 排序入口 |
| `action-reset.png` | 重置筛选 |
| `action-tag.png` | 标签入口 / 标签说明 |
| `chevron-down.png` | 展开筛选与排序 |
| `chevron-up.png` | 收起筛选与排序 |

接入规则：

- 筛选、搜索、排序和标签入口必须优先使用对应 `action-*` 图标。
- 展开 / 收起必须使用 `chevron-*`。
- 图标接入不得改变筛选、搜索、排序的计算逻辑。

### 3.6 CalendarView

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `action-calendar.png` | 日历标题或日期入口 |
| `calendar-flower-dot.png` | 有记录日期的小花点 |
| `calendar-today-flower.png` | 今日日期标记 |
| `calendar-selected-marker.png` | 当前选中日期标记 |

接入规则：

- 日历标记必须优先使用 `calendar-*` 素材。
- 不用随机圆点、emoji 或临时 CSS 图形替代正式标记。
- 素材接入不得改变日历分组、日期 key 或选中日期逻辑。

### 3.7 AnalyticsDashboard

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `analytics-overview.png` | 总览数据 |
| `analytics-today.png` | 今日洞察 |
| `analytics-week.png` | 本周洞察 |
| `analytics-month.png` | 本月洞察 |
| `analytics-trend.png` | 趋势 |
| `analytics-tags.png` | 标签 Top 5 |
| `analytics-favorite.png` | 收藏回顾 |
| `analytics-streak.png` | 连续记录 |
| `analytics-intensity.png` | 心情强度分析 |
| `review-today.png` | 回顾页今日分段 |
| `review-week.png` | 回顾页本周分段 |
| `review-month.png` | 回顾页本月分段 |

接入规则：

- 分析和回顾必须优先使用 `analytics-*` 与 `review-*` 图标。
- 图标只辅助阅读，不得把分析文案改成心理诊断或医疗建议。
- 素材接入不得改变分析计算逻辑。

### 3.8 DataPanel

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `data-txt-export.png` | TXT 日记导出 |
| `data-json-backup.png` | JSON 备份导出 |
| `data-json-import.png` | JSON 文件导入 |
| `data-merge-import.png` | 合并导入 |
| `data-overwrite-import.png` | 覆盖导入 |
| `data-local-storage.png` | 本地保存说明 |
| `data-pwa-install.png` | 添加到主屏幕 / PWA 说明 |
| `data-non-medical-note.png` | 非医疗建议说明 |
| `warning-soft.png` | 覆盖导入等风险提示 |

接入规则：

- `DataPanel` 必须优先使用 `data-*` 图标。
- 覆盖导入、危险提醒必须优先使用 `warning-soft.png`。
- 图标接入不得改变导入导出 JSON 结构、合并逻辑或覆盖确认逻辑。
- PWA 文案不得暗示云同步。

### 3.9 Toast

路径：`src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `toast-success.png` | 成功提示 |
| `toast-error.png` | 错误提示 |
| `toast-info.png` | 信息提示 |

接入规则：

- `Toast` 必须优先使用 `toast-*` 图标。
- 错误提示不得用吓人的图标或强烈视觉替代。
- Toast 图标接入不得替代危险操作确认弹窗。

### 3.10 OnboardingModal

路径：

- `src/assets/ui/icons/`
- `src/assets/ui/decorations/`

| 素材 | 用途 |
| --- | --- |
| `onboarding-mood.png` | 第一步：选择情绪 |
| `onboarding-write.png` | 第二步：写下一句话 |
| `onboarding-plant.png` | 第三步：种下一朵花 |
| `brand-flower.png` | 品牌花朵 / 引导氛围 |

接入规则：

- 新手引导必须优先使用 `onboarding-*` 图标。
- 文案保持普通用户可理解，不加入技术解释。
- 关闭状态和 localStorage key 不得因素材接入改变。

### 3.11 FlowerDetailModal / 删除确认

路径：

- `src/assets/ui/flowers/`
- `src/assets/ui/icons/`

| 素材 | 用途 |
| --- | --- |
| `flower-happy.png` | 开心记录详情主视觉 |
| `flower-calm.png` | 平静记录详情主视觉 |
| `flower-anxious.png` | 焦虑记录详情主视觉 |
| `flower-tired.png` | 疲惫记录详情主视觉 |
| `flower-excited.png` | 兴奋记录详情主视觉 |
| `action-edit.png` | 编辑 |
| `action-delete.png` | 删除 |
| `action-close.png` | 关闭 |
| `action-check.png` | 保存 / 确认 |
| `action-cancel.png` | 取消 |
| `warning-soft.png` | 柔和警告 |
| `delete-confirm-flower.png` | 删除确认主视觉 |

接入规则：

- 详情弹窗主视觉必须优先使用 `flower-*`。
- 删除确认和覆盖类确认必须优先使用 `warning-soft.png` 或 `delete-confirm-flower.png`。
- DX.2-C 不改详情弹窗状态机，不新增删除确认 Dialog，只规定后续接入方式。
- Toast 不得替代确认弹窗。

### 3.12 EmptyState

路径：`src/assets/ui/empty-states/`

| 素材 | 用途 |
| --- | --- |
| `empty-no-record.png` | 没有记录 |
| `empty-today-no-flower.png` | 今天还没有种花 |
| `empty-filter-no-result.png` | 筛选无结果 |
| `empty-calendar-no-record.png` | 日历当天无记录 |
| `empty-analytics-insufficient.png` | 分析数据不足 |
| `empty-no-tags.png` | 没有标签 |
| `empty-no-favorites.png` | 没有收藏 |
| `empty-import-error.png` | 导入错误 |
| `empty-backup-reminder.png` | 备份提醒 |

接入规则：

- 空状态必须按场景使用对应 `empty-*` 素材。
- 不允许一个通用图标覆盖所有空状态。
- 不允许用“暂无数据”替代已经定义的具体文案和素材。

### 3.13 Hero / 页面装饰

路径：`src/assets/ui/decorations/`

| 素材 | 用途 |
| --- | --- |
| `brand-flower.png` | 品牌花朵 |
| `leaf-sprig.png` | 叶片点缀 |
| `soft-window-plant.png` | 柔和窗边植物氛围 |
| `paper-note.png` | 手账纸片装饰 |
| `hero-garden-corner.png` | Hero 花园角落 |
| `hero-soft-cloud.png` | Hero 柔和云朵 |
| `hero-floating-star.png` | Hero 轻量星点 |

接入规则：

- Hero 和页面装饰必须克制使用，不得变成复杂插画背景。
- 装饰素材不得影响文字可读性和移动端首屏记录路径。
- 不做浮动花瓣粒子，不做复杂水彩背景。

---

### 3.14 第四批 UI 平面设计素材（DX.5-R0.5 正式清单）

第四批素材位于以下目录：

- `src/assets/ui/backgrounds/`
- `src/assets/ui/entries/`
- `src/assets/ui/cards/`
- `src/assets/ui/modals/`
- `src/assets/ui/data/`
- `src/assets/ui/review/`
- `src/assets/ui/detail/`

这些目录用于补齐 UI 参考图中明确存在但当前尚未完全落地的页面级平面设计元素。01-09 UI 图不是普通参考图，而是元素蓝图和视觉验收标准；背景装饰、入口插画、卡片装饰、弹窗插画、空状态 CTA 都属于蓝图元素，不是可随意省略的装饰。后续 DX.5-R1 / DX.5-R2 / DX.5-R3 不是“可选参考”，而是必须优先检查这些目录中是否存在正式素材。

#### 3.14.1 背景与页面装饰

路径：`src/assets/ui/backgrounds/`

用途：
- 移动端记录页顶部植物 / 窗边背景；
- 移动端花园页顶部植物氛围；
- 移动端回顾页手账氛围；
- 移动端数据页本地备份氛围；
- 页面柔和底纹和窗边植物横向装饰。

接入规则：
- DX.5-R1 调整移动端四页缺失元素时，必须先检查 `backgrounds/` 是否有对应正式素材。
- 背景素材只能增强页面层级和花园感，不能遮挡文字、按钮或表单。
- 页面渐变、留白和卡片背景仍由 CSS 实现，不能把整页 UI 做成一张背景图。

#### 3.14.2 记录页轻量入口卡

路径：`src/assets/ui/entries/`

用途：
- `entry-garden-card.png` / `entry-garden-small.png`：记录页“花园”入口卡；
- `entry-review-card.png` / `entry-review-small.png`：记录页“回顾”入口卡；
- `entry-data-card.png` / `entry-data-small.png`：记录页“数据”入口卡。

接入规则：
- DX.5-R1 已按 05 图恢复记录页轻量入口卡；后续必须保留“花园 / 回顾 / 数据”三张入口卡，并优先使用 `entries/` 中的正式素材。
- 入口卡位于最近记录之后，不能抢占首屏快速记录任务。
- 入口卡只能切换到已有移动端 tab，不得新增路由、业务功能或新的数据流。
- 如果入口素材缺失，必须先报告缺失，不能用 emoji 或临时 SVG 代替。

#### 3.14.3 卡片平面装饰

路径：`src/assets/ui/cards/`

用途：
- 今日状态卡角落装饰；
- 最近记录卡手账装饰；
- 花卡片纸面纹理或角落装饰；
- 筛选摘要轻量装饰。

接入规则：
- 卡片装饰只作为视觉辅助，不得影响卡片信息层级。
- 卡片圆角、边框、阴影、hover、padding 必须继续由 CSS token 实现。
- 如果已有 `decorations/` 中的素材足够表达，则不强制重复新增 `cards/` 素材。

#### 3.14.4 弹窗与确认类平面素材

路径：`src/assets/ui/modals/`

用途：
- 覆盖导入确认；
- 删除确认；
- 普通柔和确认提示。

接入规则：
- DX.5-R3 实现覆盖导入确认弹窗时，必须优先使用 `modals/` 或既有 `warning-soft.png` / `delete-confirm-flower.png`。
- Modal 外壳、遮罩层、bottom sheet 圆角、阴影和入场动画仍由 CSS 实现。
- Toast 不得替代危险操作确认弹窗。

#### 3.14.5 数据页平面素材

路径：`src/assets/ui/data/`

用途：
- 备份与导出；
- 恢复数据；
- 当前浏览器本地保存；
- 换设备不会自动同步；
- 定期 JSON 备份；
- 添加到主屏幕但不云同步；
- 非医疗建议；
- 覆盖导入确认。

接入规则：
- DX.5-R1 / DX.5-R3 调整数据页时，必须先检查 `data/` 是否有对应正式素材。
- 数据页素材不得暗示账号、云同步、后端保存或医疗建议。
- 如果素材缺失，必须报告缺口，不能自由替代。

#### 3.14.6 回顾页平面素材

路径：`src/assets/ui/review/`

用途：
- 今日轻量日历区；
- 本周回顾卡；
- 本月回顾卡；
- 底部鼓励卡片。

接入规则：
- DX.5-R1 补齐回顾页缺失元素时，必须优先使用 `review/` 中的正式素材。
- 回顾页素材只能服务生活化回顾，不得医疗化或诊断化。
- 今日 / 本周 / 本月 tab 的真实切换逻辑不得因为素材接入而改变。

#### 3.14.7 详情页平面素材

路径：`src/assets/ui/detail/`

用途：
- 详情 bottom sheet 顶部装饰；
- 补充日记纸张区；
- 详情删除确认。

接入规则：
- DX.5-R3 调整详情弹窗时，必须优先使用 `detail/` 中的正式素材。
- 详情弹窗查看态 / 编辑态 / 删除确认状态机不得因为素材接入而改变。
- bottom sheet 外壳、遮罩、sticky 操作区仍由 CSS 实现。

#### 3.14.8 DX.5-R0.5 第四批正式素材映射

后续接入第四批素材时，必须按下表检查文件、页面、组件和验收图。不能因为 CSS 可以做出相近氛围，就省略 UI 蓝图中明确存在的背景、插画或平面装饰。

##### backgrounds

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `backgrounds/mobile-record-top-garden.png` | 移动端记录页顶部花园氛围背景 | 记录页 / `App.jsx` 移动端记录 tab、`HeroSection` | `05-mobile-record-page.png` |
| `backgrounds/mobile-garden-top-window.png` | 移动端花园页顶部窗边植物背景 | 花园页 / `GardenView`、移动端花园 heading | `06-mobile-garden-page.png` |
| `backgrounds/mobile-review-top-leaves.png` | 移动端回顾页顶部叶片手账背景 | 回顾页 / `AnalyticsDashboard`、`CalendarView`、移动端回顾 heading | `07-mobile-review-page.png` |
| `backgrounds/mobile-data-top-plant.png` | 移动端数据页顶部植物和本地保存背景 | 数据页 / `DataPanel`、移动端数据 heading | `08-mobile-data-page.png` |
| `backgrounds/desktop-hero-garden-bg.png` | 桌面端 Hero 花园背景 | 桌面首页 / `HeroSection` | `01-final-visual-direction.png` |
| `backgrounds/desktop-soft-page-corner.png` | 桌面端页面角落柔和装饰 | 桌面全局页面 / `App.jsx`、`HeroSection` | `01-final-visual-direction.png` |
| `backgrounds/card-soft-bloom-corner.png` | 通用卡片柔和花朵角落装饰 | 记录卡、花卡、数据卡、回顾卡 / 多组件 | `02-component-style-board.png` |
| `backgrounds/bottom-nav-soft-bg.png` | 移动端底部导航柔和背景底片 | 移动端底部导航 / `MobileBottomNav` | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png`、`08-mobile-data-page.png` |

##### entries

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `entries/entry-garden-card.png` | 记录页“花园”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entries/entry-review-card.png` | 记录页“回顾”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entries/entry-data-card.png` | 记录页“数据”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entries/entry-garden-small.png` | “花园”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |
| `entries/entry-review-small.png` | “回顾”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |
| `entries/entry-data-small.png` | “数据”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |

##### cards

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `cards/recent-view-all-arrow.png` | 最近记录“查看全部”或进入详情方向箭头 | 记录页 / `RecentRecords` | `05-mobile-record-page.png` |
| `cards/recent-more-dots.png` | 最近记录更多提示点状装饰 | 记录页 / `RecentRecords` | `05-mobile-record-page.png` |
| `cards/recent-strength-flower-row.png` | 最近记录中的小花强度行装饰 | 记录页 / `RecentRecords` | `05-mobile-record-page.png`、`04-emotion-icon-system.png` |
| `cards/flower-card-date-chip-bg.png` | 花卡片日期 chip 背景贴纸 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png` |
| `cards/flower-card-detail-arrow.png` | 花卡详情入口箭头 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png` |
| `cards/flower-card-more-button-bg.png` | 花卡更多操作按钮背景 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png`、`02-component-style-board.png` |
| `cards/flower-card-favorite-corner.png` | 花卡收藏角标 / 星星角落装饰 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png`、`04-emotion-icon-system.png` |

##### data

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `data/data-delete-all.png` | 删除全部数据入口图标 / 危险操作视觉 | 数据页 / `DataPanel` 危险操作区 | `08-mobile-data-page.png` |
| `data/data-delete-all-warning.png` | 删除全部数据警告说明插画 | 数据页 / `DataPanel` 危险操作区、确认弹窗 | `08-mobile-data-page.png` |
| `data/data-cover-import-confirm.png` | 覆盖导入确认插画 | 数据页 / `DataPanel` 覆盖导入确认 | `08-mobile-data-page.png` |
| `data/data-merge-recommended-badge.png` | 合并导入推荐徽章 | 数据页 / `DataPanel` 恢复数据分组 | `08-mobile-data-page.png` |
| `data/data-danger-operation-badge.png` | 危险操作徽章 | 数据页 / `DataPanel` 危险操作区 | `08-mobile-data-page.png` |
| `data/data-pwa-guide.png` | PWA 添加到主屏幕说明插画 | 数据页 / `DataPanel` PWA 说明 | `08-mobile-data-page.png` |
| `data/data-device-no-sync.png` | 换设备不会自动同步说明插画 | 数据页 / `DataPanel` 本地保存说明 | `08-mobile-data-page.png` |
| `data/data-regular-backup.png` | 定期 JSON 备份建议插画 | 数据页 / `DataPanel` 本地保存说明、备份提醒 | `08-mobile-data-page.png` |
| `data/data-choose-file.png` | 选择 JSON 文件插画 | 数据页 / `DataPanel` 恢复数据分组 | `08-mobile-data-page.png` |

##### review

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `review/review-today-calendar-card.png` | 今日 tab 轻量日历卡背景 / 插画 | 回顾页 / `AnalyticsDashboard`、`CalendarView` | `07-mobile-review-page.png` |
| `review/review-encouragement-calendar.png` | 回顾页底部鼓励卡片日历插画 | 回顾页 / `AnalyticsDashboard` 鼓励 CTA | `07-mobile-review-page.png` |
| `review/review-go-record-sprout.png` | “去记录”按钮附近的小芽提示 | 回顾页 / `AnalyticsDashboard` 去记录 CTA | `07-mobile-review-page.png` |
| `review/review-bottom-leaf-line.png` | 回顾页底部叶线装饰 | 回顾页 / `AnalyticsDashboard` 底部区域 | `07-mobile-review-page.png` |
| `review/review-today-mini-garden.png` | 今日回顾迷你花园插画 | 回顾页 / 今日 tab | `07-mobile-review-page.png` |
| `review/review-week-growth.png` | 本周成长 / 趋势卡插画 | 回顾页 / 本周 tab | `07-mobile-review-page.png` |
| `review/review-month-bouquet.png` | 本月花束 / 月度回顾插画 | 回顾页 / 本月 tab | `07-mobile-review-page.png` |

##### detail

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `detail/detail-bottom-sheet-handle.png` | 详情 bottom sheet 顶部把手视觉素材 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail/detail-note-paper.png` | 补充日记纸张区平面装饰 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail/detail-note-corner-leaf.png` | 补充日记纸张角落叶片 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail/detail-favorite-badge.png` | 详情页收藏徽章 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png`、`04-emotion-icon-system.png` |
| `detail/detail-strength-flower-row.png` | 详情页心情强度小花行 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png`、`04-emotion-icon-system.png` |
| `detail/detail-delete-confirm.png` | 详情删除确认弹窗插画 | 详情弹窗 / `FlowerDetailModal` 删除确认 | `09-mobile-detail-modal.png` |
| `detail/detail-overlay-flower.png` | 详情弹窗遮罩层柔和花朵装饰 | 详情弹窗 / `FlowerDetailModal` overlay | `09-mobile-detail-modal.png` |
| `detail/detail-tag-plus.png` | 详情标签添加 / 标签区域提示素材 | 详情弹窗 / `FlowerDetailModal` 标签区 | `09-mobile-detail-modal.png` |

##### empty-states CTA

| 素材 | 用途 | 对应页面 / 组件 | 验收图 |
| --- | --- | --- | --- |
| `empty-states/empty-cta-record.png` | 空状态“去记录” CTA 插画 | `GardenView`、`CalendarView`、`AnalyticsDashboard` 空状态 | `03-empty-state-system.png` |
| `empty-states/empty-cta-filter-reset.png` | 筛选无结果“重置筛选” CTA 插画 | `GardenView`、`FilterPanel` 空状态 | `03-empty-state-system.png`、`06-mobile-garden-page.png` |
| `empty-states/empty-cta-backup.png` | 备份提醒 CTA 插画 | `DataPanel` 备份提示 | `03-empty-state-system.png`、`08-mobile-data-page.png` |
| `empty-states/empty-cta-add-tag.png` | 无标签“添加标签” CTA 插画 | `TagCloud`、`RecordForm` 标签空状态 | `03-empty-state-system.png` |
| `empty-states/empty-cta-favorite.png` | 无收藏“轻点星星收藏” CTA 插画 | `AnalyticsDashboard` 收藏回顾、`FlowerCard` 收藏提示 | `03-empty-state-system.png`、`04-emotion-icon-system.png` |

#### 3.14.9 缺失素材处理

1. 后续 DX.5-R1 / DX.5-R2 / DX.5-R3 如果需要第四批素材但文件缺失，Codex 必须先报告缺失文件。
2. 不允许用 emoji、临时 SVG、随机 CSS 图形、浏览器默认图标或外部图片替代正式素材。
3. 不允许为了绕过素材缺失而自行重新设计页面。
4. 背景装饰是 UI 蓝图元素，不是可以默认省略的装饰；如果蓝图中存在对应背景或装饰，DX.5-R1 / DX.5-R2 / DX.5-R3 必须优先检查并接入正式素材。
5. UI 图不是普通参考图，而是元素蓝图和视觉验收标准；实现和验收必须逐项核对图中明确存在的页面元素。
6. 新素材补齐后，必须同步更新 `ASSET_MANIFEST_V3_1.md` 和本文件。

### 3.15 第五批 UI 平面设计素材（DX.5-R0.6）

#### 3.15.1 目录目的

第五批素材用于 DX.5-R1 / DX.5-R2 / DX.5-R3 的平面设计完整性补齐，覆盖纸感、分割装饰、引导提示、图表柔化、反馈状态和状态徽章类蓝图元素。本轮只更新素材接入规范，不接入组件，不修改 CSS，不新增业务功能。

```text
src/assets/ui/paper/
src/assets/ui/guides/
src/assets/ui/chart-decorations/
src/assets/ui/feedback/
src/assets/ui/badges/
```

#### 3.15.2 paper / 纸感与分割装饰

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `paper/paper-soft-card-bg.png` | 柔和纸张卡片底纹 | 记录页、详情弹窗、回顾页 | `RecordForm`、`FlowerDetailModal`、`AnalyticsDashboard` | `02-component-style-board.png`、`05-mobile-record-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-note-line.png` | 补充日记横线纸纹 | 详情弹窗 | `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `paper/paper-dashed-divider.png` | 柔和虚线分割装饰 | 记录页、数据页、详情弹窗 | `RecordForm`、`DataPanel`、`FlowerDetailModal` | `02-component-style-board.png`、`08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-green.png` | 绿色纸胶带装饰 | 回顾卡、详情纸张、空状态卡 | `AnalyticsDashboard`、`FlowerDetailModal`、空状态区域 | `03-empty-state-system.png`、`07-mobile-review-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-pink.png` | 粉色纸胶带装饰 | 记录页、收藏提示、详情纸张 | `RecordForm`、`FlowerCard`、`FlowerDetailModal` | `02-component-style-board.png`、`05-mobile-record-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-yellow.png` | 浅黄纸胶带装饰 | 数据说明卡、回顾鼓励卡 | `DataPanel`、`AnalyticsDashboard` | `07-mobile-review-page.png`、`08-mobile-data-page.png` |
| `paper/paper-corner-fold.png` | 卡片折角纸感装饰 | 花卡片、最近记录、数据卡 | `FlowerCard`、`RecentRecords`、`DataPanel` | `02-component-style-board.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `paper/paper-hole-binding.png` | 手账装订孔装饰 | 回顾日历、详情补充日记 | `CalendarView`、`FlowerDetailModal` | `07-mobile-review-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-section-underline.png` | 标题下划线与区块分割 | 记录、花园、回顾、数据页标题 | `App.jsx` 页面 heading、`DataPanel`、`AnalyticsDashboard` | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png`、`08-mobile-data-page.png` |
| `paper/paper-soft-shadow-edge.png` | 柔和纸边阴影装饰 | 卡片、弹窗、bottom sheet | 通用卡片、`FlowerDetailModal` | `02-component-style-board.png`、`09-mobile-detail-modal.png` |

#### 3.15.3 guides / 引导与提示装饰

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `guides/guide-step-dot-active.png` | 新手引导当前步骤点 | 新手引导 | `OnboardingModal` | `02-component-style-board.png` |
| `guides/guide-step-dot-inactive.png` | 新手引导未激活步骤点 | 新手引导 | `OnboardingModal` | `02-component-style-board.png` |
| `guides/guide-arrow-soft.png` | 柔和方向箭头，引导查看详情或入口跳转 | 记录页、花园页、回顾页 | `RecentRecords`、`FlowerCard`、入口卡 | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png` |
| `guides/guide-pointer-leaf.png` | 叶片指示装饰，用于轻提示 | 记录页、空状态、数据页 | `RecordForm`、空状态区域、`DataPanel` | `03-empty-state-system.png`、`05-mobile-record-page.png`、`08-mobile-data-page.png` |
| `guides/guide-swipe-hint.png` | 滑动提示插画 | 移动端 bottom sheet、回顾分段 | `FlowerDetailModal`、`AnalyticsDashboard` | `07-mobile-review-page.png`、`09-mobile-detail-modal.png` |
| `guides/guide-tap-hint.png` | 点击提示插画 | 记录页、花卡片、空状态 CTA | `RecordForm`、`FlowerCard`、空状态区域 | `03-empty-state-system.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `guides/guide-collapse-hint.png.png` | 展开 / 收起提示插画；当前文件名以实际文件为准 | 记录更多选项、筛选折叠 | `RecordForm`、`FilterPanel` | `05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `guides/guide-scroll-hint.png` | 滚动提示插画 | 长内容弹层、数据页 | `FlowerDetailModal`、`DataPanel` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `guides/guide-small-sparkle.png` | 小闪光点装饰，用于轻量强调 | 记录页、Toast、空状态、回顾鼓励卡 | `RecordForm`、`Toast`、`AnalyticsDashboard` | `03-empty-state-system.png`、`05-mobile-record-page.png`、`07-mobile-review-page.png` |

#### 3.15.4 chart-decorations / 图表温柔化装饰

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `chart-decorations/chart-leaf-axis.png` | 图表坐标轴叶片装饰 | 回顾页 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-flower-point.png` | 趋势点小花标记 | 回顾页、日历 | `AnalyticsDashboard`、`CalendarView` | `04-emotion-icon-system.png`、`07-mobile-review-page.png` |
| `chart-decorations/chart-soft-line-end.png` | 趋势线末端柔和收尾 | 回顾页 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-ring-center-flower.png` | 环形图中心小花装饰 | 回顾页数据分布 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-empty-grid-plant.png` | 图表数据不足时的植物插画 | 回顾页空状态 | `AnalyticsDashboard` | `03-empty-state-system.png`、`07-mobile-review-page.png` |
| `chart-decorations/chart-week-marker.png` | 本周数据标记 | 回顾页本周 tab | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-month-marker.png` | 本月数据标记 | 回顾页本月 tab | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-trend-smile.png` | 趋势鼓励插画 | 回顾页趋势卡、鼓励 CTA | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `chart-decorations/chart-tag-bubble-bg.png` | 标签统计气泡背景 | 回顾页标签 Top 5 | `AnalyticsDashboard` | `07-mobile-review-page.png` |

#### 3.15.5 feedback / 反馈状态插画

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `feedback/feedback-success-flower.png` | 成功反馈插画 | Toast、保存成功、导出成功 | `Toast`、`DataPanel`、`FlowerDetailModal` | `02-component-style-board.png`、`08-mobile-data-page.png` |
| `feedback/feedback-error-flower.png` | 错误反馈插画 | Toast、导入失败 | `Toast`、`DataPanel` | `03-empty-state-system.png`、`08-mobile-data-page.png` |
| `feedback/feedback-info-note.png` | 信息提示插画 | Toast、数据说明、新手提示 | `Toast`、`DataPanel`、`OnboardingModal` | `02-component-style-board.png`、`08-mobile-data-page.png` |
| `feedback/feedback-loading-flower.png` | 加载中花朵插画 | 轻量加载状态 | `Toast`、后续 loading state | `02-component-style-board.png` |
| `feedback/feedback-saving-sprout.png` | 保存中 / 种花中反馈 | 记录提交、详情保存 | `RecordForm`、`FlowerDetailModal` | `05-mobile-record-page.png`、`09-mobile-detail-modal.png` |
| `feedback/feedback-importing-box.png` | 导入中反馈插画 | 数据页导入流程 | `DataPanel` | `08-mobile-data-page.png` |
| `feedback/feedback-exporting-file.png` | 导出中反馈插画 | 数据页导出流程 | `DataPanel` | `08-mobile-data-page.png` |
| `feedback/feedback-dialog-corner-leaf.png` | Dialog 角落叶片装饰 | 删除确认、覆盖导入确认 | `FlowerDetailModal`、`DataPanel` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `feedback/feedback-dialog-soft-shadow.png` | Dialog 柔和阴影边缘 | 删除确认、覆盖导入确认 | `FlowerDetailModal`、`DataPanel` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `feedback/feedback-toast-sparkle.png` | Toast 小闪光装饰 | Toast | `Toast` | `02-component-style-board.png` |

#### 3.15.6 badges / 状态徽章

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `badges/badge-today.png` | 今日徽章 | 花园页、日历、最近记录 | `FlowerCard`、`CalendarView`、`RecentRecords` | `05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `badges/badge-recommended.png` | 推荐徽章 | 数据页合并导入、回顾鼓励 | `DataPanel`、`AnalyticsDashboard` | `08-mobile-data-page.png` |
| `badges/badge-danger-soft.png` | 柔和危险操作徽章 | 覆盖导入、删除确认、危险区 | `DataPanel`、`FlowerDetailModal` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `badges/badge-favorite.png` | 已收藏徽章 | 花卡片、详情弹窗、收藏回顾 | `FlowerCard`、`FlowerDetailModal`、`AnalyticsDashboard` | `04-emotion-icon-system.png`、`06-mobile-garden-page.png`、`09-mobile-detail-modal.png` |
| `badges/badge-local-only.png` | 本地保存徽章 | 数据页本地保存说明 | `DataPanel` | `08-mobile-data-page.png` |
| `badges/badge-no-sync.png` | 不自动同步徽章 | 数据页本地保存说明、PWA 说明 | `DataPanel` | `08-mobile-data-page.png` |
| `badges/badge-backup-reminder.png` | 备份提醒徽章 | 数据页备份提醒 | `DataPanel` | `08-mobile-data-page.png` |
| `badges/badge-new-record.png` | 新记录徽章 | 记录页、最近记录 | `RecordForm`、`RecentRecords` | `05-mobile-record-page.png` |
| `badges/badge-selected.png` | 选中状态徽章 | 情绪选择、筛选、标签、花卡片 | `RecordForm`、`FilterPanel`、`FlowerCard` | `02-component-style-board.png`、`04-emotion-icon-system.png` |
| `badges/badge-more.png` | 更多操作徽章 | 花卡片、最近记录、移动端入口卡 | `FlowerCard`、`RecentRecords`、入口卡 | `05-mobile-record-page.png`、`06-mobile-garden-page.png` |

#### 3.15.7 第五批素材使用边界

1. 第五批素材只补齐 UI 平面设计完整性，不改变 records localStorage 主结构、CRUD、筛选、搜索、排序、日历、分析、导入导出或主题 key。
2. CSS 仍负责布局、按钮、卡片、输入框、chip、圆角、阴影、基础背景、柔和渐变和色块；第五批素材只负责纸张、引导、图表装饰、反馈和徽章。
3. DX.5-R1 / DX.5-R2 / DX.5-R3 后续实现时，必须优先使用第五批目录中的正式素材。
4. Codex 后续不得用临时 CSS 图形、emoji、随机 SVG、浏览器默认符号或外部图片替代第五批正式素材。
5. 后续如果组件需要第五批目录中的素材但文件尚未存在，必须停止当前 UI 接入并报告缺失素材，不能临时替代。
6. 纸感、分割装饰、反馈状态、引导提示、图表装饰和状态徽章都是 UI 蓝图元素的一部分；不能因为“只是装饰”而默认省略或临时伪造。
7. 页面背景不依赖第五批 `patterns/` 纹理素材；后续 Codex 不得引用 `src/assets/ui/patterns/`，背景层优先使用已有 `backgrounds/`、`decorations/`、`paper/` 素材，以及 CSS 的柔和渐变和色块。

## 4. 交给 CSS 实现的视觉

以下内容不应做成图片素材，应由 CSS token、组件 className 和基础样式实现：

- 按钮背景；
- 卡片圆角；
- 卡片阴影；
- chip 背景；
- 输入框；
- 页面渐变背景；
- Toast 外壳；
- Modal 外壳；
- hover / active / focus 状态；
- 底部导航背景。

实现规则：

- CSS 负责结构、状态和基础质感；
- PNG / SVG 素材只负责图标、花朵、插画、装饰和语义视觉；
- 不允许用图片模拟按钮、卡片、输入框或布局容器。
- 如果第五批已经提供纸感、分割装饰、反馈状态或徽章类正式素材，后续实现必须优先使用正式素材；CSS 不能用临时图形伪造这些 UI 蓝图元素。
- 页面背景不依赖第五批 `patterns/` 纹理素材；后续 Codex 不得引用 `src/assets/ui/patterns/`，背景层优先使用已有 `backgrounds/`、`decorations/`、`paper/` 素材，以及 CSS 的柔和渐变和色块。

---

## 5. 缺素材处理规则

1. 如果缺少 P0 素材，必须停止当前 UI 实现并报告缺失文件。
2. 不得自行生成替代图标。
3. 不得使用 emoji 代替正式素材。
4. 不得使用浏览器默认图标代替正式素材。
5. 不得引入外部图标库或第三方 UI 库。
6. 不得用随机 CSS 图形伪造正式素材。
7. 如确认需要新增素材，必须先更新 `ASSET_MANIFEST_V3_1.md` 或提交明确素材补充清单，再进入接入。
8. 第五批 `paper/`、`guides/`、`chart-decorations/`、`feedback/`、`badges/` 目录中的素材尚未补齐前，不得用临时 CSS 图形、emoji、随机 SVG、浏览器默认符号或外部图片替代。
9. 页面背景不依赖 `src/assets/ui/patterns/`；后续 Codex 不得引用 `patterns/` 目录，也不得把它作为 DX.5-R 的正式素材依赖。

---

## 6. 视觉验收规则

UI 参考图目录：`pic/ui-reference/`

实际素材目录：`src/assets/ui/`

验收依据：

| 阶段 | 验收重点 | 参考图 |
| --- | --- | --- |
| DX.2-R | 按钮、chip、card、Toast、Modal 基础组件 | `02-component-style-board.png` |
| DX.3 | 核心页面、记录页、花园页、整体气质 | `01-final-visual-direction.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| DX.4 | 移动端记录 / 花园 / 回顾 / 数据四页 | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png`、`08-mobile-data-page.png` |
| DX.5 | 空状态、情绪图标、详情弹窗、bottom sheet、删除确认 | `03-empty-state-system.png`、`04-emotion-icon-system.png`、`09-mobile-detail-modal.png` |

特别规则：

- 后续 UI 不是“参考这些图”，而是必须以这些图作为视觉验收标准。
- Codex 不得自行重新设计 UI。
- 若参考图路径和实际文件名不一致，必须先报告路径问题，不能跳过验收。

---

## 7. 后续实施阶段

### DX.2-R：基础组件使用素材

目标：

- Button、chip、card、input、Toast、Modal 基础视觉统一；
- 基础控制图标开始按规范接入；
- 不改变页面结构和业务逻辑。

### DX.3：核心页面使用素材

目标：

- Hero、RecordForm、TodayStatusCard、RecentRecords、GardenView、FlowerCard 开始接入对应素材；
- 快速记录路径保持清楚；
- 花卡片视觉贴近参考图；
- 不改变 CRUD、筛选、导入导出等核心逻辑。

### DX.4：移动端四页使用素材

目标：

- 记录 / 花园 / 回顾 / 数据四个移动端页面按参考图组织；
- 底部导航、筛选折叠、回顾分段、数据页说明按图接入素材；
- 不引入 React Router，不改变 records 数据结构。

### DX.5：弹窗、Toast、空状态完整使用素材

目标：

- FlowerDetailModal、删除确认、Toast、OnboardingModal、九类 EmptyState 完整接入正式素材；
- 删除确认和危险操作视觉清楚但克制；
- DX.5-R1 / DX.5-R2 / DX.5-R3 可按第五批目录逐步补齐纸张、引导、图表装饰、反馈和徽章类正式素材；
- 保持 aria、focus-visible 和移动端可用性。

---

## 8. 最终边界

素材接入只服务于 UI 落地，不得改变：

- records localStorage 主结构；
- 记录新增、编辑、删除、收藏逻辑；
- 筛选、搜索、排序逻辑；
- 日历计算逻辑；
- 数据分析计算逻辑；
- 导入导出格式和逻辑；
- 主题 key；
- PWA 基础逻辑。

任何视觉素材缺口都应通过素材清单和正式素材补充解决，不能由 Codex 自行重新设计。
