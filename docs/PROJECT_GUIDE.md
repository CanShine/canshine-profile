# 项目说明与维护指南（循序渐进版）

这份文档写给“未来的你”：你只需要会复制、粘贴、改文字/图片，就能把这个站点维护得很有条理。

- 站点类型：纯静态（HTML/CSS/JS）
- 发布方式：GitHub Pages（无需构建）

---

## 0. 快速开始（5 分钟把站点改成自己的）

按顺序做这 5 步，基本就能上线一个“像样的个人主页”。

1. 打开 `index.html`，替换所有 `[xxx占位]`（姓名、学校、邮箱、GitHub 等）。
2. 打开 `assets/resume/resume.pdf`，换成你的简历（建议公开版，见隐私章节）。
3. 在 `index.html` 的“重点项目/其他项目”里，把项目标题和一句话亮点换成真实内容。
4. 把你的图/视频放进 `assets/projects/<project>/`，并在 `index.html` 或 `projects/*.html` 改引用路径。
5. 提交并推送：`git add -A` → `git commit -m "update"` → `git push`，等待 1–5 分钟生效。

---

## 1. 项目结构：每个文件负责什么？

你以后主要就会改这几类文件。

### 1.1 页面文件（你改内容的地方）

- `index.html`：主页内容与结构（板块、卡片、弹窗模板、外链等）
- `projects/*.html`：重点项目详情页（独立页面，适合放更多图/视频/更完整叙述）

### 1.2 样式与交互（你改“长什么样/怎么动”）

- `styles.css`：全站样式（颜色、字体、布局、卡片、弹窗、响应式）
- `script.js`：交互逻辑（平滑跳转、弹窗开关、左侧导航高亮、奖状墙滚动等）

### 1.3 素材与文档（你改图片/视频/简历）

- `assets/`：图片/视频/PDF（不依赖外链，更稳定）
- `docs/`：维护文档
  - `docs/MEDIA_GUIDE.md`：素材命名与格式建议
  - `docs/CONTENT_GUIDE.md`：项目/比赛怎么写得更专业

### 1.4 工程化（尽量别删，保持一致性）

- `.editorconfig`：缩进、行尾、去尾空格
- `.prettierrc.json` + `.prettierignore` + `package.json`：Prettier 格式化
- `.gitattributes`：强制仓库文本文件使用 LF 行尾
- `.gitignore`：忽略 `node_modules/` 等不该提交的目录

### 1.5 新增的“各种后缀/隐藏文件”是什么？（速查）

这类文件通常是“工具配置/锁定版本”，不是页面本身的内容。

- `.editorconfig`：编辑器通用规则（缩进、行尾、是否去尾空格）。你一般不用改。
- `.gitattributes`：Git 层面的规则（本仓库用它强制文本文件 LF 行尾；并标记 pdf/mp4 等为二进制）。你一般不用改。
- `.gitignore`：告诉 Git 哪些文件/目录不要提交（例如 `node_modules/`）。可以按需追加，但不建议删除。
- `.prettierrc.json`：Prettier 的格式化规则（比如引号、换行等）。一般不需要频繁改。
- `.prettierignore`：告诉 Prettier 哪些文件不要格式化（本项目忽略 `assets/**`、`*.pdf`、`*.mp4` 等）。
- `package.json`：Node 工具清单与脚本入口（这里主要提供 `npm run format`、`npm run format:check`）。你会偶尔改它（例如新增脚本）。
- `package-lock.json`：npm 自动生成的“依赖锁定文件”，用于保证不同电脑装到同一版本。不要手动编辑，正常提交到仓库即可。
- `node_modules/`：npm 安装的依赖目录（体积大、可再生）。永远不要提交；本项目已通过 `.gitignore` 忽略。

你看到类似“CRLF will be replaced by LF”的提示也正常：这是 `.gitattributes` 在保证行尾统一，避免跨平台反复改来改去。

---

## 2. 改内容：只改 HTML 就能完成 80% 工作

### 2.1 先理解 6 个最常用的 HTML 标签

你可以把 HTML 当成“搭积木”：

- `<section>`：一个板块（如关于我/技能/项目/奖项）
- `<h1>/<h2>/<h3>`：标题（数字越小越大）
- `<p>`：段落
- `<a>`：链接（跳转）
- `<img>`：图片
- `<button>`：按钮

### 2.2 改“基本信息/联系方式”

位置：`index.html` 顶部与 contact 板块。

建议顺序：

1. 先把 `[姓名占位]`、`[学校/实验室占位]`、`[邮箱占位]` 换掉。
2. 再把“核心优势/目标岗位”的三条 bullet 改成你的真实方向。

### 2.3 改“板块跳转（导航）”

规则很简单：

- 目标板块要有 `id`：`<section id="projects">`
- 导航链接用 `href="#projects"`

新增一个板块的步骤：

1. 在 `index.html` 增加：`<section class="section" id="new">...</section>`
2. 在左侧 `.quick-nav` 增加：`<a href="#new">新板块</a>`

说明：左侧高亮是 `script.js` 自动做的（IntersectionObserver）。

---

## 3. 加项目：两种展示方式（先选一种）

这个站点的项目展示分两类，你按需求选。

### 3.1 重点项目（推荐）：独立详情页 `projects/*.html`

适合：你最想让面试官点开的 2–3 个项目。

你需要改的地方：

