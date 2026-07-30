"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courseGates } from "../course-data";

const STORAGE_KEY = "ai-builder-course-lessons-v1";

export function CurriculumBrowser() {
  const [activeGateId, setActiveGateId] = useState(courseGates[0].id);
  const [done, setDone] = useState<string[]>([]);
  const activeGate = courseGates.find((gate) => gate.id === activeGateId) ?? courseGates[0];
  const totalLessons = useMemo(
    () => courseGates.reduce((total, gate) => total + gate.lessons.length, 0),
    [],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(JSON.parse(saved));
    } catch {
      setDone([]);
    }
  }, []);

  const toggleLesson = (code: string) => {
    const next = done.includes(code)
      ? done.filter((item) => item !== code)
      : [...done, code];
    setDone(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const activeDone = activeGate.lessons.filter((lesson) => done.includes(lesson.code)).length;
  const overallPercent = Math.round((done.length / totalLessons) * 100);

  return (
    <div className="curriculum-browser">
      <aside className="curriculum-sidebar" aria-label="课程关卡">
        <div className="course-progress-card">
          <span>你的学习进度</span>
          <strong>{done.length} / {totalLessons} 节</strong>
          <div><i style={{width: `${overallPercent}%`}} /></div>
          <small>进度只保存在当前浏览器</small>
        </div>
        <div className="gate-tabs" role="tablist" aria-label="选择课程关卡">
          {courseGates.map((gate) => {
            const gateDone = gate.lessons.filter((lesson) => done.includes(lesson.code)).length;
            return (
              <button
                key={gate.id}
                type="button"
                role="tab"
                aria-selected={gate.id === activeGate.id}
                className={gate.id === activeGate.id ? "active" : ""}
                onClick={() => setActiveGateId(gate.id)}
              >
                <b>{gate.number}</b>
                <span>
                  <small>{gate.kicker}</small>
                  {gate.title}
                  <em>{gateDone}/{gate.lessons.length} 节</em>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="gate-course-panel" role="tabpanel">
        <header className="gate-course-header">
          <div className="gate-course-kicker">
            <span>关卡 {activeGate.number}</span>
            <span>{activeGate.duration}</span>
          </div>
          <h2>{activeGate.title}</h2>
          <p>{activeGate.promise}</p>
          <div className="gate-course-contract">
            <div><span>本关最终做出</span><strong>{activeGate.outcome}</strong></div>
            <div><span>Boss 战</span><strong>{activeGate.boss}</strong></div>
          </div>
          <div className="gate-course-skill"><b>本关会用到</b>{activeGate.skills}</div>
        </header>

        <div className="lesson-section-title">
          <div>
            <span>LEARNING CONTENT</span>
            <h3>本关具体学习内容</h3>
          </div>
          <strong>{activeDone} / {activeGate.lessons.length} 已学</strong>
        </div>

        <div className="lesson-list">
          {activeGate.lessons.map((lesson) => {
            const completed = done.includes(lesson.code);
            return (
              <article className={`lesson-card ${completed ? "completed" : ""}`} key={lesson.code}>
                <div className="lesson-card-head">
                  <span className="lesson-code">{completed ? "✓" : lesson.code}</span>
                  <div>
                    <small>{lesson.time}</small>
                    <h4>{lesson.title}</h4>
                  </div>
                  <Link className="lesson-read-link" href={`/learn/${activeGate.id}/${lesson.code}`}>
                    阅读完整正文 →
                  </Link>
                </div>
                <div className="lesson-body">
                  <div>
                    <span>01 · 学什么</span>
                    <p>{lesson.learn}</p>
                  </div>
                  <div>
                    <span>02 · 动手做</span>
                    <p>{lesson.practice}</p>
                  </div>
                  <div>
                    <span>03 · 完成证据</span>
                    <p>{lesson.evidence}</p>
                  </div>
                </div>
                <div className="lesson-card-actions">
                  <Link href={`/learn/${activeGate.id}/${lesson.code}`}>
                    打开讲解、步骤、提示词与验收清单
                  </Link>
                  <button
                    type="button"
                    className="lesson-complete-button"
                    onClick={() => toggleLesson(lesson.code)}
                  >
                    {completed ? "已学完 · 点击取消" : "标记这节已学完"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="gate-finish-grid">
          <article>
            <span>客户带走的成品</span>
            <ul>{activeGate.assets.map((asset) => <li key={asset}>{asset}</li>)}</ul>
          </article>
          <article>
            <span>通关验收标准</span>
            <ul>{activeGate.acceptance.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>
    </div>
  );
}
