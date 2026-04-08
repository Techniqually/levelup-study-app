(function () {
  const subjectId = window.SUBJECT_ID;
  if (!subjectId) return;

  // Browsers block XHR/fetch from `file://` in many configurations.
  // In that case, the app can still render images, but the "extra info" won't load.
  if (typeof window.location !== "undefined" && window.location.protocol === "file:") {
    console.warn(
      "Infographics extra-info requires running the app via http:// (local server)."
    );
    return;
  }

  window.INFO_MD_BY_TOPIC_AND_FILE =
    window.INFO_MD_BY_TOPIC_AND_FILE || {};

  // Try both relative locations:
  // - root subject shells (study.html): data/subjects/...
  // - nested subject shells (physics/index.html): ../data/subjects/...
  const candidates = [
    `data/subjects/${subjectId}/infographics-info.md`,
    `../data/subjects/${subjectId}/infographics-info.md`,
  ];

  let md = "";
  let lastStatus = null;
  for (const url of candidates) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false); // sync by design; renderVisuals is sync
      xhr.send(null);
      lastStatus = xhr.status;
      if (xhr.status === 200 && xhr.responseText) {
        md = xhr.responseText;
        break;
      }
    } catch (_) {}
  }

  if (!md) {
    console.warn(
      "Infographics extra-info markdown failed to load.",
      { candidates, lastStatus }
    );
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