1. `index.html` 的“重点项目”卡片（一般是一个 `<a href="projects/xxx.html">查看详情</a>`）
2. `projects/xxx.html`：写详细内容、放更多图/视频

新增一个重点项目的步骤：

1. 复制一个现有详情页（比如 `projects/fft.html`）改名为 `projects/new.html`
2. 在 `index.html` 复制一张“重点项目卡片”，把链接改成 `projects/new.html`
3. 把素材放到 `assets/projects/new/`，并更新页面里的 `src` 路径

### 3.2 其他项目：主页弹窗（template + data-open）

适合：项目很多，但每个只想放“简短说明 + 2 张图”。

机制：

- 卡片按钮写 `data-open="proj-xxx"`
- 页面底部有 `<template id="proj-xxx">...</template>`
- JS 会把模板内容塞进同一个弹窗容器里

新增一个弹窗项目的步骤：

1. 在“其他项目”复制一张卡片，把 `data-open` 改成 `proj-new`
2. 在 `index.html` 底部复制一个 `<template>`，把 `id` 改成 `proj-new`
3. 往模板里加文字和图片（`.image-row` 会自动排版）

---

## 4. 加图片/视频：只要会改 `src` 就行

### 4.1 图片怎么加（主页与弹窗）

你只需要会改这一句：

```html
<img src="assets/projects/xxx/arch.svg" alt="架构图" />
```

建议：

- 多张图放进 `.image-row` 容器里（自动排版）
- 主页用 `assets/...` 路径
- 详情页（`projects/*.html`）用 `../assets/...` 路径

### 4.2 视频怎么加（重点项目详情页更合适）

推荐写法：

```html
<video controls preload="metadata" style="width: 100%; border-radius: 12px">
  <source src="../assets/projects/chaos/demo.mp4" type="video/mp4" />
</video>
```

---

## 5. 改样式：先改主题变量，再改局部样式

### 5.1 主题颜色（最推荐的改法）

位置：`styles.css` 顶部 `:root`。

你一般只需要改：

- `--primary` / `--accent`：主色与强调色
- `--text` / `--muted`：文字与弱化文字

### 5.2 字体大小（最常改的 3 个地方）

- 全站字体：`body { font-family: ... }`
- 首页大标题：`h1 { font-size: ... }`
- 板块标题：`.section h2 { font-size: ... }`

### 5.3 卡片布局（想一行放更多卡片）

位置：`.featured-grid` 这类网格。

关键是这一段：

- `minmax(240px, 1fr)`

想一行更多卡片：把 `240px` 调小。
想卡片更宽：把 `240px` 调大。

### 5.4 暗色主题（可选）

如果你确定要做暗色主题，建议用“开关 + CSS 变量”的方式实现（我可以直接帮你加按钮和保存偏好）。

---

## 6. 素材格式怎么选？（结合本项目推荐）

更完整建议见 `docs/MEDIA_GUIDE.md`。这里给一个“最容易选对”的版本。

### 6.1 图片

- 架构图/流程图/曲线：优先 `svg`（清晰、可缩放、体积小）
- 需要无损的截图：优先 `png`
- 照片：优先 `jpg`

### 6.2 视频

- `mp4(H.264 + AAC)`：兼容性最好
- 建议 720p/1080p，`preload="metadata"`，体积尽量控制在 20–40MB

---

## 7. 发布与更新（GitHub Pages）

### 7.1 发布原则

只要你把改动推送到 `main` 分支，GitHub Pages 就会自动更新。

```bash
git add -A
git commit -m "update: content"
git push
```

等待 1–5 分钟后访问：

- `https://canshine.github.io/canshine-profile/`

### 7.2 缓存不更新怎么办？

如果你遇到“手机/电脑显示不一致/一直没更新”，优先：

1. 修改 `index.html` 里 `styles.css?v=...` 和 `script.js?v=...` 的版本号
2. 浏览器强刷（Ctrl+F5）或清缓存

---

## 8. 维护方式：让项目长期不乱

推荐你坚持 6 条就够用：

1. 内容优先改 `index.html`（概览）+ `projects/*.html`（重点项目细节）
2. 素材只放 `assets/`，不要外链占位图
3. 一个项目一个目录：`assets/projects/<project>/`
4. 改完跑格式化（统一风格）：`npm run format`
5. 提交信息写清楚：`update/fix/chore/docs`（看提交就知道改了什么）
6. 隐私宁可少，不要硬塞

---

## 9. 隐私与敏感信息：公开版 vs 投递版

### 9.1 建议可以公开展示

- 邮箱（建议使用专门的求职邮箱）
- GitHub 主页（公开仓库）
- 技术栈、项目亮点、可量化结果（吞吐/频率/资源/功耗/覆盖率）

### 9.2 强烈不建议公开展示

- 身份证号、学号、手机号、家庭住址、生日全量
- 任何账号密码、Access Token、API Key
- 内网地址、服务器 IP、公司/实验室内部系统截图
- 受 NDA/保密约束的源码与关键细节

### 9.3 容易忽略的风险点

- 简历 PDF 里可能包含手机号/住址/证件信息
- 截图里可能包含用户名、邮箱、组织名、路径、证书编号

建议做法：

- 准备两份简历：公开版（去敏）/投递版（完整）
- 图片需要的话先打码再上传

---

如果你愿意，我可以再补一节“按页面结构逐块讲：改哪段 HTML 对应哪段 CSS”，这样你改样式会更快。
