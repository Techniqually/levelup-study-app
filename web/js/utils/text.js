function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }
  
  function renderMiniMarkdown(md) {
    if (md == null) return "";
    const raw = String(md);
    const safe = escapeHtml(raw);

    const inline = (s) =>
      s
        // Avoid breaking math by our `*italic*` / `**bold**` transforms — only
        // touch non-math segments. Supports `$...$`, `$$...$$`, and LaTeX `\(...\)`,
        // `\[...\]` (same as most topic JSON / quiz strings).
        .split(
          /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\([\s\S]*?\\\)|\\[[\s\S]*?\\])/g
        )
        .map((seg) => {
          if (!seg) return seg;
          if (seg[0] === "$") return seg;
          if (seg.slice(0, 2) === "\\(" || seg.slice(0, 2) === "\\[") return seg;
          return seg
            // inline code
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            // bold
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            // italic (best-effort; avoids affecting strong because ** already handled)
            .replace(/\*([^*]+)\*/g, "<em>$1</em>");
        })
        .join("");

    const lines = safe.split(/\r?\n/);
    const parts = [];
    let inUl = false;

    for (const ln of lines) {
      const t = ln.trim();
      if (!t) {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push("<br/>");
        continue;
      }

      if (t === "***") {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<hr class="mini-divider" />`);
        continue;
      }

      const m = ln.match(/^\s*[-*]\s+(.*)$/);
      if (m) {
        if (!inUl) {
          parts.push("<ul class='mini-md'>");
          inUl = true;
        }
        parts.push(`<li>${inline(m[1])}</li>`);
      } else {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<div>${inline(ln)}</div>`);
      }
    }

    if (inUl) parts.push("</ul>");
    return parts.join("");
  }

  function renderMathWhenReady(el, attempt) {
    const tryNum = Number(attempt || 0);
    if (typeof window.renderMathInElement === "function" && el && el.querySelector) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
      return;
    }
    if (tryNum >= 20) return;
    setTimeout(() => renderMathWhenReady(el, tryNum + 1), 50);
  }

