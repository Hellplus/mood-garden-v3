# Mood Garden V3.1 UI 素材清单

## 1. 素材库目的

本清单用于约束 Mood Garden V3.1 后续 UI 素材的创建、命名、引用和验收。

`src/assets/ui/` 是实际前端素材库。后续放入这里的图标、花朵、强度、空状态和装饰素材，必须服务于已经确认的 UI 设计，不允许 Codex 自行重新设计视觉风格。

素材目标：

```text
统一
温柔
低饱和
线性手绘
小尺寸可读
适合长期维护
```

## 2. `pic/ui-reference/` 与 `src/assets/ui/` 的区别

`pic/ui-reference/`：

- 保存 01-09 UI 参考图；
- 是 UI 实现与验收的视觉标准；
- 不应被当作前端运行时素材直接引用；
- 不允许被随意改名、裁剪或覆盖。

`src/assets/ui/`：

- 保存后续可被 React / CSS 实际引用的素材；
- 素材必须从 01-09 UI 参考图的风格中提取和实现；
- 可以包含 SVG 或少量 PNG；
- 命名必须清楚、稳定、可维护。

## 3. UI 参考图视觉标准

后续素材必须严格依据：

```text
pic/ui-reference/01-final-visual-direction.png
pic/ui-reference/02-component-style-board.png
pic/ui-reference/03-empty-state-system.png
pic/ui-reference/04-emotion-icon-system.png
pic/ui-reference/05-mobile-record-page.png
pic/ui-reference/06-mobile-garden-page.png
pic/ui-reference/07-mobile-review-page.png
pic/ui-reference/08-mobile-data-page.png
pic/ui-reference/09-mobile-detail-modal.png
```

这些图片不是普通参考图，而是后续 UI 实现和验收标准。Codex 不得脱离这些图自行重新设计图标、空状态、花朵或装饰元素。

## 4. 必需素材清单

后续素材库至少需要覆盖：

```text
1. 五种情绪图标；
2. 五种情绪花朵 / 花卡片素材；
3. 1-5 小花强度素材；
4. 四个底部导航图标；
5. 通用操作图标；
6. 九类空状态插画；
7. 页面轻量装饰素材；
8. Toast / Dialog 可复用状态图标；
9. PWA / 数据说明相关轻量图标。
```

## 5. 情绪图标清单

目录建议：

```text
src/assets/ui/icons/emotions/
```

必需素材：

```text
happy.svg      开心：小太阳 / 黄色小花方向
calm.svg       平静：叶子 / 绿色小花方向
anxious.svg    焦虑：小云 / 雨滴方向
tired.svg      疲惫：月亮 / 低垂小花方向
excited.svg    兴奋：星星 / 粉色小花方向
```

要求：

- 必须是统一线性手绘风；
- 线宽、圆角、色彩饱和度保持一致；
- 小尺寸下仍然可读；
- 必须配合文字使用，不能只靠颜色表达情绪。

## 6. 花朵素材清单

目录建议：

```text
src/assets/ui/flowers/
```

必需素材：

```text
flower-happy.svg
flower-calm.svg
flower-anxious.svg
flower-tired.svg
flower-excited.svg
flower-pot.svg
flower-sprout.svg
garden-small.svg
```

用途：

- 花卡片主视觉；
- 今日状态卡；
- 新手引导；
- 空状态辅助插画；
- 回顾页轻量装饰。

要求：

- 风格必须来自 04 情绪图标系统和 02 组件样式板；
- 不做复杂 3D；
- 不做高拟真水彩；
- 不做厚重阴影；
- 不引入外部插画资源。

## 7. 小花强度素材清单

目录建议：

```text
src/assets/ui/strength/
```

必需素材：

```text
strength-flower-empty.svg
strength-flower-filled.svg
strength-flower-half.svg   可选
```

使用方式：

```text
强度 1：filled x1 + empty x4
强度 2：filled x2 + empty x3
强度 3：filled x3 + empty x2
强度 4：filled x4 + empty x1
强度 5：filled x5
```

要求：

- 心情强度必须使用小花，不使用爱心；
- 必须同时显示强度文字或数字；
- 不能只靠颜色表达强度。

## 8. 底部导航图标清单

目录建议：

```text
src/assets/ui/icons/nav/
```

必需素材：

```text
nav-record.svg   记录：小芽 / 铅笔
nav-garden.svg   花园：花朵
nav-review.svg   回顾：日历 / 手账
nav-data.svg     数据：文件盒 / 数据卡
```

要求：

- 必须配合文字显示；
- 当前选中态不能只靠颜色；
- 图标风格与情绪图标一致。

## 9. 操作图标清单

目录建议：

```text
src/assets/ui/icons/actions/
```

必需素材：

```text
edit.svg
delete.svg
favorite-outline.svg
favorite-filled.svg
close.svg
export.svg
import.svg
search.svg
filter.svg
sort.svg
theme.svg
back.svg
next.svg
more.svg
info.svg
success.svg
error.svg
```

