/**
 * Generates data/theme1-matter/topic-01.js … data/theme3-sustainable/topic-19.js
 * Run: node scripts/build-all.mjs
 */
import { writeTopic } from "./emit-topic.js";
import { topicsTheme1 } from "./topics-chunk-1.mjs";
import { topicsTheme2 } from "./topics-chunk-2.mjs";
import { topicsTheme3 } from "./topics-chunk-3.mjs";

const OUT = {
  "1": "data/theme1-matter",
  "2": "data/theme1-matter",
  "3": "data/theme1-matter",
  "4": "data/theme1-matter",
  "5": "data/theme1-matter",
  "6": "data/theme2-reactions",
  "7": "data/theme2-reactions",
  "8": "data/theme2-reactions",
  "9": "data/theme2-reactions",
  "10": "data/theme2-reactions",
  "11": "data/theme2-reactions",
  "12": "data/theme2-reactions",
  "13": "data/theme2-reactions",
  "14": "data/theme2-reactions",
  "15": "data/theme2-reactions",
  "16": "data/theme2-reactions",
  "17": "data/theme3-sustainable",
  "18": "data/theme3-sustainable",
  "19": "data/theme3-sustainable",
};

const all = [...topicsTheme1, ...topicsTheme2, ...topicsTheme3];
for (const t of all) {
  const dir = OUT[t.id];
  if (!dir) throw new Error("No out dir for " + t.id);
  const fp = writeTopic(t, dir);
  console.log("Wrote", fp, "quiz:", t.quiz.length);
}
