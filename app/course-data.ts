export type CourseLesson = {
  code: string;
  title: string;
  time: string;
  learn: string;
  practice: string;
  evidence: string;
};

export type CourseGate = {
  id: string;
  number: string;
  kicker: string;
  duration: string;
  title: string;
  promise: string;
  outcome: string;
  boss: string;
  skills: string;
  lessons: CourseLesson[];
  assets: string[];
  acceptance: string[];
};

export const courseGates: CourseGate[] = [
  {
    id: "g0",
    number: "0",
    kicker: "免费公开关",
    duration: "半天 · 3–4 小时",
    title: "让第一个网页出现在互联网上",
    promise: "先拿到一个真实链接，再理解刚才发生了什么；零基础也能在半天内完成第一次公开交付。",
    outcome: "一个任何人都能打开的网页链接 + 一次完整的破坏与修复记录",
    boss: "亲手制造 3 个错误，读懂现象与日志，再把网页恢复正常。",
    skills: "项目文件夹 / HTML / 浏览器 / Git / GitHub / 部署 / Console",
    lessons: [
      {code:"0.0",title:"本关地图",time:"10 分钟",learn:"认识“描述—生成—预览—上线—修复”的完整闭环。",practice:"确定今天要发布的个人主页内容。",evidence:"写下本关目标与最终公开链接的验收条件。"},
      {code:"0.1",title:"装上 AI 编程搭档",time:"40 分钟",learn:"理解 Coding Agent 与聊天机器人的区别，以及“工作目录就是项目边界”。",practice:"创建 my-first-site，并让 Agent 确认当前工作目录。",evidence:"工具可用、目录正确、能看见文件改动。"},
      {code:"0.2",title:"描述 → 生成 → 预览 → 调整",time:"40 分钟",learn:"把主观感觉翻译成具体、可验证的页面要求。",practice:"用中文生成 index.html，并完成一次明确的视觉调整。",evidence:"页面能打开，内容是自己的，修改前后可对比。"},
      {code:"0.3",title:"让全世界能打开它",time:"40 分钟",learn:"理解 Git、GitHub 与部署平台分别负责什么。",practice:"把网页推到 GitHub 并发布到公开托管地址。",evidence:"手机流量可打开，至少一位朋友访问成功。"},
      {code:"0.4",title:"软件世界最小地图",time:"20 分钟",learn:"分清本地、浏览器、终端、云端仓库和公开服务器。",practice:"沿着一次发布画出文件从本地到线上的路线。",evidence:"能用五句话解释刚才发生了什么。"},
      {code:"0.5",title:"Boss 战：弄坏再修好",time:"40 分钟",learn:"把报错当成定位线索，练习“看—说—修”。",practice:"完成语法破坏、文件名 404、Console 报错三个任务。",evidence:"坏页面、报错文字、修复结果三组截图。"},
      {code:"0.6",title:"通关登记",time:"10 分钟",learn:"开始用证据而不是“感觉做完了”记录学习成果。",practice:"填写链接、有效提示词和解决过的问题。",evidence:"一张可公开分享的关卡 0 通关卡。"},
    ],
    assets:["公开网页链接","GitHub 仓库","软件世界最小地图","3 组故障与恢复证据"],
    acceptance:["公开链接在手机流量下可访问","能说明本地、仓库与线上环境的区别","亲手修复 3 个故障","所有完成声明都有截图或链接"],
  },
  {
    id: "g1",
    number: "1",
    kicker: "付费主线起点",
    duration: "1 周 · 每天 1–2 小时",
    title: "做一个自己每天会用的 AI 小工具",
    promise: "从“会做网页”升级为“会与 Agent 协作，把一个真实 AI 功能做完并验收”。",
    outcome: "会议纪要转行动清单 / 文案打磨器 / 长文三层摘要卡，三选一完成",
    boss: "功能验收单 + AI 验收单全项通过，并在 45 分钟内定位至少 2 个故障。",
    skills: "任务卡 / AGENTS.md / Diff / Git 回滚 / API / Structured Output / 成本",
    lessons: [
      {code:"1.0",title:"本关地图与三选一选题",time:"30 分钟",learn:"用“下周会不会真的使用”筛选题目，而不是追求炫技。",practice:"从纪要清单、文案打磨、三层摘要中选择一个。",evidence:"写下一周内的真实使用场景与完成条件。"},
      {code:"1.1",title:"开工三件套",time:"第 1 天",learn:"用任务卡、AGENTS.md 和验收先行解决 Agent 跨会话失忆。",practice:"初始化 Next.js 项目，写入协作铁规矩。",evidence:"项目可运行、规则文件存在、首个 Git 提交完成。"},
      {code:"1.2",title:"Codex 协作小循环 + Git 后悔药",time:"第 1–2 天",learn:"掌握计划—确认—实现—Diff—验证—提交的小步循环。",practice:"完成一个真实页面任务，并亲手回滚一次乱码提交。",evidence:"一条完整协作记录 + 一次成功回滚。"},
      {code:"1.3",title:"先做不带 AI 的壳",time:"第 2–3 天",learn:"用空、加载、错误三状态把确定的界面与不确定的 AI 隔离。",practice:"先用假数据完成输入、按钮、结果与模拟失败。",evidence:"三种状态均已亲测，移动端可用。"},
      {code:"1.4",title:"一次模型调用的解剖",time:"第 3 天",learn:"看懂模型、消息、温度、Token、密钥和结构化输出。",practice:"画出请求—响应图，写好 system 指令初稿。",evidence:"能回答计费、密钥与 JSON 校验三个核心问题。"},
      {code:"1.5",title:"接上真正的 AI",time:"第 4–5 天",learn:"在服务端安全调用模型，并对输出结构、失败和费用负责。",practice:"接入真实 API，限制输入，校验 JSON，保留错误重试。",evidence:"3 组输入成功、错误密钥可恢复、单次成本已记录。"},
      {code:"1.6",title:"Boss 战 I：两张验收单",time:"第 6 天",learn:"分开验证“产品壳是否可靠”和“AI 输出是否靠谱”。",practice:"执行正常、空输入、边界、故障、事实性、注入与成本测试。",evidence:"功能验收单和 AI 验收单逐条附证据。"},
      {code:"1.7",title:"Boss 战 II：限时故障演练",time:"第 6–7 天",learn:"按固定排错流程定位环境变量、JSON 解析和重复请求问题。",practice:"45 分钟内修复故障仓库中的至少 2 个问题。",evidence:"症状—定位—根因—修复记录不少于 2 条。"},
      {code:"1.8",title:"通关登记与 5 天自用",time:"持续 5 天",learn:"用真实使用检验“做出来”是否等于“有价值”。",practice:"连续使用自己的工具 5 天并记录感受。",evidence:"工具链接、验收截图、故障成绩和自用反馈。"},
    ],
    assets:["可用的 AI 小工具","AGENTS.md 与任务卡","功能验收单","AI 验收单","成本记录","故障演练报告"],
    acceptance:["真实输入可稳定得到结构化结果","密钥不进入浏览器与仓库","失败时有友好提示并可恢复","连续自用 5 天并留下真实反馈"],
  },
  {
    id: "g2",
    number: "2",
    kicker: "黄金项目",
    duration: "2–3 周 · 每天 1–2 小时",
    title: "上线一个别人能注册使用的真产品",
    promise: "不只把产品发布出去，还要证明身份、数据、成本和故障恢复都经得起真实用户。",
    outcome: "“灵感罐头”多用户 AI 收藏本 + Production 链接 + 第一批真实用户",
    boss: "第二账号越权测试、10 分钟回滚演练、3 位真实用户与一次上线后迭代。",
    skills: "Product Spec / 架构 / CRUD / Auth / RLS / Storage / 安全 / 运营",
    lessons: [
      {code:"2.0",title:"黄金项目与本关地图",time:"30 分钟",learn:"认识一个真产品的全部器官与先跑通、再加固、后见人的节奏。",practice:"选择灵感罐头或同构变体，并确认 3 位种子用户。",evidence:"产品方向、核心流程与用户名单。"},
      {code:"2.1",title:"轻量需求与一页规格",time:"第 1 天",learn:"用目标用户、核心流程、成功证据砍掉无关功能。",practice:"填写 PRODUCT.md，并明确至少 3 个不做项。",evidence:"一页产品规格 + 3 个真实用户名单。"},
      {code:"2.2",title:"架构透视与信任边界",time:"第 1–2 天",learn:"看懂页面、服务端、数据库、模型和密钥的数据流。",practice:"亲手画结构图和信任边界图。",evidence:"两张架构图，能指出密钥与权限必须放在哪里。"},
      {code:"2.3",title:"搭页面与路由骨架",time:"第 2–3 天",learn:"先用假数据确定登录、列表与新建三个页面的核心流程。",practice:"完成三页跳转、空状态、加载状态与移动端布局。",evidence:"可浏览的产品壳 + 对应 Git 提交。"},
      {code:"2.4",title:"数据库、字段与 CRUD",time:"第 3–5 天",learn:"理解表、行、字段、主键与增查改删。",practice:"建立 ideas 表，接通新增、读取、删除和刷新持久化。",evidence:"数据库真实数据 + CRUD 验收记录。"},
      {code:"2.5",title:"注册、登录与受保护页面",time:"第 5–7 天",learn:"分清认证“你是谁”和授权“你能做什么”。",practice:"接入邮箱注册登录，未登录访问受保护页必须被拦截。",evidence:"注册—退出—登录闭环 + 地址栏直入拦截测试。"},
      {code:"2.6",title:"RLS 与双账号隔离",time:"第 7–9 天",learn:"让数据库按每一行判断数据归属，兜住应用层疏漏。",practice:"配置增查改删四条策略，用账号 B 直调接口访问 A。",evidence:"页面与接口层越权均被拒绝的截图。"},
      {code:"2.7",title:"文件上传与对象存储",time:"第 9–11 天",learn:"理解文件路径、类型/大小限制、用户目录隔离和联动删除。",practice:"完成图片上传、超限拦截、缩略图与删除清理。",evidence:"正常、非法、超大、删除、跨账号五项测试。"},
      {code:"2.8",title:"AI 自动标签与摘要",time:"第 11–13 天",learn:"处理多用户产品里的 AI 失败、限流、防盗刷与成本增长。",practice:"异步生成标签摘要，加入登录校验、频率限制与输入截断。",evidence:"AI 失败不丢数据、未登录被拒、COST.md 有真实推演。"},
      {code:"2.9",title:"安全底线七条",time:"第 13 天",learn:"系统检查密钥、输入、权限、注入、限额、删除与依赖风险。",practice:"逐条执行安全实验并记录验证方法。",evidence:"SECURITY.md 七项全部有证明。"},
      {code:"2.10",title:"上线 Production",time:"第 14 天",learn:"分清本地、预览和生产环境，理解线上变量不会自动同步。",practice:"构建、配置生产变量、发布并用全新账号走完整流程。",evidence:"手机流量下的 Production 全流程记录。"},
      {code:"2.11",title:"运营最小集",time:"第 14–15 天",learn:"让上线后的产品有日志、反馈、备份和成本观察入口。",practice:"收藏三类用量页，完成一次备份并加入反馈按钮。",evidence:"日志、反馈、备份、成本四张截图。"},
      {code:"2.12",title:"Boss 战：敢上线三连",time:"第 15–17 天",learn:"用攻击、恢复和真实用户证明产品可以见人。",practice:"执行越权测试、坏改动回滚、首批用户任务与迭代。",evidence:"全项越权证据、≤10 分钟回滚、3 位用户数据与反馈。"},
      {code:"2.13",title:"选修：收钱与通知",time:"另计 3–5 天",learn:"理解支付以服务端 Webhook 为准，以及通知与额度的最小闭环。",practice:"在测试模式跑通支付或先做手工付费验证。",evidence:"商业闭环验收单；本节不阻塞主线通关。"},
      {code:"2.14",title:"通关登记",time:"20 分钟",learn:"把链接、用户、权限、回滚和迭代整理成产品证据。",practice:"填写生产地址、用户数、反馈与改动记录。",evidence:"一张完整的真产品通关卡。"},
    ],
    assets:["Production 产品","一页 Product Spec","结构图与信任边界图","RLS 权限策略","安全与成本报告","回滚记录","真实用户反馈"],
    acceptance:["3 位用户注册并完成核心任务","账号 B 无法读取或修改账号 A 的数据","AI 失败不影响核心数据保存","坏版本能在 10 分钟内恢复","基于真实反馈完成一次线上迭代"],
  },
  {
    id: "g3",
    number: "3",
    kicker: "资产化关",
    duration: "1 周",
    title: "用一半时间做出第二个产品",
    promise: "把第一个真产品里验证过的代码、指挥方法和判断标准，沉淀为自己的生产系统。",
    outcome: "第二个上线产品 + Starter Kit 仓库 + 时间减半对比图",
    boss: "在全新环境中，60 分钟内用自己的 Starter Kit 从零跑起来。",
    skills: "复盘 / 抽象 / Starter Kit / SOP / Skill / 复用测量",
    lessons: [
      {code:"3.0",title:"本关地图",time:"20 分钟",learn:"理解复用不是复制整个旧项目，而是只带走跨项目稳定的部分。",practice:"为第二产品设定时间、错误和干预次数的对比指标。",evidence:"本关计时表与目标。"},
      {code:"3.1",title:"复盘萃取三类资产",time:"第 1 天",learn:"区分起步资产、指挥资产和判断资产。",practice:"回顾提交记录，找出可复用模块、反复规则与常见坑。",evidence:"可复用 / 不可复用清单。"},
      {code:"3.2",title:"打造自己的 Starter Kit",time:"第 2–3 天",learn:"把登录、数据库、上传、AI 调用和错误状态变成干净底座。",practice:"删除业务特例和历史数据，保留可配置骨架与文档模板。",evidence:"空白环境可启动的 Starter Kit v1。"},
      {code:"3.3",title:"把稳定流程做成 SOP / Skill",time:"第 3 天",learn:"只有跨项目验证过的流程才能从候选资产升级为稳定资产。",practice:"制作项目启动、上线前检查、故障排查三张 SOP。",evidence:"3 张带触发条件、步骤、停止条件和验证记录的 SOP。"},
      {code:"3.4",title:"第二产品计时实战",time:"第 4–6 天",learn:"在核心流程不同的题目上检验底座是否真的可复用。",practice:"用 Kit 做打卡圈、反馈墙、书签夹或同等复杂度产品。",evidence:"第二产品链接 + 全程耗时与错误记录。"},
      {code:"3.5",title:"Boss 战：全新环境跑通",time:"第 7 天",learn:"证明模板不是“在旧电脑上恰好能跑”的偶然产物。",practice:"在空目录重新克隆、配置并启动 Kit，删除一个伪通用抽象。",evidence:"≤60 分钟跑通录像或时间线 + 删除理由。"},
      {code:"3.6",title:"通关登记",time:"20 分钟",learn:"用数字证明复用收益，而不是只说“这次更快”。",practice:"比较两个产品的工期、错误和人工干预次数。",evidence:"时间减半对比图 + Starter Kit 地址。"},
    ],
    assets:["Starter Kit v1","3 张核心 SOP","第二个产品","可复用/不可复用清单","两次开发对比图"],
    acceptance:["Kit 在全新环境 60 分钟内启动","第二产品核心流程与第一个不同","明确删除至少一个错误抽象","复用收益有时间和错误数据"],
  },
  {
    id: "g4",
    number: "4",
    kicker: "独立毕业关",
    duration: "2 周",
    title: "把自己的真实问题做成毕业作品",
    promise: "离开跟做题目，独立完成从问题证据、范围、实现、上线到作品叙事的完整闭环。",
    outcome: "独立产品 + 作品集案例页 + 面试叙事包",
    boss: "陌生人只看 README 在 30 分钟内跑通，3 位目标用户完成核心流程。",
    skills: "Discovery / MVP / 独立架构 / 用户验证 / 作品集 / STAR 叙事",
    lessons: [
      {code:"4.0",title:"本关地图",time:"20 分钟",learn:"理解毕业关不再给标准答案，只保留统一的证据合同。",practice:"确认要独立做一个来自真实问题的产品。",evidence:"个人选题候选池与证据缺口。"},
      {code:"4.1",title:"完整 Discovery",time:"第 1–3 天",learn:"从亲历痛点、真实请求和可观察笨办法中找问题。",practice:"完成访谈、观察、落地页或手工服务中的至少 2 种验证。",evidence:"DISCOVERY.md + 立项或换题结论。"},
      {code:"4.2",title:"独立规格、架构与开工评审",time:"第 3–4 天",learn:"自己定义 MVP、Non-goal、成功指标、信任边界与技术取舍。",practice:"提交一页规格和两张架构图，接受开工评审。",evidence:"规格、架构、风险与不做清单通过评审。"},
      {code:"4.3",title:"独立交付",time:"第 4–12 天",learn:"在没有逐步答案的情况下使用任务卡、Git、验收与急救系统。",practice:"完成核心流程、AI 能力、安全加固、上线与一次迭代。",evidence:"生产链接 + 完整工程与运行证据链。"},
      {code:"4.4",title:"案例页与面试叙事包",time:"第 12–13 天",learn:"把“做了项目”转成问题、取舍、证据和复盘的可信叙事。",practice:"写案例页、30 秒介绍、STAR 故事和简历条目。",evidence:"公开案例页 + docs/INTERVIEW.md。"},
      {code:"4.5",title:"Boss 战：陌生人跑通",time:"第 13–14 天",learn:"用陌生人和目标用户检验说明、产品与问题价值。",practice:"邀请陌生人按 README 使用，再让 3 位目标用户完成任务。",evidence:"≤30 分钟跑通记录 + 3 份目标用户反馈。"},
      {code:"4.6",title:"毕业典礼与资产结算",time:"30 分钟",learn:"把项目证据、个人资产和下一步方向连接起来。",practice:"整理作品链接、Starter Kit v2、复盘与下一阶段计划。",evidence:"毕业清单 + 可公开作品叙事。"},
    ],
    assets:["Discovery 记录","独立产品","产品规格与架构图","作品集案例页","面试叙事包","Starter Kit v2"],
    acceptance:["问题来自真实用户与行为证据","能解释至少 3 个明确不做的决定","陌生人只看 README 可跑通","3 位目标用户完成核心流程","所有完成声明均可复查"],
  },
];

