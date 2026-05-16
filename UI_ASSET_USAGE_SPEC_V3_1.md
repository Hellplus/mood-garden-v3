# Mood Garden V3.1 UI 素材接入规范

## 1. 文档目的

本文档用于约束 Mood Garden V3.1 后续 UI 实现中如何接入正式素材。

当前项目已经具备：

- UI 参考图：`pic/ui-reference/`
- 实际 UI 素材库：`src/assets/ui/`
- 设计系统：`DESIGN_SYSTEM_V3_1.md`
- UI 实现规范：`UI_IMPLEMENTATION_SPEC_V3_1.md`
- 素材清单：`ASSET_MANIFEST_V3_1.md`

后续 Codex 实现 UI 时，必须按图实现，而不是只参考风格。已经存在正式素材的地方，必须优先使用正式素材，不允许自由发挥新的图标、插画或装饰风格。

---

## 2. 素材接入原则

1. Codex 后续实现 UI 时，必须优先使用 `src/assets/ui/` 中的正式素材。
2. 不允许用 emoji、临时 SVG、随机 CSS 图形、浏览器默认图标替代已经存在的正式素材。
3. 如果某个组件需要素材但素材库缺失，必须先报告缺失素材，不能自由替代。
4. UI 实现必须以 `pic/ui-reference/` 中的 01-09 参考图作为视觉验收标准。
5. 素材接入不得改变业务功能、records localStorage 主结构、导入导出格式或核心计算逻辑。
6. 不得引入第三方图标库、第三方 UI 库、Tailwind、date-fns 或动画库来替代现有素材。
7. 正式素材只用于视觉表达，不得为接入素材新增业务字段或改变组件职责。

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

---

## 5. 缺素材处理规则

1. 如果缺少 P0 素材，必须停止当前 UI 实现并报告缺失文件。
2. 不得自行生成替代图标。
3. 不得使用 emoji 代替正式素材。
4. 不得使用浏览器默认图标代替正式素材。
5. 不得引入外部图标库或第三方 UI 库。
6. 不得用随机 CSS 图形伪造正式素材。
7. 如确认需要新增素材，必须先更新 `ASSET_MANIFEST_V3_1.md` 或提交明确素材补充清单，再进入接入。

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
