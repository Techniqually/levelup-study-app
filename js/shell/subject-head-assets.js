(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "css/styles.css?v=" + v;
  document.head.appendChild(link);
})();
