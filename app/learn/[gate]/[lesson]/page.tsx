import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  courseLessonRoutes,
  getCourseLesson,
  getLessonMarkdown,
} from "../../../course-content";
import {CopyableCodeBlock} from "../../../copyable-code-block";
import {SiteNav} from "../../../site-nav";

type LessonPageProps = {
  params: Promise<{gate: string; lesson: string}>;
};

export function generateStaticParams() {
  return courseLessonRoutes.map(({gate, lesson}) => ({
    gate: gate.id,
    lesson: lesson.code,
  }));
}

export async function generateMetadata(
  {params}: LessonPageProps,
): Promise<Metadata> {
  const {gate, lesson} = await params;
  const courseLesson = getCourseLesson(gate, lesson);
  if (!courseLesson) return {};

  return {
    title: `${courseLesson.lesson.code} ${courseLesson.lesson.title}｜AI Builder 课程`,
    description: courseLesson.lesson.learn,
  };
}

export default async function LessonPage({params}: LessonPageProps) {
  const {gate, lesson} = await params;
  const courseLesson = getCourseLesson(gate, lesson);
  const markdown = getLessonMarkdown(gate, lesson);
  if (!courseLesson || !markdown) notFound();

  const currentIndex = courseLessonRoutes.findIndex(
    (route) => route.gate.id === gate && route.lesson.code === lesson,
  );
  const previous = currentIndex > 0 ? courseLessonRoutes[currentIndex - 1] : null;
  const next =
    currentIndex < courseLessonRoutes.length - 1
      ? courseLessonRoutes[currentIndex + 1]
      : null;

  return (
    <main className="lesson-page">
      <SiteNav active="action" />

      <section className="lesson-hero">
        <Link className="page-return-home" href="/">← 返回首页</Link>
        <div className="lesson-breadcrumb">
          <Link href="/">首页</Link><span>›</span>
          <Link href="/action">课程实战</Link><span>›</span>
          <Link href="/learn">完整目录</Link><span>›</span>
          <b>关卡 {courseLesson.gate.number}</b>
        </div>
        <div className="lesson-labels">
          <span>{courseLesson.gate.kicker}</span>
          <span>{courseLesson.lesson.time}</span>
        </div>
        <h1>
          <small>{courseLesson.lesson.code}</small>
          {courseLesson.lesson.title}
        </h1>
        <p className="lesson-mission">
          <b>本节任务：</b>{courseLesson.lesson.practice}
        </p>
        <div className="lesson-hero-contract">
          <div>
            <span>输入什么</span>
            <strong>{courseLesson.lesson.input}</strong>
          </div>
          <div>
            <span>输出什么</span>
            <strong>{courseLesson.lesson.evidence}</strong>
          </div>
          <div>
            <span>学会什么</span>
            <strong>{courseLesson.lesson.learn}</strong>
          </div>
        </div>
      </section>

      <div className="lesson-layout">
        <aside className="lesson-outline">
          <span>本节阅读方法</span>
          <ol>
            <li>先读白话讲解</li>
            <li>照着步骤动手做</li>
            <li>逐条完成验收</li>
            <li>遇到问题看常见坑</li>
          </ol>
          <div>
            <b>不要只看</b>
            <p>代码块、提示词和检查框都是本节任务的一部分。</p>
          </div>
        </aside>

        <article className="lesson-markdown" id="lesson-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({children}) => (
                <CopyableCodeBlock>{children}</CopyableCodeBlock>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
          <div className="lesson-check-card" id="lesson-check">
            <span>本节完成标准</span>
            <h2>不是“读完了”，而是证据已经产生。</h2>
            <p>{courseLesson.lesson.evidence}</p>
            <Link className="button primary" href="/learn">返回目录标记已学完</Link>
          </div>
        </article>
      </div>

      <nav className="lesson-pagination" aria-label="上一节和下一节">
        {previous ? (
          <Link href={previous.href}>
            <span>← 上一节</span>
            <strong>{previous.lesson.code} {previous.lesson.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={next.href}>
            <span>下一节 →</span>
            <strong>{next.lesson.code} {next.lesson.title}</strong>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
