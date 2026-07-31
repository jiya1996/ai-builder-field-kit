import {courseLessonRoutes, getCourseLesson, getLessonMarkdown} from "./course-content";

export type DetailedLesson = {
  stageId: string;
  code: string;
  title: string;
  time: string;
  input: string;
  learn: string;
  practice: string;
  evidence: string;
  markdown: string;
  originalHref: string;
};

const lessonStageMap: Record<string, string> = {
  "g0/0.0": "s00",
  "g0/0.1": "s00",
  "g0/0.2": "s00",
  "g0/0.3": "s00",
  "g0/0.4": "s00",
  "g0/0.5": "s00",
  "g0/0.6": "s00",

  "g1/1.0": "s01",
  "g1/1.1": "s03",
  "g1/1.2": "s03",
  "g1/1.3": "s02",
  "g1/1.4": "s05",
  "g1/1.5": "s05",
  "g1/1.6": "s09",
  "g1/1.7": "s09",
  "g1/1.8": "s10",

  "g2/2.0": "s01",
  "g2/2.1": "s01",
  "g2/2.2": "s02",
  "g2/2.3": "s02",
  "g2/2.4": "s04",
  "g2/2.5": "s04",
  "g2/2.6": "s04",
  "g2/2.7": "s04",
  "g2/2.8": "s05",
  "g2/2.9": "s09",
  "g2/2.10": "s04",
  "g2/2.11": "s09",
  "g2/2.12": "s09",
  "g2/2.13": "s07",
  "g2/2.14": "s10",

  "g3/3.0": "s10",
  "g3/3.1": "s10",
  "g3/3.2": "s10",
  "g3/3.3": "s10",
  "g3/3.4": "s08",
  "g3/3.5": "s10",
  "g3/3.6": "s10",

  "g4/4.0": "s01",
  "g4/4.1": "s01",
  "g4/4.2": "s01",
  "g4/4.3": "s10",
  "g4/4.4": "s10",
  "g4/4.5": "s10",
  "g4/4.6": "s10",
};

export function stageForCourseLesson(gateId: string, lessonCode: string) {
  return lessonStageMap[`${gateId}/${lessonCode}`] ?? "s00";
}

function toDetailedLesson(gateId: string, lessonCode: string): DetailedLesson | null {
  const courseLesson = getCourseLesson(gateId, lessonCode);
  const markdown = getLessonMarkdown(gateId, lessonCode);
  if (!courseLesson || !markdown) return null;

  return {
    stageId: stageForCourseLesson(gateId, lessonCode),
    code: courseLesson.lesson.code,
    title: courseLesson.lesson.title,
    time: courseLesson.lesson.time,
    input: courseLesson.lesson.input,
    learn: courseLesson.lesson.learn,
    practice: courseLesson.lesson.practice,
    evidence: courseLesson.lesson.evidence,
    markdown,
    originalHref: courseLesson.href,
  };
}

export function getDetailedLessonsForStage(stageId: string) {
  return courseLessonRoutes
    .filter(({gate, lesson}) => stageForCourseLesson(gate.id, lesson.code) === stageId)
    .map(({gate, lesson}) => toDetailedLesson(gate.id, lesson.code))
    .filter((lesson): lesson is DetailedLesson => lesson !== null);
}

export function getAllDetailedLessons() {
  return courseLessonRoutes
    .map(({gate, lesson}) => toDetailedLesson(gate.id, lesson.code))
    .filter((lesson): lesson is DetailedLesson => lesson !== null);
}

export function getDetailedLessonForLegacyRoute(gateId: string, lessonCode: string) {
  return toDetailedLesson(gateId, lessonCode);
}

export function getMappedLessonCount() {
  return Object.keys(lessonStageMap).length;
}
