import Link from "next/link";
import {actionGates} from "./product-plan-data";
import {SiteNav} from "./site-nav";

const deliveries = [
  {
    code: "01",
    title: "理论知识文档",
    promise: "让你真正理解",
    copy: "不是术语词典。每章从概念、因果、反例、取舍、系统位置一路讲到项目里的可观察证据。",
    includes: ["7 组固定知识章节", "五家官方一手资料", "理论与关卡双向索引", "持续更新知识入口"],
    href: "/knowledge",
  },
  {
    code: "02",
    title: "实战行动计划",
    promise: "让你真的做出来",
    copy: "五关从公开网页走到毕业产品。每关明确先学什么、用什么工具、为什么选它、具体动作和验收证据。",
    includes: ["5 个连续成果关", "45 个详细学习小节", "默认工具与替代方案", "Boss 战与证据合同"],
    href: "/action",
  },
  {
    code: "03",
    title: "个性化辅导 Agent",
    promise: "让路线适合你",
    copy: "先定位你的问题、用户和约束，再匹配技术栈、知识缺口与里程碑，陪你把自己的题目做完。",
    includes: ["需求分诊", "技术路线建议", "个人知识地图", "项目推进与复盘"],
    href: "/coach",
  },
];

export default function Home() {
  return (
    <main className="product-shell">
      <SiteNav active="home" />

      <section className="product-hero">
        <div className="product-hero-copy">
          <span className="section-index">AI BUILDER FIELD KIT</span>
          <h1>不是学会“聊 AI”。<br/><span>是把自己的产品做出来。</span></h1>
          <p>一套面向零基础 AI Builder 的产品交付系统：理论负责看懂，行动负责做出，个性化辅导负责把通用路线改造成你的路线。</p>
          <div className="hero-actions left">
            <Link className="button primary" href="/action">查看五关行动计划</Link>
            <Link className="button secondary" href="/knowledge">先看理论知识</Link>
          </div>
        </div>
        <div className="delivery-loop" aria-label="理论、行动与辅导的协同关系">
          <div><b>理论知识</b><span>解释原理与取舍</span></div>
          <i>→</i>
          <div><b>行动计划</b><span>把知识变成产品</span></div>
          <i>→</i>
          <div><b>辅导 Agent</b><span>适配个人问题</span></div>
          <strong>每完成一关，证据和问题会返回下一轮学习</strong>
        </div>
      </section>

      <section className="section delivery-products">
        <div className="section-heading split">
          <div>
            <span className="section-index">01 / 客户实际拿到什么</span>
            <h2>三个交付板块，不是三个互不相干的页面。</h2>
          </div>
          <p>同一个知识点会说明它服务哪一关；同一个实战步骤会告诉用户先学哪章；辅导结果会生成个人版路线。</p>
        </div>
        <div className="delivery-product-grid">
          {deliveries.map((item) => (
            <article key={item.code}>
              <div><span>{item.code}</span><b>{item.promise}</b></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul>{item.includes.map((value) => <li key={value}>{value}</li>)}</ul>
              <Link href={item.href}>打开这个交付板块 →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section mapping-demo">
        <div className="section-heading">
          <span className="section-index">02 / 理论与实战怎样对应</span>
          <h2>以第一关为例：不是只叫你“做一个网页”。</h2>
          <p>用户先建立一张软件世界地图，再把每个概念放到自己刚刚上线的网页里验证。</p>
        </div>
        <div className="mapping-table">
          <article className="mapping-head"><span>理论知识</span><span>实战动作</span><span>用户最后理解并拿到</span></article>
          {[
            ["网页由 HTML、CSS、JavaScript 构成", "生成个人介绍页，分别修改结构、样式和行为", "能指出每类代码控制页面的哪一部分"],
            ["浏览器、本地文件、服务器与网址", "本地预览，再发布到互联网", "能解释“我电脑能打开”和“别人能打开”的区别"],
            ["Git、GitHub 与部署平台", "保存版本、推送仓库、触发部署", "公开网址 + 代码仓库 + 可恢复版本"],
            ["报错、Console、404 与回滚", "主动制造三个故障并修复", "不再害怕报错，并留下完整修复证据"],
          ].map(([theory, action, result]) => (
            <article key={theory}><span>{theory}</span><span>{action}</span><span>{result}</span></article>
          ))}
        </div>
        <div className="mapping-cta">
          <div><b>同样的对应关系会贯穿五关</b><p>模型 API 对应 AI 小工具；数据库、登录与权限对应真实产品；资产化方法对应第二产品；Discovery 与架构判断对应毕业作品。</p></div>
          <Link className="button secondary" href="/action#g0">查看第一关完整工具与步骤</Link>
        </div>
      </section>

      <section className="section outcome-roadmap">
        <div className="section-heading split">
          <div>
            <span className="section-index">03 / 五个可验证结果</span>
            <h2>学习进度不用“看了多少课”衡量。</h2>
          </div>
          <p>每一关都以可访问产品、用户行为或可复查证据结束，下一关只增加新结果真正需要的复杂度。</p>
        </div>
        <div className="outcome-list">
          {actionGates.map((gate) => (
            <Link href={`/action#${gate.id}`} key={gate.id}>
              <b>{gate.number}</b><div><span>{gate.title}</span><small>{gate.outcome}</small></div><i>→</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="section service-boundary">
        <div>
          <span className="section-index">04 / 我们不承诺魔法</span>
          <h2>我们交付的是一套能让用户形成判断、行动和复用能力的系统。</h2>
        </div>
        <div className="boundary-grid">
          <article><b>不是</b><p>一堆外链、提示词和“照着敲”的步骤。</p></article>
          <article><b>而是</b><p>官方知识、具体项目、工具选择理由和验收证据组成的学习闭环。</p></article>
          <article><b>最终</b><p>用户不只拥有一个作品，还拥有做第二个、第三个产品的方法和个人资产。</p></article>
        </div>
      </section>

      <section className="product-final">
        <span>从一个人人都能用到的成果开始</span>
        <h2>今天先让你的名字，出现在互联网上。</h2>
        <div>
          <Link className="button primary" href="/action#g0">进入第一关</Link>
          <Link className="button secondary" href="/coach">生成我的个性化路线</Link>
        </div>
      </section>
    </main>
  );
}