要求：

- 收藏使用星星，不使用爱心；
- 删除使用危险色体系，但默认不刺眼；
- Toast 状态图标可复用 `success.svg`、`error.svg`、`info.svg`；
- 操作图标必须统一线宽和圆角。

## 10. 九类空状态插画清单

目录建议：

```text
src/assets/ui/empty-states/
```

必需素材：

```text
empty-records.svg          还没有记录
empty-today.svg            今天还没有种花
empty-filter.svg           筛选无结果
empty-calendar-day.svg     日历当天无记录
empty-analytics.svg        分析数据不足
empty-tags.svg             没有标签
empty-favorites.svg        没有收藏
empty-import-error.svg     导入错误
empty-backup.svg           备份提示
```

要求：

- 必须依据 `03-empty-state-system.png`；
- 插画轻量、线性、低饱和；
- 不使用复杂插画资源；
- 不使用统一“暂无数据”图标替代全部场景。

## 11. 页面装饰素材清单

目录建议：

```text
src/assets/ui/decorations/
```

可选素材：

```text
hero-window.svg
soft-leaf.svg
tiny-sparkle.svg
notebook-line.svg
garden-divider.svg
paper-tape.svg
corner-flower.svg
```

要求：

- 只能用于轻量氛围；
- 不得抢占内容主体；
- 不做浮动花瓣粒子；
- 不做复杂水彩背景；
- 不影响阅读和性能。

## 第二批 UI 素材清单（V3.1-DX.2-B）

第二批素材统一放在 `src/assets/ui/icons/`，用于补齐反馈状态、数据管理、新手引导、确认提示和日历标记。它们不是临时占位图，而是后续 UI 接入时的正式素材。

