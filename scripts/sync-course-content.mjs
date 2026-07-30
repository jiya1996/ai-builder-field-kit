import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "888AI资料包-关卡制交付版");
const outputPath = path.join(projectRoot, "app", "course-markdown.ts");

const sources = {
  g0: "10-关卡0-第一个网页上互联网/关卡0-通关手册.md",
  g1: "20-关卡1-每天会用的AI小工具/关卡1-通关手册.md",
  g2: "30-关卡2-别人能注册的真产品/关卡2-通关手册.md",
  g3: "40-关卡3-一半时间做出第二个/关卡3-通关手册.md",
  g4: "50-关卡4-毕业作品/关卡4-通关手册.md",
};

function prepareForPublicCourse(markdown) {
  return markdown
    .split("\n")
    .filter((line) => !line.includes("吸收自内部课程"))
    .join("\n")
    .replace(
      '这就是"验收的判断力"——竞品没有一家教这个。',
      '这就是“验收的判断力”。',
    )
    .replace(
      '**"不敢上线"。** 这是全市场的空白：所有竞品都教你把东西做出来，没有一家教你判断"这个东西敢不敢给别人用"。',
      '**“不敢上线”。** 很多学习路径只讲“把东西做出来”，本关进一步训练你判断“这个东西敢不敢给别人用”。',
    );
}

const entries = await Promise.all(
  Object.entries(sources).map(async ([gateId, relativePath]) => {
    const markdown = await readFile(path.join(sourceRoot, relativePath), "utf8");
    return [gateId, prepareForPublicCourse(markdown)];
  }),
);

const generated = `// Generated from the local learner-facing gate handbooks.
// Run \`npm run course:sync\` after those source documents change.
export const courseMarkdownByGate = ${JSON.stringify(Object.fromEntries(entries), null, 2)} as const;
`;

await writeFile(outputPath, generated, "utf8");
