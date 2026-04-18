(function () {
  const subjectId = window.SUBJECT_ID;
  if (!subjectId) return;

  window.INFO_MD_BY_TOPIC_AND_FILE =
    window.INFO_MD_BY_TOPIC_AND_FILE || {};
  const md = String(window.__LEVELUP_INFO_MD_TEXT || "");

  if (!md) {
    console.warn("Infographics extra-info markdown missing from remote bootstrap.");
    return;
  }

  const byTopic = {};

  // Expected format:
  // #### Topic <id> ...
  // ### File: <filename>
  // <free-form markdown snippet; keep lines like `***` for dividers>
  // Support plain integers ("1") and dot-notation geography IDs ("1.1", "4.2")
  const topicRe = /^####\s+Topic\s+([0-9A-Za-z][0-9A-Za-z._-]*)/;
  const fileRe = /^###\s+File:\s*(.+?)\s*$/;

  let curTopic = null;
  let curFile = null;
  let buf = [];

  const commit = () => {
    if (!curTopic || !curFile) return;
    const snippet = buf.join("\n").trim();
    if (!snippet) return;
    byTopic[curTopic] = byTopic[curTopic] || {};
    byTopic[curTopic][curFile] = snippet;
  };

  const lines = md.split(/\r?\n/);
  for (const line of lines) {
    const tm = line.match(topicRe);
    if (tm) {
      commit();
      curTopic = tm[1];
      curFile = null;
      buf = [];
      continue;
    }

    const fm = line.match(fileRe);
    if (fm) {
      commit();
      curFile = fm[1].trim();
      buf = [];
      continue;
    }

    if (curTopic && curFile) buf.push(line);
  }
  commit();

  window.INFO_MD_BY_TOPIC_AND_FILE = byTopic;
})();