| 文件 | 用途 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `toast-success.png` | 成功反馈，例如保存、导出、导入完成 | `Toast` | `02-component-style-board.png` |
| `toast-error.png` | 错误反馈，例如导入失败、文件格式错误 | `Toast` | `02-component-style-board.png`、`03-empty-state-system.png` |
| `toast-info.png` | 信息提示，例如本地保存、PWA 说明 | `Toast` | `02-component-style-board.png`、`08-mobile-data-page.png` |
| `data-txt-export.png` | TXT 日记导出入口图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-json-backup.png` | JSON 备份导出入口图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-json-import.png` | JSON 文件导入入口图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-merge-import.png` | 合并导入说明或按钮图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-overwrite-import.png` | 覆盖导入说明或按钮图标 | `DataPanel` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `data-local-storage.png` | 本地浏览器保存说明图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-pwa-install.png` | 添加到主屏幕 / PWA 说明图标 | `DataPanel` | `08-mobile-data-page.png` |
| `data-non-medical-note.png` | 非医疗建议说明图标 | `DataPanel`、说明卡片 | `08-mobile-data-page.png` |
| `onboarding-mood.png` | 新手引导第一步：选择情绪 | `OnboardingModal` | `02-component-style-board.png`、`05-mobile-record-page.png` |
| `onboarding-write.png` | 新手引导第二步：写下一句话 | `OnboardingModal` | `02-component-style-board.png`、`05-mobile-record-page.png` |
| `onboarding-plant.png` | 新手引导第三步：种下一朵花 | `OnboardingModal` | `02-component-style-board.png`、`05-mobile-record-page.png` |
| `warning-soft.png` | 柔和警告提示，例如覆盖导入前提醒 | 确认弹窗、`DataPanel` | `08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `delete-confirm-flower.png` | 删除确认中的花朵提示图 | 删除确认弹窗、`FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `calendar-flower-dot.png` | 日历中有记录日期的小花点 | `CalendarView` | `04-emotion-icon-system.png`、`07-mobile-review-page.png` |
| `calendar-today-flower.png` | 今日日期标记 | `CalendarView` | `04-emotion-icon-system.png`、`07-mobile-review-page.png` |
| `calendar-selected-marker.png` | 当前选中日期标记 | `CalendarView` | `04-emotion-icon-system.png`、`07-mobile-review-page.png` |

### 第二批素材接入规则

1. `Toast` 必须优先使用 `toast-success.png`、`toast-error.png`、`toast-info.png` 区分成功、错误和信息提示。
2. `DataPanel` 必须优先使用 `data-*` 图标展示 TXT 导出、JSON 备份、JSON 导入、合并导入、覆盖导入、本地保存、PWA 安装和非医疗说明。
3. `OnboardingModal` 必须优先使用 `onboarding-mood.png`、`onboarding-write.png`、`onboarding-plant.png` 对应三步引导。
4. 删除确认、覆盖导入确认等高风险提示，必须优先使用 `warning-soft.png` 或 `delete-confirm-flower.png`。
5. `CalendarView` 的有记录日期、今日日期、选中日期标记，必须优先使用 `calendar-*` 素材。
6. 已存在正式 PNG 素材时，Codex 只能接入、排版或通过 CSS 调整尺寸和间距，不得用 emoji 或临时 SVG 替代。
7. 如果某个场景缺少正式素材，应先在验收或方案中说明缺口，不得自行重新设计新的图标风格。
8. 接入第二批素材时不得改变业务逻辑、records localStorage 主结构、导入导出格式或核心计算逻辑。

## 第三批 UI 素材清单（V3.1-DX.2-C 准备）

第三批素材用于补齐基础控制、花卡片与记录页装饰、分析与回顾页视觉入口。素材分别放在 `src/assets/ui/icons/` 和 `src/assets/ui/decorations/`，后续接入时必须作为正式素材使用。

### 基础控制图标

| 文件 | 用途 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `theme-light.png` | 浅色主题入口图标 | `ThemeSwitcher` | `02-component-style-board.png` |
| `theme-dark.png` | 深色主题入口图标 | `ThemeSwitcher` | `02-component-style-board.png` |
| `theme-cozy.png` | cozy 主题入口图标 | `ThemeSwitcher` | `02-component-style-board.png` |
| `chevron-down.png` | 展开更多内容、折叠面板下拉状态 | `RecordForm`、`FilterPanel`、折叠区 | `02-component-style-board.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `chevron-up.png` | 收起更多内容、折叠面板收起状态 | `RecordForm`、`FilterPanel`、折叠区 | `02-component-style-board.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `action-more.png` | 更多操作入口 | `FlowerCard`、操作菜单、卡片操作区 | `02-component-style-board.png`、`06-mobile-garden-page.png` |
| `action-check.png` | 确认、保存、完成状态 | 保存按钮、确认操作、状态提示 | `02-component-style-board.png`、`09-mobile-detail-modal.png` |
| `action-cancel.png` | 取消、关闭编辑或取消选择 | 弹窗按钮、编辑态操作 | `02-component-style-board.png`、`09-mobile-detail-modal.png` |
| `action-reset.png` | 重置筛选、清除条件 | `FilterPanel` | `02-component-style-board.png`、`06-mobile-garden-page.png` |
| `action-sort.png` | 排序入口或排序选择 | `FilterPanel` | `02-component-style-board.png`、`06-mobile-garden-page.png` |
| `action-tag.png` | 标签入口、标签筛选或标签说明 | `TagCloud`、`FilterPanel`、`RecordForm` | `02-component-style-board.png`、`06-mobile-garden-page.png` |
| `action-clock.png` | 时间、最近记录、记录时间标识 | `RecentRecords`、`FlowerCard`、详情弹窗 | `02-component-style-board.png`、`09-mobile-detail-modal.png` |
| `action-calendar.png` | 日期、日历入口、日期字段标识 | `CalendarView`、`FlowerCard`、详情弹窗 | `02-component-style-board.png`、`07-mobile-review-page.png` |

### 花卡片与记录页装饰

| 文件 | 用途 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `flower-card-corner-leaf.png` | 花卡片角落叶片装饰 | `FlowerCard` | `01-final-visual-direction.png`、`06-mobile-garden-page.png` |
| `flower-card-paper-corner.png` | 花卡片纸张角标装饰 | `FlowerCard` | `01-final-visual-direction.png`、`02-component-style-board.png`、`06-mobile-garden-page.png` |
| `favorite-ribbon.png` | 收藏状态的轻量丝带装饰 | `FlowerCard`、收藏状态展示 | `02-component-style-board.png`、`04-emotion-icon-system.png`、`06-mobile-garden-page.png` |
| `record-date-pin.png` | 记录日期或时间的小别针装饰 | `FlowerCard`、`RecentRecords` | `02-component-style-board.png`、`06-mobile-garden-page.png` |
| `hero-garden-corner.png` | Hero 区域花园角落装饰 | `HeroSection` | `01-final-visual-direction.png`、`05-mobile-record-page.png` |
| `hero-soft-cloud.png` | Hero 区域柔和云朵氛围 | `HeroSection` | `01-final-visual-direction.png`、`05-mobile-record-page.png` |
| `hero-floating-star.png` | Hero 或空状态中的轻量星点装饰 | `HeroSection`、空状态 | `01-final-visual-direction.png`、`03-empty-state-system.png` |
| `record-sprout.png` | 快速记录区的小芽装饰 | `RecordForm` | `02-component-style-board.png`、`05-mobile-record-page.png` |
| `record-pencil-note.png` | 记录输入区的便签 / 铅笔装饰 | `RecordForm`、`RecentRecords` | `02-component-style-board.png`、`05-mobile-record-page.png` |

### 分析与回顾页图标

| 文件 | 用途 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `analytics-overview.png` | 数据总览卡片图标 | `AnalyticsDashboard` | `02-component-style-board.png`、`07-mobile-review-page.png` |
| `analytics-today.png` | 今日洞察图标 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `analytics-week.png` | 本周洞察图标 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `analytics-month.png` | 本月洞察图标 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `analytics-trend.png` | 趋势统计图标 | `AnalyticsDashboard` | `02-component-style-board.png`、`07-mobile-review-page.png` |
| `analytics-tags.png` | 标签 Top 5 或标签分析图标 | `AnalyticsDashboard` | `02-component-style-board.png`、`07-mobile-review-page.png` |
| `analytics-favorite.png` | 收藏回顾图标 | `AnalyticsDashboard` | `02-component-style-board.png`、`04-emotion-icon-system.png`、`07-mobile-review-page.png` |
| `analytics-streak.png` | 连续记录天数图标 | `AnalyticsDashboard` | `07-mobile-review-page.png` |
| `analytics-intensity.png` | 心情强度分析图标 | `AnalyticsDashboard` | `04-emotion-icon-system.png`、`07-mobile-review-page.png` |
| `review-today.png` | 回顾页今日分段入口图标 | 回顾 tab、`AnalyticsDashboard` | `07-mobile-review-page.png` |
| `review-week.png` | 回顾页本周分段入口图标 | 回顾 tab、`AnalyticsDashboard` | `07-mobile-review-page.png` |
| `review-month.png` | 回顾页本月分段入口图标 | 回顾 tab、`CalendarView`、`AnalyticsDashboard` | `07-mobile-review-page.png` |

### 第三批素材接入规则

1. `ThemeSwitcher` 必须优先使用 `theme-light.png`、`theme-dark.png`、`theme-cozy.png` 展示主题入口。
2. 展开 / 收起控件必须优先使用 `chevron-down.png` 和 `chevron-up.png`。
3. 更多、确认、取消、重置、排序、标签、时间、日历操作必须优先使用对应 `action-*` 图标。
4. `FlowerCard` 与 `RecordForm` 的轻量装饰必须优先使用 `src/assets/ui/decorations/` 中的对应素材。
5. `AnalyticsDashboard` 和 `CalendarView` 必须优先使用 `analytics-*` 和 `review-*` 图标。
6. 已存在正式素材时，不允许用 emoji、临时 SVG、随机 CSS 图形或浏览器默认符号替代。
7. 如果后续组件需要图标但素材缺失，Codex 必须先报告缺失素材，并等待补充或明确授权，不能自由替代。
8. 接入第三批素材时不得新增业务功能，不得修改 records localStorage 主结构，不得改动 CRUD、筛选、日历、分析或导入导出核心逻辑。

## 11.1 第四批 UI 平面设计素材清单（V3.1-DX.5-R0.5）

第四批素材用于补齐 V3.1-DX.5-R0 审计中确认的“页面元素蓝图”缺口，重点覆盖移动端页面背景、轻量入口卡、卡片平面装饰、弹窗确认、数据页、回顾页和详情页的平面设计素材。第四批素材只服务 UI 视觉落地，不新增业务功能，不改变 records localStorage 主结构，不改变 CRUD、筛选、日历、分析、导入导出逻辑。

### 第四批素材目录

| 目录 | 用途 | 主要对应阶段 |
| --- | --- | --- |
| `src/assets/ui/backgrounds/` | 移动端四页顶部柔和背景、窗边植物、页面氛围底图 | DX.5-R1 |
| `src/assets/ui/entries/` | 移动端记录页“花园 / 回顾 / 数据”轻量入口卡插画 | DX.5-R1 |
| `src/assets/ui/cards/` | 今日状态、最近记录、花卡、筛选摘要等卡片平面装饰 | DX.5-R1 / DX.5-R2 |
| `src/assets/ui/modals/` | 覆盖导入确认、通用确认弹窗里的平面提示素材 | DX.5-R3 |
| `src/assets/ui/data/` | 数据页备份、恢复、本地保存、PWA、非医疗说明等分组插画 | DX.5-R1 / DX.5-R3 |
| `src/assets/ui/review/` | 回顾页今日 / 本周 / 本月、底部鼓励卡片、轻量日历区素材 | DX.5-R1 |
| `src/assets/ui/detail/` | 详情 bottom sheet、补充日记、删除确认等详情页装饰素材 | DX.5-R3 |

### 第四批正式素材清单（DX.5-R0.5 已补齐）

以下文件为 DX.5-R0.5 已补齐的第四批正式 UI 平面设计素材。01-09 UI 图不是普通参考图，而是页面元素蓝图和视觉验收标准；这些素材用于补齐蓝图中明确存在的页面背景、入口卡、卡片装饰、数据说明、回顾、详情弹窗和空状态 CTA 等元素。后续 DX.5-R1 / DX.5-R2 / DX.5-R3 必须优先使用这些正式素材；如果素材缺失，Codex 必须停止并报告，不能用 emoji、临时 SVG、随机 CSS 图形或浏览器默认图标替代。

#### backgrounds

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `mobile-record-top-garden.png` | 移动端记录页顶部花园氛围背景 | 记录页 / `App.jsx` 移动端记录 tab、`HeroSection` | `05-mobile-record-page.png` |
| `mobile-garden-top-window.png` | 移动端花园页顶部窗边植物背景 | 花园页 / `GardenView`、`App.jsx` 移动端花园 heading | `06-mobile-garden-page.png` |
| `mobile-review-top-leaves.png` | 移动端回顾页顶部叶片手账背景 | 回顾页 / `AnalyticsDashboard`、`CalendarView`、`App.jsx` 移动端回顾 heading | `07-mobile-review-page.png` |
| `mobile-data-top-plant.png` | 移动端数据页顶部植物和本地保存背景 | 数据页 / `DataPanel`、`App.jsx` 移动端数据 heading | `08-mobile-data-page.png` |
| `desktop-hero-garden-bg.png` | 桌面端 Hero 花园背景 | 桌面首页 / `HeroSection` | `01-final-visual-direction.png` |
| `desktop-soft-page-corner.png` | 桌面端页面角落柔和装饰 | 桌面全局页面 / `App.jsx`、`HeroSection` | `01-final-visual-direction.png` |
| `card-soft-bloom-corner.png` | 通用卡片柔和花朵角落装饰 | 记录卡、花卡、数据卡、回顾卡 / 多组件 | `02-component-style-board.png` |
| `bottom-nav-soft-bg.png` | 移动端底部导航柔和背景底片 | 移动端底部导航 / `MobileBottomNav` | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png`、`08-mobile-data-page.png` |

