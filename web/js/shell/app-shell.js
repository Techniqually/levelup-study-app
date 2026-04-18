(function () {
  // Shared page chrome (header + mobile drawer + footer) for landing, hub, parent.
  // Pages embed a <div id="levelup-shell" data-page="landing|hub|parent"></div> container
  // anywhere near the top of <body>; this script writes the header into it, and the
  // footer into a <footer id="levelup-footer"></footer> (auto-created if missing).

  var NAV = [
    { id: "home",   label: "Home",             href: "index.html" },
    { id: "hub",    label: "Subjects",         href: "hub.html",    auth: true },
    { id: "parent", label: "Parent dashboard", href: "parent.html", auth: true },
  ];

  var PAGE_MAP = {
    landing: "home",
    hub: "hub",
    parent: "parent",
    subject: "hub",
    profile: "hub",
    pricing: "home",
    privacy: "home",
    terms: "home",
  };

  // Pages that should show the global "Shop" button when the user is signed in.
  var SHOP_PAGES = { hub: 1, subject: 1, profile: 1 };

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") e.className = attrs[k];
        else if (k === "html") e.innerHTML = attrs[k];
        else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) e.innerHTML = html;
    return e;
  }

  var brandMark = (
    '<span class="brand__mark" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" fill="none">' +
    '<path d="M4 16 L10 6 L12 10 L16 4 L20 12 L12 20 Z" fill="#0b1020" opacity="0.9"/>' +
    '</svg></span>'
  );

  function brand(asLink) {
    var inner = brandMark + '<span class="brand__word">LevelUp</span>';
    if (asLink) {
      var a = el("a", { class: "brand", href: "index.html", "aria-label": "LevelUp home" });
      a.innerHTML = inner;
      return a;
    }
    var s = el("span", { class: "brand" });
    s.innerHTML = inner;
    return s;
  }

  function hamburgerIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
      '<path d="M4 7h16M4 12h16M4 17h16"/></svg>'
    );
  }
  function closeIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
      '<path d="M6 6l12 12M18 6L6 18"/></svg>'
    );
  }

  function buildNavLinks(page) {
    var activeId = PAGE_MAP[page] || null;
    return NAV.map(function (n) {
      var attrs = ' href="' + n.href + '"';
      if (n.id === activeId) attrs += ' aria-current="page"';
      return "<a" + attrs + ">" + n.label + "</a>";
    }).join("");
  }

  function buildHeader(page) {
    var header = el("header", { class: "site-header" });
    var inner = el("div", { class: "container site-header__inner" });
    inner.appendChild(brand(true));

    var nav = el("nav", { class: "site-nav", "aria-label": "Primary" });
    nav.innerHTML = buildNavLinks(page);
    inner.appendChild(nav);

    var cta = el("div", { class: "site-header__cta" });
    if (page === "landing") {
      cta.innerHTML =
        '<a class="btn btn-outline btn-sm" href="pricing.html">Pricing</a>' +
        '<button class="btn btn-outline btn-sm js-signin" type="button">Sign in</button>' +
        '<button class="btn btn-primary btn-sm js-signin" type="button" data-umami-event="header-cta-click">Get started</button>';
    } else {
      var shopBtn = SHOP_PAGES[page]
        ? '<button class="btn btn-outline btn-sm levelup-shop-trigger" id="levelup-shop-btn" type="button" title="Spend your XP">' +
          '<span aria-hidden="true">🛒</span>&nbsp;Shop' +
          '<span class="levelup-shop-xp" id="levelup-shop-xp" hidden></span>' +
          '</button>'
        : "";
      var profileLink =
        page === "profile"
          ? '<span class="profile-pill__name" id="levelup-name">Student</span>'
          : '<a class="profile-pill__name" id="levelup-name" href="profile.html">Student</a>';
      cta.innerHTML =
        shopBtn +
        '<div class="profile-pill" id="levelup-profile" hidden>' +
        '<span class="profile-pill__avatar" id="levelup-avatar">S</span>' +
        profileLink +
        '<button class="btn-ghost profile-pill__out" id="levelup-signout" type="button" title="Sign out" aria-label="Sign out">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>' +
        '</svg></button>' +
        '</div>';
    }
    inner.appendChild(cta);

    var toggle = el("button", {
      class: "nav-toggle",
      type: "button",
      "aria-label": "Open menu",
      "aria-controls": "levelup-drawer",
      "aria-expanded": "false",
    });
    toggle.innerHTML = hamburgerIcon();
    inner.appendChild(toggle);

    header.appendChild(inner);
    return { header: header, toggle: toggle };
  }

  function buildDrawer(page) {
    var drawer = el("div", {
      class: "mobile-drawer",
      id: "levelup-drawer",
      "aria-hidden": "true",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Menu",
    });
    var top = el("div", { class: "mobile-drawer__top" });
    top.appendChild(brand(false));
    var close = el("button", {
      class: "nav-toggle",
      type: "button",
      "aria-label": "Close menu",
      id: "levelup-drawer-close",
    });
    close.innerHTML = closeIcon();
    top.appendChild(close);
    drawer.appendChild(top);

    var nav = el("nav", { class: "mobile-drawer__nav", "aria-label": "Mobile primary" });
    nav.innerHTML = buildNavLinks(page);
    drawer.appendChild(nav);

    if (page === "landing") {
      var cta = el("div", { class: "stack" });
      cta.innerHTML =
        '<a class="btn btn-outline btn-lg" href="pricing.html">See pricing</a>' +
        '<button class="btn btn-primary btn-lg js-signin" type="button">Get started with Google</button>' +
        '<button class="btn btn-outline js-signin" type="button">I already have an account</button>';
      drawer.appendChild(cta);
    } else {
      var out = el("div", { class: "stack" });
      var shopBtn = SHOP_PAGES[page]
        ? '<button class="btn btn-outline levelup-shop-trigger" id="levelup-drawer-shop" type="button">🛒 Shop (spend XP)</button>'
        : "";
      out.innerHTML =
        shopBtn +
        '<a class="btn btn-outline" href="profile.html">My profile</a>' +
        '<button class="btn btn-outline" type="button" id="levelup-drawer-signout">Sign out</button>';
      drawer.appendChild(out);
    }

    var foot = el("div", { class: "mobile-drawer__foot" });
    foot.innerHTML =
      '<div>© ' + new Date().getFullYear() + ' LevelUp · Study smarter.</div>' +
      '<div><a href="parent.html">Parent dashboard</a></div>';
    drawer.appendChild(foot);

    return { drawer: drawer, close: close };
  }

  function buildFooter() {
    var foot = el("footer", { class: "site-footer", id: "levelup-footer" });
    var wrap = el("div", { class: "container" });
    wrap.innerHTML =
      '<div class="site-footer__grid">' +
      '  <div class="site-footer__col">' +
      '    <div class="site-footer__brand">' +
      brandMark +
      '      <span class="brand__word">LevelUp</span>' +
      '    </div>' +
      '    <p style="margin:12px 0 0; max-width: 36ch; line-height: 1.55;">Concise notes, spaced practice, and gamified streaks for O-Level subjects. Built for focused, mobile-first study.</p>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h4>Study</h4>' +
      '    <ul>' +
      '      <li><a href="hub.html">Subjects</a></li>' +
      '      <li><a href="hub.html">Chemistry</a></li>' +
      '      <li><a href="hub.html">Physics</a></li>' +
      '      <li><a href="hub.html">Geography</a></li>' +
      '    </ul>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h4>Family</h4>' +
      '    <ul>' +
      '      <li><a href="pricing.html">Pricing</a></li>' +
      '      <li><a href="parent.html">Parent dashboard</a></li>' +
      '      <li><a href="index.html#how-it-works">How it works</a></li>' +
      '      <li><a href="index.html#faq">FAQ</a></li>' +
      '    </ul>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h4>Support</h4>' +
      '    <ul>' +
      '      <li><a href="mailto:hello@levelup.local">Contact</a></li>' +
      '      <li><a href="privacy.html">Privacy</a></li>' +
      '      <li><a href="terms.html">Terms</a></li>' +
      '    </ul>' +
      '  </div>' +
      '</div>' +
      '<div class="site-footer__bottom">' +
      '  <div>© ' + new Date().getFullYear() + ' LevelUp · Built for focused learners.</div>' +
      '  <div class="muted">Designed mobile-first. Cached offline-friendly.</div>' +
      '</div>';
    foot.appendChild(wrap);
    return foot;
  }

  function openDrawer(drawer, toggle) {
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(drawer, toggle) {
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function mount() {
    var host = document.getElementById("levelup-shell");
    if (!host) return;
    var page = host.getAttribute("data-page") || "landing";

    var h = buildHeader(page);
    var d = buildDrawer(page);
    host.appendChild(h.header);
    document.body.appendChild(d.drawer);

    h.toggle.addEventListener("click", function () { openDrawer(d.drawer, h.toggle); });
    d.close.addEventListener("click", function () { closeDrawer(d.drawer, h.toggle); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && d.drawer.getAttribute("aria-hidden") === "false") {
        closeDrawer(d.drawer, h.toggle);
      }
    });
    d.drawer.addEventListener("click", function (e) {
      if (e.target === d.drawer) closeDrawer(d.drawer, h.toggle);
    });

    // Footer: auto-append if not present.
    if (!document.getElementById("levelup-footer")) {
      document.body.appendChild(buildFooter());
    }

    // Sign-in buttons: delegate open to auth-ui (loaded by index.html).
    // index.html has its own document-level click listener for .js-signin too,
    // so we only wire header/drawer-specific sign-in buttons that aren't there.
    // (Nothing to do here; the delegated handler in index.html catches them all.)

    // Wire sign-out.
    function doSignOut() {
      if (window.LevelupAuth && typeof window.LevelupAuth.signOut === "function") {
        window.LevelupAuth.signOut().then(function () {
          window.location.href = "index.html";
        });
      }
    }
    var out1 = document.getElementById("levelup-signout");
    var out2 = document.getElementById("levelup-drawer-signout");
    if (out1) out1.addEventListener("click", doSignOut);
    if (out2) out2.addEventListener("click", doSignOut);

    // Global Shop button — opens the per-page shop bridge if the page registered
    // one; otherwise falls back to the user's last-visited subject.
    function openGlobalShop() {
      try { closeDrawer(d.drawer, h.toggle); } catch (_e) {}
      if (window.LevelupShop && typeof window.LevelupShop.open === "function") {
        window.LevelupShop.open();
        return;
      }
      var last = "";
      try { last = localStorage.getItem("LEVELUP_LAST_SUBJECT") || ""; } catch (_e) {}
      var slug = last || "chemistry";
      window.location.href = "subject.html?subject=" + encodeURIComponent(slug) + "&shop=1";
    }
    document.querySelectorAll(".levelup-shop-trigger").forEach(function (btn) {
      btn.addEventListener("click", openGlobalShop);
    });

    window.LevelupShell = {
      setProfile: function (name, email, avatarUrl) {
        var pill = document.getElementById("levelup-profile");
        var nameEl = document.getElementById("levelup-name");
        var avatarEl = document.getElementById("levelup-avatar");
        if (!pill) return;
        pill.hidden = false;
        if (nameEl) nameEl.textContent = name || "Student";
        if (avatarEl) {
          if (avatarUrl) {
            avatarEl.innerHTML = '<img alt="" src="' + avatarUrl.replace(/"/g, "&quot;") + '">';
          } else {
            avatarEl.textContent = (name || email || "S").charAt(0).toUpperCase();
          }
        }
      },
      clearProfile: function () {
        var pill = document.getElementById("levelup-profile");
        if (pill) pill.hidden = true;
      },
      setShopXp: function (xp) {
        var n = Number(xp);
        var el = document.getElementById("levelup-shop-xp");
        if (!el) return;
        if (!Number.isFinite(n)) {
          el.hidden = true;
          el.textContent = "";
          return;
        }
        el.hidden = false;
        el.textContent = " · " + n.toLocaleString() + " XP";
      },
      openShop: openGlobalShop,
      closeDrawer: function () { closeDrawer(d.drawer, h.toggle); },
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
