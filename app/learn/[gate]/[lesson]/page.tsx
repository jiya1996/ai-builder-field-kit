import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {courseLessonRoutes, getCourseLesson} from "../../../course-content";
import {LearningWorkbench} from "../../../learning-workbench";
import {
  getDetailedLessonForLegacyRoute,
  getDetailedLessonsForStage,
  stageForCourseLesson,
} from "../../../stage-lesson-map";

type LessonPageProps = {
  params: Promise<{gate: string; lesson: string}>;
};

const publicOrigin = "https://jiya1996.github.io/ai-builder-field-kit";

export function generateStaticParams() {
  return courseLessonRoutes.map(({gate, lesson}) => ({
    gate: gate.id,
    lesson: lesson.code,
  }));
}

export async function generateMetadata({params}: LessonPageProps): Promise<Metadata> {
  const {gate, lesson} = await params;
  const courseLesson = getCourseLesson(gate, lesson);
  if (!courseLesson) return {};

  const stageId = stageForCourseLesson(gate, lesson);
  return {
    title: `${courseLesson.lesson.code} ${courseLesson.lesson.title}｜AI Builder 学习工作台`,
    description: courseLesson.lesson.learn,
    alternates: {canonical: `${publicOrigin}/learn/${stageId}/`},
  };
}

export default async function LessonPage({params}: LessonPageProps) {
  const {gate, lesson} = await params;
  const currentLesson = getDetailedLessonForLegacyRoute(gate, lesson);
  if (!currentLesson) notFound();

  const stageId = stageForCourseLesson(gate, lesson);
  return (
    <LearningWorkbench
      initialStage={stageId}
      initialView="theory"
      detailedLessons={getDetailedLessonsForStage(stageId)}
      initialLessonCode={lesson}
    />
  );
}
