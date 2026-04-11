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
        // Avoid breaking math like `$v=gt` by our `*italic*` / `**bold**` transforms.
        // We only apply inline markdown to non-math segments.
        .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
        .map((seg) => {
          if (!seg) return seg;
          if (seg[0] === "$") return seg; // preserve math delimiters for KaTeX
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
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
      return;
    }
    if (tryNum >= 20) return;
    setTimeout(() => renderMathWhenReady(el, tryNum + 1), 50);
  }

