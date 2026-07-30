import { courseGates } from "./course-data";
import { courseMarkdownByGate } from "./course-markdown";

export const courseLessonRoutes = courseGates.flatMap((gate) =>
  gate.lessons.map((lesson) => ({
    gate,
    lesson,
    href: `/learn/${gate.id}/${lesson.code}`,
  })),
);

export function getCourseLesson(gateId: string, lessonCode: string) {
  return courseLessonRoutes.find(
    (route) => route.gate.id === gateId && route.lesson.code === lessonCode,
  );
}

export function getLessonMarkdown(gateId: string, lessonCode: string) {
  const markdown =
    courseMarkdownByGate[gateId as keyof typeof courseMarkdownByGate];
  if (!markdown) return null;

  const escapedCode = lessonCode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingPattern = new RegExp(`^##\\s+${escapedCode}(?:\\s|·|$).*?$`, "m");
  const headingMatch = markdown.match(headingPattern);
  if (!headingMatch || headingMatch.index === undefined) return null;

  const bodyStart = markdown.indexOf("\n", headingMatch.index);
  if (bodyStart === -1) return null;

  const remaining = markdown.slice(bodyStart + 1);
  const nextHeadingOffset = remaining.search(/^##\s+/m);
  const section =
    nextHeadingOffset === -1 ? remaining : remaining.slice(0, nextHeadingOffset);

  return section.replace(/\n---\s*$/, "").trim();
}