#### entries

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `entry-garden-card.png` | 记录页“花园”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entry-review-card.png` | 记录页“回顾”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entry-data-card.png` | 记录页“数据”轻量入口卡主插画 | 记录页 / 移动端入口卡、`App.jsx` | `05-mobile-record-page.png` |
| `entry-garden-small.png` | “花园”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |
| `entry-review-small.png` | “回顾”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |
| `entry-data-small.png` | “数据”入口小图标 / 辅助视觉 | 记录页 / 轻量入口卡、导航提示 | `05-mobile-record-page.png` |

#### cards

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `recent-view-all-arrow.png` | 最近记录“查看全部”或进入详情方向箭头 | 记录页 / `RecentRecords` | `05-mobile-record-page.png` |
| `recent-more-dots.png` | 最近记录更多提示点状装饰 | 记录页 / `RecentRecords` | `05-mobile-record-page.png` |
| `recent-strength-flower-row.png` | 最近记录中的小花强度行装饰 | 记录页 / `RecentRecords` | `05-mobile-record-page.png`、`04-emotion-icon-system.png` |
| `flower-card-date-chip-bg.png` | 花卡片日期 chip 背景贴纸 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png` |
| `flower-card-detail-arrow.png` | 花卡详情入口箭头 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png` |
| `flower-card-more-button-bg.png` | 花卡更多操作按钮背景 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png`、`02-component-style-board.png` |
| `flower-card-favorite-corner.png` | 花卡收藏角标 / 星星角落装饰 | 花园页 / `FlowerCard` | `06-mobile-garden-page.png`、`04-emotion-icon-system.png` |

#### modals

`src/assets/ui/modals/` 目录已建立，用于后续确认类平面素材归档。DX.5-R0.5 第四批实际补齐素材中，覆盖导入确认与详情删除确认分别由 `data/data-cover-import-confirm.png` 和 `detail/detail-delete-confirm.png` 承担；如后续需要新增 `modals/` 内正式文件，必须先更新本清单再接入。

#### data

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `data-delete-all.png` | 删除全部数据入口图标 / 危险操作视觉 | 数据页 / `DataPanel` 危险操作区 | `08-mobile-data-page.png` |
| `data-delete-all-warning.png` | 删除全部数据警告说明插画 | 数据页 / `DataPanel` 危险操作区、确认弹窗 | `08-mobile-data-page.png` |
| `data-cover-import-confirm.png` | 覆盖导入确认插画 | 数据页 / `DataPanel` 覆盖导入确认 | `08-mobile-data-page.png` |
| `data-merge-recommended-badge.png` | 合并导入推荐徽章 | 数据页 / `DataPanel` 恢复数据分组 | `08-mobile-data-page.png` |
| `data-danger-operation-badge.png` | 危险操作徽章 | 数据页 / `DataPanel` 危险操作区 | `08-mobile-data-page.png` |
| `data-pwa-guide.png` | PWA 添加到主屏幕说明插画 | 数据页 / `DataPanel` PWA 说明 | `08-mobile-data-page.png` |
| `data-device-no-sync.png` | 换设备不会自动同步说明插画 | 数据页 / `DataPanel` 本地保存说明 | `08-mobile-data-page.png` |
| `data-regular-backup.png` | 定期 JSON 备份建议插画 | 数据页 / `DataPanel` 本地保存说明、备份提醒 | `08-mobile-data-page.png` |
| `data-choose-file.png` | 选择 JSON 文件插画 | 数据页 / `DataPanel` 恢复数据分组 | `08-mobile-data-page.png` |

#### review

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `review-today-calendar-card.png` | 今日 tab 轻量日历卡背景 / 插画 | 回顾页 / `AnalyticsDashboard`、`CalendarView` | `07-mobile-review-page.png` |
| `review-encouragement-calendar.png` | 回顾页底部鼓励卡片日历插画 | 回顾页 / `AnalyticsDashboard` 鼓励 CTA | `07-mobile-review-page.png` |
| `review-go-record-sprout.png` | “去记录”按钮附近的小芽提示 | 回顾页 / `AnalyticsDashboard` 去记录 CTA | `07-mobile-review-page.png` |
| `review-bottom-leaf-line.png` | 回顾页底部叶线装饰 | 回顾页 / `AnalyticsDashboard` 底部区域 | `07-mobile-review-page.png` |
| `review-today-mini-garden.png` | 今日回顾迷你花园插画 | 回顾页 / 今日 tab | `07-mobile-review-page.png` |
| `review-week-growth.png` | 本周成长 / 趋势卡插画 | 回顾页 / 本周 tab | `07-mobile-review-page.png` |
| `review-month-bouquet.png` | 本月花束 / 月度回顾插画 | 回顾页 / 本月 tab | `07-mobile-review-page.png` |

#### detail

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `detail-bottom-sheet-handle.png` | 详情 bottom sheet 顶部把手视觉素材 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail-note-paper.png` | 补充日记纸张区平面装饰 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail-note-corner-leaf.png` | 补充日记纸张角落叶片 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `detail-favorite-badge.png` | 详情页收藏徽章 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png`、`04-emotion-icon-system.png` |
| `detail-strength-flower-row.png` | 详情页心情强度小花行 | 详情弹窗 / `FlowerDetailModal` | `09-mobile-detail-modal.png`、`04-emotion-icon-system.png` |
| `detail-delete-confirm.png` | 详情删除确认弹窗插画 | 详情弹窗 / `FlowerDetailModal` 删除确认 | `09-mobile-detail-modal.png` |
| `detail-overlay-flower.png` | 详情弹窗遮罩层柔和花朵装饰 | 详情弹窗 / `FlowerDetailModal` overlay | `09-mobile-detail-modal.png` |
| `detail-tag-plus.png` | 详情标签添加 / 标签区域提示素材 | 详情弹窗 / `FlowerDetailModal` 标签区 | `09-mobile-detail-modal.png` |

