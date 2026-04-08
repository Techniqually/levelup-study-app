import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SUBJECTS_ROOT = path.join(PROJECT_ROOT, "data", "subjects");

function isEscaped(str, idx) {
  let backslashes = 0;
  for (let i = idx - 1; i >= 0 && str[i] === "\\"; i -= 1) backslashes += 1;
  return backslashes % 2 === 1;
}

function findMatchingBracket(text, openIndex, openChar, closeChar) {
  let depth = 0;
  let inString = false;
  let quote = "";
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (ch === quote && !isEscaped(text, i)) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === openChar) depth += 1;
    else if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function toIdSafeToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "topic";
}

function getTopicKey(fileContent, fallbackFileName) {
  const topicIdMatch = fileContent.match(/\bid\s*:\s*["']([^"']+)["']/);
  if (topicIdMatch) {
    const raw = topicIdMatch[1].trim();
    if (/^\d+$/.test(raw)) return `T${Number(raw)}`;
    return toIdSafeToken(raw);
  }
  const fromFile = fallbackFileName.match(/topic-(\d+)/i);
  if (fromFile) return `T${Number(fromFile[1])}`;
  return toIdSafeToken(path.basename(fallbackFileName, ".js"));
}

function collectTopicFiles(dir, fileRegex = /^topic.*\.js$/i) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && fileRegex.test(entry.name)) {
        out.push(full);
      }
    }
  }
  return out.sort();
}

function processTopicFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const quizKeyIndex = content.indexOf("quiz:");
  if (quizKeyIndex === -1) return { updated: false, reason: "no quiz key" };

  const arrayOpenIndex = content.indexOf("[", quizKeyIndex);
  if (arrayOpenIndex === -1) return { updated: false, reason: "no quiz array open" };

  const arrayCloseIndex = findMatchingBracket(content, arrayOpenIndex, "[", "]");
  if (arrayCloseIndex === -1) return { updated: false, reason: "no quiz array close" };

  const quizRaw = content.slice(arrayOpenIndex, arrayCloseIndex + 1);
  const quizInner = quizRaw.slice(1, -1);

  const rel = path.relative(SUBJECTS_ROOT, filePath).split(path.sep);
  const subject = toIdSafeToken(rel[0] || "subject");
  const topicKey = getTopicKey(content, path.basename(filePath));
  const prefix = `${subject}-${topicKey}`;

  const existingIdRegex = /\bid\s*:\s*["']([^"']+)["']/g;
  const usedIds = new Set();
  let match;
  while ((match = existingIdRegex.exec(quizInner)) !== null) usedIds.add(match[1]);

  const prefixRegex = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-([0-9]{3,})$`);
  let maxSeq = 0;
  for (const id of usedIds) {
    const m = id.match(prefixRegex);
    if (m) maxSeq = Math.max(maxSeq, Number(m[1]));
  }

  const objectRanges = [];
  let inString = false;
  let quote = "";
  let depth = 0;
  let start = -1;
  for (let i = 0; i < quizInner.length; i += 1) {
    const ch = quizInner[i];
    if (inString) {
      if (ch === quote && !isEscaped(quizInner, i)) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0 && start >= 0) objectRanges.push([start, i + 1]);
    }
  }

  const inserts = [];
  let added = 0;
  for (const [s, e] of objectRanges) {
    const obj = quizInner.slice(s, e);
    const hasQuestion = /\bquestion\s*:/.test(obj);
    const hasId = /\bid\s*:/.test(obj);
    if (!hasQuestion || hasId) continue;

    let seq = maxSeq + 1;
    let id = `${prefix}-${String(seq).padStart(3, "0")}`;
    while (usedIds.has(id)) {
      seq += 1;
      id = `${prefix}-${String(seq).padStart(3, "0")}`;
    }
    maxSeq = seq;
    usedIds.add(id);
    inserts.push({ pos: s + 1, text: `id:"${id}",` });
    added += 1;
  }

  if (!added) return { updated: false, reason: "no missing ids" };

  let updatedInner = quizInner;
  for (let i = inserts.length - 1; i >= 0; i -= 1) {
    const { pos, text } = inserts[i];
    updatedInner = updatedInner.slice(0, pos) + text + updatedInner.slice(pos);
  }

  const updatedQuizRaw = `[${updatedInner}]`;
  content = content.slice(0, arrayOpenIndex) + updatedQuizRaw + content.slice(arrayCloseIndex + 1);
  fs.writeFileSync(filePath, content, "utf8");
  return { updated: true, added, prefix };
}

function main() {
  if (!fs.existsSync(SUBJECTS_ROOT)) {
    console.error(`Subjects root not found: ${SUBJECTS_ROOT}`);
    process.exitCode = 1;
    return;
  }

  const files = collectTopicFiles(SUBJECTS_ROOT);
  // const fileRegex = /^topic(?!-).*\.js$/i;
  // const files = collectTopicFiles(SUBJECTS_ROOT, fileRegex);
  let touched = 0;
  let addedTotal = 0;

  for (const filePath of files) {
    const result = processTopicFile(filePath);
    const rel = path.relative(PROJECT_ROOT, filePath);
    if (result.updated) {
      touched += 1;
      addedTotal += result.added;
      console.log(`✅ ${rel} (+${result.added} ids, prefix: ${result.prefix})`);
    } else {
      console.log(`ℹ️  ${rel} (${result.reason})`);
    }
  }

  console.log(`\nDone. Updated ${touched}/${files.length} files, added ${addedTotal} missing quiz ids.`);
}

main();