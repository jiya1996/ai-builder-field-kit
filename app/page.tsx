import Link from "next/link";

const deliveries = [
  {
    index: "01",
    label: "看懂",
    title: "理论知识",
    copy: "只学当前阶段做决策必须懂的知识。知道它是什么、为什么存在，以及怎样在真实系统中观察。",
    outcomes: ["S00–S10 阶段化知识", "概念因果与理解检查", "官方一手资料"],
    href: "/learn/s00?view=theory",
    action: "进入理论视图",
  },
  {
    index: "02",
    label: "做成",
    title: "课程实战",
    copy: "把知识立即放进项目里验证。每个阶段都有输入、工具、动作、输出和可复查的完成证据。",
    outcomes: ["真实项目任务", "工具选择与操作步骤", "Boss 战与交付证据"],
    href: "/learn/s00?view=practice",
    action: "进入实战视图",
  },
  {
    index: "03",
    label: "按阶段自检",
    title: "阶段辅导 Beta",
    copy: "它读取你所在阶段的课程规则，根据当前目标和证据，提供结构化自检与下一步建议。",
    outcomes: ["阶段定位", "课程规则自检", "下一步行动建议"],
    href: "/learn/s00?view=theory&agent=1",
    action: "打开阶段辅导",
  },
];

export default function Home() {
  return (
    <main className="landing-shell">
      <header className="landing-nav">
        <Link className="landing-brand" href="/" aria-label="AI Builder Field Kit 首页">
          <span>AI</span>
          <b>Builder Field Kit</b>
        </Link>
        <nav aria-label="首页导航">
          <a href="#delivery">我们交付什么</a>
          <a href="#method">学习方式</a>
        </nav>
        <Link className="landing-nav-cta" href="/learn/s00?view=theory">打开学习工作台</Link>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-main">
          <span className="landing-kicker">给零基础 AI Builder 的产品训练</span>
          <h1 className="landing-promise-list">
            <span>学会软件如何运转</span>
            <span>AI 如何协作</span>
            <span>产品如何从想法走到上线</span>
          </h1>
          <p className="landing-promise-outcome">
            最终，你不只拥有一个作品。
            <strong>你会掌握下一次独立完成产品的方法。</strong>
          </p>
        </div>
        <div className="landing-hero-side">
          <span className="landing-stage-label">S00–S10 学习工作台</span>
          <h2>每一步，都对应一个可以验收的结果。</h2>
          <p>理论形成判断，实战产生证据，Agent 根据当前阶段提供辅导。</p>
          <div>
            <Link href="/learn/s00?view=theory">查看 S00–S10 学习主线</Link>
            <a href="#delivery">了解三部分交付 →</a>
          </div>
        </div>
        <div className="landing-orbit" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <section className="landing-delivery" id="delivery">
        <div className="landing-section-heading">
          <span>一条主线。三种交付。</span>
          <h2>理解、行动与辅导，发生在同一个学习现场。</h2>
          <p>理论形成判断，实战产生证据，Agent 让同一条路线适合你。</p>
        </div>
        <div className="delivery-columns">
          {deliveries.map((item) => (
            <article key={item.index}>
              <div><b>{item.index}</b><span>{item.label}</span></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              <Link href={item.href}>{item.action} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-method" id="method">
        <div>
          <span>S00–S10</span>
          <h2>不是读完理论，再另外做几个 Demo。</h2>
        </div>
        <div className="method-loop">
          <article><b>理解</b><p>先看懂本阶段马上要使用的概念和系统边界。</p></article>
          <i>→</i>
          <article><b>实战</b><p>把概念放进真实项目，完成可观察的用户任务。</p></article>
          <i>→</i>
          <article><b>验收</b><p>用链接、测试、Trace 和用户行为证明结果。</p></article>
          <i>↺</i>
          <article><b>Agent</b><p>根据当前证据判断补知识、修任务还是继续前进。</p></article>
        </div>
        <Link className="method-cta" href="/learn/s00?view=theory">从 S00 第一次成功开始</Link>
      </section>

      <footer className="landing-footer">
        <div className="landing-brand"><span>AI</span><b>Builder Field Kit</b></div>
        <p>S00–S10 ｜ 理论 × 实战 ｜ 阶段辅导 Beta</p>
        <Link href="/learn/s00?view=theory">进入学习工作台 ↑</Link>
      </footer>
    </main>
  );
}