#### empty-states CTA

| 文件 | 用途 | 对应页面 / 组件 | 参考 UI 图 |
| --- | --- | --- | --- |
| `empty-cta-record.png` | 空状态“去记录” CTA 插画 | `GardenView`、`CalendarView`、`AnalyticsDashboard` 空状态 | `03-empty-state-system.png` |
| `empty-cta-filter-reset.png` | 筛选无结果“重置筛选” CTA 插画 | `GardenView`、`FilterPanel` 空状态 | `03-empty-state-system.png`、`06-mobile-garden-page.png` |
| `empty-cta-backup.png` | 备份提醒 CTA 插画 | `DataPanel` 备份提示 | `03-empty-state-system.png`、`08-mobile-data-page.png` |
| `empty-cta-add-tag.png` | 无标签“添加标签” CTA 插画 | `TagCloud`、`RecordForm` 标签空状态 | `03-empty-state-system.png` |
| `empty-cta-favorite.png` | 无收藏“轻点星星收藏” CTA 插画 | `AnalyticsDashboard` 收藏回顾、`FlowerCard` 收藏提示 | `03-empty-state-system.png`、`04-emotion-icon-system.png` |

### 第四批素材接入规则

1. DX.5-R1 / DX.5-R2 / DX.5-R3 后续实现时，必须优先使用第四批目录中的正式素材。
2. 如果第四批素材缺失，Codex 必须停止当前 UI 接入并报告缺失文件，不能用 emoji、临时 SVG、随机 CSS 图形或浏览器默认图标替代。
3. 第四批素材只作为页面装饰、入口插画、状态插画和弹窗插画使用；按钮、卡片圆角、阴影、chip、输入框、Toast 外壳、Modal 外壳仍由 CSS 实现。
4. 第四批素材不得引入新的业务含义，不得新增记录字段，不得改变导入导出 JSON 结构。
5. 背景装饰属于 UI 蓝图元素，不能因为“只是装饰”而在 DX.5-R 阶段默认省略。
6. 01-09 UI 图不是普通参考图，而是元素蓝图和视觉验收标准；实现和验收必须逐项核对图中明确存在的页面元素。

