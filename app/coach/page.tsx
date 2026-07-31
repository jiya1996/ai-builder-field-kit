import type {Metadata} from "next";
import {LearningWorkbench} from "../learning-workbench";
import {getAllDetailedLessons} from "../stage-lesson-map";

export const metadata: Metadata = {
  title: "阶段辅导 Beta｜AI Builder 学习工作台",
  description: "根据 S00–S10 当前阶段课程规则提供结构化自检与下一步建议。",
};

export default function CoachPage() {
  return <LearningWorkbench initialView="theory" detailedLessons={getAllDetailedLessons()} />;
}
