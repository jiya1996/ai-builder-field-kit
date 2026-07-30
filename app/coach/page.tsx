import type {Metadata} from "next";
import {SiteNav} from "../site-nav";
import {CoachIntake} from "./coach-intake";

export const metadata: Metadata = {
  title: "个性化辅导 Agent｜AI Builder Field Kit",
  description: "从真实问题出发，生成技术栈、知识缺口、第一版范围与行动节奏。",
};

export default function CoachPage() {
  return (
    <main className="product-shell coach-page">
      <SiteNav active="coach" />

      <section className="inner-hero coach-hero">
        <span className="section-index">PAGE 04 / 个性化辅导</span>
        <h1>不是给所有人同一张课表。<br/><span>先把你的问题，变成可交付路线。</span></h1>
        <p>同一个“想做 Agent”，可能是网页、知识检索、固定自动化或多用户产品。辅导先识别任务、用户、数据、权限和时间约束，再决定技术栈与学习顺序。</p>
      </section>

      <section className="section coach-beta-section">
        <div className="section-heading split">
          <div><span className="section-index">ROUTE DIAGNOSIS / 路径分诊 Beta</span><h2>先生成一份能执行的第一版路线。</h2></div>
          <p>这是已经可用的规则分诊原型：所有判断都在浏览器本地完成，不会上传你填写的内容。</p>
        </div>
        <CoachIntake />
        <div className="coach-boundary-note">
          <b>当前能力边界</b>
          <p>本页现在能根据已填写的约束生成规则化建议，但还不是接入模型、项目仓库和长期学习记录的完整 Agent。它不会自动读取代码、代做项目或持续记住你的进度。</p>
        </div>
      </section>

      <section className="section coach-system">
        <div className="section-heading">
          <span className="section-index">FULL AGENT / 完整辅导 Agent 要完成什么</span>
          <h2>真正的个性化，不是一段更长的聊天。</h2>
        </div>
        <div className="coach-system-flow">
          {[
            ["01", "定位问题", "识别真实任务、现有笨办法、用户和价值证据"],
            ["02", "判断类型", "固定 Workflow、AI 功能、Agent，还是普通软件"],
            ["03", "匹配技术栈", "依据数据、权限、平台、成本与经验选择最薄方案"],
            ["04", "生成知识地图", "只补当前里程碑需要的理论、实验与官方来源"],
            ["05", "推进与验收", "把目标切成任务卡，用链接、测试和用户行为验收"],
            ["06", "复盘与资产化", "记录失败、更新路线，沉淀模板、SOP 与 Starter Kit"],
          ].map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section agent-decision">
        <div>
          <span className="section-index">IMPORTANT / 不是所有需求都要做 Agent</span>
          <h2>先画确定流程，再把真正需要判断的部分交给模型。</h2>
        </div>
        <div className="decision-comparison">
          <article><b>普通软件</b><p>输入输出和规则明确，用代码直接完成。</p></article>
          <article><b>Workflow</b><p>步骤固定，但某些步骤调用模型处理非结构化内容。</p></article>
          <article><b>Agent</b><p>任务开放，模型需要在反馈循环中选择工具和下一步。</p></article>
        </div>
      </section>
    </main>
  );
}
