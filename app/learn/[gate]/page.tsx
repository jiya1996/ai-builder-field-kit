import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {LearningWorkbench} from "../../learning-workbench";
import {learningStages} from "../../stage-data";
import {getDetailedLessonsForStage} from "../../stage-lesson-map";

type StagePageProps = {
  params: Promise<{gate: string}>;
};

const publicOrigin = "https://jiya1996.github.io/ai-builder-field-kit";

export function generateStaticParams() {
  return learningStages.map((stage) => ({gate: stage.id}));
}

export async function generateMetadata({params}: StagePageProps): Promise<Metadata> {
  const {gate} = await params;
  const stage = learningStages.find((item) => item.id === gate);
  if (!stage) return {};

  return {
    title: `${stage.code} ${stage.title}｜AI Builder 学习工作台`,
    description: `${stage.question} 理解概念、完成实战，并用证据通过验收。`,
    alternates: {canonical: `${publicOrigin}/learn/${stage.id}/`},
  };
}

export default async function StagePage({params}: StagePageProps) {
  const {gate} = await params;
  const stage = learningStages.find((item) => item.id === gate);
  if (!stage) notFound();

  return (
    <LearningWorkbench
      initialStage={stage.id}
      detailedLessons={getDetailedLessonsForStage(stage.id)}
    />
  );
}
