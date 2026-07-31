"use client";

import { useEffect, useMemo, useState } from "react";
import {copyText} from "./copy-text";
import { courseGates } from "./course-data";
import { projectFamilies } from "./data";

const gates = courseGates.map((gate) => ({
  id: gate.id,
  number: gate.number,
  time: `${gate.duration} · ${gate.kicker}`,
  title: gate.title,
  deliverable: gate.outcome,
  boss: gate.boss,
  skills: gate.skills,
  lessons: gate.lessons.map((lesson) => `${lesson.code} ${lesson.title}`),
  assets: gate.assets,
  acceptance: gate.acceptance,
}));

export function JourneyTracker() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("ai-builder-gates");
      if (saved) setDone(JSON.parse(saved));
    });
    return () => window.cancelAnimationFrame(frame);
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
    setCopied(await copyText(`${selected.title}\n\n${selected.content.join("\n")}`));
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
