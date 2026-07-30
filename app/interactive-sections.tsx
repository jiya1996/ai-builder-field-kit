"use client";

import { useEffect, useMemo, useState } from "react";
import { projectFamilies } from "./data";

const gates = [
  {
    id:"g0",number:"0",time:"半天 · 全局新手村",title:"让第一个网页出现在互联网上",
    deliverable:"公开 URL + 修改前后证据",boss:"制造错误、定位层级、修复或回滚、重新发布",skills:"项目 / 浏览器 / 终端 / Git / 部署",
    lessons:["打开正确项目，让 Agent 先读再改","完成一个肉眼可见的小修改","区分本地、预览与生产","保存 Git Commit 与稳定基线","制造并恢复一个真实错误"],
    assets:["《安装成功证据单》","《软件运行地图》","《第一次修改任务卡》","《错误与修复记录》"],
    acceptance:["任何人能打开公开 URL","能展示修改前后差异","有一个可恢复 Commit","能说明错误发生在哪一层"],
  },
  {
    id:"g1",number:"1",time:"3–7 天 · 快速胜利",title:"做一个自己每天会用的 AI 研究简报",
    deliverable:"在线研究简报工具 + 5 组测试结果",boss:"超时、错误格式或空结果故障演练",skills:"表单 / API / 模型边界 / Structured Output",
    lessons:["把主题变成研究问题与输出结构","建立加载、成功与失败状态","在服务端安全调用模型","用 Schema 固定报告结构","记录延迟、成本与失败样例"],
    assets:["《AI 研究简报任务卡》","《模型输入输出记录》","《功能验收单》","《AI 输出验收单》","《成本与延迟记录》"],
    acceptance:["工具可被反复使用","至少 5 组输入有记录","错误输出不会直接展示为正确结果","密钥没有进入浏览器"],
  },
  {
    id:"g2",number:"2",time:"2–3 周 · 黄金项目 V1",title:"上线多用户研究到内容发布工作台",
    deliverable:"Production 工作台 + 第一批真实用户",boss:"第二账号越权测试 + 故障发布回滚 + 用户反馈",skills:"Spec / CRUD / Auth / RLS / 文件 / 引用",
    lessons:["完成问题证据、Spec 与 Non-goal","建立研究项目、来源、笔记和报告版本","完成注册登录与个人研究空间","上传资料并生成第一版带引用报告","加入自动检查、日志与生产部署","邀请真实用户完成一次研究任务"],
    assets:["《一页 Product Spec》","《数据流与信任边界图》","《权限矩阵》","《全栈验收报告》","《回滚记录》","《首位用户反馈》"],
    acceptance:["新用户能独立完成核心流程","账号 B 不能读取账号 A 的研究资料","每个引用能回到来源","一次故障后能恢复稳定版本"],
  },
  {
    id:"g3",number:"3",time:"1 周 · Starter Kit v1",title:"用一半时间做出“报告转汇报稿”",
    deliverable:"第二产品 + 时间与错误对比图",boss:"全新环境启动 Starter Kit，删除一个伪通用资产",skills:"抽象 / SOP / Skill / 复用测量",
    lessons:["区分通用底座与项目特例","提炼登录、数据、AI 与错误处理骨架","建立 Spec、Task、QA 和部署模板","制作报告转汇报稿或内容卡第二产品","记录时间、错误与人工干预次数"],
    assets:["《Starter Kit v1》","《项目启动 SOP》","《可复用/不可复用清单》","《两次开发对比图》","第一批个人 Skill"],
    acceptance:["Starter Kit 在空目录启动成功","第二产品核心流程不同","明确删除至少一个错误抽象","复用收益有时间和错误证据"],
  },
  {
    id:"g4",number:"4",time:"4–6 周 · AI-Native 升级季",title:"让产品能理解资料、执行动作并扩展",
    deliverable:"黄金项目 V2–V6 + 六次能力实验",boss:"每次升级都必须通过失败测试与采用/不采用决策",skills:"RAG / Tool / MCP / 多模态 / Provider / Multi-agent",
    lessons:["4A 私有资料 RAG、引用与无答案","4B 受控 Tool Loop、权限与 Trace","4C 最小 MCP Server/Client","4D 多模态或移动 Companion","4E 云端/本地模型同题比较","4F 单 Agent/多 Agent 对照"],
    assets:["《Golden Dataset》","《Permission Table》","《完整 Run Trace》","《MCP 能力清单》","《Provider 对比表》","《单/多 Agent 决策卡》"],
    acceptance:["RAG 无依据时拒绝编造","越权工具动作被 Runtime 拒绝","每个 Call 都能找到 Result","高级能力只在有证据时进入正式产品"],
  },
  {
    id:"g5",number:"5",time:"2–4 周 · 产品远征",title:"完成七类 AI 产品任务，并选择一类深做",
    deliverable:"7 张证据卡 + 1 个深度项目",boss:"面对新任务选择正确形态、架构和失败指标",skills:"Research / Data / Browser / Coding / Personal / Knowledge / Workflow",
    lessons:["Deep Research：来源、冲突与反证","Data Agent：计算、Schema 与验证","Browser Agent：页面状态、动作与恢复","Coding Agent：Repo、Diff、Test 与权限","Personal Agent：记忆、隐私与主动性","Knowledge Agent：解析、检索、引用与更新","Workflow：确定步骤、幂等、重试与审批"],
    assets:["7 份架构决策卡","7 份运行或回放记录","7 次关键失败记录","1 个个人方向深度项目"],
    acceptance:["七类都完成最小真实实验","每类都有一次失败证据","能说明何时 Workflow 优于 Agent","深做方向与个人目标一致"],
  },
  {
    id:"g6",number:"6",time:"1–2 周 · 公开 Beta",title:"把一个 AI 产品打磨到敢公开",
    deliverable:"可信赖公开 Beta + 真实用户反馈",boss:"回归、攻击、故障、成本阈值、Kill Switch 与 Incident 六连测",skills:"Eval / Trace / Red Team / 成本 / Incident",
    lessons:["建立 Golden Dataset 与失败分类","区分传统 Test 与 AI Eval","记录 Trace、延迟、Token 和成本","执行 Prompt Injection 与越权攻击","设置 Canary、Kill Switch 和回滚","完成一次 Incident 演练与复盘"],
    assets:["《Eval Report》","《Red Team 记录》","《成本预算与阈值》","《Incident Runbook》","《公开 Beta 反馈报告》"],
    acceptance:["AI 变更有回归评测","攻击和越权有明确阻断","成本越界能触发停止","一次事故可定位、恢复和复盘"],
  },
  {
    id:"g7",number:"7",time:"2–3 周 · 独立毕业",title:"把真实问题做成公开案例",
    deliverable:"独立产品 + 作品案例页 + Starter Kit v2",boss:"陌生人按 README 使用，目标用户完成核心流程",skills:"Discovery / 独立决策 / 作品集 / 资产化",
    lessons:["完成访谈、替代方案与假设分级","定义 MVP、Non-goal 与成功指标","独立完成架构、实现、Eval 与安全","收集反馈并完成一次迭代","写 README、案例页与求职/收入叙事","升级 RAG、Tool、Eval 与安全能力包"],
    assets:["《完整 Discovery 记录》","《独立决策日志》","《毕业验收报告》","《作品集案例页》","《Starter Kit v2》","《个人 Builder 资产库》"],
    acceptance:["项目来自自己的真实问题","陌生人只看说明即可使用","能解释三个不做的决定","所有完成声明都有证据"],
  },
];

