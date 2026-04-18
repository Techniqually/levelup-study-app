#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const SCRIPT_FILE = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(SCRIPT_FILE), "..", "..");
const DATA_SUBJECTS_DIR = path.join(ROOT, "content", "data", "subjects");
const SHOP_REWARDS_PATH = path.join(ROOT, "content", "data", "shop-rewards.js");

function parseArgs(argv) {
  const out = {
    subject: "chemistry",
    bucket: "study-materials",
    dryRun: false,
    freeTopic: "",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--subject") out.subject = String(argv[++i] || "").trim();
    else if (a === "--bucket") out.bucket = String(argv[++i] || "").trim();
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--free-topic") out.freeTopic = String(argv[++i] || "").trim();
    else throw new Error(`Unknown arg: ${a}`);
  }
  return out;
}

function requiredEnv(name) {
  const v = String(process.env[name] || "").trim();
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(abs)));
    else out.push(abs);
  }
  return out;
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function buildManifestJson(subjectDir) {
  const manifestJsPath = path.join(subjectDir, "topics-manifest.js");
  const code = await fs.readFile(manifestJsPath, "utf8");
  const sandbox = {
    window: {},
    console: { log() {}, warn() {}, error() {} },
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: "topics-manifest.js" });
  const list = sandbox.window.TOPICS_MANIFEST;
  if (!Array.isArray(list) || !list.length) {
    throw new Error("Failed to extract TOPICS_MANIFEST from topics-manifest.js");
  }
  return Buffer.from(JSON.stringify({ topics: list }, null, 2), "utf8");
}

async function fetchRemoteManifest(url, key, bucket, subject) {
  const objPath = `${subject}/.upload-manifest.json`;
  const res = await fetch(
    `${url.replace(/\/+$/, "")}/storage/v1/object/${encodeURIComponent(bucket)}/${objPath}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
    }
  );
  const body = await res.text();
  if (res.status === 404) return {};
  if (res.status === 400 && body.includes("Object not found")) return {};
  if (!res.ok) throw new Error(`Failed downloading remote manifest: ${res.status} ${body}`);
  return JSON.parse(body);
}

async function uploadObject(url, key, bucket, objectPath, body, contentType, dryRun) {
  if (dryRun) return;
  const res = await fetch(
    `${url.replace(/\/+$/, "")}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "x-upsert": "true",
        "content-type": contentType || "application/octet-stream",
      },
      body,
    }
  );
  if (!res.ok) throw new Error(`Upload failed ${objectPath}: ${res.status} ${await res.text()}`);
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".md")) return "text/markdown; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

function extractPreviewImageFiles(topicJs, subject) {
  const out = new Set();
  const s = String(subject || "").toLowerCase();
  // Matches:
  // - data/subjects/<subject>/images/<file>
  // - <subject>/images/<file>
  const re = new RegExp(
    `(?:data\\/subjects\\/${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/images\\/|${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/images\\/)([^"'\\s)]+)`,
    "gi"
  );
  let m;
  while ((m = re.exec(topicJs))) {
    const name = String(m[1] || "").split("?")[0].trim();
    if (name) out.add(name);
  }
  return Array.from(out);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const subject = args.subject.toLowerCase();
  const subjectDir = path.join(DATA_SUBJECTS_DIR, subject);
  const supabaseUrl = requiredEnv("SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  const files = (await walk(subjectDir)).filter((abs) => {
    const rel = path.relative(subjectDir, abs).replace(/\\/g, "/");
    return !rel.startsWith(".");
  });

  const uploadMap = {};
  for (const abs of files) {
    const rel = path.relative(subjectDir, abs).replace(/\\/g, "/");
    const buf = await fs.readFile(abs);
    uploadMap[`${subject}/${rel}`] = {
      buf,
      hash: sha256(buf),
      contentType: contentTypeFor(abs),
    };
  }

  // Also upload parsed JSON manifest for remote loader.
  const manifestJson = await buildManifestJson(subjectDir);
  uploadMap[`${subject}/topics-manifest.json`] = {
    buf: manifestJson,
    hash: sha256(manifestJson),
    contentType: "application/json; charset=utf-8",
  };

  // Shared runtime data required by subject bootstrap.
  const shopRewards = await fs.readFile(SHOP_REWARDS_PATH);
  uploadMap["shared/shop-rewards.js"] = {
    buf: shopRewards,
    hash: sha256(shopRewards),
    contentType: contentTypeFor(SHOP_REWARDS_PATH),
  };

  // Optional free preview copy (e.g. --free-topic theme1-matter/topic-01.js).
  if (args.freeTopic) {
    const srcKey = `${subject}/${args.freeTopic.replace(/^\/+/, "")}`;
    const src = uploadMap[srcKey];
    if (!src) throw new Error(`--free-topic not found in subject folder: ${args.freeTopic}`);
    const base = path.basename(args.freeTopic);
    let freeTopicBuf = src.buf;
    const topicText = src.buf.toString("utf8");
    const imageFiles = extractPreviewImageFiles(topicText, subject);
    // Keep preview fully self-contained by copying referenced images into
    // <subject>/free/images/* and rewriting the free topic copy to those keys.
    if (imageFiles.length) {
      imageFiles.forEach((filename) => {
        const srcImageKey = `${subject}/images/${filename}`;
        const srcImage = uploadMap[srcImageKey];
        if (!srcImage) {
          process.stdout.write(`Warn: preview image missing in subject/images: ${srcImageKey}\n`);
          return;
        }
        uploadMap[`${subject}/free/images/${filename}`] = {
          buf: srcImage.buf,
          hash: srcImage.hash,
          contentType: srcImage.contentType,
        };
      });
      const escapedSubject = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rewritten = topicText
        .replace(
          new RegExp(`data/subjects/${escapedSubject}/images/`, "g"),
          `${subject}/free/images/`
        )
        .replace(
          new RegExp(`${escapedSubject}/images/`, "g"),
          `${subject}/free/images/`
        );
      freeTopicBuf = Buffer.from(rewritten, "utf8");
    }
    uploadMap[`${subject}/free/${base}`] = {
      buf: freeTopicBuf,
      hash: sha256(freeTopicBuf),
      contentType: src.contentType,
    };
  }

  const remoteManifest = await fetchRemoteManifest(supabaseUrl, serviceRoleKey, args.bucket, subject);
  const nextManifest = { subject, files: {} };
  let uploaded = 0;
  let skipped = 0;

  for (const [objPath, payload] of Object.entries(uploadMap)) {
    const prevHash = remoteManifest.files && remoteManifest.files[objPath];
    nextManifest.files[objPath] = payload.hash;
    if (prevHash === payload.hash) {
      skipped += 1;
      continue;
    }
    await uploadObject(
      supabaseUrl,
      serviceRoleKey,
      args.bucket,
      objPath,
      payload.buf,
      payload.contentType,
      args.dryRun
    );
    uploaded += 1;
    process.stdout.write(`Uploaded: ${objPath}\n`);
  }

  const manifestBytes = Buffer.from(JSON.stringify(nextManifest, null, 2), "utf8");
  await uploadObject(
    supabaseUrl,
    serviceRoleKey,
    args.bucket,
    `${subject}/.upload-manifest.json`,
    manifestBytes,
    "application/json; charset=utf-8",
    args.dryRun
  );

  process.stdout.write(
    `Done. subject=${subject}, uploaded=${uploaded}, skipped=${skipped}, dryRun=${args.dryRun}\n`
  );
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
