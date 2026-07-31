import assert from "node:assert/strict";
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
  assert.match(html, /别人教你让 AI 写代码/);
  assert.match(html, /我们陪你把它真的做完/);
  assert.match(html, /一条主线。三种交付/);
  assert.match(html, /理论知识/);
  assert.match(html, /课程实战/);
  assert.match(html, /辅导 Agent/);
  assert.match(html, /查看 S00–S10 学习主线/);
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
  assert.match(html, /个性化辅导 Agent/);
  assert.match(html, /产品首页/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /Git、GitHub 和部署不是一回事/);
});
