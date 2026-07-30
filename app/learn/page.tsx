import type { Metadata } from "next";
import Link from "next/link";
import { advancedModules, courseGates, supportRooms } from "../course-data";
import { CurriculumBrowser } from "./curriculum-browser";

export const metadata: Metadata = {
  title: "课程学习内容｜AI Builder Delivery System",
  description: "查看 AI Builder 五个成果关的全部学习小节、动手任务、完成证据与 Boss 战验收。",
};

export default function LearnPage() {
  const lessonCount = courseGates.reduce((total, gate) => total + gate.lessons.length, 0);

  return (
    <main className="learn-page">
      <header className="site-header learn-header">
        <Link className="brand" href="/" aria-label="返回课程首页">
          <span className="brand-mark">AI</span>
          <span>Builder Delivery System</span>
        </Link>
        <nav aria-label="课程导航">
          <a href="#knowledge">核心知识</a>
          <a href="#curriculum">五关主线</a>
          <a href="#support">常驻房间</a>
          <a href="#advanced">进阶包</a>
        </nav>
        <Link className="header-cta" href="/">返回总览 ↗</Link>
      </header>

      <section className="learn-hero">
        <div className="learn-hero-copy">
          <span className="section-index">一期课程 · 可直接交付正文</span>
          <h1>你不是来“看课”的。<br/><span>你会逐关做出 5 个成果。</span></h1>
          <p>这里展示客户真正学习的内容：每一节学什么、动手做什么、拿什么证明完成。知识只在项目需要的那一刻出现。</p>
          <div className="learn-proof">
            <span><strong>5</strong> 个成果关</span>
            <span><strong>{lessonCount}</strong> 个学习小节</span>
            <span><strong>3</strong> 个常驻房间</span>
            <span><strong>1</strong> 套 Boss 验收机制</span>
          </div>
        </div>
        <div className="learn-route-card">
          <span>你的完整路线</span>
          {courseGates.map((gate) => (
            <div key={gate.id}>
              <b>{gate.number}</b>
              <p><strong>{gate.title}</strong><small>{gate.duration}</small></p>
            </div>
          ))}
        </div>
      </section>

      <section className="knowledge-foundation-section" id="knowledge">
        <div className="section-heading split">
          <div>
            <span className="section-index">KNOWLEDGE / 核心知识课</span>
            <h2>不只知道怎么做，还要看懂系统为什么这样工作。</h2>
          </div>
          <p>核心概念按“定义、动机、反事实、代价、关系、系统位置、代码证据”展开，并配有系统图和验证实验。</p>
        </div>
        <article className="knowledge-feature-card">
          <div className="knowledge-feature-index">K1</div>
          <div>
            <span>白盒基础 · 完整正文已上线</span>
            <h3>Agent 与 Harness：从模型回答到系统行动</h3>
            <p>分清 Model、AI 功能、Workflow、Agent、Harness 与 Runtime；看懂 Tool Loop、权限、状态、Trace 和恢复。</p>
            <div>
              <span>关系地图</span><span>运行时序</span><span>代码证据</span><span>三组对照实验</span>
            </div>
          </div>
          <Link href="/learn/concepts/agent-harness">开始学习完整知识课 →</Link>
        </article>
      </section>

      <section className="curriculum-section" id="curriculum">
        <div className="section-heading split">
          <div>
            <span className="section-index">COURSE / 五关主线</span>
            <h2>点击关卡，再进入每节完整正文。</h2>
          </div>
          <p>目录卡先说明目标；点击“阅读完整正文”，即可看到白话讲解、逐步操作、提示词、验收清单和常见坑。</p>
        </div>
        <CurriculumBrowser />
      </section>

      <section className="support-section" id="support">
        <div className="section-heading">
          <span className="section-index">SUPPORT / 三个常驻房间</span>
          <h2>不是让学员独自卡住。</h2>
          <p>主线负责向前推进，三个房间负责在需要时提供恢复、模板和白话解释。</p>
        </div>
        <div className="support-room-grid">
          {supportRooms.map((room) => (
            <article key={room.title}>
              <span className="room-icon">{room.icon}</span>
              <small>{room.subtitle}</small>
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <ul>{room.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="advanced-section" id="advanced">
        <div className="advanced-intro">
          <span>二期进阶包 · 核心首章已上线</span>
          <h2>看穿你的 Agent</h2>
          <p>一期教你用 Agent 把产品做完；进阶包让你亲手搭一个迷你 Agent，用 Trace、权限、状态机和评测看穿它。</p>
          <Link className="button primary" href="/learn/concepts/agent-harness">先学 Agent 与 Harness →</Link>
        </div>
        <div className="advanced-list">
          {advancedModules.map(([code, title, copy]) => (
            <article key={code}>
              <span>{code}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="learn-final">
        <p>学习内容的终点不是“看完”</p>
        <h2>而是公开产品、验收证据和下一次能复用的个人资产。</h2>
        <a className="button primary" href="#curriculum">从关卡 0 开始查看</a>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>Builder Delivery System</span>
        </div>
        <p>课程正文来源：888AI 资料包 · 关卡制交付版</p>
        <Link href="/">返回首页 ↑</Link>
      </footer>
    </main>
  );
}
