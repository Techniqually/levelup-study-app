// IS5126 Quiz — merged loader for split DB files.
// Each file (1-db.js, 2-db.js, ... 9-db.js except 6) defines `const QUIZ_DB = [...]`.

const DB_CHUNK_VERSION = "2026-03-17-2";
const db_files = ["1-db.js", "2-db.js", "3-db.js", "4-db.js", "5-db.js", "7-db.js", "8-db.js", "9-db.js"];
let QUIZ_DB = [];

async function loadQuizDb() {
  const chunks = await Promise.all(
    db_files.map(async (file) => {
      const fileUrl = `${file}?v=${encodeURIComponent(DB_CHUNK_VERSION)}`;
      const res = await fetch(fileUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed loading ${file}: ${res.status}`);
      const js = await res.text();
      const extractor = new Function(`${js}; return (typeof QUIZ_DB !== 'undefined' ? QUIZ_DB : []);`);
      const part = extractor();
      return Array.isArray(part) ? part : [];
    })
  );
  QUIZ_DB = chunks.flat();
  if (typeof window !== "undefined") window.QUIZ_DB = QUIZ_DB;
  return QUIZ_DB;
}

if (typeof window !== "undefined") {
  window.DB_CHUNK_VERSION = DB_CHUNK_VERSION;
  window.db_files = db_files;
  window.QUIZ_DB = QUIZ_DB;
  window.loadQuizDb = loadQuizDb;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DB_CHUNK_VERSION, db_files, QUIZ_DB, loadQuizDb };
}
