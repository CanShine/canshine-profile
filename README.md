# 展示页说明文档

本项目为纯静态页面（HTML/CSS/JS），通过 GitHub Pages 发布，无需 Hexo 或额外构建流程。

更完整的“如何改内容/样式/卡片/素材/发布/隐私”指南见：

- `docs/PROJECT_GUIDE.md`

---

## 目录结构

- index.html：页面内容与结构（项目、奖项、个人信息等）
- styles.css：页面样式（布局、颜色、弹窗等）
- script.js：交互逻辑（平滑滚动、项目弹窗）
- projects/：重点项目详情页（独立页面，如 projects/chaos.html）
- assets/：站点素材（图片/视频/PDF，按 projects/awards/books/resume 分类）

---

## 如何修改内容

### 1) 基本信息与板块文字

请在 [index.html](index.html) 中修改：

- 顶部姓名、学校、个人简介、联系方式
- 竞赛与奖项
- 文章链接

### 2) 项目结构

当前项目分为：

- 重点项目（卡片链接到独立详情页：projects/\*.html）
- 其他项目（卡片 + 弹窗详情：template + data-open）

重点项目的入口在 [index.html](index.html) 中的 **“重点项目”** 区块（通常是 `<a href="projects/xxx.html">查看详情</a>`）。
其他项目/奖项弹窗详情在同文件底部的 **`<template id="...">`** 模板中。

要新增重点项目，请按以下步骤：

1. 复制一个重点项目卡片（含 `data-open="proj-xxx"`）。
2. 在页面底部新增对应的 `<template id="proj-xxx">`。
3. 确保 `data-open` 与 `template id` 一致。

### 3) 替换架构图/效果图

弹窗/详情页中的图片可以直接替换为你自己的素材：

1. 将图片放到对应目录（推荐：`assets/projects/<project>/`）。
2. 将图片引用改为：`<img src="assets/projects/<project>/xxx.png" alt="...">`（主页）或 `../assets/projects/<project>/xxx.png`（projects 详情页）。

---

## 如何发布到 GitHub Pages

> 已使用“项目 Pages”方式（仓库名为 canshine-profile）。

1. 进入 GitHub 仓库 **Settings → Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **main**，目录选择 **/root**
4. 保存后等待自动部署

最终访问地址：

```
https://canshine.github.io/canshine-profile/
```

---

## 如何更新

1. 修改文件（index.html / styles.css / script.js）
2. 提交并推送：

```
git add .
git commit -m "update"
git push
```

3. GitHub Pages 会自动更新

---

## 代码风格与格式化（推荐）

本仓库已提供统一格式配置：

- `.editorconfig`：缩进、换行、去尾空格等
- `.prettierrc.json` + `package.json`：Prettier 统一格式化（已忽略 `assets/`）
- `.gitattributes`：强制仓库内文本文件以 LF 作为行尾，避免跨平台 CRLF/LF 混乱

首次使用或想统一格式时：

```bash
npm install
npm run format
```

仅检查格式（不改文件）：

```bash
npm run format:check
```

---

## 更新多久可生效？

通常 **1–5 分钟** 生效，首次部署可能需要更久。
如果未生效：

- 清浏览器缓存或强制刷新
- 检查 GitHub Actions / Pages 构建状态

---

## 常见问题

**Q: 一直 404？**

- 检查 Settings → Pages 是否选择了 `main / root`
- 等待 1–5 分钟

**Q: 为什么不能用私有仓库？**

- Pages 默认只支持公开仓库（或付费账号）

---

如需我继续优化页面结构或内容，请直接提出需求。
