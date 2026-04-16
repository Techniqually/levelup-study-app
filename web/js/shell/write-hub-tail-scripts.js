(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var paths = [
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    "js/features/auth/auth-client.js",
    "js/features/auth/auth-ui.js",
    "js/shell/setup-forms.js",
    "js/shell/hub-setup.js",
  ];
  var parent = (document.currentScript && document.currentScript.parentNode) || document.body;
  var i = 0;
  function next() {
    if (i >= paths.length) return;
    var s = document.createElement("script");
    s.src = paths[i] + "?v=" + v;
    s.async = false;
    s.onload = function () {
      i += 1;
      next();
    };
    s.onerror = function () {
      console.error("LevelUp: failed to load script", paths[i]);
      i += 1;
      next();
    };
    parent.appendChild(s);
  }
  next();
})();
