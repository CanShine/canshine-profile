# 项目说明与维护指南（能看懂就行版）

这份文档面向“以后你自己改内容、改样式、加项目、加图片/视频、继续维护”的场景。

- 站点类型：纯静态（HTML/CSS/JS）
- 发布方式：GitHub Pages（无需构建）

---

## 1. 你需要改的文件分别是干什么的？

项目根目录核心文件：

- `index.html`：主页内容与结构（各个板块、卡片、弹窗模板、外链等）
- `styles.css`：全站样式（颜色/字体/布局/卡片/弹窗/响应式）
- `script.js`：交互逻辑（平滑跳转、弹窗打开/关闭、左侧导航高亮、奖状墙滚动控制等）
- `projects/*.html`：重点项目详情页（独立页面，适合放更多图/视频/更完整叙述）

工程化与规范：

- `.editorconfig`：统一缩进、行尾、去尾空格（让多人/多设备编辑更一致）
- `.prettierrc.json` + `.prettierignore` + `package.json`：Prettier 格式化（统一代码风格）
- `.gitattributes`：强制文本文件使用 LF 行尾（避免 Windows/Mac 混乱）
- `.gitignore`：忽略 `node_modules/` 等不应提交的目录

素材与文档：

- `assets/`：所有图片/视频/PDF（不依赖外链，更稳定）
- `docs/`：写作与维护文档（内容策划、素材规范等）

推荐先看：

- `docs/media.md`：素材命名与格式建议
- `docs/CONTENT_GUIDE.md`：项目/比赛如何写得更“硬核”

---

## 2. HTML（index.html）怎么读？怎么改？（超简版语法）

HTML 就是“页面结构”。你可以把它理解为：

- `<section>`：一个板块（例如“关于我/技能/项目/奖项”）
- `<div>`：一个容器（用来排版）
- `<h1> <h2> <h3>`：标题，数字越小越大
- `<p>`：段落
- `<a>`：链接（可跳转到外部或页面内部）
- `<img>`：图片
- `<video>`：视频
- `<button>`：按钮

### 2.1 板块与跳转（导航）

主页每个板块都有一个 `id`，比如：

- `<section class="section" id="projects">`

左侧快速导航是这样的：

- `<a href="#projects">项目</a>`

想新增一个板块：

1. 在 `index.html` 增加一个 `<section ... id="xxx">...</section>`
2. 在左侧 `.quick-nav` 增加一个 `<a href="#xxx">...</a>`

> `script.js` 会用 IntersectionObserver 自动把当前板块对应的导航高亮。

### 2.2 卡片是什么？怎么加？

这个站点大多数内容都用“卡片”排版，比如：

- 关于我：`.info-card`
- 技能：`.skill-card`
- 项目：`.featured-card`
- 书墙：`.book-card`

加卡片的做法一般就是：复制一份同类结构 → 改文字/图片/链接。

例如“其他项目”的卡片基本长这样（示意）：

```html
<div class="featured-card">
  <div class="featured-head">
    <h3>项目名</h3>
    <span class="tag">标签</span>
  </div>
  <p class="featured-intro">一句话亮点</p>
  <button class="ghost small" data-open="proj-xxx">查看详情</button>
</div>
```

> `class="..."` 决定它套用哪种样式。

### 2.3 弹窗详情（template + data-open）

主页的“其他项目”和“奖项大图”用的是同一个弹窗机制：

- 触发按钮/卡片上写 `data-open="xxx"`
- 页面底部写 `<template id="xxx"> ... </template>`
- `script.js` 读取 template 内容塞进弹窗里

新增一个“其他项目弹窗”的步骤：

1. 复制一个按钮：`<button data-open="proj-new">查看详情</button>`
2. 在底部新增模板：

```html
<template id="proj-new">
  <h3>新项目标题</h3>
  <p>一句话介绍</p>
  <div class="image-row">
    <img class="detail-image" src="assets/projects/new/arch.svg" alt="架构图" />
  </div>
</template>
```

3. 确保 `data-open` 和 `template id` 完全一致。

---

## 3. CSS（styles.css）怎么改？（颜色/字体/布局/主题）

CSS 就是“长什么样”。你可以把它理解为：

- 选择器（selector）选中元素：
  - `.featured-card` 表示 class=featured-card 的元素
  - `#projects` 表示 id=projects 的元素
  - `.section h2` 表示 section 内的 h2
