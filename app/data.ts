export type Project = {
  name: string;
  href: string;
  depth: "架构必读" | "Demo 必跑" | "同题对照";
  note: string;
};

export type ProjectFamily = {
  id: string;
  name: string;
  icon: string;
  question: string;
  projects: Project[];
};

export const projectFamilies: ProjectFamily[] = [
  {
    id: "research", name: "Deep Research", icon: "⌕",
    question: "开放问题如何变成可核验、可引用、可恢复的长任务？",
    projects: [
      ["GPT Researcher","https://github.com/assafelovic/gpt-researcher","Demo 必跑","最易改造的研究 Agent 基线"],
      ["Open Deep Research","https://github.com/langchain-ai/open_deep_research","Demo 必跑","显式状态图、并行研究与评测"],
      ["DeerFlow","https://github.com/bytedance/deer-flow","架构必读","从研究 Agent 演进到 Super Agent Harness"],
      ["Tongyi DeepResearch","https://github.com/Alibaba-NLP/DeepResearch","同题对照","模型、推理、Harness 与 Benchmark 一体"],
      ["MiroThinker","https://github.com/MiroMindAI/MiroThinker","同题对照","长链研究与预测型 Agent"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "data", name: "Data Agent", icon: "▦",
    question: "自然语言分析如何保持数值、口径、权限与结论可追溯？",
    projects: [
      ["PandasAI","https://github.com/Sinaptik-AI/pandas-ai","Demo 必跑","聊天式数据分析的直观基线"],
      ["Data Formulator","https://github.com/microsoft/data-formulator","Demo 必跑","拖拽、自然语言与可视化协作"],
      ["DB-GPT","https://github.com/eosphoros-ai/DB-GPT","架构必读","SQL、代码、沙箱、报告全链路"],
      ["WrenAI","https://github.com/Canner/WrenAI","架构必读","先治理语义，再交给 Agent 查询"],
      ["Dexter","https://github.com/virattt/dexter","同题对照","垂直金融研究与实时数据轨迹"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "browser", name: "Browser Agent", icon: "◎",
    question: "Agent 如何在易变网页上观察、动作、验证并安全恢复？",
    projects: [
      ["Browser Use","https://github.com/browser-use/browser-use","Demo 必跑","开放 Browser Harness 头部基线"],
      ["Stagehand","https://github.com/browserbase/stagehand","架构必读","确定性代码与自然语言动作混合"],
      ["Skyvern","https://github.com/Skyvern-AI/skyvern","同题对照","视觉模型驱动的业务自动化"],
      ["agent-browser","https://github.com/vercel-labs/agent-browser","同题对照","面向 Agent 的低开销浏览器 CLI"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "coding", name: "Coding Agent", icon: "</>",
    question: "真实代码库中，搜索、修改、执行与验收如何形成安全闭环？",
    projects: [
      ["OpenCode","https://github.com/anomalyco/opencode","架构必读","模型无关的开放 Coding Runtime"],
      ["Codex","https://github.com/openai/codex","Demo 必跑","权限、沙箱与工程任务基线"],
      ["OpenHands","https://github.com/OpenHands/OpenHands","架构必读","Agent Server 与多种隔离执行后端"],
      ["Cline","https://github.com/cline/cline","同题对照","IDE-first、Plan/Act 与可嵌入路线"],
      ["Goose","https://github.com/aaif-goose/goose","同题对照","开放协议与可移植 Agent Runtime"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "personal", name: "Personal Agent", icon: "◉",
    question: "长期记忆、主动任务与跨渠道协作怎样不越权？",
    projects: [
      ["OpenClaw","https://github.com/openclaw/openclaw","架构必读","长驻 Gateway 与多入口 Agent OS"],
      ["Hermes Agent","https://github.com/NousResearch/hermes-agent","架构必读","学习循环、记忆与自我改进"],
      ["Khoj","https://github.com/khoj-ai/khoj","同题对照","本地优先的知识与主动助理"],
      ["nanobot","https://github.com/HKUDS/nanobot","Demo 必跑","小型可读核心的轻量对照"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "knowledge", name: "Knowledge Agent", icon: "▤",
    question: "从原始文档到回答，错误究竟发生在解析、检索还是生成？",
    projects: [
      ["Docling","https://github.com/docling-project/docling","Demo 必跑","多格式文档解析头部基线"],
      ["Marker","https://github.com/datalab-to/marker","同题对照","Markdown / JSON / HTML 快速转换"],
      ["MinerU","https://github.com/opendatalab/MinerU","Demo 必跑","复杂版面、OCR 与结构化输出"],
      ["RAGFlow","https://github.com/infiniflow/ragflow","架构必读","解析、混合检索、引用与 Workflow"],
      ["WeKnora","https://github.com/Tencent/WeKnora","同题对照","RAG、ReAct Agent 与自动 Wiki"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
  {
    id: "workflow", name: "Workflow Automation", icon: "⌘",
    question: "什么时候确定性流程更好，什么时候才值得引入 Agent？",
    projects: [
      ["n8n","https://github.com/n8n-io/n8n","Demo 必跑","业务自动化与可靠执行基线"],
      ["Activepieces","https://github.com/activepieces/activepieces","同题对照","版本化 Flow、连接器与 HITL"],
      ["Dify","https://github.com/langgenius/dify","Demo 必跑","Workflow → RAG → Agent 递进"],
      ["Langflow","https://github.com/langflow-ai/langflow","同题对照","低代码画布与 Python 组件"],
      ["Sim","https://github.com/simstudioai/sim","架构必读","AI Workforce / Agent Workspace 形态"],
    ].map(([name,href,depth,note]) => ({name,href,depth,note})) as Project[],
  },
];

export const courses = [
  {name:"VibeCamp",href:"https://vibecamps.org/",role:"借交互与关卡",take:"零基础、逐关交付、真实上线；用一个持续迭代的作品降低认知负担。",boundary:"我们补：Boss 验收、急救室、中国大陆路径"},
  {name:"AI Coder Quest",href:"https://github.com/roach54023/ai-coder-quest",role:"借开源产品骨架",take:"MDX 关卡、进度解锁、截图/URL/仓库验证与教师审核。",boundary:"我们改：5 个可晒时刻，而不是只追课节进度"},
  {name:"DataTalksClub",href:"https://github.com/DataTalksClub/ai-dev-tools-zoomcamp",role:"借工程纪律",take:"Spec、上下文、实现、测试、部署、安全与审计形成完整交付链。",boundary:"我们降门槛：只在当前关卡引入必要工程概念"},
  {name:"Scrimba AI Engineer Path",href:"https://scrimba.com/the-ai-engineer-path-c02v",role:"借 AI 能力阶梯",take:"API、RAG、Agent、Context、AI SDK、MCP 与多模态项目。",boundary:"我们后置：MCP 与多 Agent 不阻塞第一款产品"},
  {name:"Vibe Code School",href:"https://vibecodeschool.com/roadmap",role:"借任务与验收颗粒度",take:"工具使用、移动交付、Agent 管理、评测、安全都配任务与明确结果。",boundary:"我们聚焦：先单 Agent、先真实 Web 产品"},
  {name:"熠辉课程",href:"https://github.com/",role:"借本土交付经验",take:"工具、Git、全栈、Supabase、项目实战与国内用户的卡点处理。",boundary:"我们产品化：答疑不再是隐形服务，而是明确接口"},
];
