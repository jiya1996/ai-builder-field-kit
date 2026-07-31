import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const {default: worker} = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: {accept: "text/html"},
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", {status: 404}),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("landing page communicates one promise and three coordinated deliveries", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /学会软件如何运转/);
  assert.match(html, /AI 如何协作/);
  assert.match(html, /产品如何从想法走到上线/);
  assert.match(html, /你会掌握下一次独立完成产品的方法/);
  assert.doesNotMatch(html, /别人教你让 AI 写代码|我们陪你把它真的做完/);
  assert.match(html, /一条主线。三种交付/);
  assert.match(html, /理论知识/);
  assert.match(html, /课程实战/);
  assert.match(html, /阶段辅导 Beta/);
  assert.match(html, /查看 S00–S10 学习主线/);
  assert.match(html, /\/learn\/s00\?view=theory/);
  assert.doesNotMatch(html, /45 个课程小节|五关路线|7 章理论知识/);
});

test("learning workspace server-renders the unified S00-S10 experience", async () => {
  const response = await render("/learn");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /唯一学习主线/);
  assert.match(html, /S00/);
  assert.match(html, /S10/);
  assert.match(html, /输入什么/);
  assert.match(html, /输出什么/);
  assert.match(html, /学会什么/);
  assert.match(html, /理解/);
  assert.match(html, /实战/);
  assert.match(html, /验收/);
  assert.match(html, /阶段辅导 Beta/);
  assert.match(html, /产品首页/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /Git、GitHub 和部署不是一回事/);
  assert.match(html, /本阶段要做的东西/);
  assert.match(html, /用 AI 做一个属于自己的个人介绍网页/);
  assert.match(html, /用 AI 协作完成，但成品本身不是 AI 产品/);
  assert.match(html, /从这段需求澄清提示词开始/);
  assert.match(html, /请先不要写代码，也不要替我编造经历/);
  assert.match(html, /完整课程正文/);
  assert.match(html, /装上 AI 编程搭档/);
  assert.match(html, /一键复制/);
});

test("each S stage has a shareable server-rendered route", async () => {
  const response = await render("/learn/s04?view=theory");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /S04/);
  assert.match(html, /真实全栈产品/);
  assert.match(html, /数据库、字段与 CRUD/);
  assert.match(html, /注册、登录与受保护页面/);
  assert.match(html, /href="\/learn\/s05\?view=theory"/);
  assert.match(html, /rel="canonical" href="https:\/\/jiya1996\.github\.io\/ai-builder-field-kit\/learn\/s04\/"/);
});

test("markdown tables fill the lesson width inside a responsive scroll container", async () => {
  const response = await render("/learn/s01");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="markdown-table-scroll"/);
  assert.match(html, /三选一题库/);

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.lesson-markdown table\{display:table;width:100%;min-width:720px/);
  assert.doesNotMatch(css, /\.lesson-markdown table\{display:block/);
});

test("legacy lesson URLs render inside the S00-S10 workbench", async () => {
  const response = await render("/learn/g0/0.2");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /唯一学习主线/);
  assert.match(html, /S00/);
  assert.match(html, /描述 → 生成 → 预览 → 调整/);
  assert.match(html, /rel="canonical" href="https:\/\/jiya1996\.github\.io\/ai-builder-field-kit\/learn\/s00\/"/);
  assert.doesNotMatch(html, /关卡 0<\/b>/);
});

test("legacy top-level routes use the same workbench", async () => {
  for (const route of ["/knowledge", "/action", "/coach"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /唯一学习主线/);
    assert.match(html, /S00/);
  }
});

test("all course-to-agent actions open the stage guidance panel", async () => {
  const source = await readFile(new URL("../app/learning-workbench.tsx", import.meta.url), "utf8");
  const askAgentBody = source.match(/function askAgent\(prompt: string\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
  assert.match(askAgentBody, /setAgentVisibility\(true\)/);
});

test("acceptance items are interactive and gate stage completion", async () => {
  const source = await readFile(new URL("../app/learning-workbench.tsx", import.meta.url), "utf8");
  assert.match(source, /evidenceChecks: "ai-builder-evidence-checks"/);
  assert.match(source, /bossChecks: "ai-builder-boss-checks"/);
  assert.match(source, /function toggleEvidence\(index: number\)/);
  assert.match(source, /function toggleBossCheck\(\)/);
  assert.match(source, /role="checkbox"/);
  assert.match(source, /aria-checked=\{isChecked\}/);
  assert.match(source, /disabled=\{!completed\.includes\(stage\.id\) && !allAcceptanceChecked\}/);
  assert.match(source, /完成全部验收项后解锁通关/);
});