## 11.2 第五批 UI 平面设计素材清单（V3.1-DX.5-R0.6）

### 第五批素材目录

第五批素材用于 DX.5-R1 / DX.5-R2 / DX.5-R3 的平面设计完整性补齐，覆盖纸感、分割装饰、引导提示、图表装饰、反馈状态和状态徽章类蓝图元素。本批素材只服务于现有 UI，不修改 React 组件，不修改 CSS，不修改业务逻辑。

```text
src/assets/ui/paper/
src/assets/ui/guides/
src/assets/ui/chart-decorations/
src/assets/ui/feedback/
src/assets/ui/badges/
```

### paper / 纸感与分割装饰

| 素材 | 用途 | 对应页面 | 对应组件 | 参考 UI 图 |
| --- | --- | --- | --- | --- |
| `paper/paper-soft-card-bg.png` | 柔和纸张卡片底纹，增强手账纸感 | 记录页、详情弹窗、回顾页 | `RecordForm`、`FlowerDetailModal`、`AnalyticsDashboard` | `02-component-style-board.png`、`05-mobile-record-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-note-line.png` | 补充日记横线纸纹 | 详情弹窗 | `FlowerDetailModal` | `09-mobile-detail-modal.png` |
| `paper/paper-dashed-divider.png` | 柔和虚线分割装饰 | 记录页、数据页、详情弹窗 | `RecordForm`、`DataPanel`、`FlowerDetailModal` | `02-component-style-board.png`、`08-mobile-data-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-green.png` | 绿色纸胶带装饰 | 回顾卡、详情纸张、空状态卡 | `AnalyticsDashboard`、`FlowerDetailModal`、空状态区域 | `03-empty-state-system.png`、`07-mobile-review-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-pink.png` | 粉色纸胶带装饰 | 记录页、收藏提示、详情纸张 | `RecordForm`、`FlowerCard`、`FlowerDetailModal` | `02-component-style-board.png`、`05-mobile-record-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-tape-yellow.png` | 浅黄纸胶带装饰 | 数据说明卡、回顾鼓励卡 | `DataPanel`、`AnalyticsDashboard` | `07-mobile-review-page.png`、`08-mobile-data-page.png` |
| `paper/paper-corner-fold.png` | 卡片折角纸感装饰 | 花卡片、最近记录、数据卡 | `FlowerCard`、`RecentRecords`、`DataPanel` | `02-component-style-board.png`、`05-mobile-record-page.png`、`06-mobile-garden-page.png` |
| `paper/paper-hole-binding.png` | 手账装订孔装饰 | 回顾日历、详情补充日记 | `CalendarView`、`FlowerDetailModal` | `07-mobile-review-page.png`、`09-mobile-detail-modal.png` |
| `paper/paper-section-underline.png` | 标题下划线与区块分割 | 记录、花园、回顾、数据页标题 | `App.jsx` 页面 heading、`DataPanel`、`AnalyticsDashboard` | `05-mobile-record-page.png`、`06-mobile-garden-page.png`、`07-mobile-review-page.png`、`08-mobile-data-page.png` |
| `paper/paper-soft-shadow-edge.png` | 柔和纸边阴影装饰 | 卡片、弹窗、bottom sheet | 通用卡片、`FlowerDetailModal` | `02-component-style-board.png`、`09-mobile-detail-modal.png` |

