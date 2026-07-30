import type {Metadata} from "next";
import Link from "next/link";
import {SiteNav} from "../../site-nav";

export const metadata: Metadata = {
  title: "K0 网页与软件世界的地基｜AI Builder 理论知识",
  description: "分清 Git、GitHub、URL、HTML、CSS、JavaScript、前端、后端、API、React、Next.js 与部署平台。",
};

const identityRows = [
  ["HTML", "标记语言", "描述网页有什么、内容是什么结构", "不是编程语言，也不负责视觉样式"],
  ["CSS", "样式表语言", "控制布局、颜色、尺寸、响应式与动画", "不是框架，也不保存业务数据"],
  ["JavaScript", "编程语言", "表达逻辑、响应交互、请求数据、更新页面", "不是 Java，也不只运行在浏览器"],
  ["Git", "版本控制工具", "在本地记录文件历史与可恢复快照", "不是云盘，也不等于 GitHub"],
  ["GitHub", "代码托管与协作平台", "把 Git 仓库放到云端，提供协作、审查与自动化", "不是编程语言，也不是 Git 本身"],
  ["URL", "资源地址", "告诉浏览器使用什么协议、访问哪个域名和路径", "不是网页文件，也不是搜索关键词"],
  ["HTTP", "通信协议", "规定浏览器与服务器怎样请求和响应", "不是网址，也不是服务器"],
  ["前端", "系统区域 / 职责", "在用户设备上呈现界面并处理交互", "不是某一门语言"],
  ["后端", "系统区域 / 职责", "在服务器上处理权限、密钥、数据和业务规则", "不是某一种框架"],
  ["API", "接口合同", "约定两个程序怎样请求能力、传什么、返回什么", "不是数据库，也不一定是 AI"],
  ["React", "用户界面库", "用组件组合交互界面", "官方定义是库，不是完整全栈框架"],
  ["Next.js", "React 全栈框架", "提供路由、服务端代码、构建与部署约定", "不是一种新编程语言"],
  ["Node.js", "JavaScript 运行时", "让 JavaScript 在浏览器之外运行", "不是框架，也不是包管理器"],
  ["npm", "包管理器与软件包注册表", "安装和管理项目依赖", "不是 JavaScript 运行时"],
  ["Vercel", "部署与托管平台", "构建项目并把它放到公网服务器", "不是 GitHub，也不是代码仓库"],
] as const;

