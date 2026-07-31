# AI Builder Field Kit

面向零基础 AI Builder 的双驱动学习工作台。全站只保留 S00–S10 一条学习主线：理论形成判断，实战产生结果，证据完成验收，阶段辅导 Beta 根据课程规则提供结构化自检。

## 在线访问

[打开公开网站](https://jiya1996.github.io/ai-builder-field-kit/)

- `/`：产品价值、学习方式与三部分共同交付
- `/learn/s00/` 到 `/learn/s10/`：可分享、可静态访问的阶段工作台
- 每个阶段包含理解、实战、验收，以及映射后的完整课程正文
- 旧 `/knowledge`、`/action`、`/coach` 与 `/learn/g*/课节/` 地址继续可用，但统一显示同一个 S00–S10 工作台
- 当前阶段辅导为基于课程规则的 Beta，不读取用户代码，也不冒充真实模型对话

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

本机的通关手册更新后，运行 `npm run course:sync` 可重新生成公开课节正文；`app/stage-lesson-map.ts` 负责把旧课节映射到 S00–S10。

## 内容与验收

- S00–S10 的阶段合同位于 `app/stage-data.ts`
- 完整课节正文来自 `app/course-markdown.ts`
- 正文与新主线的映射位于 `app/stage-lesson-map.ts`
- 页面与路由检查运行 `npm test`
- 官方来源链接检查运行 `npm run check:links`

## 发布

源码保存在 `main`，生成后的公开网站发布在 `gh-pages` 分支。
