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
    description: "客户主要工作的地方。官方轨道、能力实验与七类远征都被拆成可执行任务和 Boss 战。",
    items: ["1 个全局新手村", "1 条完整官方项目轨道", "3 个快速胜利小工具", "6 个 AI-Native 能力实验", "7 类产品远征 + 1 类深做"],
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
  ["1", "AI 研究简报", "一个问题 → 研究结构、待核验事实与下一步", "在线工具 + 5 组测试"],
  ["2", "多用户研究工作台", "来源、笔记、文件、报告版本与引用", "Production 产品 + 用户反馈"],
  ["3", "报告转汇报稿", "用 Starter Kit 制作核心流程不同的第二产品", "第二链接 + 时间对比"],
  ["4", "六次 AI-Native 升级", "RAG、Tool、MCP、多模态、Provider、Multi-agent", "六组实验与决策证据"],
  ["5", "七类产品远征", "七类都做最小实验，Deep Research 做深", "7 张证据卡 + 深度项目"],
  ["6", "可信赖公开 Beta", "Eval、攻击、成本、故障、回滚与 Incident", "Beta 链接 + 治理报告"],
  ["7", "独立行业变体", "把轨道改造成自己的真实工作或业务场景", "毕业作品 + 案例页"],
];

const modes = [
  ["跟做模式", "没有明确选题时，完整跟随官方“AI 研究到内容发布工作台”走完八关。"],
  ["改造模式", "保留官方能力合同和架构，替换用户、行业、资料与输出形式。"],
  ["自有项目模式", "做自己的产品；教学 Agent 负责范围切片、任务转换和统一 Boss 验收。"],
];

const systems = [
  ["急救室", "页面打不开、部署失败、模型无返回、权限异常——按症状保存证据、缩小变量、修复或回滚。", "✚"],
  ["军火库", "Spec、Task、QA、部署、安全、Eval、Incident、Prompt、Schema、Starter Kit 和 Skill。", "⌁"],
  ["词典室", "每个词条都回答：是什么、不是什么、在当前项目哪里出现、用错会发生什么。", "Aa"],
  ["证据库", "自动积累 URL、截图、Diff、Commit、Log、Trace、Eval、失败样例、反馈与决策卡。", "✓"],
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
          <a href="#journey">八关课程</a>
          <a href="#templates">直接用模板</a>
        </nav>
        <a className="header-cta" href="#delivery">打开交付包 ↗</a>
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
          <a className="button secondary" href="#templates">直接试用模板</a>
        </div>
        <div className="proof-strip">
          <span><strong>3</strong> 个产品模块</span>
          <span><strong>8</strong> 个成果关卡</span>
          <span><strong>1</strong> 条完整官方轨道</span>
          <span><strong>7</strong> 类产品远征</span>
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
            <span className="section-index">03 / 第一条完整官方轨道</span>
            <h2>AI 研究到内容发布工作台</h2>
            <p>输入一个真实问题，得到有来源、有反证、可继续编辑的研究成果，再把它转成汇报或发布内容。</p>
          </div>
          <div className="track-promise">
            <span>为什么先做它</span>
            <p>覆盖产品经理、创业者、咨询、市场、内容和研究人群；又能自然承载文件、引用、RAG、Browser Tool、MCP、Eval 与 Agent。</p>
          </div>
        </div>
        <div className="track-flow">
          <span>真实问题</span><i>→</i><span>可信资料</span><i>→</i><span>带引用报告</span><i>→</i><span>PPT / 内容卡</span><i>→</i><span>人工确认发布</span>
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
            <span>蓝图轨道 A · 强视觉传播</span>
            <h3>AI 房间改造</h3>
            <p>上传房间照片，生成改造方案与前后对比。用于快速胜利和多模态实验，不强行贯穿八关。</p>
          </article>
          <article>
            <span>蓝图轨道 B · 多媒体能力</span>
            <h3>AI 视频翻译与配音</h3>
            <p>从原视频到字幕、翻译、配音与成片。用于展示多模态、长任务与版权边界。</p>
          </article>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-heading split">
          <div>
            <span className="section-index">04 / 八个成果关</span>
            <h2>每一关都展开到课节、成品和验收标准。</h2>
          </div>
          <p>点击“展开本关完整交付内容”，看到客户真正学习什么、带走什么、怎样证明通过。</p>
        </div>
        <JourneyTracker />
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
          <span className="section-index">07 / 四个常驻系统</span>
          <h2>课程会结束，救援、证据和个人资产不会。</h2>
        </div>
        <div className="room-grid four">
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
        <a className="button primary" href="#delivery">重新查看完整交付 →</a>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark">AI</span>
          <span>Builder Delivery System</span>
        </div>
        <p>产品框架版本：2026-07-30 · 供团队评审</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
