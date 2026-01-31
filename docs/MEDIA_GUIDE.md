# 素材整理与命名规范（Media）

## 目录结构

- `assets/projects/<project>/`：某个项目专属素材（图片/视频/封面等）
- `assets/awards/`：奖状/证书素材
- `assets/books/`：书籍封面素材
- `assets/resume/`：简历 PDF

## 命名建议

- 项目素材：`cover.*`、`arch.*`、`result.*`、`flow.*`、`demo.mp4`
- 奖状：`award-1.*`、`award-2.*` …（和主页卡片编号对应）
- 书籍：`hdl-design.*`、`digital-ic.*`、`fpga.*`、`computer-arch.*`

## 图片建议

- 格式：优先 `jpg`（照片）或 `png`（需要无损），图表可用 `svg`
- 尺寸：卡片缩略图宽度建议 ≥ 1200px（清晰）
- 体积：单张尽量 ≤ 400KB（访问更快）

## 视频建议

- 编码：H.264 + AAC（兼容性最好）
- 分辨率：720p/1080p
- 体积：≤ 20~40MB（GitHub Pages 访问更快）