const officialSources = [
  ["Git 官方：什么是版本控制", "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"],
  ["Git 官方：Git 如何保存快照", "https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F"],
  ["GitHub 官方：什么是 GitHub", "https://docs.github.com/en/get-started/start-your-journey/what-is-github"],
  ["MDN：网页如何工作", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works"],
  ["MDN：什么是 URL", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL"],
  ["MDN：HTML 基础", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax"],
  ["MDN：CSS、JavaScript 与 Web 核心", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core"],
  ["React 官方：React 是 UI 库", "https://react.dev/"],
  ["Next.js 官方文档", "https://nextjs.org/docs"],
] as const;

export default function WebFoundationsPage() {
  return (
    <main className="knowledge-page web-foundations-page">
      <SiteNav active="knowledge" />

      <section className="knowledge-hero">
        <Link className="page-return-home" href="/">← 返回首页</Link>
        <div className="knowledge-breadcrumb">
          <Link href="/">首页</Link><span>›</span>
          <Link href="/knowledge">理论知识</Link><span>›</span>
          <b>K0 网页与软件地基</b>
        </div>
        <span className="section-index">CORE KNOWLEDGE K0 / 第一关理论前置</span>
        <h1>
          Git、GitHub 与 URL
          <span>前端、后端到底是什么？</span>
        </h1>
        <p>这一章不要求你先会写代码。目标是建立一张不会混淆的“软件世界最小地图”：知道每个名词是什么类型、解决什么问题、在网页运行链路中站在哪里。</p>
        <div className="knowledge-contract">
          <div><span>输入什么</span><strong>一个本地网页文件夹、一个 GitHub 仓库和一个公开网址</strong></div>
          <div><span>学会什么</span><strong>分清语言、库、框架、工具、平台、协议、地址和系统职责</strong></div>
          <div><span>输出什么</span><strong>一张从本地代码到公开网页的系统图，以及 5 组可观察实验</strong></div>
        </div>
      </section>

      <div className="knowledge-layout">
        <aside className="knowledge-toc">
          <span>本章目录</span>
          <a href="#one-map">01 · 先看一张总图</a>
          <a href="#identities">02 · 它们分别属于哪一类</a>
          <a href="#git-github">03 · Git 与 GitHub</a>
          <a href="#url-http">04 · URL 与 HTTP</a>
          <a href="#web-languages">05 · HTML、CSS、JavaScript</a>
          <a href="#front-back">06 · 前端、后端与 API</a>
          <a href="#library-framework">07 · 库、框架与运行时</a>
          <a href="#project-flow">08 · 第一关中怎样协作</a>
          <a href="#experiments">09 · 五组验证实验</a>
          <a href="#sources">10 · 官方来源</a>
        </aside>

        <article className="knowledge-article">
          <section id="one-map">
            <span className="knowledge-kicker">01 / ONE MAP</span>
            <h2>先记住一条因果链</h2>
            <p className="knowledge-lead">你输入一个 URL，浏览器按照 HTTP 向服务器请求资源；服务器返回 HTML、CSS 和 JavaScript，浏览器把它们组装成你看到并能操作的前端页面。</p>
            <div className="web-runtime-flow">
              {[
                ["1", "URL", "你要去哪里的地址"],
                ["2", "浏览器", "把地址变成 HTTP 请求"],
                ["3", "服务器 / 后端", "寻找文件或执行业务逻辑"],
                ["4", "HTML + CSS + JS", "作为响应回到浏览器"],
                ["5", "前端界面", "渲染并响应用户操作"],
                ["6", "API / 数据库", "需要数据时继续请求后端"],
              ].map(([number, title, copy], index) => (
                <div className="web-runtime-item" key={title}>
                  <b>{number}</b><strong>{title}</strong><span>{copy}</span>
                  {index < 5 && <i>→</i>}
                </div>
              ))}
            </div>
            <div className="concept-definition">
              <span>先别急着背代码</span>
              <p>语言负责表达；库和框架帮助组织代码；运行时真正执行代码；工具帮助开发；平台承载协作或部署；URL 和 HTTP 负责找到资源并传输。</p>
            </div>
          </section>

          <section id="identities">
            <span className="knowledge-kicker">02 / IDENTITY TABLE</span>
            <h2>先把“身份”分清</h2>
            <p>下面这些词不在同一层级。问“Git 和 JavaScript 哪个更好”，就像问“照相机和语法哪个更好”——它们承担的是不同责任。</p>
            <div className="knowledge-table-wrap">
              <table className="knowledge-table identity-table">
                <thead><tr><th>名称</th><th>它是什么类型</th><th>主要负责</th><th>它不是什么</th></tr></thead>
                <tbody>
                  {identityRows.map(([name, kind, owns, not]) => (
                    <tr key={name}><td>{name}</td><td>{kind}</td><td>{owns}</td><td>{not}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="category-summary">
              <article><b>语言</b><p>HTML、CSS、JavaScript。三者语法和能力不同，其中 HTML 是标记语言，CSS 是样式表语言，JavaScript 是编程语言。</p></article>
              <article><b>库与框架</b><p>React 是 UI 库；Next.js 是建立在 React 之上的全栈框架。它们通常都使用 JavaScript 或 TypeScript。</p></article>
              <article><b>工具与平台</b><p>Git 是工具；GitHub 是云端协作平台；Vercel 是部署平台；浏览器和 Node.js 是运行代码的环境。</p></article>
              <article><b>地址、协议与职责</b><p>URL 是地址，HTTP 是通信规则，API 是接口合同；前端和后端是系统职责区域。</p></article>
            </div>
          </section>

          <section id="git-github">
            <span className="knowledge-kicker">03 / GIT ≠ GITHUB</span>
            <h2>Git 是本地时间机器，GitHub 是云端协作场所</h2>
            <div className="concept-pair-grid">
              <article>
                <span>版本控制工具</span>
                <h3>Git</h3>
                <p><strong>是什么：</strong>记录一组文件如何随时间变化的版本控制系统。一次 commit 可以理解为一个带说明的项目快照。</p>
                <p><strong>为什么需要：</strong>你能比较修改、找到引入问题的版本、恢复到稳定状态，而不是复制出“最终版2-真的最终版”。</p>
                <p><strong>在哪里：</strong>Git 可以完全在你的电脑本地工作，不需要 GitHub，也不需要联网。</p>
                <div className="manifestation"><code>.git/</code><code>git status</code><code>git add</code><code>git commit</code><code>git log</code></div>
              </article>
              <article>
                <span>代码托管与协作平台</span>
                <h3>GitHub</h3>
                <p><strong>是什么：</strong>托管 Git 仓库的云平台，并在其上增加协作、审查、议题、自动化和发布能力。</p>
                <p><strong>为什么需要：</strong>代码不只保存在一台电脑上，其他人和部署平台也能读取同一份仓库。</p>
                <p><strong>在哪里：</strong>它运行在远程服务器上。你通常通过 push 把本地 Git 提交同步上去。</p>
                <div className="manifestation"><code>Repository</code><code>Commit</code><code>Branch</code><code>Pull Request</code><code>Actions</code></div>
              </article>
            </div>
            <div className="counterfactual-card">
              <span>如果去掉会怎样？</span>
              <ul>
                <li><strong>没有 Git：</strong>网页仍然能做出来，但历史主要靠手工备份；改坏后的恢复会更脆弱。</li>
                <li><strong>没有 GitHub：</strong>Git 仍然能在本地正常工作，但分享、协作和连接自动部署会更麻烦。</li>
                <li><strong>有 GitHub 但没有 commit：</strong>你只是把文件放在平台上，没有形成清晰、可解释的版本历史。</li>
              </ul>
            </div>
          </section>

          <section id="url-http">
            <span className="knowledge-kicker">04 / ADDRESS AND PROTOCOL</span>
            <h2>URL 是地址，HTTP 是通信规则</h2>
            <div className="url-anatomy">
              <code>
                <span>https://</span><b>example.com</b><em>/products/42</em><i>?view=full</i><strong>#reviews</strong>
              </code>
              <div>
                <span><b>https://</b> 协议 / scheme</span>
                <span><b>example.com</b> 域名 / host</span>
                <span><b>/products/42</b> 路径 / path</span>
                <span><b>?view=full</b> 查询参数 / query</span>
                <span><b>#reviews</b> 页面内锚点 / fragment</span>
              </div>
            </div>
            <div className="knowledge-grid two">
              <article><h3>URL 做什么</h3><p>唯一定位一个资源。它可以指向网页、图片、CSS、JavaScript 文件，也可以指向 API 地址。URL 不负责把内容运过来。</p></article>
              <article><h3>HTTP 做什么</h3><p>规定客户端如何发出请求、服务器如何回应，包括方法、状态码、请求头和响应体。常见结果是 200 成功、404 未找到、500 服务器错误。</p></article>
            </div>
            <div className="recognition-test">
              <h3>为什么改错文件名会出现 404？</h3>
              <p>因为 URL 路径仍在请求旧资源，而服务器按照路径找不到对应文件或路由。404 描述的是“请求到了服务器，但资源没找到”，不是“电脑坏了”。</p>
            </div>
          </section>

          <section id="web-languages">
            <span className="knowledge-kicker">05 / THREE WEB LANGUAGES</span>
            <h2>HTML、CSS、JavaScript 各自拥有不同责任</h2>
            <div className="language-layer-demo">
              <article><b>HTML</b><h3>结构与语义</h3><p>这里有一个标题、一段介绍和一个按钮。浏览器、搜索引擎和辅助技术据此理解内容结构。</p><code>&lt;button&gt;开始学习&lt;/button&gt;</code></article>
              <article><b>CSS</b><h3>呈现与布局</h3><p>按钮是珊瑚色、圆角、多大，页面在手机上怎样排列。CSS 改变外观，但不应该改变内容含义。</p><code>.button &#123; background: coral; &#125;</code></article>
              <article><b>JavaScript</b><h3>逻辑与行为</h3><p>用户点击后打开目录、校验输入、请求 API、根据结果更新界面。JavaScript 让页面根据事件和数据发生变化。</p><code>button.addEventListener(&quot;click&quot;, openCourse)</code></article>
            </div>
            <div className="counterfactual-card">
              <span>三个最小反事实</span>
              <ul>
                <li>删掉 CSS：内容通常还在，但布局和视觉样式消失。</li>
                <li>禁用 JavaScript：静态内容仍可能出现，但依赖脚本的交互和数据请求停止。</li>
                <li>删掉 HTML 中的按钮：CSS 和 JavaScript 即使存在，也没有这个按钮可以装饰或监听。</li>
              </ul>
            </div>
          </section>

          <section id="front-back">
            <span className="knowledge-kicker">06 / SYSTEM RESPONSIBILITY</span>
            <h2>前端和后端不是语言，而是代码运行的位置与责任边界</h2>
            <div className="front-back-map">
              <article>
                <span>用户设备 / 浏览器进程</span>
                <h3>前端 Frontend</h3>
                <ul><li>显示页面和交互状态</li><li>收集用户输入</li><li>调用后端 API</li><li>不能安全保存服务器密钥</li></ul>
                <small>常见技术：HTML、CSS、JavaScript、React</small>
              </article>
              <i>HTTP / API<br/>请求 ↔ 响应</i>
              <article>
                <span>云端服务器进程</span>
                <h3>后端 Backend</h3>
                <ul><li>执行可信业务规则</li><li>验证身份与权限</li><li>安全使用模型密钥</li><li>读取和写入数据库</li></ul>
                <small>常见技术：Next.js Server、Node.js、Python、数据库</small>
              </article>
            </div>
            <div className="concept-definition coral">
              <span>API 是中间的合同</span>
              <p>前端不需要知道后端内部怎样实现，只需要知道“向哪个 URL、用什么方法、发送什么字段、会得到什么结果”。后端则必须按合同验证并响应。</p>
            </div>
            <div className="knowledge-warning">
              <b>安全边界</b>
              <p>凡是下载到浏览器的前端代码，用户原则上都能查看。模型 API 密钥、数据库管理员密钥和真正的权限判断不能只放在前端。</p>
            </div>
          </section>

          <section id="library-framework">
            <span className="knowledge-kicker">07 / LIBRARY, FRAMEWORK, RUNTIME</span>
            <h2>JavaScript 是语言；React、Next.js 和 Node.js 是三种不同东西</h2>
            <div className="concept-stack-list">
              <article><b>JavaScript</b><div><span>编程语言</span><p>你用它表达变量、条件、函数、事件和请求等逻辑。</p></div></article>
              <article><b>React</b><div><span>用户界面库</span><p>帮助你把页面拆成组件并根据状态更新界面。React 官方明确称其为 library。</p></div></article>
              <article><b>Next.js</b><div><span>React 全栈框架</span><p>在 React 之上规定路由、服务端渲染、数据读取、构建等应用结构，让前端和后端可以放在同一项目。</p></div></article>
              <article><b>Node.js</b><div><span>JavaScript 运行时</span><p>真正执行浏览器之外的 JavaScript，例如本地开发服务器、构建工具或后端程序。</p></div></article>
              <article><b>npm</b><div><span>包管理工具</span><p>根据 package.json 安装 React、Next.js 等依赖，并执行项目脚本。</p></div></article>
            </div>
            <div className="tradeoff-note">
              <strong>为什么第一关不直接使用 Next.js？</strong>
              <p>因为一个静态个人主页只用 HTML、CSS、JavaScript 就能完整上线。先减少框架、依赖和构建步骤，学员更容易看清浏览器、文件、Git 和部署之间的因果关系。第二关需要服务端模型调用时，再引入 Next.js。</p>
            </div>
          </section>

          <section id="project-flow">
            <span className="knowledge-kicker">08 / WHERE THEY MEET</span>
            <h2>这些概念在第一关怎样协作？</h2>
            <ol className="project-causal-steps">
              <li><b>① 本地文件夹</b><p>你和 Coding Agent 创建 index.html、styles.css、script.js。这里是工作区，不是互联网。</p></li>
              <li><b>② 浏览器预览</b><p>浏览器读取本地文件：HTML 给结构，CSS 给样式，JavaScript 给行为。</p></li>
              <li><b>③ Git 快照</b><p>确认网页正常后，用 Git 把当前文件状态记录成可恢复版本。</p></li>
              <li><b>④ GitHub 远程仓库</b><p>把 commit 推到云端，让代码可以分享并被部署平台读取。</p></li>
              <li><b>⑤ Vercel 构建与托管</b><p>平台从 GitHub 取得代码，把网页放到公网服务器，并分配公开 URL。</p></li>
              <li><b>⑥ 真实访问</b><p>朋友输入 URL，浏览器通过 HTTP 请求服务器，下载页面文件并在朋友的设备上渲染。</p></li>
            </ol>
            <div className="knowledge-formula">
              <span>第一关的完整闭环</span>
              <strong>语言写页面 → 浏览器运行 → Git 留快照 → GitHub 放远端 → Vercel 托管 → URL 让别人访问</strong>
              <p>每一项都有不同责任，缺少某项不一定完全做不出来，但交付、恢复或分享会变得更脆弱。</p>
            </div>
          </section>

          <section id="experiments">
            <span className="knowledge-kicker">09 / FIVE EXPERIMENTS</span>
            <h2>亲手验证，而不是只记定义</h2>
            <ol className="experiment-steps">
              <li><b>实验 1 · 语言分工：</b><p>分别暂时断开 CSS 和 JavaScript，预测页面哪些部分会消失，再观察实际结果。</p></li>
              <li><b>实验 2 · URL 与路径：</b><p>把一个正确页面路径改错，观察 404；再恢复正确路径。</p></li>
              <li><b>实验 3 · Git 快照：</b><p>正常版本 commit 后修改标题，用 git diff 看变化，再恢复到正确内容。</p></li>
              <li><b>实验 4 · GitHub 与本地：</b><p>本地修改但不 push，观察线上仓库没有变化；push 后再比较。</p></li>
              <li><b>实验 5 · 前后端边界：</b><p>打开浏览器开发者工具 Network，观察页面文件和 API 请求的 URL、方法与状态码。</p></li>
            </ol>
            <div className="knowledge-check">
              <span>本章理解检查</span>
              <h3>如果你能回答下面五题，才算真正学会</h3>
              <details><summary>展开自测题与答案</summary>
                <p><b>1. GitHub 断网后，Git 能不能 commit？</b><br/>能。commit 发生在本地仓库。</p>
                <p><b>2. URL 是语言吗？</b><br/>不是，它是资源地址。</p>
                <p><b>3. JavaScript 是前端吗？</b><br/>不是。JavaScript 是语言，既能写浏览器前端，也能在 Node.js 中写后端。</p>
                <p><b>4. React 和 Next.js 是同一类东西吗？</b><br/>不是。React 是 UI 库；Next.js 是基于 React 的应用框架。</p>
                <p><b>5. 为什么密钥不能写在前端？</b><br/>因为前端代码会发送到用户设备，用户原则上可以查看它。</p>
              </details>
            </div>
          </section>

          <section id="sources">
            <span className="knowledge-kicker">10 / OFFICIAL SOURCES</span>
            <h2>本章官方来源</h2>
            <p>课程负责把概念组织成零基础可理解的系统，技术身份和机制回到官方文档核对。</p>
            <div className="chapter-source-list">
              {officialSources.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={href}>{label}<span>↗</span></a>)}
            </div>
          </section>
        </article>
      </div>

      <nav className="knowledge-pagination">
        <Link href="/knowledge">← 返回七章理论目录</Link>
        <Link href="/learn/g0/0.0">下一步：进入关卡 0 第一节 →</Link>
      </nav>
    </main>
  );
}
