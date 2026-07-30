import Link from "next/link";
import {courseGates} from "./course-data";
import {actionGates, knowledgeChapters} from "./product-plan-data";
import {SiteNav} from "./site-nav";

const agentStages = [
  {
    label: "关卡 0",
    role: "编程搭档",
    statement: "Agent 帮你把中文要求变成网页文件，但你要学会划定工作目录、检查文件变化、预览结果和读懂报错。",
    capabilities: ["描述可验收需求", "确认工作目录", "查看修改", "用报错定位问题"],
  },
  {
    label: "关卡 1",
    role: "功能实现搭档",
    statement: "Agent 按任务卡逐步完成产品壳和模型调用；你负责定义输入输出、控制范围，并用两张验收单判断结果。",
    capabilities: ["任务卡与 AGENTS.md", "小步实现与回滚", "模型 API", "结构化输出与 AI 验收"],
  },
  {
    label: "关卡 2",
    role: "受约束的系统协作者",
    statement: "Agent 可以参与页面、数据库与接口开发，但权限、安全、成本和上线判断必须由明确架构与证据约束。",
    capabilities: ["产品规格与架构", "数据库与登录", "RLS 权限", "安全、日志与回滚"],
  },
  {
    label: "关卡 3",
    role: "个人生产系统整理员",
    statement: "Agent 帮你从第一个产品中提取 Starter Kit、SOP 和检查单，再用第二个产品验证这些资产是不是真的能复用。",
    capabilities: ["复盘提交记录", "提取通用底座", "沉淀 SOP / Skill", "跨项目回归验证"],
  },
  {
    label: "关卡 4",
    role: "个性化项目教练",
    statement: "Agent 根据你的真实问题协助做 Discovery、技术选型、知识补齐和里程碑拆解，但最终作品必须由真实用户验证。",
    capabilities: ["问题定位", "技术栈匹配", "个人知识地图", "里程碑与证据验收"],
  },
];

