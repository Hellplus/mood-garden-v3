# Mood Garden V3.1 UI 素材库

这个目录用于存放 Mood Garden V3.1 UI 落地时真正会被前端引用的图标、花朵、强度、空状态和装饰素材。

它和 `pic/ui-reference/` 的职责不同：

- `pic/ui-reference/`：保存 01-09 UI 参考图，是后续 UI 实现和验收的视觉标准。
- `src/assets/ui/`：保存从参考图风格中提取、整理、实现后可被项目引用的实际素材。

后续 Codex 使用本目录时必须遵守：

1. 素材风格必须严格来自 `pic/ui-reference/` 的 01-09 参考图；
2. 不得自行重新设计图标、空状态、花朵或装饰元素；
3. 不得用 emoji 临时代替正式图标系统；
4. 不得引入第三方 UI 图标库；
5. 不得新增情绪类型或新的业务含义；
6. 不得修改 records localStorage 数据结构或业务逻辑。

## 目录说明

```text
src/assets/ui/icons/         通用图标、情绪图标、底部导航图标、操作图标
src/assets/ui/flowers/       花朵、盆栽、花卡片相关素材
src/assets/ui/strength/      1-5 小花强度素材
src/assets/ui/empty-states/  九类空状态插画
src/assets/ui/decorations/   页面轻量装饰、分隔、手账感辅助元素
```

当前阶段只建立目录和清单，不放入具体 SVG / PNG 素材。

