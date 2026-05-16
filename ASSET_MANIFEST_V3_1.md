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
12. 不得用 emoji、临时 SVG 或自行绘制的新风格图标替代已经存在的正式素材。

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
