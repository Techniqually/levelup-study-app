(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var corePaths = [
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    "js/shell/app-context.js",
    "js/features/auth/auth-client.js",
    "js/features/auth/auth-ui.js",
    "js/parent-dashboard.js"
  ];
  var parent = (document.currentScript && document.currentScript.parentNode) || document.body;

  function loadChain(list, onComplete) {
    var i = 0;
    function next() {
      if (i >= list.length) return onComplete && onComplete();
      var s = document.createElement("script");
      var path = list[i];
      s.src = path.indexOf("http") === 0 ? path : path + "?v=" + v;
      s.async = false;
      s.onload = function () { i++; next(); };
      s.onerror = function () { 
        console.error("LevelUp: failed to load script", path);
        i++; next(); 
      };
      parent.appendChild(s);
    }
    next();
  }

  function startApp() {
    loadChain(corePaths);
  }

  if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
    startApp();
  } else {
    document.addEventListener("levelup:config-ready", startApp);
    loadChain(["js/shell/api-config.js", "js/shell/bootstrap.js"]);
  }
})();
