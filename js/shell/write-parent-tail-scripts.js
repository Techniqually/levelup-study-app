(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var parent = (document.currentScript && document.currentScript.parentNode) || document.body;
  var s = document.createElement("script");
  s.src = "js/parent-dashboard.js?v=" + v;
  s.async = false;
  s.onerror = function () {
    console.error("LevelUp: failed to load parent-dashboard.js");
  };
  parent.appendChild(s);
})();
