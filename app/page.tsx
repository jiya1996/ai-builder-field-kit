import { JourneyTracker, ResourceExplorer } from "./interactive-sections";
import { courses, projectFamilies } from "./data";

const promises = [
  {
    number: "01",
    title: "走完",
    kicker: "完成率机制",
    copy: "每一关只有一个可晒结果；卡住先走急救流程，再进入答疑接口。你不会在第 17 节悄悄消失。",
    accent: "coral",
  },
  {
    number: "02",
    title: "敢上线",
    kicker: "判断力层",
    copy: "验收、排错、安全、权限、成本与回滚被做成 Boss 战。不是“能跑”，而是敢把链接交给真实用户。",
    accent: "yellow",
  },
  {
    number: "03",
    title: "能重复",
    kicker: "资产化",
    copy: "把第一次的代码、流程和判断沉淀为 Starter Kit、SOP、Skill 与作品集，让第二个产品快一倍。",
    accent: "mint",
  },
];

const rooms = [
  ["急救室", "卡住时先做什么", "完整报错、最小复现、三条自救路线、求助模板与人工答疑接口。"],
  ["军火库", "做过的东西别丢", "Starter Kit、任务卡、验收单、故障演练、发布清单与三个 Git 仓库索引。"],
  ["词典", "只解释此刻需要的词", "Tool Call ≠ Execution、认证 ≠ 授权、Preview ≠ Production；每张卡都带反例。"],
];

export default function Home() {
  const projectCount = projectFamilies.reduce(
    (total, family) => total + family.projects.length,
    0,
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到首页">
          <span className="brand-mark">AI</span>
          <span>Builder Field Kit</span>
        </a>
        <nav aria-label="主导航">
          <a href="#journey">闯关路线</a>
          <a href="#lab">项目实验室</a>
          <a href="#sources">参考来源</a>
        </nav>
        <a className="header-cta" href="#journey">从关卡 0 开始 ↗</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="eyebrow">给零基础 AI Builder 的第一款真产品训练场</div>
        <h1>
          别人教你让 AI 写代码。
          <span>我们陪你把它真的做完。</span>
        </h1>
        <p className="hero-copy">
          从今天上线第一张网页，到让陌生人跑通你的毕业作品。每一步都有可晒产物、验收
          Boss 战和卡住时的救援路径。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#journey">查看五关路线</a>
          <a className="button secondary" href="#lab">打开 33 个项目地图</a>
        </div>
        <div className="proof-strip">
          <span><strong>5</strong> 个可晒时刻</span>
          <span><strong>3</strong> 层完成保障</span>
          <span><strong>33</strong> 个一手 Repo</span>
          <span><strong>7</strong> 类 AI 项目</span>
        </div>
      </section>

      <section className="section promises-section">
        <div className="section-heading">
          <span className="section-index">01 / 核心承诺</span>
          <h2>用户买的不是知识，是三次跨越。</h2>
          <p>信息免费；把焦虑变成可验收的结果，才是资料包的产品价值。</p>
        </div>
        <div className="promise-grid">
          {promises.map((promise) => (
            <article className={`promise-card ${promise.accent}`} key={promise.title}>
              <div className="promise-number">{promise.number}</div>
              <span>{promise.kicker}</span>
              <h3>{promise.title}</h3>
              <p>{promise.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-heading split">
          <div>
            <span className="section-index">02 / 闯关路线</span>
            <h2>按可晒结果组关，不按知识分类上课。</h2>
          </div>
          <p>知识只在完成当前产物时出现。勾选你已经拿到的证据，进度会保存在这台设备。</p>
        </div>
        <JourneyTracker />
      </section>

      <section className="section rooms-section">
        <div className="section-heading">
          <span className="section-index">03 / 三个常驻房间</span>
          <h2>课程会结束，救援和资产不会。</h2>
        </div>
        <div className="room-grid">
          {rooms.map(([title, subtitle, copy], index) => (
            <article className="room-card" key={title}>
              <span className="room-icon">{["✚", "⌁", "Aa"][index]}</span>
              <p className="room-label">{subtitle}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section lab-section" id="lab">
        <div className="section-heading split">
          <div>
            <span className="section-index">04 / 项目实验室</span>
            <h2>{projectCount} 个 Repo，不是一张收藏清单。</h2>
          </div>
          <p>按七类真实任务筛选。每个项目都标注学习深度：架构必读、Demo 必跑或同题对照。</p>
        </div>
        <ResourceExplorer />
      </section>

      <section className="section sources-section" id="sources">
        <div className="section-heading">
          <span className="section-index">05 / 竞品拼接逻辑</span>
          <h2>借结构，不抄内容；补上市场没人产品化的部分。</h2>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <a href={course.href} target="_blank" rel="noreferrer" className="course-card" key={course.name}>
              <div className="course-topline">
                <span>{course.role}</span>
                <span>↗</span>
              </div>
              <h3>{course.name}</h3>
              <p>{course.take}</p>
              <div className="course-boundary">{course.boundary}</div>
            </a>
          ))}
        </div>
        <div className="evidence-note">
          <div>
            <span>证据边界</span>
            <h3>一手来源支撑事实，产品判断负责取舍。</h3>
          </div>
          <p>
            竞品官网、公开课程源码与 GitHub README 用于确认结构和能力；本地研究表只作为需求与成交信号。
            价格、热度、许可证和产品功能在正式出版前仍需按访问日复核。
          </p>
        </div>
      </section>

      <section className="final-cta">
        <p>最终目标不是“学完 100 节课”</p>
        <h2>是你把链接发出去时，知道它为什么值得被使用。</h2>
        <a className="button primary" href="#journey">开始收集第一份证据 →</a>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>Builder Field Kit</span>
        </div>
        <p>资料快照：2026-07-29 · 课程研发内部版</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
