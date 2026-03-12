# 📱 React Native 开发路线图

基于 [VitePress](https://vitepress.dev) 搭建的静态文档站，覆盖从零基础到 App 上架的完整学习路径。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（热更新）
npm run docs:dev

# 访问 http://localhost:5173
```

## 构建静态站点（SSG）

```bash
npm run docs:build
# 输出到 docs/.vitepress/dist/
```

```bash
# 本地预览构建结果
npm run docs:preview
```

## 部署

构建产物在 `docs/.vitepress/dist/`，可以部署到任意静态托管：

| 平台 | 说明 |
|------|------|
| **Vercel** | 导入 Git 仓库，自动检测 VitePress，零配置 |
| **Netlify** | Build command: `npm run docs:build`，Publish dir: `docs/.vitepress/dist` |
| **GitHub Pages** | 参考 [VitePress 官方指南](https://vitepress.dev/guide/deploy#github-pages) |
| **Cloudflare Pages** | Build command 同 Netlify |

## 项目结构

```
rn-roadmap-docs/
├── package.json
├── docs/
│   ├── .vitepress/
│   │   └── config.js         ← VitePress 配置（导航、侧边栏）
│   ├── public/
│   │   ├── hero.svg
│   │   └── favicon.svg
│   ├── index.md              ← 首页（hero layout）
│   ├── guide/
│   │   ├── intro.md          ← 路线图介绍
│   │   ├── warnings.md       ← 新手注意事项
│   │   └── project.md        ← 推荐实战项目
│   ├── phases/
│   │   ├── phase-1.md        ← 基础知识储备
│   │   ├── phase-2.md        ← React Native 入门
│   │   ├── phase-3.md        ← 进阶功能开发
│   │   ├── phase-4.md        ← 完整项目开发
│   │   └── phase-5.md        ← 打包 & 发布上架
│   └── tools/
│       ├── overview.md       ← 核心工具总览
│       └── resources.md      ← 学习资源推荐
```

## 内容扩展

修改对应的 `.md` 文件即可更新内容。VitePress 支持：

- 标准 Markdown 语法
- 代码块语法高亮（自动）
- `::: tip` / `::: warning` / `::: info` 提示框
- 表格、任务列表
- 自定义容器和组件