### guides / 引导与提示装饰

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

### chart-decorations / 图表温柔化装饰

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

### feedback / 反馈状态插画

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

### badges / 状态徽章

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

### 第五批素材接入规则

1. DX.5-R1 / DX.5-R2 / DX.5-R3 后续实现时，必须优先使用第五批目录中的正式素材。
2. 如果第五批素材缺失，Codex 必须停止当前 UI 接入并报告缺失文件，不能用 emoji、临时 SVG、随机 CSS 图形、浏览器默认符号或外部图片替代。
3. 纸感、分割装饰、反馈状态、引导提示、图表装饰和状态徽章都是 UI 蓝图元素的一部分；不能因为“只是装饰”而默认省略或临时伪造。
4. 第五批素材只服务于现有 UI 的平面设计完整性，不得新增业务功能、记录字段、同步能力、账号能力或新的分析含义。
5. CSS 仍负责布局、圆角、阴影、按钮、输入框、chip、基础容器、柔和渐变和色块背景；第五批素材只负责纸张、引导、图表装饰、反馈插画和徽章。
6. 页面背景不依赖第五批 `patterns/` 纹理素材；后续 Codex 不得引用 `src/assets/ui/patterns/`，背景层优先使用已有 `backgrounds/`、`decorations/` 素材，以及 CSS 的柔和渐变和色块。

## 12. 必须使用 SVG 的素材

以下素材必须优先使用 SVG：

```text
情绪图标
底部导航图标
操作图标
小花强度图标
Toast 状态图标
空状态线性插画
花朵 / 盆栽主素材
```

原因：

- SVG 适合线性手绘风；
- 体积小；
- 可通过 CSS 变量控制颜色；
- 更适合不同分辨率和移动端。

第二批素材中已提供正式 PNG 的 `toast-*`、`data-*`、`onboarding-*`、`warning-soft.png`、`delete-confirm-flower.png` 和 `calendar-*` 文件，后续接入时应优先使用这些正式素材，不再临时改画同类 SVG。

第三批素材中已提供正式 PNG 的 `theme-*`、`chevron-*`、`action-*`、`analytics-*`、`review-*` 和 `decorations/` 目录下的花卡片 / 记录页装饰素材，后续接入时应优先使用这些正式素材，不再临时改画同类 SVG 或 CSS 图形。

