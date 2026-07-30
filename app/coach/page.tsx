import type {Metadata} from "next";
import {LearningWorkbench} from "../learning-workbench";

export const metadata: Metadata = {
  title: "辅导 Agent｜AI Builder 学习工作台",
  description: "与 S00–S10 当前阶段共享上下文的个性化辅导 Agent。",
};

export default function CoachPage() {
  return <LearningWorkbench initialView="theory" />;
}
