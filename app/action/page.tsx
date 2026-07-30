import type {Metadata} from "next";
import Link from "next/link";
import {actionGates} from "../product-plan-data";
import {SiteNav} from "../site-nav";

export const metadata: Metadata = {
  title: "五关行动计划｜AI Builder Field Kit",
  description: "从第一个公开网页到独立毕业作品：每关包含理论前置、工具选择、具体操作与验收证据。",
};

const toolRules = [
  ["Codex", "希望 Agent 直接在项目里计划、修改、验证，并保持清晰的工作目录边界。", "五关默认"],
  ["Cursor", "零基础更需要可视化文件树、编辑器和即点即看的代码变化。", "关卡 0–2 可替换"],
  ["Claude Code", "项目深度使用 Anthropic 模型或 Claude Agent SDK，需要终端型长任务协作。", "按项目替换"],
  ["GitHub", "保存版本、公开代码、协作与连接部署平台。它不是运行网站的服务器。", "关卡 0 起必学"],
  ["Vercel", "Next.js 应用需要最短的预览—生产部署路径和环境变量管理。", "关卡 0–4 默认"],
  ["Supabase", "产品开始需要数据库、账号、文件和行级权限，但不想自建后端。", "关卡 2 起"],
] as const;

export default function ActionPage() {
  const shortTitles = ["公开个人网页", "每日 AI 小工具", "多用户真实产品", "第二个产品", "独立毕业作品"];

  return (
    <main className="product-shell action-page">
      <SiteNav active="action" />

      <section className="inner-hero action-hero">
        <span className="section-index">PAGE 03 / 行动计划</span>
        <h1>五关，不是五个 Demo。<br/><span>是五次真实的产品升级。</span></h1>
        <p>每一关先说明需要哪部分理论，再给出默认工具、替代方案、选择理由、具体动作和完成证据。你不会再只看到一句“做一个产品”。</p>
        <div className="route-line">{actionGates.map((gate, index) => <div key={gate.id}><b>{index + 1}</b><span>{shortTitles[index]}</span></div>)}</div>
      </section>

      <section className="section tool-guide" id="tools">
        <div className="section-heading split">
          <div><span className="section-index">TOOL GUIDE / 工具不是宗教</span><h2>先看任务约束，再选择工具。</h2></div>
          <p>默认路线为了减少零基础的变量，不代表所有项目永远只能用这一套。替换工具必须能说清它解决了什么确定约束。</p>
        </div>
        <div className="default-stack">
          <span>默认主线</span>
          <strong>Codex → Next.js + TypeScript → Supabase → Vercel</strong>
          <p>第一关只用 HTML/CSS/JavaScript；第二关加入模型 API；第三关才加入数据库、认证、文件与 RLS。</p>
        </div>
        <div className="tool-table">
          <div className="tool-row tool-head"><span>工具</span><span>什么时候选</span><span>课程位置</span></div>
          {toolRules.map(([tool, when, stage]) => <div className="tool-row" key={tool}><b>{tool}</b><span>{when}</span><small>{stage}</small></div>)}
        </div>
        <div className="choice-rule">
          <b>三条选择铁律</b>
          <span>能用静态页解决，就不先上数据库</span>
          <span>能用 BaaS 学清权限，就不先自建服务器</span>
          <span>只有新项目出现硬约束，才换掉已经验证的技术栈</span>
        </div>
      </section>

      <section className="section gate-plan-section" id="gates">
        <div className="section-heading">
          <span className="section-index">FIVE GATES / 每关完整合同</span>
          <h2>输入理论，执行动作，输出产品与证据。</h2>
        </div>
        <div className="rich-gate-list">
          {actionGates.map((gate) => (
            <article className="rich-gate" id={gate.id} key={gate.id}>
              <div className="rich-gate-heading">
                <b>{gate.number}</b>
                <div><span>成果关卡</span><h3>{gate.title}</h3><p>{gate.outcome}</p></div>
              </div>
              <div className="gate-contract-row">
                <div className="theory-input"><span>先学这些理论</span>{gate.theory.map((item) => <b key={item}>{item}</b>)}</div>
                <div><span>默认工具栈</span><b>{gate.defaultStack}</b></div>
                <div><span>为什么这样选</span><p>{gate.why}</p></div>
              </div>
              <div className="gate-execution">
                <div><span>具体怎么做</span><ol>{gate.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                <div><span>完成后必须留下</span><ul>{gate.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
              <div className="alternative-note"><b>什么时候换工具：</b>{gate.alternatives}</div>
              <div className="rich-gate-actions">
                <Link href={`/knowledge#${gate.id === "g0" ? "web" : gate.id === "g1" ? "ai-app" : gate.id === "g2" ? "fullstack" : "product"}`}>回理论库补知识</Link>
                <Link href="/learn">打开 45 节详细课程正文 →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section action-support">
        <div><span className="section-index">SUPPORT / 卡住时不是继续乱试</span><h2>行动计划旁边，始终放着三种支持。</h2></div>
        <div className="support-mini-grid">
          <article><b>急救室</b><p>按症状定位环境、代码、数据、权限还是模型层，再回到最后稳定版本。</p></article>
          <article><b>模板库</b><p>任务卡、规格、架构图、验收单、SOP、案例页直接在对应关卡调用。</p></article>
          <article><b>辅导 Agent</b><p>当你的题目偏离默认路线时，重新分诊约束、技术栈与知识缺口。</p><Link href="/coach">生成个人路线 →</Link></article>
        </div>
      </section>

      <section className="product-final compact">
        <span>准备好开始了吗？</span>
        <h2>先打开第一关的详细正文，把名字发布到互联网。</h2>
        <Link className="button primary" href="/learn/g0/0.0">开始第 0.0 节</Link>
      </section>
    </main>
  );
}
