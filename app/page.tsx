import Link from "next/link";
import { JourneyTracker, ResourceExplorer, TemplateWorkbench } from "./interactive-sections";
import { projectFamilies } from "./data";

const promises = [
  {
    number: "01",
    title: "走完",
    kicker: "完成率机制",
    copy: "每一关只有一个可见产品升级；卡住先回到稳定版本，再由急救卡和教学 Agent 分诊。",
    accent: "coral",
  },
  {
    number: "02",
    title: "敢上线",
    kicker: "判断力层",
    copy: "权限、引用、失败、成本和回滚都进入 Boss 战。不是“看起来能跑”，而是有证据地交给用户。",
    accent: "yellow",
  },
  {
    number: "03",
    title: "能重复",
    kicker: "个人资产化",
    copy: "每关结算 SOP、模板、Skill 与 Starter Kit，并用第二个项目证明它们真的能减少时间和错误。",
    accent: "mint",
  },
];

const productModules = [
  {
    index: "A",
    title: "AI Builder 知识库",
    promise: "查得懂",
    description: "不是从头读到尾的教材，而是项目在当前动作需要时调用的唯一知识事实源。",
    items: ["概念卡：是什么 / 不是什么", "系统地图：数据与控制怎样流动", "决策卡：何时用、何时不用", "急救卡：按症状找到恢复路径", "模板、检查单与案例拆解"],
  },
  {
    index: "B",
    title: "AI Builder 项目库",
    promise: "做得出",
    description: "客户主要工作的地方。五个成果关把第一个网页、AI 工具、真产品、第二产品和毕业作品串成单线。",
    items: ["5 个顺序推进的成果关", "45 个可展开学习小节", "3 选 1 的 AI 自用工具", "1 个多用户黄金项目", "1 个独立毕业作品"],
  },
  {
    index: "C",
    title: "AI Builder 教学 Agent",
    promise: "走得完",
    description: "不是普通问答机器人，而是项目分诊师、任务转换器、验收员和个人资产管理员。",
    items: ["需求分诊与红黄绿判断", "把大目标切成当前最薄版本", "把官方任务转换成个人任务", "卡住时定位层级与调用急救卡", "按证据验收并完成资产结算"],
  },
];

const officialTrack = [
  ["0", "第一个网页上互联网", "描述、生成、预览、部署，再亲手制造并修复错误", "公开链接 + 修复证据"],
  ["1", "每天会用的 AI 小工具", "任务卡、Agent 协作、模型调用、结构化输出与验收", "AI 工具 + 两张验收单"],
  ["2", "别人能注册的真产品", "需求、架构、数据库、登录、RLS、文件、安全与运营", "Production + 真实用户"],
  ["3", "一半时间做出第二个", "把代码、指挥方法和判断标准沉淀成 Starter Kit", "第二产品 + 时间对比"],
  ["4", "自己的毕业作品", "完整 Discovery、独立交付、案例页与面试叙事", "独立作品 + 证据链"],
];

const modes = [
  ["跟做模式", "没有明确选题时，跟随“灵感罐头”黄金项目走完五关，不需要自己设计学习路线。"],
  ["同构换题模式", "关卡 1 从三个 AI 小工具中选一，关卡 2 可换成打卡圈或反馈墙，但能力合同不变。"],
  ["独立毕业模式", "关卡 4 做自己的真实问题；教学 Agent 只提供范围切片、急救和统一 Boss 验收。"],
];

