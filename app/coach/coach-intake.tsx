"use client";

import Link from "next/link";
import {useMemo, useState} from "react";
import {copyText} from "../copy-text";

type Choice = {value: string; label: string; hint: string};

const productChoices: Choice[] = [
  {value: "site", label: "个人网页 / 内容站", hint: "先获得公开链接"},
  {value: "tool", label: "自己每天用的小工具", hint: "单用户、明确输入输出"},
  {value: "product", label: "别人能注册的产品", hint: "账号、数据与权限"},
  {value: "knowledge", label: "知识 / 搜索 Agent", hint: "资料、检索与引用"},
  {value: "automation", label: "自动化工作流", hint: "连接多个工具执行任务"},
];

const experienceChoices: Choice[] = [
  {value: "zero", label: "完全零基础", hint: "从网页与软件地图开始"},
  {value: "basic", label: "改过网页或脚本", hint: "可以从 AI 小工具开始"},
  {value: "shipped", label: "上线过产品", hint: "重点补系统与可靠性"},
];

function pickStack(product: string) {
  if (product === "site") return "HTML / CSS / JavaScript + GitHub + Vercel";
  if (product === "tool") return "Next.js + TypeScript + 模型 API + Vercel";
  if (product === "product") return "Next.js + TypeScript + Supabase + 模型 API + Vercel";
  if (product === "knowledge") return "Next.js + 模型 API + Search / RAG + Supabase + Vercel";
  return "先画固定工作流；再按连接对象选择 API / MCP / 定时任务与运行平台";
}

function pickKnowledge(product: string) {
  if (product === "site") return ["K0 网页与软件世界地基", "部署与故障恢复"];
  if (product === "tool") return ["K1 AI 应用最小组成", "K3 Agent 入门", "K5 AI 验收"];
  if (product === "product") return ["K2 全栈产品器官", "认证与 RLS", "K5 安全、成本与评测"];
  if (product === "knowledge") return ["K4 搜索、上下文与 RAG", "K3 Agent Loop", "K5 引用与评测"];
  return ["Workflow vs Agent", "Tool / Permission / Runtime", "状态、重试与人工审批"];
}

function pickStartGate(product: string, experience: string) {
  if (experience === "zero") return "关卡 0：先完成一个公开网页，建立软件世界地图";
  if (product === "site") return "关卡 0：直接定义并上线网页";
  if (product === "tool") return "关卡 1：先做不带 AI 的产品壳";
  return "关卡 2 前置评审：先缩小核心流程和信任边界";
}

export function CoachIntake() {
  const [problem, setProblem] = useState("");
  const [product, setProduct] = useState("tool");
  const [experience, setExperience] = useState("zero");
  const [audience, setAudience] = useState("myself");
  const [hours, setHours] = useState("7");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const productLabel = productChoices.find((item) => item.value === product)?.label ?? "";
    const audienceLabel = audience === "myself" ? "先服务自己" : audience === "team" ? "服务团队成员" : "开放给外部用户";
    const scope = product === "product" && audience === "myself"
      ? "当前目标和受众不匹配：先做无登录单用户版，证明价值后再增加账号。"
      : product === "automation"
        ? "先把任务写成固定步骤；只有步骤需要模型自主选择工具时，才升级为 Agent。"
        : "先保留一个核心输入、一次关键处理和一个可验证输出，其他功能暂不进入第一版。";
    return {
      productLabel,
      audienceLabel,
      stack: pickStack(product),
      knowledge: pickKnowledge(product),
      start: pickStartGate(product, experience),
      scope,
      cadence: Number(hours) <= 3 ? "每周一个 90 分钟动作 + 一次复盘" : Number(hours) <= 7 ? "每周 3 次开发动作 + 周末 Boss 验收" : "每天一个小任务 + 每周一次真实用户验证",
    };
  }, [audience, experience, hours, product]);

  const summary = `我的 AI Builder 路线
问题：${problem || "尚未填写具体问题"}
产品：${result.productLabel}
用户：${result.audienceLabel}
起点：${result.start}
默认技术栈：${result.stack}
必修知识：${result.knowledge.join("、")}
第一版范围：${result.scope}
推进节奏：${result.cadence}`;

  async function copyResult() {
    setCopied(await copyText(summary));
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="coach-workbench">
      <div className="coach-form">
        <label className="problem-field">
          <span>1. 你现在最想解决的真实问题是什么？</span>
          <textarea value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="例如：我每周要从十几篇行业文章中整理出带来源的产品情报，手工要花 4 小时。" />
          <small>写任务和痛点，不要先写“我要做一个 Agent”。</small>
        </label>

        <fieldset>
          <legend>2. 你想先做成哪种产品？</legend>
          <div className="coach-choice-grid">
            {productChoices.map((choice) => (
              <button className={product === choice.value ? "is-selected" : ""} onClick={() => setProduct(choice.value)} type="button" key={choice.value}>
                <b>{choice.label}</b><span>{choice.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>3. 你的当前经验？</legend>
          <div className="coach-choice-grid three">
            {experienceChoices.map((choice) => (
              <button className={experience === choice.value ? "is-selected" : ""} onClick={() => setExperience(choice.value)} type="button" key={choice.value}>
                <b>{choice.label}</b><span>{choice.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="coach-inline-fields">
          <label><span>谁会使用？</span><select value={audience} onChange={(event) => setAudience(event.target.value)}><option value="myself">只有我自己</option><option value="team">我的团队</option><option value="public">外部用户</option></select></label>
          <label><span>每周能投入多久？</span><select value={hours} onChange={(event) => setHours(event.target.value)}><option value="3">约 3 小时</option><option value="7">约 7 小时</option><option value="14">14 小时以上</option></select></label>
        </div>
        <button className="button primary coach-generate" type="button" onClick={() => setGenerated(true)}>生成我的第一版路线</button>
      </div>

      <aside className={`coach-result ${generated ? "is-ready" : ""}`}>
        {!generated ? (
          <div className="coach-empty"><b>你的路线会出现在这里</b><p>它会指出起点、技术栈、必修知识、第一版范围和推进节奏。</p></div>
        ) : (
          <>
            <div className="result-head"><span>个人路线 · 规则版 Beta</span><button onClick={copyResult} type="button">{copied ? "已复制" : "一键复制"}</button></div>
            <h3>{problem ? "先解决这个问题" : "先补全你的真实问题"}</h3>
            <p className="result-problem">{problem || "当前信息还不足以判断产品价值。请先写下一个你真实反复遇到的任务。"}</p>
            <div className="result-row"><span>推荐起点</span><b>{result.start}</b></div>
            <div className="result-row"><span>默认技术栈</span><b>{result.stack}</b></div>
            <div className="result-row"><span>第一版砍到</span><b>{result.scope}</b></div>
            <div className="result-row"><span>必修知识</span><div>{result.knowledge.map((item) => <em key={item}>{item}</em>)}</div></div>
            <div className="result-row"><span>推进节奏</span><b>{result.cadence}</b></div>
            <div className="result-actions"><Link href="/knowledge">去补理论</Link><Link href="/action">打开行动关卡</Link></div>
          </>
        )}
      </aside>
    </div>
  );
}
