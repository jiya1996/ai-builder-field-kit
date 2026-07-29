"use client";

import { useEffect, useMemo, useState } from "react";
import { projectFamilies } from "./data";

const gates = [
  {id:"g0",number:"0",time:"半天 · 免费公开",title:"今天，让第一张网页出现在互联网上",deliverable:"一条真实可访问的链接",boss:"亲手制造一个错误、解释证据并修好",skills:"环境 / 文件 / 浏览器 / 首次发布"},
  {id:"g1",number:"1",time:"1 周 · 付费起点",title:"做一个你自己每天会用的 AI 小工具",deliverable:"三选一自用工具 + 使用记录",boss:"功能与 AI 两张验收单 + 一次故障演练",skills:"Codex 协作 / 模型调用 / 排错"},
  {id:"g2",number:"2",time:"2–3 周 · 黄金项目",title:"上线一个别人能注册使用的真产品",deliverable:"Production 链接 + 第一批真实用户",boss:"第二账号越权测试 + 回滚 + 真实反馈",skills:"架构 / 数据 / 登录 / RLS / 成本"},
  {id:"g3",number:"3",time:"1 周 · 资产化",title:"用一半时间做出第二个",deliverable:"第二款产品 + 两次耗时对比",boss:"Starter Kit 在全新环境从零跑通",skills:"模板 / SOP / Skill / 发布清单"},
  {id:"g4",number:"4",time:"2 周 · 毕业作品",title:"用自己的选题完成独立作品",deliverable:"作品 + 案例页 + 面试叙事包",boss:"陌生人按 README 跑通 + 完整需求验证",skills:"Discovery / 独立决策 / 作品集"},
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
          </article>
        ))}
      </div>
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
