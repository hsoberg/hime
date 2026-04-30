import fs from "node:fs/promises";

const source = await fs.readFile(new URL("../lib/channelData.ts", import.meta.url), "utf8");
const urls = Array.from(new Set(source.match(/https:\/\/[^"']+/g) ?? []));
const broken = [];

for (const url of urls) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });

    if (!response.ok) {
      broken.push(`${response.status} ${url}`);
    }
  } catch (error) {
    broken.push(`ERR ${url} (${error instanceof Error ? error.message : "unknown error"})`);
  }
}

if (broken.length > 0) {
  console.error("Broken channel logo URLs:");
  console.error(broken.join("\n"));
  process.exit(1);
}

console.log(`All ${urls.length} channel logo URLs responded successfully.`);
