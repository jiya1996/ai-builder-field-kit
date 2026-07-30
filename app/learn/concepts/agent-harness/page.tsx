import type {Metadata} from "next";
import Link from "next/link";
import {CopyableCodeBlock} from "../../../copyable-code-block";

export const metadata: Metadata = {
  title: "Agent 与 Harness：从模型回答到系统行动｜AI Builder 核心知识",
  description:
    "从模型边界、工具调用、权限、循环、状态与 Trace，真正理解 Agent 和 Harness 的分工与运行机制。",
};

const mechanismRows = [
  {
    name: "Context Builder",
    owns: "把 system、历史、本轮输入、工具说明和检索结果组装成模型本次真正看到的上下文。",
    missing: "模型不是“失忆”，而是关键事实根本没有被重新放进这次请求。",
    evidence: "完整 assembled prompt、上下文长度、被裁剪或压缩的内容。",
  },
  {
    name: "Tool Registry",
    owns: "登记系统有哪些工具、参数是什么；再由 Exposure 决定本次究竟向模型暴露哪些工具。",
    missing: "模型不知道能做什么，或者看到它本不该使用的高权限工具。",
    evidence: "本轮工具清单、参数 Schema、实际暴露集合。",
  },
  {
    name: "Permission + Sandbox",
    owns: "在执行前判断谁可以做什么，并把文件、网络、数据库等操作限制在允许的边界内。",
    missing: "模型提出的危险动作可能被无条件执行，应用层的一个疏漏就会变成真实事故。",
    evidence: "审批记录、拒绝原因、允许目录、身份与资源归属。",
  },
  {
    name: "Agent Loop",
    owns: "把“模型提议 → 工具执行 → 结果回填 → 再次判断”循环起来，并决定何时停止。",
    missing: "系统最多只能做一次回答或一次动作，无法根据新观察继续推进。",
    evidence: "轮次、状态迁移、最大步数、超时和无进展检测。",
  },
  {
    name: "State + Memory",
    owns: "保存本次 Run、跨会话约定和中间产物，并在需要时重新注入上下文。",
    missing: "进程一断或会话一换，系统无法知道已经做到哪里，也无法可靠恢复。",
    evidence: "run state、session log、checkpoint、memory record。",
  },
  {
    name: "Trace + Eval + Recovery",
    owns: "记录每一步发生了什么，用固定任务判分，并在失败时重试、降级、回滚或停止。",
    missing: "只能听 Agent 说“完成了”，无法复查、定位退化或证明安全。",
    evidence: "tool call/result 关联 ID、耗时、成本、错误、评分和恢复路径。",
  },
];

const identityRows = [
  ["大模型 Model", "推理组件", "根据本次输入生成文本或结构化“动作提议”", "不会自己读文件、点网页或保存长期记忆"],
  ["AI 功能", "产品能力", "一次或少量模型调用完成摘要、分类、生成", "不一定有循环，也不一定是 Agent"],
  ["Workflow", "编排方式", "开发者预先写死步骤与分支", "稳定可测，但不擅长运行时开放式决策"],
  ["Agent", "系统行为", "围绕目标，根据观察动态选择下一步并循环", "不是某个模型，也不是“会聊天”就算 Agent"],
  ["Harness", "工程系统层", "把模型变成可执行、受控、可恢复、可观察的系统", "不负责替模型思考业务答案"],
  ["Executor / Runtime", "执行进程", "真正调用文件、Shell、浏览器、数据库或外部 API", "不能把模型提议当成执行授权"],
];