## 13. 可以用 CSS 简化的素材

以下内容可以用 CSS 简化：

```text
柔和背景光
卡片阴影
圆角纸片
虚线边框
分隔线
轻量装饰点
选中态背景
Toast 入场基础动画
Modal overlay
```

CSS 简化必须保持克制，不能变成新的视觉风格。

如果第五批已经提供纸感、分割装饰、反馈状态或徽章类正式素材，后续实现必须优先使用正式素材；CSS 只能承担布局、基础容器、状态样式、柔和渐变和色块背景，不能用临时 CSS 图形伪造这些蓝图元素。页面背景不依赖第五批 `patterns/` 纹理素材，后续 Codex 不得引用 `src/assets/ui/patterns/`。

## 14. 不允许用 emoji 代替的素材

以下素材不允许用 emoji 作为最终实现：

```text
情绪图标
底部导航图标
操作图标
小花强度
星星收藏
空状态主插画
Toast 状态图标
详情弹窗主视觉
```

说明：

emoji 可以在早期占位中出现，但 V3.1 UI 素材库落地后，正式 UI 应使用统一 SVG / CSS 素材，避免不同系统渲染不一致。

第二批素材中的 `toast-*`、`data-*`、`onboarding-*`、`warning-soft.png`、`delete-confirm-flower.png` 和 `calendar-*` 都属于正式素材，不允许在已有素材存在时改用 emoji、临时 SVG 或浏览器符号替代。

第三批素材中的 `theme-*`、`chevron-*`、`action-*`、`analytics-*`、`review-*` 和花卡片 / 记录页装饰素材也属于正式素材，不允许在已有素材存在时改用 emoji、临时 SVG、随机 CSS 图形或浏览器默认符号替代。

第四批和第五批平面设计素材目录中的背景、入口卡、卡片装饰、数据页插画、回顾页插画、详情页插画、空状态 CTA、纸张、引导、图表装饰、反馈和徽章也属于正式素材范围。已有正式文件时，不允许改用 emoji、临时 SVG、随机 CSS 图形、浏览器默认符号或外部图片替代；文件尚未补齐时，必须先报告素材缺口。

## 15. Codex 后续使用素材规则

Codex 后续实现 UI 时必须遵守：

1. 先检查 `pic/ui-reference/` 和本清单；
2. 再检查 `src/assets/ui/` 中是否已有可用素材；
3. 不得自行创造新的图标风格；
4. 不得新增业务含义；
5. 不得引入第三方图标库；
6. 不得把 emoji 当作正式素材；
7. 不得修改 records localStorage 主结构；
8. 不得为了使用素材改动核心业务逻辑；
9. 新增素材必须命名清楚，放入对应目录；
10. 新增素材后必须更新本清单或目录 README；
11. `Toast`、`DataPanel`、`OnboardingModal`、删除确认 / 覆盖导入确认、`CalendarView` 已有第二批正式素材时，必须优先使用本清单指定文件；
12. `ThemeSwitcher`、展开 / 收起、基础操作、`FlowerCard`、`RecordForm`、`AnalyticsDashboard`、`CalendarView` 已有第三批正式素材时，必须优先使用本清单指定文件；
13. 不得用 emoji、临时 SVG、随机 CSS 图形或自行绘制的新风格图标替代已经存在的正式素材；
14. 如果后续组件需要图标而素材缺失，必须先报告缺失素材，不能自由替代。
15. 第五批 `paper/`、`guides/`、`chart-decorations/`、`feedback/`、`badges/` 目录用于 DX.5-R1 / DX.5-R2 / DX.5-R3 的平面设计完整性补齐；在正式素材补齐前，不得用临时 CSS 图形、emoji 或随机 SVG 绕过清单。
16. 页面背景不依赖第五批 `patterns/` 纹理素材；后续 Codex 不得引用 `src/assets/ui/patterns/`，也不得将 `patterns/` 作为 DX.5-R 的正式素材依赖。

## 16. 验收标准

素材库验收必须检查：

```text
1. 目录结构是否完整；
2. 素材是否放在正确目录；
3. 命名是否清楚稳定；
4. 风格是否来自 01-09 UI 参考图；
5. 情绪图标是否只包含开心、平静、焦虑、疲惫、兴奋；
6. 强度是否使用小花，不使用爱心；
7. 收藏是否使用星星，不使用爱心；
8. 空状态是否覆盖 9 类场景；
9. 是否没有引入第三方图标库；
10. 是否没有用 emoji 代替正式素材；
11. 是否没有改变业务逻辑；
12. 是否没有改变 records localStorage 数据结构。
```

## 17. 当前阶段说明

V3.1-DX.2-A 只建立素材目录和素材清单，不创建具体 SVG / PNG 素材，不修改业务代码，不修改 CSS。

下一步需要根据 01-09 UI 参考图，逐步补齐实际 SVG / PNG 素材。