export function JourneyTracker() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const saved = window.localStorage.getItem("ai-builder-gates");
    if (saved) setDone(JSON.parse(saved));
  }, []);
  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((item) => item !== id) : [...done, id];
    setDone(next);
    window.localStorage.setItem("ai-builder-gates", JSON.stringify(next));
  };

  return (
    <div className="journey-wrap">
      <div className="journey-progress">
        <span>你的证据进度</span>
        <strong>{done.length} / {gates.length}</strong>
        <div><i style={{width:`${(done.length / gates.length) * 100}%`}} /></div>
      </div>
      <div className="gate-list">
        {gates.map((gate) => (
          <article className={`gate-card ${done.includes(gate.id) ? "is-done" : ""}`} key={gate.id}>
            <button onClick={() => toggle(gate.id)} aria-label={`标记${gate.title}完成`}>
              {done.includes(gate.id) ? "✓" : gate.number}
            </button>
            <div className="gate-main">
              <span>{gate.time}</span>
              <h3>{gate.title}</h3>
              <p>{gate.skills}</p>
            </div>
            <div className="gate-evidence">
              <p><b>可晒产物</b>{gate.deliverable}</p>
              <p><b>Boss 战</b>{gate.boss}</p>
            </div>
            <details className="gate-details">
              <summary>展开本关完整交付内容</summary>
              <div className="gate-detail-grid">
                <div>
                  <h4>客户学习的课节</h4>
                  <ol>{gate.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ol>
                </div>
                <div>
                  <h4>客户带走的成品</h4>
                  <ul>{gate.assets.map((asset) => <li key={asset}>{asset}</li>)}</ul>
                </div>
                <div>
                  <h4>过关验收标准</h4>
                  <ul className="check-list">{gate.acceptance.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </details>
          </article>
        ))}
      </div>
    </div>
  );
}

const templates = [
  {
    id:"intake",
    tag:"分诊",
    title:"个人需求导航卡",
    description:"让教学 Agent 判断当前能做、需要切小，还是应该放入毕业候选池。",
    content:[
      "真实场景：我在什么时候反复遇到这个问题？",
      "现有替代：我现在怎样解决，最痛苦的是哪一步？",
      "输入与输出：手里有什么，希望最后得到什么？",
      "使用者：谁会用，多久使用一次？",
      "外部依赖：需要哪些账号、平台或真实动作？",
      "风险：是否涉及隐私、金钱、健康或不可逆操作？",
      "AI 必要性：不用 AI 能不能完成？",
    ],
  },
  {
    id:"spec",
    tag:"需求",
    title:"一页产品规格",
    description:"把模糊想法压成 AI 可以执行、你可以验收的一页纸。",
    content:[
      "目标用户：谁在什么场景下遇到问题？",
      "现有替代：他现在用什么办法解决？",
      "核心流程：输入 → 处理 → 输出。",
      "第一版必须做：只写 3 项。",
      "明确不做：至少写 3 项。",
      "成功证据：用户完成什么动作才算有价值？",
      "失败条件：出现什么情况必须停止上线？",
    ],
  },
  {
    id:"passport",
    tag:"状态",
    title:"个人项目护照",
    description:"让课程、项目库与教学 Agent 始终知道你正在做什么、下一步是什么。",
    content:[
      "用户与问题 / 当前替代方案。",
      "当前关卡 / 当前产品版本。",
      "本关范围 / Non-goal。",
      "输入、输出、数据与权限。",
      "最后一个稳定版本。",
      "已提交证据 / 未通过验收项。",
      "关键技术决策 / 下一步最小任务。",
    ],
  },
  {
    id:"task",
    tag:"协作",
    title:"Codex 任务卡",
    description:"控制任务范围，让 Agent 的修改可看、可查、可撤销。",
    content:[
      "目标：本轮只交付一个可验证结果。",
      "现状：相关页面、文件与已知限制。",
      "允许修改：明确目录或模块。",
      "禁止修改：数据、权限、依赖或非目标。",
      "验收：正常路径、边界情况、失败路径。",
      "完成后：列出改动、检查结果与仍未完成事项。",
    ],
  },
  {
    id:"debug",
    tag:"排错",
    title:"卡死自救单",
    description:"卡住时不乱试，先固定现场，再缩小变量。",
    content:[
      "1. 停止连续修改，复制完整报错。",
      "2. 记录刚才做了什么、预期什么、实际什么。",
      "3. 确认错误来自浏览器、终端、服务端还是数据库。",
      "4. 回到最后一次可工作的状态做对照。",
      "5. 每次只改一个变量并重新验证。",
      "6. 求助时附：复现步骤、完整日志、已尝试动作。",
    ],
  },
  {
    id:"launch",
    tag:"上线",
    title:"生产发布清单",
    description:"避免“预览能跑”被误当成“产品已经上线”。",
    content:[
      "构建与自动检查全部通过。",
      "生产环境变量已配置，密钥未进入前端。",
      "无痕窗口完成注册、登录和核心流程。",
      "第二账号完成越权测试。",
      "错误、空状态、超时和额度用尽可恢复。",
      "已记录当前稳定版本与回滚步骤。",
      "日志、成本上限和反馈入口可用。",
    ],
  },
  {
    id:"evidence",
    tag:"验收",
    title:"Boss 战证据单",
    description:"用证据判定 PASS、PARTIAL 或 FAIL，不用鼓励性语言代替验收。",
    content:[
      "本关能力合同：必须证明什么？",
      "运行证据：URL、截图、视频或可复查回放。",
      "工程证据：Diff、Commit、Test、Log 或 Trace。",
      "失败证据：故意制造了什么问题？",
      "恢复证据：怎样修复、回滚或停止？",
      "判断结果：PASS / PARTIAL / FAIL / 证据不足。",
      "进入下一关前仍需补什么？",
    ],
  },
  {
    id:"assets",
    tag:"复用",
    title:"关卡资产结算单",
    description:"把散落经验变成候选资产，并阻止未经验证的做法进入 Starter Kit。",
    content:[
      "重复操作：是否形成 SOP？",
      "重复结构：是否进入 Starter Kit？",
      "重复要求：是否升级 Spec / Task 模板？",
      "重复缺陷：是否加入 QA 或安全清单？",
      "稳定指令：是否成为候选 Skill？",
      "适用与不适用范围分别是什么？",
      "状态：项目笔记 / 候选资产 / 跨项目验证后的稳定资产。",
    ],
  },
  {
    id:"case",
    tag:"作品集",
    title:"作品案例页",
    description:"把“我做了一个项目”变成有证据的产品叙事。",
    content:[
      "问题：为谁解决了什么高频问题？",
      "范围：为什么第一版只做这些？",
      "取舍：架构、安全、成本各做了什么决定？",
      "证据：链接、截图、测试、用户反馈与迭代记录。",
      "失败：遇到什么问题，如何定位与恢复？",
      "复用：哪些资产进入 Starter Kit？",
      "下一步：基于真实反馈，而不是凭感觉增加什么？",
    ],
  },
];

export function TemplateWorkbench() {
  const [active, setActive] = useState(templates[0].id);
  const [copied, setCopied] = useState(false);
  const selected = templates.find((template) => template.id === active) ?? templates[0];

  const copyTemplate = async () => {
    await navigator.clipboard.writeText(`${selected.title}\n\n${selected.content.join("\n")}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="template-workbench">
      <div className="template-tabs" role="tablist" aria-label="交付模板">
        {templates.map((template) => (
          <button
            role="tab"
            aria-selected={active === template.id}
            className={active === template.id ? "active" : ""}
            onClick={() => { setActive(template.id); setCopied(false); }}
            key={template.id}
          >
            <span>{template.tag}</span>
            {template.title}
          </button>
        ))}
      </div>
      <article className="template-sheet">
        <div className="template-sheet-head">
          <div>
            <span>{selected.tag}模板 · 可直接使用</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
          </div>
          <button onClick={copyTemplate}>{copied ? "已复制 ✓" : "复制模板"}</button>
        </div>
        <div className="template-paper">
          {selected.content.map((line, index) => (
            <p key={line}><b>{String(index + 1).padStart(2,"0")}</b>{line}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export function ResourceExplorer() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const projects = useMemo(() => projectFamilies.flatMap((family) =>
    family.projects.map((project) => ({...project, family: family.name, icon: family.icon}))
  ).filter((project) =>
    (active === "all" || project.family === active) &&
    `${project.name}${project.note}${project.family}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);

  return (
    <div className="explorer">
      <div className="explorer-controls">
        <div className="family-tabs" role="tablist" aria-label="项目类别">
          <button className={active === "all" ? "active" : ""} onClick={() => setActive("all")}>全部 33</button>
          {projectFamilies.map((family) => (
            <button className={active === family.name ? "active" : ""} onClick={() => setActive(family.name)} key={family.id}>
              {family.icon} {family.name}
            </button>
          ))}
        </div>
        <label className="search-box">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索项目或能力…" />
        </label>
      </div>
      {active !== "all" && (
        <div className="family-question">
          {projectFamilies.find((family) => family.name === active)?.question}
        </div>
      )}
      <div className="project-grid">
        {projects.map((project) => (
          <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.href}>
            <div><span className="project-icon">{project.icon}</span><span className="depth">{project.depth}</span></div>
            <h3>{project.name}<span>↗</span></h3>
            <p>{project.note}</p>
            <small>{project.family}</small>
          </a>
        ))}
      </div>
      {!projects.length && <p className="empty-state">没有匹配项目，换一个关键词试试。</p>}
    </div>
  );
}