export default function Home() {
  return (
    <main className="home-field-kit">
      <SiteNav active="home" />

      <section className="hero home-original-hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="eyebrow">给零基础 AI Builder 的第一款真产品训练场</div>
        <h1>
          别人教你让 AI 写代码。
          <span>我们陪你把它真的做完。</span>
        </h1>
        <p className="hero-copy">
          从今天上线第一张网页，到让陌生人跑通你的毕业作品。
          每一步都有理论解释、具体行动、Agent 辅导、可晒产物和 Boss 战验收。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#practice-agent">查看五关路线</a>
          <a className="button secondary" href="#curriculum">打开完整学习目录</a>
        </div>
        <div className="proof-strip">
          <span><strong>5</strong> 个实战成果</span>
          <span><strong>45</strong> 个课程小节</span>
          <span><strong>7</strong> 章理论知识</span>
          <span><strong>1</strong> 条个人路线</span>
        </div>
      </section>

      <section className="section home-delivery-strip">
        <div className="section-heading split">
          <div>
            <span className="section-index">01 / 三部分共同交付</span>
            <h2>不是学一套理论，再另外做几个 Demo。</h2>
          </div>
          <p>每一个实战成果，都同时调用对应理论和 Agent 辅导；学员遇到的问题又会决定下一步应该补哪部分知识。</p>
        </div>
        <div className="home-delivery-grid">
          <Link href="/knowledge">
            <span>先看懂</span>
            <h3>理论知识</h3>
            <p>理解网页、AI 应用、全栈产品、Agent、知识检索、安全评测与产品判断。</p>
            <b>打开 7 章知识目录 →</b>
          </Link>
          <Link href="/action">
            <span>再做出</span>
            <h3>课程实战</h3>
            <p>用五个连续项目，把知识变成公开链接、真实用户、第二产品与毕业作品。</p>
            <b>打开五关行动计划 →</b>
          </Link>
          <Link href="/coach">
            <span>最后适配到自己</span>
            <h3>辅导 Agent</h3>
            <p>定位个人问题，匹配技术栈和知识缺口，把通用课程改造成自己的交付路线。</p>
            <b>生成个人路线 →</b>
          </Link>
        </div>
      </section>

      <section className="section practice-agent-section" id="practice-agent">
        <div className="section-heading split">
          <div>
            <span className="section-index">02 / 课程实战 × Agent</span>
            <h2>Agent 不替你通关，它在每一关承担不同角色。</h2>
          </div>
          <p>课程不是一开始就让 Agent 自主做完整产品，而是随着学员判断力增加，逐步开放更长任务、更复杂工具和更真实责任。</p>
        </div>
        <div className="agent-stage-list">
          {actionGates.map((gate, index) => {
            const stage = agentStages[index];
            return (
              <article id={`home-${gate.id}`} key={gate.id}>
                <div className="agent-stage-number">{gate.number}</div>
                <div className="agent-stage-project">
                  <span>{stage.label} · 课程实战</span>
                  <h3>{gate.title}</h3>
                  <p>{gate.outcome}</p>
                  <Link href={`/action#${gate.id}`}>查看本关工具与步骤 →</Link>
                </div>
                <div className="agent-stage-role">
                  <span>Agent 此时是</span>
                  <h4>{stage.role}</h4>
                  <p>{stage.statement}</p>
                  <div>{stage.capabilities.map((item) => <b key={item}>{item}</b>)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section home-theory-directory" id="theory-directory">
        <div className="section-heading split">
          <div>
            <span className="section-index">03 / 要学哪部分理论</span>
            <h2>七章理论，不是七门互不相干的课。</h2>
          </div>
          <p>每章都标明它服务哪一关。学员可以从理论目录进入，也可以在做项目时按当前问题回来补课。</p>
        </div>
        <div className="home-theory-grid">
          {knowledgeChapters.map((chapter) => (
            <Link href={`/knowledge#${chapter.id}`} key={chapter.id}>
              <div><b>{chapter.code}</b><span>{chapter.gates.join(" · ")}</span></div>
              <h3>{chapter.title}</h3>
              <p>{chapter.question}</p>
              <small>{chapter.units.slice(0, 4).join(" / ")}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section home-curriculum" id="curriculum">
        <div className="section-heading split">
          <div>
            <span className="section-index">04 / 完整学习目录</span>
            <h2>五关、45 节，每节都能直接进入正文。</h2>
          </div>
          <p>展开任意关卡，可以同时看到理论前置、实战结果和全部课节；不再先跳进另一个“学习中心”重新寻找。</p>
        </div>
        <div className="home-curriculum-list">
          {courseGates.map((gate, index) => (
            <details key={gate.id} open={index === 0}>
              <summary>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <span>{gate.kicker} · {gate.duration}</span>
                  <h3>{gate.title}</h3>
                </div>
                <em>{gate.lessons.length} 节课</em>
              </summary>
              <div className="home-gate-directory">
                <aside>
                  <span>本关实战结果</span>
                  <p>{gate.outcome}</p>
                  <span>理论前置</span>
                  <div>{actionGates[index].theory.map((item) => <b key={item}>{item}</b>)}</div>
                  <Link href={`/action#${gate.id}`}>查看完整行动合同 →</Link>
                </aside>
                <ol>
                  {gate.lessons.map((lesson) => (
                    <li key={lesson.code}>
                      <Link href={`/learn/${gate.id}/${lesson.code}`}>
                        <b>{lesson.code}</b>
                        <span>{lesson.title}</span>
                        <small>{lesson.time}</small>
                        <i>阅读正文 →</i>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="home-final-cta">
        <span>不知道自己的题目该从哪一关开始？</span>
        <h2>先说清你的真实问题，再生成一条个人路线。</h2>
        <div>
          <Link className="button primary" href="/coach">使用路径分诊</Link>
          <Link className="button secondary" href="/learn/g0/0.0">直接从第一节开始</Link>
        </div>
      </section>
    </main>
  );
}