export default function AgentHarnessKnowledgePage() {
  return (
    <main className="knowledge-page">
      <header className="site-header learn-header">
        <Link className="brand" href="/" aria-label="返回课程首页">
          <span className="brand-mark">AI</span>
          <span>Builder Delivery System</span>
        </Link>
        <nav aria-label="知识课导航">
          <a href="#map">概念地图</a>
          <a href="#runtime">运行时序</a>
          <a href="#mechanisms">六个机制</a>
          <a href="#experiment">验证实验</a>
        </nav>
        <Link className="header-cta" href="/learn">返回学习中心 ↗</Link>
      </header>

      <section className="knowledge-hero">
        <div className="knowledge-breadcrumb">
          <Link href="/learn">学习中心</Link>
          <span>›</span>
          <b>核心知识 K1</b>
        </div>
        <span className="section-index">CORE KNOWLEDGE / 白盒基础</span>
        <h1>
          Agent 与 Harness
          <span>从“模型会回答”到“系统能行动”</span>
        </h1>
        <p>
          这节不教你背名词。学完后，你应该能看着一个 AI 产品画出它的运行时序，
          指出谁在提议、谁在批准、谁在执行，以及哪里必须留下证据。
        </p>
        <div className="knowledge-contract">
          <div><span>输入</span><strong>你用过一次聊天模型或 Coding Agent 的真实经验</strong></div>
          <div><span>输出</span><strong>一张 Agent 运行图 + 一份 Harness 六机制检查单</strong></div>
          <div><span>判断力</span><strong>能判断一个产品究竟是 AI 功能、Workflow 还是 Agent</strong></div>
        </div>
      </section>

      <div className="knowledge-layout">
        <aside className="knowledge-toc">
          <span>本节知识路径</span>
          <a href="#map">01 · 六个概念先分家</a>
          <a href="#agent">02 · Agent 到底是什么</a>
          <a href="#harness">03 · Harness 到底是什么</a>
          <a href="#runtime">04 · 一次 Run 怎样发生</a>
          <a href="#tool-call">05 · Tool Call ≠ Execution</a>
          <a href="#mechanisms">06 · Harness 六个机制</a>
          <a href="#tradeoffs">07 · 什么时候不要用 Agent</a>
          <a href="#experiment">08 · 最小验证实验</a>
        </aside>

        <article className="knowledge-article">
          <section id="map">
            <span className="knowledge-kicker">01 / RELATIONSHIP FIRST</span>
            <h2>先把六个经常混在一起的东西分开</h2>
            <p className="knowledge-lead">
              最容易犯的错误，是把“大模型”“Agent”和“能操作电脑的软件”当成同一个东西。
              它们其实处在不同层：模型负责生成候选动作，Harness 负责组织和约束，
              Runtime 才真正碰到外部世界。
            </p>
            <div className="knowledge-table-wrap">
              <table className="knowledge-table">
                <thead>
                  <tr><th>概念</th><th>它是哪类东西</th><th>它负责什么</th><th>它不负责什么</th></tr>
                </thead>
                <tbody>
                  {identityRows.map((row) => (
                    <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="knowledge-formula">
              <span>用于建立第一张地图的简化公式</span>
              <strong>Agent 系统 = Model + Harness + Tools / Runtime + State</strong>
              <p>这不是行业标准 API 定义，而是一张帮助你定位责任的工程地图。</p>
            </div>
          </section>

          <section id="agent">
            <span className="knowledge-kicker">02 / WHAT IS AN AGENT</span>
            <h2>Agent 不是“更聪明的模型”，而是一种运行方式</h2>
            <div className="concept-definition">
              <span>一句话定义</span>
              <p>
                <strong>Agent 是一个围绕目标运行的软件系统：</strong>
                模型根据当前状态和新观察选择下一步动作，系统执行动作并把结果反馈回来，
                如此循环，直到完成、失败、被拒绝或达到停止条件。
              </p>
            </div>
            <div className="knowledge-grid two">
              <article>
                <h3>为什么需要它</h3>
                <p>
                  当任务的下一步无法在运行前完全写死，例如“修好这个陌生仓库里的测试失败”，
                  系统必须先搜索、读文件、形成假设、修改、运行测试，再根据结果决定下一步。
                </p>
              </article>
              <article>
                <h3>去掉 Agent 会怎样</h3>
                <p>
                  不是所有产品都会坏掉。固定步骤仍可用 Workflow 完成；
                  但开放式任务会退化为人手工观察结果、重新下指令和决定下一步。
                </p>
              </article>
            </div>
            <div className="recognition-test">
              <h3>三个识别问题</h3>
              <ol>
                <li>系统是否围绕一个目标持续维护当前状态？</li>
                <li>下一步是否会根据刚获得的观察动态变化？</li>
                <li>是否存在“提议动作—执行—观察—再决策”的循环？</li>
              </ol>
              <p>只有一次模型调用的摘要器，是 AI 功能；步骤全部写死的自动化，是 Workflow；满足上面三点才具有典型 Agent 行为。</p>
            </div>
          </section>

          <section id="harness">
            <span className="knowledge-kicker">03 / WHAT IS A HARNESS</span>
            <h2>Harness 是把不确定模型装进确定工程边界的那一层</h2>
            <div className="concept-definition coral">
              <span>一句话定义</span>
              <p>
                <strong>Harness 是围绕模型运行的工程系统：</strong>
                它组装上下文、暴露工具、执行循环、检查权限、保存状态、记录 Trace，
                并负责停止、恢复和验收。
              </p>
            </div>
            <p>
              “Harness”原意接近马具：它不会替马产生力量，但会连接、引导并限制力量。
              这个类比只帮助理解边界；真实 Harness 是代码、配置、进程、数据库记录和策略共同组成的系统，不是一份 Prompt。
            </p>
            <div className="counterfactual-card">
              <span>如果只有模型，没有 Harness</span>
              <ul>
                <li>模型只能返回文本或工具调用提议，不能证明外部动作真的发生。</li>
                <li>没有人替它保存可靠状态；所谓“记忆”无法跨请求持续存在。</li>
                <li>没有审批、目录限制或资源归属判断，危险动作缺少执行前闸门。</li>
                <li>没有轮数、超时和无进展检测，循环可能重复调用直到耗尽预算。</li>
                <li>没有 Trace 和 Eval，只能用“看起来不错”判断是否完成。</li>
              </ul>
            </div>
          </section>

          <section id="runtime">
            <span className="knowledge-kicker">04 / ONE AGENT RUN</span>
            <h2>一次 Agent Run 的真实执行顺序</h2>
            <div className="runtime-flow" aria-label="Agent 运行时序图">
              <div><b>1</b><strong>用户 / 产品</strong><span>给目标与边界</span></div>
              <i>→</i>
              <div><b>2</b><strong>Harness</strong><span>组装上下文与工具</span></div>
              <i>→</i>
              <div><b>3</b><strong>Model</strong><span>回答或提出 Tool Call</span></div>
              <i>→</i>
              <div><b>4</b><strong>Policy</strong><span>允许、拒绝或请求审批</span></div>
              <i>→</i>
              <div><b>5</b><strong>Executor</strong><span>真正执行外部动作</span></div>
              <i>→</i>
              <div><b>6</b><strong>State / Trace</strong><span>保存结果并决定继续或停止</span></div>
            </div>
            <div className="ownership-grid">
              <article><span>Role</span><h3>谁拥有决定</h3><p>用户和产品策略拥有目标与风险边界；模型只能提出候选动作。</p></article>
              <article><span>Process</span><h3>谁真正执行</h3><p>服务端、CLI、浏览器进程或沙箱里的 Executor 执行工具。</p></article>
              <article><span>Abstraction</span><h3>谁定义合同</h3><p>Harness 定义上下文、工具协议、状态迁移、审批和停止合同。</p></article>
            </div>
          </section>

          <section id="tool-call">
            <span className="knowledge-kicker">05 / THE CRITICAL BOUNDARY</span>
            <h2>Tool Call 不等于 Tool Execution</h2>
            <p>
              Tool Call 本质上只是一段结构化的“请求执行某动作”的数据。
              它和普通文字一样，都是模型输出。只有 Executor 校验并运行后，外部世界才可能改变。
            </p>
            <h3>模型返回的只是提议</h3>
            <CopyableCodeBlock>
              <code>{`{
  "tool_call_id": "call_42",
  "name": "write_file",
  "arguments": {
    "path": "workspace/result.txt",
    "content": "HELLO"
  }
}`}</code>
            </CopyableCodeBlock>
            <h3>Harness 必须先检查，再交给 Executor</h3>
            <CopyableCodeBlock>
              <code>{`// 教学伪代码：展示责任边界，不对应某一家 SDK
async function handleToolCall(call, run) {
  assert(run.exposedTools.includes(call.name))
  assert(permissionPolicy.allows(run.user, call))
  assert(pathInsideWorkspace(call.arguments.path))

  const result = await executor.run(call.name, call.arguments)

  trace.append({
    tool_call_id: call.tool_call_id,
    proposal: call,
    execution_result: result
  })

  return result
}`}</code>
            </CopyableCodeBlock>
            <div className="knowledge-warning">
              <b>判断规则</b>
              <p>只看到 Tool Call、按钮动画或模型说“已经完成”，不能证明执行发生。至少还要看到 Tool Result、外部状态变化或执行日志。</p>
            </div>
          </section>

          <section id="mechanisms">
            <span className="knowledge-kicker">06 / HARNESS ANATOMY</span>
            <h2>六个机制，决定 Agent 是 Demo 还是产品</h2>
            <div className="mechanism-list">
              {mechanismRows.map((row, index) => (
                <article key={row.name}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <h3>{row.name}</h3>
                    <p>{row.owns}</p>
                  </div>
                  <div><span>没有它</span><p>{row.missing}</p></div>
                  <div><span>检查证据</span><p>{row.evidence}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section id="tradeoffs">
            <span className="knowledge-kicker">07 / TRADE-OFFS</span>
            <h2>什么时候根本不该用 Agent</h2>
            <div className="decision-ladder">
              <article>
                <span>固定、重复、强合规</span>
                <h3>优先 Workflow</h3>
                <p>步骤能够提前穷举，错误代价高，而且每次必须走完全相同的审批链。</p>
              </article>
              <article>
                <span>单次理解或生成</span>
                <h3>优先普通 AI 功能</h3>
                <p>摘要、分类、改写、抽取等任务没有持续状态，也不需要外部行动循环。</p>
              </article>
              <article>
                <span>开放任务、步骤随观察变化</span>
                <h3>再考虑 Agent</h3>
                <p>允许模型在受控工具和预算内选择下一步，同时保留审批、停止和人工接管。</p>
              </article>
            </div>
            <p className="tradeoff-note">
              Agent 的代价包括更高延迟与成本、非确定性、测试难度、权限风险和故障恢复复杂度。
              “更像人”不是采用 Agent 的充分理由；只有动态决策带来的价值超过这些代价时才值得。
            </p>
          </section>

          <section id="experiment">
            <span className="knowledge-kicker">08 / PROVE IT</span>
            <h2>用一个三组对照实验，把边界亲手证明</h2>
            <div className="experiment-brief">
              <div><span>任务</span><strong>读取 a.txt，把内容转成大写并写入 b.txt</strong></div>
              <div><span>预测</span><strong>只有 Model 时不会产生文件；Executor 真执行后才会产生</strong></div>
            </div>
            <ol className="experiment-steps">
              <li><b>A · 只有模型</b><p>把任务发给聊天模型。它可能给出代码或说“已完成”，但磁盘上不会出现 b.txt。</p></li>
              <li><b>B · 有 Tool Call，没有 Executor</b><p>让模型返回 write_file JSON，但故意关闭执行器。记录提议，确认文件仍不存在。</p></li>
              <li><b>C · 完整 Harness</b><p>经过工具暴露、权限检查、Executor 执行和结果回填后，确认 b.txt 出现且内容正确。</p></li>
            </ol>
            <h3>你最终应该拿到的 Trace</h3>
            <CopyableCodeBlock>
              <code>{`run_started
→ context_built
→ model_requested
→ tool_proposed: read_file (call_01)
→ permission_allowed
→ tool_executed
→ tool_result_recorded: call_01
→ model_requested
→ tool_proposed: write_file (call_02)
→ permission_allowed
→ tool_executed
→ artifact_verified: b.txt
→ run_completed`}</code>
            </CopyableCodeBlock>
            <div className="knowledge-check">
              <span>完成标准</span>
              <h3>不是“我听懂了”，而是你能回答这四题</h3>
              <ol>
                <li>模型输出了 delete_file 调用，谁拥有最后执行权？</li>
                <li>新会话“失忆”，应该先查模型还是 Context / State？为什么？</li>
                <li>Trace 只有 tool_proposed，没有 tool_executed，能说工具运行了吗？</li>
                <li>一个固定的三步审批流程，为什么 Workflow 可能比 Agent 更合适？</li>
              </ol>
              <details>
                <summary>展开参考答案</summary>
                <p>① Policy、人类审批与 Executor；模型只有提议权。② 先查 Harness 是否保存并重新注入了状态。③ 不能。④ 因为步骤确定、可测、低成本，Agent 的动态决策没有带来额外价值。</p>
              </details>
            </div>
          </section>
        </article>
      </div>

      <nav className="knowledge-pagination">
        <Link href="/learn">← 返回学习中心</Link>
        <Link href="/learn/g1/1.4">下一步：一次模型调用的解剖 →</Link>
      </nav>
    </main>
  );
}