- 属性（property）决定样式：
  - `color` 文字颜色
  - `background` 背景
  - `font-size` 字体大小
  - `padding/margin` 内外边距
  - `display: grid/flex` 布局

### 3.1 主题颜色：优先改 CSS 变量（最省事）

在 `styles.css` 顶部的 `:root` 里有主题变量：

- `--bg/--bg-2`：背景
- `--text/--muted`：正文/弱化文字
- `--primary/--accent`：主色/强调色

你改这些变量，整个网站会一起变化。

### 3.2 字体与字号：改 body / h1 / section 标题

- 全站字体：`body { font-family: ... }`
- 首页大标题：`h1 { font-size: 46px; }`
- 板块标题：`.section h2 { font-size: 28px; }`

### 3.3 “布局条/渐变条”（卡片顶部条、标题下划线条）

这个站点有两种常见“条形强调”：

- 板块标题下方渐变条：`.section h2::after`
- 卡片顶部渐变条：`.info-card::before` / `.skill-card::before` / `.award-card::before`

你可以通过修改 `height` / `opacity` / 渐变颜色来调粗细与视觉风格。

### 3.4 布局：主要靠 Grid（卡片自动换行）

比如：

- 首页左右两列：`.hero-content { grid-template-columns: ... }`
- 卡片网格：`.featured-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }`

想让卡片“一行更多/更少”：

- 调 `minmax(240px, 1fr)` 里的 `240px`：
  - 小一点 → 一行能放更多卡片
  - 大一点 → 一行更少但更宽

### 3.5 想做暗色主题（可选）

当前默认是浅色主题。如果想加暗色主题，推荐做法：

1. 给 `html` 或 `body` 加 `data-theme="dark"`
2. 在 CSS 里写：

```css
:root[data-theme="dark"] {
  --bg: #0b1220;
  --bg-2: #101a31;
  --card: rgba(255, 255, 255, 0.06);
  --text: #e5e7eb;
  --muted: rgba(229, 231, 235, 0.72);
}
```

然后用 JS 做一个开关（后续需要我可以直接帮你加）。

---

## 4. JS（script.js）负责什么？怎么扩展？

这个项目的 JS 只做“必要交互”，不引入框架：

- `scrollToSection(id)`：按钮点击后平滑滚动到指定板块
- 弹窗系统：`openModal(templateId)` / `closeModal()`
- 点击 `data-open` 的元素 → 打开对应 `<template id="...">`
- 左侧导航高亮：IntersectionObserver 观察当前进入视口的 section
- 奖状墙：自动滚动 + 你手动点上一组/下一组后，暂停一会再自动恢复

想新增一个弹窗内容：基本只需要在 `index.html` 里加 `<template>`，JS 不用动。

---

## 5. 如何修改“卡片/图片/视频”的数量？

### 5.1 卡片数量

- 卡片数量完全由 `index.html` 里你写了多少个 `.featured-card/.info-card/...` 决定
- 想加：复制一个同类卡片 → 改标题/文字/按钮/链接
- 想删：删除对应那一段 HTML

### 5.2 图片数量（弹窗/详情页）

- 在模板里增加/删除 `<img ...>` 即可
- 推荐把多张图放在 `.image-row` 容器里，它会自动排版

示意：

```html
<div class="image-row">
  <img class="detail-image" src="assets/projects/xxx/arch.svg" alt="架构" />
  <img class="detail-image" src="assets/projects/xxx/result.svg" alt="结果" />
</div>
```

### 5.3 视频数量（重点项目详情页）

重点项目的详情在 `projects/*.html`。

- 加一个视频：增加一个 `<video ...>`
- 推荐加 `controls`，并用 `preload="metadata"` 降低首屏加载

建议写法（示意）：

```html
<video controls preload="metadata" style="width: 100%; border-radius: 12px">
  <source src="../assets/projects/chaos/demo.mp4" type="video/mp4" />
</video>
```

---

## 6. 项目文件怎么管理才“有条理”？（建议规则）

### 6.1 目录规则（已经按这个做了）

- `assets/projects/<project>/`：每个项目一套素材
- `assets/awards/`：奖状
- `assets/books/`：书墙
- `assets/resume/`：简历

### 6.2 命名规则

建议按语义命名，而不是 `1.png/2.png`：

- `cover.*`（封面）
- `arch.*`（架构）
- `flow.*`（流程）
- `result.*`（结果）
- `demo.mp4`（演示视频）

