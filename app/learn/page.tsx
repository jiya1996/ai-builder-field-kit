import type {Metadata} from "next";
import {LearningWorkbench} from "../learning-workbench";
import {getAllDetailedLessons} from "../stage-lesson-map";

export const metadata: Metadata = {
  title: "AI Builder 学习工作台｜S00–S10",
  description: "在同一个学习工作台中完成 S00–S10 理论、实战、证据验收，并随时获得阶段化 Agent 辅导。",
};

export default function LearnPage() {
  return <LearningWorkbench detailedLessons={getAllDetailedLessons()} />;
}
