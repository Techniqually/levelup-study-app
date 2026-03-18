/**
 * Usage: node scripts/emit-topic.js <id> <themeLabel> <title> <outDir>
 * Reads topic JSON from stdin, writes data/<dir>/topic-NN.js
 * Or: import buildTopicFile from this module from build-all.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function buildTopicFile(topic) {
  const {
    id,
    theme,
    title,
    cheatBlocks,
    infographics = [],
    flashcards,
    quiz,
    trueFalse,
    orderGame,
    orderTitle,
  } = topic;

  const Q = (q, o, c, e) =>
    `{question:${j(q)},options:${j(o)},correctIndex:${c},explanation:${j(e)}}`;
  const TF = (s, c, x) =>
    `{statement:${j(s)},correct:${c},explain:${j(x)}}`;

  function j(s) {
    return JSON.stringify(s);
  }

  const quizStr = quiz.map((x) => Q(x[0], x[1], x[2], x[3])).join(",\n    ");
  const tfStr = trueFalse.map((x) => TF(x[0], x[1], x[2])).join(",\n    ");

  let inf = "";
  if (infographics.length) {
    inf = `infographics: [\n${infographics
      .map(
        (g) =>
          `      { svg: ${j(g.svg)}, caption: ${j(g.caption || "")} }`
      )
      .join(",\n")}\n    ],\n    `;
  }

  let ord = "";
  if (orderGame && orderGame.length) {
    ord = `orderGame: ${j(orderGame)},\n    orderTitle: ${j(orderTitle || "")},\n    `;
  }

  return `(function () {
  window.__registerTopic({
    id: ${j(id)},
    theme: ${j(theme)},
    title: ${j(title)},
    cheatBlocks: ${JSON.stringify(cheatBlocks, null, 4).replace(/\n/g, "\n    ")},
    ${inf}flashcards: ${JSON.stringify(flashcards, null, 4).replace(/\n/g, "\n    ")},
    quiz: [
    ${quizStr}
    ],
    trueFalse: [
    ${tfStr}
    ],
    ${ord}});
})();
`;
}

export function writeTopic(topic, outDir) {
  const nn = String(topic.id).padStart(2, "0");
  const dir = path.join(__dirname, "..", outDir);
  fs.mkdirSync(dir, { recursive: true });
  const fp = path.join(dir, `topic-${nn}.js`);
  fs.writeFileSync(fp, buildTopicFile(topic), "utf8");
  return fp;
}
