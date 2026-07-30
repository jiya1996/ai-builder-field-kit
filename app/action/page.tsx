import type {Metadata} from "next";
import {LearningWorkbench} from "../learning-workbench";

export const metadata: Metadata = {
  title: "实战视图｜AI Builder 学习工作台",
  description: "S00–S10 实战视图：项目、工具选择、具体步骤、完成证据和 Boss 验收。",
};

export default function ActionPage() {
  return <LearningWorkbench initialView="practice" />;
}
