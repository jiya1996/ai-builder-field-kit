import {readFile} from "node:fs/promises";

const source = await readFile(new URL("../app/stage-data.ts", import.meta.url), "utf8");
const urls = [...new Set(
  [...source.matchAll(/href:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => url.startsWith("https://")),
)];

const hardFailures = [];
const warnings = [];

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      headers: {"user-agent": "AI-Builder-Field-Kit-Link-Check/1.0"},
    });

    if (response.status === 404 || response.status === 410) {
      hardFailures.push(`${response.status} ${url}`);
    } else if (response.status >= 400 && ![401, 403, 405, 429].includes(response.status)) {
      warnings.push(`${response.status} ${url}`);
    }
  } catch (error) {
      warnings.push(`NETWORK ${url} · ${error instanceof Error ? error.message : String(error)}`);
  }
}

const concurrency = 6;
for (let index = 0; index < urls.length; index += concurrency) {
  await Promise.all(urls.slice(index, index + concurrency).map(checkUrl));
}

console.log(`Checked ${urls.length} official course links.`);
if (warnings.length) {
  console.warn(`Warnings (${warnings.length}):\n${warnings.map((item) => `- ${item}`).join("\n")}`);
}
if (hardFailures.length) {
  console.error(`Broken links (${hardFailures.length}):\n${hardFailures.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
}
