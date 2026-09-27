import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const sourceRoot = path.resolve(projectRoot, "..");
const detailsSource = path.join(sourceRoot, "details");
const assetsOutput = path.join(projectRoot, "public", "legacy-assets");
const bundleOutput = path.join(projectRoot, "data", "legacy-content.json");
const editorialOverridesInput = path.join(projectRoot, "data", "editorial-overrides.json");

function cleanText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function firstMatch(source, regex) {
  return source.match(regex)?.[1] ?? "";
}

function numberAttr(attrs, name, fallback) {
  const parsed = Number.parseInt(
    firstMatch(attrs, new RegExp(`\\b${name}="?([0-9]+)`, "i")),
    10,
  );
  return Number.isFinite(parsed) ? parsed : fallback;
}

function assetPath(source) {
  return source
    .replace(/^\.\.\//, "/legacy-")
    .replace(/^\.\//, "/legacy-")
    .replace(/^assets\//, "/legacy-assets/");
}

function isRecord(value) {
  return typeof value === "object" && value !== null;
}

function isLegacyItem(value) {
  return isRecord(value) && typeof value.title === "string";
}

function toItems(value) {
  return Array.isArray(value) ? value.filter(isLegacyItem) : [];
}

function normalizePayload(value) {
  const source = isRecord(value) ? value : {};
  const data = isRecord(source.data) ? source.data : {};
  return {
    data: {
      methods: toItems(data.methods),
      materials: toItems(data.materials),
      tools: toItems(data.tools),
      processes: toItems(data.processes),
      reasons: toItems(data.reasons),
      comparisons: toItems(data.comparisons),
      timeline: toItems(data.timeline),
      stories: toItems(data.stories),
      countries: toItems(data.countries),
      masters: toItems(data.masters),
    },
    caseStudies: toItems(source.caseStudies),
    methodLessons: isRecord(source.methodLessons) ? source.methodLessons : {},
    searchIndex: toItems(source.searchIndex),
  };
}

function imageFromAttrs(attrs) {
  const source = firstMatch(attrs, /\bsrc=["']([^"']+)["']/i);
  if (!source) return null;
  return {
    src: assetPath(source),
    alt: cleanText(
      firstMatch(attrs, /\balt=["']([^"']*)["']/i) || "瓷器修補資料圖",
    ),
    width: numberAttr(attrs, "width", 720),
    height: numberAttr(attrs, "height", 480),
  };
}

function firstUsefulParagraph(html) {
  return (
    Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
      .map((match) => cleanText(match[1]))
      .find((text) => text.length > 18) ?? ""
  );
}

async function readDetail(file) {
  const html = await readFile(path.join(detailsSource, file), "utf8");
  const slug = file.replace(/\.html$/, "");
  const title = cleanText(
    firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
      firstMatch(html, /<title>([\s\S]*?)<\/title>/i) ||
      slug,
  );
  const description =
    cleanText(firstMatch(html, /<meta name="description" content="([^"]*)"/i)) ||
    firstUsefulParagraph(html) ||
    "這頁保留舊站資料，方便再核對方法、材料、人物同來源。";
  const paragraphs = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
    .map((match) => cleanText(match[1]))
    .filter((text) => text.length > 18);
  const images = Array.from(html.matchAll(/<img\b([^>]*)>/gi))
    .map((match) => imageFromAttrs(match[1]))
    .filter((image) => image !== null)
    .slice(0, 6);
  const sourceMap = new Map();
  for (const match of html.matchAll(
    /<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
  )) {
    const label = cleanText(match[2]);
    if (label.length >= 2 && !sourceMap.has(match[1])) {
      sourceMap.set(match[1], { href: match[1], label });
    }
  }

  return {
    slug,
    family: slug.split("-")[0] || "detail",
    title,
    description,
    paragraphs: paragraphs.length > 0 ? paragraphs : [description],
    images,
    sources: [...sourceMap.values()],
  };
}

async function readPayload() {
  const source = await readFile(path.join(sourceRoot, "app.js"), "utf8");
  const match = source.match(/const payload = ([\s\S]*?);\s*const data = payload\.data;/);
  if (!match) {
    throw new SyntaxError("Could not locate the legacy payload in app.js");
  }
  return normalizePayload(Function(`"use strict"; return (${match[1]});`)());
}

async function readEditorialOverrides() {
  const source = JSON.parse(await readFile(editorialOverridesInput, "utf8"));
  return isRecord(source.details) ? source.details : {};
}

function applyEditorialOverride(detail, overrides) {
  const override = overrides[detail.slug];
  if (!isRecord(override)) return detail;

  const paragraphs = [...detail.paragraphs];
  if (isRecord(override.paragraphs)) {
    for (const [rawIndex, value] of Object.entries(override.paragraphs)) {
      const index = Number.parseInt(rawIndex, 10);
      if (Number.isInteger(index) && index >= 0 && index < paragraphs.length && typeof value === "string") {
        paragraphs[index] = value;
      }
    }
  }

  return {
    ...detail,
    description: typeof override.description === "string" ? override.description : detail.description,
    paragraphs,
  };
}

async function resetAssetOutput() {
  const expectedPrefix = `${projectRoot}${path.sep}`;
  if (!assetsOutput.startsWith(expectedPrefix)) {
    throw new RangeError("Generated asset directory escaped the site project");
  }
  try {
    const current = await lstat(assetsOutput);
    if (current.isSymbolicLink()) {
      await unlink(assetsOutput);
    } else {
      await rm(assetsOutput, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 300,
      });
    }
  } catch (error) {
    if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") {
      throw error;
    }
  }
  await mkdir(assetsOutput, { recursive: true });
}

async function copyRenderedAssets(details) {
  const publicPaths = new Set([
    "/legacy-assets/images/index.png",
    ...details.flatMap((detail) => detail.images.map((image) => image.src)),
  ]);

  for (const publicPath of publicPaths) {
    if (!publicPath.startsWith("/legacy-assets/")) {
      throw new TypeError(`Unsupported local image path: ${publicPath}`);
    }
    const relativePath = publicPath.slice("/legacy-assets/".length);
    const source = path.join(sourceRoot, "assets", relativePath);
    const destination = path.join(assetsOutput, relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(source, destination);
  }
  return publicPaths.size;
}

async function main() {
  const detailFiles = (await readdir(detailsSource))
    .filter((file) => file.endsWith(".html"))
    .sort((left, right) => left.localeCompare(right));
  const [rawDetails, editorialOverrides] = await Promise.all([
    Promise.all(detailFiles.map((file) => readDetail(file))),
    readEditorialOverrides(),
  ]);
  const details = rawDetails.map((detail) => applyEditorialOverride(detail, editorialOverrides));
  const payload = await readPayload();

  await resetAssetOutput();
  const imageCount = await copyRenderedAssets(details);
  await mkdir(path.dirname(bundleOutput), { recursive: true });
  await writeFile(
    bundleOutput,
    `${JSON.stringify({ payload, details }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Prepared ${details.length} detail pages and ${imageCount} images.`);
}

await main();
