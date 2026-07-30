"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {learningLayers, learningStages} from "./stage-data";

type WorkbenchView = "theory" | "practice" | "evidence";

const viewLabels: Record<WorkbenchView, string> = {
  theory: "理解",
  practice: "实战",
  evidence: "验收",
};

const storageKeys = {
  completed: "ai-builder-completed-stages",
  checks: "ai-builder-practice-checks",
  lastStage: "ai-builder-last-stage",
};

function readStoredArray(key: string) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readStoredChecks() {
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKeys.checks) ?? "{}");
    return value && typeof value === "object" ? value as Record<string, number[]> : {};
  } catch {
    return {};
  }
}

export function LearningWorkbench({
  initialView = "theory",
  initialStage = "s00",
}: {
  initialView?: WorkbenchView;
  initialStage?: string;
}) {
  const [stageId, setStageId] = useState(initialStage);
  const [view, setView] = useState<WorkbenchView>(initialView);
  const [completed, setCompleted] = useState<string[]>([]);
  const [practiceChecks, setPracticeChecks] = useState<Record<string, number[]>>({});
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentQuestion, setAgentQuestion] = useState("");
  const [agentPrompt, setAgentPrompt] = useState("先定位你现在最该解决的问题。");
  const [agentReply, setAgentReply] = useState("");
  const [copyLabel, setCopyLabel] = useState("复制本阶段任务提示词");

  const stage = useMemo(
    () => learningStages.find((item) => item.id === stageId) ?? learningStages[0],
    [stageId],
  );

  const stageIndex = learningStages.findIndex((item) => item.id === stage.id);
  const checkedSteps = practiceChecks[stage.id] ?? [];
  const progress = Math.round((completed.length / learningStages.length) * 100);

  useEffect(() => {
    const applyLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedStage = params.get("stage");
      const requestedView = params.get("view") as WorkbenchView | null;
      const storedStage = window.localStorage.getItem(storageKeys.lastStage);

      if (requestedStage && learningStages.some((item) => item.id === requestedStage)) {
        setStageId(requestedStage);
      } else if (storedStage && learningStages.some((item) => item.id === storedStage)) {
        setStageId(storedStage);
      }
      if (requestedView && requestedView in viewLabels) setView(requestedView);
      if (params.get("agent") === "1") setAgentOpen(true);
    };

    applyLocation();
    setCompleted(readStoredArray(storageKeys.completed));
    setPracticeChecks(readStoredChecks());
    window.addEventListener("popstate", applyLocation);
    return () => window.removeEventListener("popstate", applyLocation);
  }, []);

  useEffect(() => {
    setAgentPrompt("先定位你现在最该解决的问题。");
    setAgentReply("");
    setAgentQuestion("");
    setCopyLabel("复制本阶段任务提示词");
    window.localStorage.setItem(storageKeys.lastStage, stage.id);
  }, [stage.id]);

  function changeLocation(nextStage: string, nextView: WorkbenchView) {
    setStageId(nextStage);
    setView(nextView);
    const params = new URLSearchParams();
    params.set("stage", nextStage);
    params.set("view", nextView);
    window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  }

  function togglePracticeStep(index: number) {
    const current = practiceChecks[stage.id] ?? [];
    const next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
    const updated = {...practiceChecks, [stage.id]: next};
    setPracticeChecks(updated);
    window.localStorage.setItem(storageKeys.checks, JSON.stringify(updated));
  }

  function toggleCompleted() {
    const updated = completed.includes(stage.id)
      ? completed.filter((item) => item !== stage.id)
      : [...completed, stage.id];
    setCompleted(updated);
    window.localStorage.setItem(storageKeys.completed, JSON.stringify(updated));
  }

  function askAgent(prompt: string) {
    setAgentPrompt(prompt);
    if (prompt.includes("解释") || prompt.includes("区别")) {
      setAgentReply(`${stage.question}\n\n${stage.theory[0].body}\n\n你需要能做到：${stage.mastery[0]}。`);
    } else if (prompt.includes("检查") || prompt.includes("证据")) {
      setAgentReply(`先不要用“已经做完”作为结论。请逐项准备：${stage.evidence.slice(0, 4).join("、")}。\n\nBoss 验收：${stage.boss}`);
    } else if (prompt.includes("下一步") || prompt.includes("任务")) {
      setAgentReply(`${stage.agent.nextStep}\n\n完成后，把结果和遇到的第一条异常带回来，我会继续判断你该补理论、修任务，还是进入验收。`);
    } else {
      setAgentReply(`${stage.agent.diagnosis}\n\n建议下一步：${stage.agent.nextStep}`);
    }
  }

  function submitAgentQuestion() {
    const question = agentQuestion.trim();
    if (!question) return;
    askAgent(question);
  }

  async function copyTaskPrompt() {
    const prompt = [
      `我正在学习 ${stage.code} ${stage.title}。`,
      `本阶段项目：${stage.project}`,
      `请只帮助我完成下一步：${stage.steps[Math.min(checkedSteps.length, stage.steps.length - 1)]}`,
      `不要替我宣布完成。完成后请给出需要检查的文件、运行结果和证据。`,
      `本阶段验收：${stage.boss}`,
    ].join("\n");
    await navigator.clipboard.writeText(prompt);
    setCopyLabel("已复制");
    window.setTimeout(() => setCopyLabel("复制本阶段任务提示词"), 1600);
  }

  return (
    <main className="studio-shell">
      <header className="studio-header">
        <Link className="studio-brand" href="/" aria-label="返回首页">
          <span>AI</span>
          <b>Builder Field Kit</b>
        </Link>
        <div className="studio-current">
          <small>当前阶段</small>
          <strong>{stage.code} · {stage.title}</strong>
        </div>
        <div className="studio-progress" aria-label={`总体进度 ${progress}%`}>
          <span><i style={{width: `${progress}%`}} /></span>
          <b>{progress}%</b>
        </div>
        <button className="studio-agent-toggle" type="button" onClick={() => setAgentOpen((value) => !value)}>
          {agentOpen ? "关闭辅导" : "打开辅导 Agent"}
        </button>
      </header>

      <div className={`studio-grid ${agentOpen ? "agent-is-open" : ""}`}>
        <aside className="studio-rail" aria-label="S00 到 S10 学习主线">
          <div className="rail-intro">
            <span>唯一学习主线</span>
            <h2>S00–S10</h2>
            <p>理论形成判断，实战产生证据，Agent 根据当前阶段提供辅导。</p>
          </div>
          {learningLayers.map((layer) => (
            <section className="rail-layer" key={layer.label}>
              <div><b>{layer.label}</b><span>{layer.range}</span></div>
              <p>{layer.title}</p>
              {learningStages.filter((item) => item.layer.startsWith(layer.label)).map((item) => (
                <button
                  className={`${item.id === stage.id ? "is-active" : ""} ${completed.includes(item.id) ? "is-complete" : ""}`}
                  type="button"
                  onClick={() => changeLocation(item.id, view)}
                  key={item.id}
                >
                  <b>{item.code}</b>
                  <span>{item.title}</span>
                  <i>{completed.includes(item.id) ? "✓" : ""}</i>
                </button>
              ))}
            </section>
          ))}
          <Link className="rail-home" href="/">← 返回产品首页</Link>
        </aside>

        <section className="studio-main">
          <div className="stage-breadcrumb">
            <span>{stage.layer}</span>
            <b>{stageIndex + 1} / {learningStages.length}</b>
          </div>

          <section className="stage-hero">
            <div>
              <span>{stage.code}</span>
              <h1>{stage.title}</h1>
              <p>{stage.question}</p>
            </div>
            <dl>
              <div><dt>理论学习</dt><dd>{stage.theoryTime}</dd></div>
              <div><dt>实战周期</dt><dd>{stage.practiceTime}</dd></div>
            </dl>
          </section>

          <section className="stage-contract" aria-label="本阶段输入输出">
            <article><span>输入什么</span><p>{stage.input}</p></article>
            <article><span>输出什么</span><p>{stage.output}</p></article>
            <article><span>学会什么</span><p>{stage.learn}</p></article>
          </section>

          <nav className="stage-tabs" aria-label="阶段学习内容">
            {(Object.keys(viewLabels) as WorkbenchView[]).map((item) => (
              <button
                className={view === item ? "is-active" : ""}
                type="button"
                onClick={() => changeLocation(stage.id, item)}
                key={item}
              >
                <span>{item === "theory" ? "01" : item === "practice" ? "02" : "03"}</span>
                <b>{viewLabels[item]}</b>
                <small>{item === "theory" ? "形成判断" : item === "practice" ? "完成项目" : "提交证据"}</small>
              </button>
            ))}
          </nav>

          {view === "theory" && (
            <div className="stage-view theory-view">
              <div className="view-heading">
                <div><span>KNOWLEDGE</span><h2>不是记名词，而是理解系统因果。</h2></div>
                <p>本阶段只学习马上会在项目中使用和验证的知识。</p>
              </div>
              <div className="concept-list">
                {stage.concepts.map((concept) => <span key={concept}>{concept}</span>)}
              </div>
              <div className="theory-blocks">
                {stage.theory.map((item, index) => (
                  <article key={item.title}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  </article>
                ))}
              </div>
              <div className="mastery-grid">
                <article>
                  <span>学完必须掌握</span>
                  <ul>{stage.mastery.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article>
                  <span>理解检查</span>
                  <p>{stage.check}</p>
                  <button type="button" onClick={() => askAgent("请检查我是否真正理解，并追问我。")}>让 Agent 追问我 →</button>
                </article>
              </div>
              <div className="source-row">
                <span>一手来源</span>
                <div>{stage.sources.map((source) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label} ↗</a>)}</div>
              </div>
              <button className="view-next" type="button" onClick={() => changeLocation(stage.id, "practice")}>理解后进入同阶段实战 →</button>
            </div>
          )}

          {view === "practice" && (
            <div className="stage-view practice-view">
              <div className="view-heading">
                <div><span>BUILD</span><h2>{stage.project}</h2></div>
                <p>每完成一步，都要留下可检查的结果。</p>
              </div>
              <div className="stack-card">
                <span>默认工具与选择理由</span>
                <h3>{stage.stack}</h3>
                <p>{stage.stackReason}</p>
              </div>
              <div className="practice-steps">
                {stage.steps.map((step, index) => {
                  const isChecked = checkedSteps.includes(index);
                  return (
                    <button className={isChecked ? "is-checked" : ""} type="button" onClick={() => togglePracticeStep(index)} key={step}>
                      <i>{isChecked ? "✓" : index + 1}</i>
                      <span>{step}</span>
                      <small>{isChecked ? "已记录" : "完成后勾选"}</small>
                    </button>
                  );
                })}
              </div>
              <div className="practice-actions">
                <button type="button" onClick={copyTaskPrompt}>{copyLabel}</button>
                <button type="button" onClick={() => askAgent("告诉我当前下一步任务")}>让 Agent 判断下一步</button>
              </div>
              <button className="view-next" type="button" onClick={() => changeLocation(stage.id, "evidence")}>去整理本阶段完成证据 →</button>
            </div>
          )}

          {view === "evidence" && (
            <div className="stage-view evidence-view">
              <div className="view-heading">
                <div><span>EVIDENCE</span><h2>不是“做过了”，而是证据已经产生。</h2></div>
                <p>理论检查与实战证据同时通过，阶段才算完成。</p>
              </div>
              <div className="evidence-list">
                {stage.evidence.map((item, index) => (
                  <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></article>
                ))}
              </div>
              <div className="boss-card">
                <span>BOSS 验收</span>
                <h3>{stage.boss}</h3>
                <button type="button" onClick={() => askAgent("检查我的证据是否完整")}>让 Agent 检查证据 →</button>
              </div>
              <button className={`complete-stage ${completed.includes(stage.id) ? "is-complete" : ""}`} type="button" onClick={toggleCompleted}>
                {completed.includes(stage.id) ? `${stage.code} 已标记完成 ✓` : `标记 ${stage.code} 已完成`}
              </button>
              {stageIndex < learningStages.length - 1 && (
                <button className="view-next" type="button" onClick={() => changeLocation(learningStages[stageIndex + 1].id, "theory")}>
                  进入 {learningStages[stageIndex + 1].code} 理论 →
                </button>
              )}
            </div>
          )}
        </section>

        <aside className="studio-agent" aria-label="个性化辅导 Agent">
          <div className="agent-head">
            <div><span>个性化辅导 Agent</span><b>已读取 {stage.code} 上下文</b></div>
            <button type="button" onClick={() => setAgentOpen(false)} aria-label="关闭辅导 Agent">×</button>
          </div>
          <div className="agent-context">
            <span>当前辅导目标</span>
            <p>{stage.agent.focus}</p>
          </div>
          <div className="agent-quick">
            <span>你现在可以问</span>
            {[...stage.agent.prompts, "告诉我当前下一步任务"].map((prompt) => (
              <button type="button" onClick={() => askAgent(prompt)} key={prompt}>{prompt}</button>
            ))}
          </div>
          <div className="agent-conversation" aria-live="polite">
            <span>{agentPrompt}</span>
            <p>{agentReply || stage.agent.diagnosis}</p>
            {!agentReply && <b>建议下一步：{stage.agent.nextStep}</b>}
          </div>
          <div className="agent-input">
            <label htmlFor="agent-question">描述你的具体卡点</label>
            <textarea
              id="agent-question"
              value={agentQuestion}
              onChange={(event) => setAgentQuestion(event.target.value)}
              placeholder={`例如：我在 ${stage.code} 的哪一步卡住了……`}
            />
            <button type="button" onClick={submitAgentQuestion}>根据当前阶段给建议</button>
          </div>
          <small className="agent-boundary">当前版本根据课程规则生成阶段化建议；不会读取你的代码，也不会替你宣布任务已经完成。</small>
        </aside>
      </div>
    </main>
  );
}
