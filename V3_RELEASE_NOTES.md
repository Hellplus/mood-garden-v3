# Mood Garden V3.0 稳定版发布说明

## V3.0 版本定位

Mood Garden V3.0 是一次 React / Vite 重构后的稳定版。它的目标不是重新发明所有功能，而是把 Mood Garden 的核心记录、浏览、回顾和备份能力迁移到更清晰、可维护的前端架构中。

V3.0 仍然是一个本地优先的心情记录应用。记录数据保存在当前浏览器的 localStorage 中，不依赖账号、后端或云同步。

## 为什么从原生 HTML/CSS/JS 重构到 React / Vite

V2.9 使用原生 HTML/CSS/JS 实现，适合快速迭代和验证产品体验。但随着记录 CRUD、筛选、日历、分析、导入导出、主题、PWA 等能力逐步增多，单文件或集中式脚本会让状态流和 UI 逻辑更难维护。

V3.0 迁移到 React / Vite，主要是为了：

- 拆分组件，让页面区域职责更清楚；
- 用 hooks 管理记录、筛选、日历、分析、主题和提示等状态；
- 把数据处理逻辑放进 utils，降低组件复杂度；
- 保持 JavaScript 技术栈，不引入 TypeScript 或复杂状态管理；
- 让后续 V3.1 继续迁移和维护时更容易定位问题。

## V3.0 已完成的功能

- React / Vite 项目骨架；
- 接近 Mood Garden 产品气质的静态 UI；
- localStorage records 读取和保存；
- 新增、编辑、删除记录；
- 收藏切换；
- 详情弹窗查看与编辑；
- 最近记录和花园列表基于真实 records 渲染；
- 情绪筛选、关键词搜索、最新/最早排序；
- 标签云、点击标签筛选、收藏筛选、强度筛选；
- 基于真实 records 的日历视图；
- 基于真实 records 的数据分析；
- TXT 日记导出；
- JSON 备份导出；
- JSON 导入、覆盖导入、合并导入；
- 主题切换；
- Toast 提示；
- 首次使用引导；
- 移动端底部导航；
- manifest、SVG 图标和基础 service worker；
- GitHub Pages base 路径和 GitHub Actions 部署配置；
- README 与 CHANGELOG 文档更新。

## 与 V2.9 相比的变化

V3.0 的主要变化是架构层面的重构：

- 从原生页面脚本迁移为 React 组件；
- 从集中式业务脚本拆分为 hooks 和 utils；
- 页面展示由 mock 数据逐步切换为真实 records 驱动；
- 筛选、日历、分析和导入导出都围绕 normalized records 工作；
- PWA 与部署配置更贴近 GitHub Pages 发布流程。

V3.0 没有直接复制 V2.9 的大段脚本，而是保留核心数据结构和产品行为，再用 React 方式重新组织。

## 保留的能力

- 本地记录心情；
- 基于 localStorage 保存数据；
- 旧 records 数据的字段兼容；
- 情绪、文字、强度、标签、收藏、详情说明等记录要素；
- 花园式记录浏览；
- 数据导入导出；
- 轻量离线访问体验；
- 不依赖后端即可使用。

## 暂未做的能力

V3.0 暂未包含以下能力：

- 账号系统；
- 后端存储；
- 云同步；
- 多设备同步；
- 推送通知；
- 复杂 PWA 后台同步；
- React Router 页面路由；
- TypeScript；
- Redux、Zustand 等状态管理库；
- 第三方 UI 组件库；
- 更完整的自动化测试套件。

这些内容可以进入后续版本评估，但不属于 V3.0 稳定版范围。

## 数据兼容说明

V3.0 保留了旧记录数据的兼容思路。导入或读取旧数据时，会通过 normalizer 补齐缺失字段。

每条记录至少会补齐：

- `id`
- `emotion`
- `note`
- `createdAt`
- `moodIcon`
- `flowerQuote`
- `intensity`
- `tags`
- `isFavorite`
- `detailNote`

旧数据中的额外字段会尽量保留，不会主动丢弃。

## localStorage 数据说明

records 主 key 仍为：

```text
moodGardenFlowers
```

兼容读取的旧 key：

```text
mood-garden-records
```

V3.0 还使用独立 key 保存体验层偏好：

```text
mood-garden-theme
mood-garden-onboarding
```

这些 key 不会改变 records 主结构。

重要说明：localStorage 数据只保存在当前浏览器和当前域名下。清理浏览器数据、更换设备或更换浏览器都可能导致无法直接访问原数据。建议定期导出 JSON 备份。

## GitHub Pages 部署说明

V3.0-K 已配置 GitHub Actions 部署到 GitHub Pages。

仓库名为：

```text
mood-garden-v3
```

Vite base 路径为：

```text
/mood-garden-v3/
```

预期线上地址为：

```text
https://hellplus.github.io/mood-garden-v3/
```

GitHub Pages 后台应选择：

```text
Settings -> Pages -> Source -> GitHub Actions
```

workflow 会在推送到 `main` 分支后执行 lint、build，并发布 `dist`。

## PWA 基础说明

V3.0-J 增加了基础 PWA 支持：

- `manifest.webmanifest` 提供安装元数据；
- `public/icons/icon.svg` 提供应用图标；
- `service-worker.js` 缓存基础应用外壳和访问过的构建资源；
- service worker 只在生产环境注册；
- 离线能力主要用于基础页面访问。

PWA 不会缓存或同步用户 records。用户记录仍由 localStorage 管理。

## 已知限制

- 数据只保存在本地浏览器，没有云端备份；
- localStorage 容量和持久性受浏览器策略影响；
- PWA 离线能力是基础外壳缓存，不是完整离线同步系统；
- 当前没有完整自动化测试覆盖；
- Hero 区域的概览指标是稳定版状态说明，不是实时数据统计；
- PWA 图标目前使用 SVG，某些平台可能更偏好 PNG 尺寸图标；
- service worker 更新后，浏览器可能短时间显示旧缓存，需要刷新或等待更新接管。

## 后续 V3.1 方向建议

V3.1 可以优先考虑以下方向：

- 将 Hero 概览指标改为基于真实 records 的统计；
- 增加更系统的表单校验和删除确认体验；
- 增加基础单元测试，覆盖 normalizer、筛选、日历、分析和导入导出；
- 补充 PWA PNG 图标，提高安装兼容性；
- 优化移动端长列表和详情弹窗体验；
- 增加用户可控的数据清理和备份恢复说明；
- 评估是否需要更细的导入冲突提示；
- 继续保持本地优先，不急于引入账号或云同步。

V3.1 的重点应是稳定性、可测试性和体验细节，而不是扩大功能范围。
