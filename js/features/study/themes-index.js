/**
 * buildThemeIndex(manifest) → { themeOrder: string[], themesByKey: Record<string, any[]> }
 *
 * Scans the manifest for unique `theme` fields and builds the lookup tables
 * used by boss battles and the home screen.  Pure function; no side-effects.
 */
function buildThemeIndex(manifestArr) {
  var seen    = new Set();
  var order   = [];
  var byKey   = {};
  (manifestArr || []).forEach(function (t) {
    var key = t && t.theme ? String(t.theme) : "";
    if (!key) return;
    if (!seen.has(key)) {
      seen.add(key);
      order.push(key);
    }
    if (!byKey[key]) byKey[key] = [];
    byKey[key].push(t.id);
  });
  return { themeOrder: order, themesByKey: byKey };
}