const systems = [
  ["急救室", "排错五步、20 张常见报错急救卡、卡死三选一和标准求助模板。", "✚"],
  ["军火库", "任务卡、项目四件套、7 张验收清单、10 条提示词与作品叙事模板。", "⌁"],
  ["词典室", "60+ 个零基础术语与 10 张认知卡，每个概念都有项目内验证点。", "Aa"],
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
          <span>Builder Delivery System</span>
        </a>
        <nav aria-label="主导航">
          <a href="#delivery">客户拿到什么</a>
          <a href="#track">官方项目轨道</a>
          <Link href="/learn">具体课程内容</Link>
          <a href="#templates">直接用模板</a>
        </nav>
        <Link className="header-cta" href="/learn">进入课程 ↗</Link>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="eyebrow">不是链接合集，是一套可以开始做产品的交付系统</div>
        <h1>
          从自己的真实需求出发。
          <span>把第一个 AI 产品真的做完。</span>
        </h1>
        <p className="hero-copy">
          知识库负责查得懂，项目库负责做得出，教学 Agent 负责走得完并沉淀下来。
          客户每一关都拿到产品版本、任务卡、Boss 战、证据和个人资产。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#delivery">查看客户完整交付</a>
          <Link className="button secondary" href="/learn">查看具体学什么</Link>
        </div>
        <div className="proof-strip">
          <span><strong>3</strong> 个产品模块</span>
          <span><strong>5</strong> 个成果关卡</span>
          <span><strong>45</strong> 个学习小节</span>
          <span><strong>3</strong> 个常驻房间</span>
        </div>
      </section>

      <section className="section promises-section">
        <div className="section-heading">
          <span className="section-index">01 / 产品承诺</span>
          <h2>用户买的不是知识，是三次跨越。</h2>
          <p>所有内容、工具和服务都必须回到“走完、敢上线、能重复”。</p>
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

      <section className="section delivery-section" id="delivery">
        <div className="section-heading split">
          <div>
            <span className="section-index">02 / 客户完整交付</span>
            <h2>不是给一堆资料，而是给三个能协同工作的产品模块。</h2>
          </div>
          <p>下面列出的就是客户实际使用的前台能力。外部课程和 Repo 只用于研发，不再冒充产品交付。</p>
        </div>
        <div className="module-grid">
          {productModules.map((module) => (
            <article className="module-card" key={module.title}>
              <div className="module-topline">
                <span>{module.index}</span>
                <strong>{module.promise}</strong>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="shared-layer">
          <div>
            <span>三个模块共享的个人底层</span>
            <h3>项目护照 + 通关证据 + Builder 资产库</h3>
          </div>
          <div className="shared-pills">
            <span>当前关卡与产品版本</span>
            <span>最后稳定基线</span>
            <span>Boss 战证据</span>
            <span>候选 / 稳定资产</span>
          </div>
        </div>
      </section>

      <section className="section track-section" id="track">
        <div className="track-intro">
          <div>
            <span className="section-index">03 / 五关完整主线</span>
            <h2>从第一个网页，到自己的毕业作品</h2>
            <p>每一关只增加当前成果真正需要的知识；学员沿一条路线连续做出 5 个可展示、可验收的结果。</p>
          </div>
          <div className="track-promise">
            <span>一期黄金项目</span>
            <p>“灵感罐头”用最小体积覆盖登录、数据库、文件、RLS、AI、安全、部署和真实用户，是零基础第一次上线真产品的完整训练场。</p>
          </div>
        </div>
        <div className="track-flow">
          <span>公开网页</span><i>→</i><span>AI 小工具</span><i>→</i><span>多用户真产品</span><i>→</i><span>第二产品</span><i>→</i><span>毕业作品</span>
        </div>
        <div className="track-version-list">
          {officialTrack.map(([number, title, description, result]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <strong>{result}</strong>
            </article>
          ))}
        </div>
        <div className="blueprint-grid">
          <article>
            <span>主线不是一套视频目录</span>
            <h3>每节都有真实动作</h3>
            <p>客户会看到“学什么、动手做、完成证据”，并能在浏览器里按关卡展开具体课程内容。</p>
          </article>
          <article>
            <span>一期与二期边界清楚</span>
            <h3>先会做，再看穿 Agent</h3>
            <p>五关主线已是可交付正文；白盒 Agent、Tool Loop、权限、Trace 和评测进入二期进阶包。</p>
          </article>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-heading split">
          <div>
            <span className="section-index">04 / 五个成果关</span>
            <h2>每一关都展开到课节、成品和验收标准。</h2>
          </div>
          <p>这里先看总览；进入课程页后，可以继续展开全部 45 个小节的学习目标、动手任务与完成证据。</p>
        </div>
        <JourneyTracker />
        <div className="journey-course-cta">
          <div>
            <span>课程正文已经上线</span>
            <h3>继续查看每一节具体学什么</h3>
          </div>
          <Link className="button primary" href="/learn">进入课程内容 →</Link>
        </div>
      </section>

      <section className="section template-section" id="templates">
        <div className="section-heading split">
          <div>
            <span className="section-index">05 / 可直接使用的交付物</span>
            <h2>不是只告诉客户“有模板”，模板正文就在这里。</h2>
          </div>
          <p>切换查看并复制课程标准版本。客户使用后形成个人版本，经过第二项目验证才能升级为稳定资产。</p>
        </div>
        <TemplateWorkbench />
      </section>

      <section className="section personal-section" id="personal">
        <div className="section-heading">
          <span className="section-index">06 / 个性化项目机制</span>
          <h2>统一能力合同，不统一产品题目。</h2>
          <p>官方项目负责示范，个人真实需求负责驱动；项目不同，但 Boss 战与证据质量相同。</p>
        </div>
        <div className="mode-grid">
          {modes.map(([title, copy], index) => (
            <article key={title}>
              <span>MODE {index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="triage-panel">
          <div>
            <span>需求导航站</span>
            <h3>教学 Agent 先分诊，再给下一步。</h3>
            <p>同一个大想法不会直接生成整套系统，而会被切成当前关卡能完成的最薄版本。</p>
          </div>
          <div className="traffic-list">
            <p className="green"><b>绿色</b>核心流程清晰，当前可以做</p>
            <p className="yellow"><b>黄色</b>需求成立，但需要切小</p>
            <p className="red"><b>红色</b>高风险或过度复杂，进入毕业候选池</p>
          </div>
        </div>
        <div className="contract-card">
          <span>关卡 2 统一能力合同示例</span>
          <p>明确用户 + 一条完整核心流程 + 用户状态 + 身份或权限边界 + 真实外部输入 + 改善核心流程的 AI 能力 + 公开部署 + 真实用户任务。</p>
        </div>
      </section>

      <section className="section rooms-section">
        <div className="section-heading">
          <span className="section-index">07 / 三个常驻房间</span>
          <h2>课程会结束，救援、证据和个人资产不会。</h2>
        </div>
        <div className="room-grid">
          {systems.map(([title, copy, icon]) => (
            <article className="room-card" key={title}>
              <span className="room-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section appendix-section" id="appendix">
        <details className="research-appendix">
          <summary>
            <div>
              <span>研发参考附录 · 非客户主体交付</span>
              <h2>查看 {projectCount} 个一手 Repo 研究地图</h2>
            </div>
            <b>展开 ↓</b>
          </summary>
          <p className="appendix-intro">
            这些来源用于验证架构、失败模式和项目选择。客户不需要离开本站才能理解课程，也不要求部署全部项目。
          </p>
          <ResourceExplorer />
        </details>
      </section>

      <section className="final-cta">
        <p>最终交付不是“看完多少链接”</p>
        <h2>而是产品、证据和个人工作系统都留在客户手里。</h2>
        <Link className="button primary" href="/learn">查看全部课程内容 →</Link>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>Builder Delivery System</span>
        </div>
        <p>关卡制交付版 · 五关主线 + 三个常驻房间</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
