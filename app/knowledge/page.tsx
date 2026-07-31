import type {Metadata} from "next";
import {LearningWorkbench} from "../learning-workbench";
import {getAllDetailedLessons} from "../stage-lesson-map";

export const metadata: Metadata = {
  title: "理论视图｜AI Builder 学习工作台",
  description: "S00–S10 理论视图：概念、系统因果、掌握标准、理解检查和一手来源。",
};

export default function KnowledgePage() {
  return <LearningWorkbench initialView="theory" detailedLessons={getAllDetailedLessons()} />;
}