### 6.3 内容写作与技术文档

- “主页一句话亮点”写在 `index.html`
- “面试可讲的详细稿”写在 `docs/`（例如 `docs/projects/xxx.md`）
- “最终对外展示的长文”可以放外部博客，然后在主页 articles 区加链接

---

## 7. 发布（GitHub Pages）怎么做？

发布原则：只要你 `git push` 到 `main`，Pages 就会更新。

步骤：

1. 修改代码/内容
2. 提交并推送：

```bash
git add -A
git commit -m "update: content"
git push
```

3. 等 1–5 分钟，访问：

- `https://canshine.github.io/canshine-profile/`

### 7.1 缓存不更新怎么办？

本项目对 CSS/JS 引用了版本号：

- `styles.css?v=...`
- `script.js?v=...`

如果你遇到“手机/电脑显示不一致/一直没更新”，优先：

- 把 `index.html` 里这两个 `v=` 改一下（例如日期+版本）
- 浏览器强刷（Ctrl+F5）或清缓存

---

## 8. jpg/png/svg/mp4 用哪个？（结合本项目建议）

### 8.1 图片

- `svg`：强烈推荐用于 架构图/流程图/曲线图/示意图（清晰、可缩放、体积小）
- `png`：推荐用于 需要无损的截图（UI 截图、像素级对比图），缺点是可能比较大
- `jpg`：推荐用于 照片/真人照/活动照（体积小），缺点是不支持透明且有压缩损失

总结一句话：

- 图/架构：优先 `svg`
- 屏幕截图：优先 `png`
- 照片：优先 `jpg`

### 8.2 视频

- `mp4(H.264 + AAC)`：兼容性最好，GitHub Pages 也最稳

建议：

- 720p/1080p 足够
- `preload="metadata"`
- 文件尽量控制在 20–40MB

---

## 9. 做这个网页用到的知识点（简要清单）

- HTML：语义化结构、锚点跳转、图片/视频/链接、安全属性（`rel="noopener"`）
- CSS：变量主题、Flex/Grid 布局、卡片风格（阴影/圆角/渐变）、响应式
- JS：DOM 操作、事件监听、IntersectionObserver、弹窗组件思路
- 工程化：Git/GitHub、Pages 部署、格式化（Prettier）、行尾规范（LF）
- 资产管理：本地素材组织、图片/视频格式选择与体积控制

---

## 10. 维护方式（长期不乱）

推荐你坚持 5 条就够用：

1. 内容改动优先改 `index.html`（一句话亮点）+ `projects/*.html`（详细项目叙述）
2. 素材只放 `assets/`，不要外链占位图（稳定、可控）
3. 一次改完跑一次格式化：

```bash
npm run format
```

4. 提交信息写清楚：`update: xxx` / `fix: xxx` / `chore: xxx`
5. 隐私与敏感信息宁可少，不要硬塞

---

## 11. 隐私与敏感信息：展示什么？不展示什么？（很重要）

### 11.1 建议可以展示

- 邮箱（建议单独用于求职的邮箱）
- GitHub 主页（公开仓库）
- 学校/专业（如果不介意）
- 技术栈、项目亮点、可量化结果（吞吐/频率/资源/功耗/验证覆盖率等）
- 项目截图/架构图（确保不含敏感字段/内部地址）

### 11.2 强烈不建议展示

- 身份证号、学号、手机号、家庭住址、生日全量
- 任何账号密码、Access Token、API Key
- 内网地址、服务器 IP、公司/实验室内部系统截图
- NDA/保密项目的源码、关键细节（尤其是未公开产品/真实客户信息）

### 11.3 “看起来无害但其实有风险”的信息

- 简历 PDF 里可能包含：手机号、住址、照片、身份证后几位
- 截图里可能包含：文件路径、用户名、邮箱、组织名称
- 奖状/证书可能包含：证书编号、身份证/手机号

建议做法：

- 对外版本只保留必要信息（邮箱 + GitHub + 城市可选）
- 简历准备 2 份：公开版（去敏）/投递版（完整）
- 图片需要的话就打码再放

---

如果你希望我再加一份“按你的页面结构逐行讲怎么改”的超细教程（比如：每一块卡片对应哪些 CSS），告诉我你最想先改哪 3 件事：颜色主题 / 卡片布局 / 项目内容。