export const supportRooms = [
  {
    icon: "✚",
    title: "急救室",
    subtitle: "卡住时先来这里",
    description: "一套不会让学员在报错里乱试的恢复系统。",
    items: ["排错标准流程五步","20 张常见报错急救卡","卡死 45 分钟后的三选一","答疑群标准求助模板"],
  },
  {
    icon: "⌁",
    title: "军火库",
    subtitle: "做项目时直接取用",
    description: "不是附件列表，而是每一关都会实际使用的模板和验收工具。",
    items: ["任务卡与项目四件套","7 张验收清单","10 条场景提示词","SOP、案例页与 STAR 模板"],
  },
  {
    icon: "Aa",
    title: "词典",
    subtitle: "只在需要时查",
    description: "把零基础最容易卡住的术语翻译成一句白话和项目内例子。",
    items: ["60+ 个分关卡术语","10 张反直觉认知卡","认证 vs 授权等关键区别","每个概念对应亲手验证点"],
  },
];

export const advancedModules = [
  ["B0","为什么要白盒","模型 + Harness 总图与实验环境"],
  ["B1","Model Boundary","裸调用、上下文拼装与模型边界实验"],
  ["B2","Manual Tool Loop","工具菜单、执行器、Trace 与 Replay"],
  ["B3","Permission 与 Runtime","危险分级、审批闸门与目录沙箱"],
  ["B4","完整 Agent Run","状态机、恢复、Compact、Memory 与 Subagent"],
  ["B5","评测与回归","固定任务集、基线、成本与退化报警"],
  ["B6","对照世界","四大 SDK、MCP、RAG 与开源项目白盒研究"],
];
