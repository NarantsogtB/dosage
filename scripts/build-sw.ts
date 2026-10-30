/**
 * `next build`-ийн дараа: `out/`-ийг уншиж `out/sw.js` үүсгэнэ.
 *
 * Кэшийн нэр = Next-ийн BUILD_ID → deploy бүр шинэ кэш, хуучин нь
 * `activate` үед устна. Шинэ dependency (Workbox, Serwist) АШИГЛААГҮЙ:
 * статик сайтад 60 мөр SW хангалттай, шалгаж болохуйц.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { precacheUrls } from "@/lib/pwa/precache";

const OUT = "out";
const TEMPLATE = "scripts/sw.template.js";

const filesIn = (dir: string): readonly string[] =>
  readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => statSync(path.join(dir, file)).isFile())
    .map((file) => file.split(path.sep).join("/"));

const versionOf = (urls: readonly string[]): string =>
  existsSync(".next/BUILD_ID")
    ? readFileSync(".next/BUILD_ID", "utf8").trim()
    : createHash("sha256").update(urls.join("\n")).digest("hex").slice(0, 12);

const files = filesIn(OUT);
const urls = precacheUrls(files);
const version = versionOf(urls);

const sw = readFileSync(TEMPLATE, "utf8")
  .replace("__VERSION__", version)
  .replace("__PRECACHE__", JSON.stringify(urls));

writeFileSync(path.join(OUT, "sw.js"), sw);
console.log(`out/sw.js: ${urls.length} URL урьдчилан кэшлэнэ (хувилбар ${version}).`);
