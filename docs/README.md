# 文档目录（Docs）

这里放“说明文档、规划文档、内容写作模板”等非代码内容，便于长期维护。

- [PROJECT_GUIDE.md](PROJECT_GUIDE.md)：项目说明与维护指南（如何改内容/样式/卡片/素材/发布/隐私）
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md)：内容策划指南（用于网站/简历：优势挖掘、项目/比赛写作模板、准备清单）
- [UPDATE_GUIDE.md](UPDATE_GUIDE.md)：网站内容替换与维护清单（占位内容替换、增删项目/图片、博客选择、发布前自检）
- [REFERENCE_GUIDE.md](REFERENCE_GUIDE.md)：参考站点与可学习点（FPGA/ASIC 个人技术展示对标清单）
- [MARKDOWN_GUIDE.md](MARKDOWN_GUIDE.md)：Markdown 写作规范（避免警告/报错的常用写法）
- [INTERVIEW_GUIDE.md](INTERVIEW_GUIDE.md)：面试讲述指南（30 秒/2 分钟/5–10 分钟版本、加分话术、可信度、扬长避短）
- [LEARNING_GUIDE.md](LEARNING_GUIDE.md)：日常成长指南（读书/笔记如何安全展示、不翻车）
- [PRIVACY_GUIDE.md](PRIVACY_GUIDE.md)：公开展示与隐私边界（GitHub Pages/公开仓库风险与方案）
- [MEDIA_GUIDE.md](MEDIA_GUIDE.md)：素材整理与命名规范（图片/视频/PDF）

---

## 维护规范速览

- 提交前建议先执行：`npm run check`（或 `npm run format:check`）
- 内容改动较多时建议先执行：`npm run format`
- 提交信息建议清晰描述改动内容（示例：`update docs and content`）

建议后续可以新增：

- `docs/projects/chaos.md`：混沌加密项目的详细写作稿（面试 30 秒/2 分钟/5 分钟版本）
- `docs/projects/fft.md`、`docs/projects/car.md`
