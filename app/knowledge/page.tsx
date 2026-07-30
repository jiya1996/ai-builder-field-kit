import type {Metadata} from "next";
import Link from "next/link";
import {knowledgeChapters} from "../product-plan-data";
import {SiteNav} from "../site-nav";

export const metadata: Metadata = {
  title: "理论知识库｜AI Builder Field Kit",
  description: "与五关行动计划逐项对应的 AI Builder 理论知识库，包含固定知识章节和持续更新入口。",
};

const fixedSources = [
  ["OpenAI", "Agent 构建、模型调用、结构化输出与 Cookbook", "https://cookbook.openai.com/"],
  ["Anthropic", "Agent 设计、Context Engineering、长任务 Harness 与 Evals", "https://www.anthropic.com/engineering"],
  ["Google", "Agentic AI 架构、模式选择与生产系统设计", "https://docs.cloud.google.com/architecture/agentic-ai-overview"],
  ["Perplexity", "实时搜索、检索过滤、来源引用与搜索 Cookbook", "https://docs.perplexity.ai/"],
  ["LangChain", "Workflow、Agent、LangGraph 状态图、Tracing 与 Evaluation", "https://docs.langchain.com/"],
] as const;

export default function KnowledgePage() {
  return (
    <main className="product-shell theory-page">
      <SiteNav active="knowledge" />

      <section className="inner-hero theory-hero">
        <Link className="page-return-home" href="/">← 返回首页</Link>
        <span className="section-index">PAGE 02 / 理论知识</span>
        <h1>不是先读完一本教材。<br/><span>是为每一次行动准备正确的知识。</span></h1>
        <p>固定知识建立稳定地基，动态知识跟随 AI 行业更新。每一章都标出它服务哪一关、解决什么误解，以及应该在项目里看到什么证据。</p>
        <div className="knowledge-stats">
          <span><b>{knowledgeChapters.length}</b> 个固定章节</span>
          <span><b>5</b> 家官方核心来源</span>
          <span><b>5</b> 个行动关卡映射</span>
          <span><b>1</b> 个持续更新入口</span>
        </div>
      </section>

      <section className="section knowledge-principle">
        <div className="section-heading split">
          <div><span className="section-index">HOW TO LEARN / 每章统一结构</span><h2>理解，不等于看过定义。</h2></div>
          <p>每个重要概念都按同一条因果链展开，避免内容只剩下“白话告诉你做什么”。</p>
        </div>
        <div className="principle-flow">
          {["它是什么", "为什么需要", "如果没有会怎样", "代价与取舍", "与相邻概念的关系", "在系统中的位置", "项目里如何观察"].map((item, index) => (
            <div key={item}><b>{index + 1}</b><span>{item}</span></div>
          ))}
        </div>
      </section>

      <section className="section web-foundation" id="web-foundation">
        <div className="web-map-copy">
          <span className="section-index">K0 深度示例 / 第一关必修理论</span>
          <h2>一个网页究竟是什么？</h2>
          <p className="lead">网页不是“一张图”。它是浏览器读取文件、解释结构与样式、执行行为，再通过网络向用户呈现的一次运行过程。</p>
          <div className="causal-chain">
            <div><b>HTML</b><span>定义有什么：标题、段落、按钮、图片</span></div>
            <i>+</i>
            <div><b>CSS</b><span>定义长什么样：布局、颜色、尺寸、响应式</span></div>
            <i>+</i>
            <div><b>JavaScript</b><span>定义会发生什么：点击、请求、状态变化</span></div>
          </div>
          <div className="counterfactual">
            <b>做三个反事实实验</b>
            <p>删掉 CSS，内容还在但失去样式；禁用 JavaScript，静态内容还在但交互停止；把 index.html 改名，服务器可能找不到首页并返回 404。概念因此变成你亲眼看到的因果关系。</p>
          </div>
        </div>
        <div className="web-system-map">
          <span>一次发布的完整路径</span>
          {[
            ["① 本地文件夹", "代码真正存放的地方"],
            ["② 浏览器预览", "解释并运行这些文件"],
            ["③ Git 快照", "记录一个可恢复版本"],
            ["④ GitHub 仓库", "保存并协作管理代码"],
            ["⑤ 部署平台", "构建并放到公开服务器"],
            ["⑥ URL", "别人访问服务器的地址"],
          ].map(([title, copy]) => <div key={title}><b>{title}</b><small>{copy}</small></div>)}
          <Link href="/knowledge/web-foundations">阅读完整第一章 →</Link>
        </div>
      </section>

      <section className="section chapter-library" id="chapters">
        <div className="section-heading split">
          <div><span className="section-index">FIXED LIBRARY / 固定知识</span><h2>七章知识，对应五次产品升级。</h2></div>
          <p>章节不是按公司或工具堆放，而是按用户要解决的系统问题组织。官方资料是证据来源，课程负责把它们翻译成项目里的判断与实验。</p>
        </div>
        <div className="chapter-grid">
          {knowledgeChapters.map((chapter) => (
            <article id={chapter.id} key={chapter.id}>
              <div className="chapter-top"><b>{chapter.code}</b><span>{chapter.gates.join(" · ")}</span></div>
              <h3>{chapter.title}</h3>
              <strong>{chapter.question}</strong>
              <p>{chapter.summary}</p>
              <div className="unit-list">{chapter.units.map((unit) => <span key={unit}>{unit}</span>)}</div>
              <details>
                <summary>查看本章一手来源</summary>
                <ul>{chapter.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
              </details>
              {chapter.id === "web" && <Link className="chapter-deep-link" href="/knowledge/web-foundations">阅读完整第一章：Git、URL、语言与前后端 →</Link>}
              {chapter.id === "agent" && <Link className="chapter-deep-link" href="/learn/concepts/agent-harness">阅读已完成的 Agent 与 Harness 深度课 →</Link>}
            </article>
          ))}
        </div>
      </section>

      <section className="section official-source-section">
        <div className="section-heading">
          <span className="section-index">SOURCE POLICY / 来源政策</span>
          <h2>结论回到官方一手资料，课程负责解释和验证。</h2>
          <p>竞品课程只帮助我们发现初学者常见路径与遗漏，不作为技术事实的最终依据。</p>
        </div>
        <div className="official-source-grid">
          {fixedSources.map(([name, focus, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={name}><b>{name}</b><span>{focus}</span><i>打开官方来源 ↗</i></a>
          ))}
        </div>
      </section>

      <section className="section dynamic-library" id="updates">
        <div className="dynamic-intro">
          <span className="section-index">DYNAMIC LIBRARY / 动态知识口</span>
          <h2>稳定地基不乱动，变化信息单独更新。</h2>
          <p>模型版本、API、开发工具与平台能力变化很快。动态区只记录“发生了什么变化、影响哪一章、行动计划是否需要调整”，避免整套课程被新闻流打散。</p>
        </div>
        <div className="update-slots">
          {[
            ["模型与 API", "上下文、价格、结构化输出、工具调用变化", "关联 K1 / K3"],
            ["Agent 工程", "Harness、Memory、Evals、MCP 与运行时更新", "关联 K3 / K5"],
            ["产品技术栈", "Next.js、Supabase、Vercel 与安全策略变化", "关联 K2 / K5"],
            ["检索与知识", "搜索、RAG、引用、数据新鲜度变化", "关联 K4"],
          ].map(([title, copy, relation]) => <article key={title}><span>预留更新槽</span><h3>{title}</h3><p>{copy}</p><b>{relation}</b></article>)}
        </div>
        <div className="status-note"><b>当前状态</b><p>这里已经完成更新机制和栏目结构；自动抓取、编辑审核与发布日期管理尚未接入，现阶段由课程团队人工审核后补充。</p></div>
      </section>

      <section className="product-final compact">
        <span>知识的下一步，是拿到真实证据</span>
        <h2>选择一关，马上把概念放进产品里验证。</h2>
        <Link className="button primary" href="/action">进入五关行动计划</Link>
      </section>
    </main>
  );
}
