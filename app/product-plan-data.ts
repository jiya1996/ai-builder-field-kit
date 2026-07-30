export type KnowledgeChapter = {
  id: string;
  code: string;
  title: string;
  question: string;
  summary: string;
  units: string[];
  gates: string[];
  sources: {label: string; href: string}[];
};

export const knowledgeChapters: KnowledgeChapter[] = [
  {
    id: "web",
    code: "K0",
    title: "网页与软件世界的地基",
    question: "一个网页到底由什么组成，又是怎样从电脑跑到互联网上的？",
    summary: "先建立浏览器、文件、代码、仓库、服务器与网址的最小地图，再理解 HTML、CSS、JavaScript 分别控制结构、样式和行为。",
    units: ["浏览器 / 客户端 / 服务端", "HTML / CSS / JavaScript", "静态网页与动态应用", "本地文件 / Git / GitHub / 部署", "URL / HTTP / 域名 / 托管"],
    gates: ["关卡 0", "关卡 1"],
    sources: [
      {label: "MDN Web 入门", href: "https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Getting_started"},
      {label: "GitHub Pages 文档", href: "https://docs.github.com/zh/pages"},
    ],
  },
  {
    id: "ai-app",
    code: "K1",
    title: "AI 应用的最小组成",
    question: "模型为什么能被装进产品，而不只是停留在聊天窗口？",
    summary: "理解模型 API、消息、上下文、Token、提示词、结构化输出和服务端密钥，学会把不稳定的模型输出装进稳定的产品壳。",
    units: ["模型与 API", "System / User 消息", "Token 与上下文窗口", "结构化输出", "密钥与服务端调用", "失败、重试与成本"],
    gates: ["关卡 1", "关卡 2"],
    sources: [
      {label: "OpenAI Cookbook", href: "https://cookbook.openai.com/"},
      {label: "OpenAI API 指南", href: "https://platform.openai.com/docs/guides"},
    ],
  },
  {
    id: "fullstack",
    code: "K2",
    title: "真实产品的全栈器官",
    question: "为什么一个能注册、能保存数据的产品，比一张网页多出这么多东西？",
    summary: "沿一次用户操作看懂页面、路由、服务端、数据库、认证、授权、文件存储和生产环境之间的数据流与信任边界。",
    units: ["React / Next.js 页面与路由", "API 与服务端", "Database / CRUD", "Auth 与 RLS", "Storage", "环境变量与生产部署"],
    gates: ["关卡 2", "关卡 3", "关卡 4"],
    sources: [
      {label: "Next.js Learn", href: "https://nextjs.org/learn"},
      {label: "Supabase Docs", href: "https://supabase.com/docs"},
      {label: "Vercel 指南", href: "https://vercel.com/docs"},
    ],
  },
  {
    id: "agent",
    code: "K3",
    title: "Agent、Workflow 与 Harness",
    question: "什么情况下需要 Agent？Harness 又在模型外面替它承担什么？",
    summary: "分清固定工作流与自主 Agent；看懂模型、工具、指令、状态、运行环境、权限、Trace 和恢复共同组成的 Agent 系统。",
    units: ["Workflow vs Agent", "Model / Tools / Instructions", "Agent Loop", "State / Memory / Session", "Harness / Runtime / Permission", "Trace / Replay / Recovery"],
    gates: ["关卡 1", "关卡 2", "毕业项目"],
    sources: [
      {label: "OpenAI：构建 Agent 实用指南", href: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/"},
      {label: "Anthropic：Building Effective Agents", href: "https://www.anthropic.com/engineering/building-effective-agents"},
      {label: "Google：Agentic AI 设计模式", href: "https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system"},
      {label: "LangGraph：Workflows and Agents", href: "https://docs.langchain.com/oss/python/langgraph/workflows-agents"},
    ],
  },
  {
    id: "context",
    code: "K4",
    title: "搜索、上下文与知识系统",
    question: "模型不知道、记不住或资料会变化时，产品怎样找到可信答案？",
    summary: "理解上下文工程、检索、RAG、搜索、引用与资料新鲜度；知道什么时候把内容塞进提示词，什么时候按需检索。",
    units: ["Prompt vs Context Engineering", "检索与 RAG", "搜索 API", "引用与来源", "长上下文压缩", "知识更新策略"],
    gates: ["关卡 1", "关卡 2", "个性化项目"],
    sources: [
      {label: "Anthropic：Context Engineering", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"},
      {label: "Perplexity Search 指南", href: "https://docs.perplexity.ai/docs/search/quickstart"},
      {label: "Perplexity Search 最佳实践", href: "https://docs.perplexity.ai/docs/search/best-practices"},
    ],
  },
  {
    id: "reliability",
    code: "K5",
    title: "可靠性、安全与评测",
    question: "为什么“看起来能跑”不等于“可以交给用户”？",
    summary: "把正常结果、边界输入、失败恢复、权限、提示词注入、成本、日志与回归评测变成可复查的证据。",
    units: ["功能验收与 AI 验收", "Evals 与回归集", "Guardrails", "权限与数据隔离", "日志 / Trace", "成本、延迟与恢复"],
    gates: ["全部关卡"],
    sources: [
      {label: "Anthropic：Agent Evals", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents"},
      {label: "OpenAI：Agent Guardrails", href: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/"},
      {label: "LangSmith Evaluation", href: "https://docs.langchain.com/langsmith/evaluation"},
    ],
  },
  {
    id: "product",
    code: "K6",
    title: "产品判断与个人资产化",
    question: "怎样避免只会照着做一个 Demo，并把第二个产品做得更快？",
    summary: "从真实问题、核心流程和成功证据出发定义 MVP；把验证过的代码、任务卡、SOP、Skill 与判断标准沉淀成自己的生产系统。",
    units: ["Discovery 与问题证据", "MVP / Non-goal", "任务卡与验收先行", "Starter Kit", "SOP / Skill", "作品证据与叙事"],
    gates: ["关卡 2", "关卡 3", "关卡 4"],
    sources: [
      {label: "Google：Agentic AI 核心概念", href: "https://cloud.google.com/resources/core-concepts-ai-agents"},
      {label: "LangGraph Overview", href: "https://docs.langchain.com/oss/python/langgraph/overview"},
    ],
  },
];

export const actionGates = [
  {
    id: "g0",
    number: "01",
    title: "让第一个自我介绍网页出现在互联网上",
    outcome: "一张属于自己的网页、一个公开网址、一份故障修复记录。",
    theory: ["K0 网页与软件世界地基"],
    defaultStack: "Codex + HTML / CSS / JavaScript + GitHub + Vercel",
    alternatives: "完全零基础想最快上线，可先用 Cloudflare Pages 直接上传；习惯可视化编辑器，可用 Cursor。",
    why: "静态网页变量最少，最适合第一次看懂文件、浏览器、仓库与部署的完整因果链。",
    steps: ["准备姓名、身份介绍和联系方式", "让 Coding Agent 在空文件夹生成 index.html", "本地预览并完成一次可验证修改", "推送 GitHub，再部署到公开地址", "亲手制造 3 个错误并恢复"],
    evidence: ["公开网址", "GitHub 仓库", "手机访问截图", "3 组坏掉—报错—修复证据"],
  },
  {
    id: "g1",
    number: "02",
    title: "做一个自己每天会用的 AI 小工具",
    outcome: "纪要转行动、文案打磨或长文摘要工具，三选一。",
    theory: ["K1 AI 应用最小组成", "K3 Agent 与 Harness 入门", "K5 可靠性与评测"],
    defaultStack: "Codex + Next.js + TypeScript + 模型 API + Vercel",
    alternatives: "需要边看文件边改，用 Cursor；深度使用 Anthropic SDK，可换 Claude Code。第一版不加数据库。",
    why: "Next.js 把页面与服务端放在同一项目，既能安全保管密钥，又避免初学者同时维护两套工程。",
    steps: ["从真实重复任务中三选一", "先用假数据完成输入、加载、失败和结果状态", "定义稳定的 JSON 输出合同", "在服务端接入模型 API", "用两张验收单测试产品壳和 AI 输出", "连续自用 5 天"],
    evidence: ["线上工具", "任务卡与 AGENTS.md", "功能验收单", "AI 验收单", "真实成本与 5 天使用记录"],
  },
  {
    id: "g2",
    number: "03",
    title: "上线一个别人能注册使用的真实产品",
    outcome: "一个有账号、数据隔离、文件和 AI 功能的 Production 产品。",
    theory: ["K2 全栈产品器官", "K4 搜索与知识系统", "K5 安全与评测"],
    defaultStack: "Next.js + TypeScript + Supabase + 模型 API + Vercel",
    alternatives: "只有明确的 Python 依赖时才拆 FastAPI；第一版优先 Supabase，不自建服务器和认证。",
    why: "Supabase 同时提供数据库、登录、文件与 RLS，能用一套可见界面学完真实产品最关键的后端能力。",
    steps: ["访谈 3 位种子用户并写一页产品规格", "画页面—服务端—数据库—模型数据流", "接 CRUD、注册登录和受保护页面", "用 RLS 完成双账号数据隔离", "加入文件、AI、限额、失败恢复和日志", "上线后让 3 位真实用户使用并迭代"],
    evidence: ["Production 地址", "产品规格与架构图", "双账号越权测试", "安全与成本报告", "3 位用户记录", "10 分钟回滚证据"],
  },
  {
    id: "g3",
    number: "04",
    title: "用一半时间做出第二个产品",
    outcome: "第二个上线产品，以及一套能在新项目复用的个人底座。",
    theory: ["K6 产品判断与个人资产化", "K5 可靠性与回归"],
    defaultStack: "沿用已验证栈 + Starter Kit + SOP + 回归清单",
    alternatives: "只有第二个产品出现确定的新约束，才替换数据库、框架或部署平台。",
    why: "这一关训练的不是再学一套工具，而是证明哪些代码、规则和判断能够跨项目复用。",
    steps: ["复盘第一个产品的代码、任务卡和报错", "区分可复用资产与业务特例", "制作干净的 Starter Kit", "沉淀启动、上线、排错三张 SOP", "为不同核心流程的第二产品计时", "在全新目录 60 分钟重建"],
    evidence: ["第二产品地址", "Starter Kit", "3 张 SOP", "两个项目耗时与错误对比", "全新环境启动录像或时间线"],
  },
  {
    id: "g4",
    number: "05",
    title: "把自己的真实问题做成毕业作品",
    outcome: "独立产品、作品集案例页、可信的产品与工程证据链。",
    theory: ["K6 Discovery 与 MVP", "按项目调用 K0–K5", "个性化辅导路径"],
    defaultStack: "先经过需求分诊，再从默认栈中做最小改动",
    alternatives: "按移动端、自动化、知识检索、企业权限等硬约束选择新的技术组合，不为追新而换栈。",
    why: "毕业作品考察的是独立判断：能解释为什么用、为什么不用，以及如何用证据证明产品有效。",
    steps: ["从亲历问题中建立候选池", "用访谈、观察或手工服务验证问题", "定义 MVP、Non-goal、架构与信任边界", "独立分解任务并逐步交付", "让陌生人只看 README 跑通", "整理案例页、STAR 故事和下一步"],
    evidence: ["Discovery 记录", "生产产品", "关键取舍与失败记录", "陌生人跑通记录", "3 位目标用户反馈", "公开案例页"],
  },
];
