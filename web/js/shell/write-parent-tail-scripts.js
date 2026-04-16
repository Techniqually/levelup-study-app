(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var parent = (document.currentScript && document.currentScript.parentNode) || document.body;
  var paths = ["js/shell/setup-forms.js", "js/parent-dashboard.js"];
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
