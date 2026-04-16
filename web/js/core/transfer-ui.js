
async function handleExportProgress() {
    const pwd = document.getElementById("export-password").value.trim();
    const out = document.getElementById("export-output");
    const status = document.getElementById("sync-status");
    if (!pwd) {
      status.textContent = "Set a password first.";
      return;
    }
    try {
      const json = JSON.stringify(portableState());
      const code = await encryptPayload(pwd, json);
      out.value = code;
      status.textContent = "Exported. Copy the code and keep the password safe.";
    } catch (e) {
      status.textContent = "Export failed: " + e.message;
    }
  }

  async function handleImportProgress() {
    const pwd = document.getElementById("import-password").value.trim();
    const input = document.getElementById("import-input").value.trim();
    const status = document.getElementById("sync-status");
    if (!pwd || !input) {
      status.textContent = "Paste a code and enter the same password used for export.";
      return;
    }
    try {
      const json = await decryptPayload(pwd, input);
      const payload = JSON.parse(json);
      applyPortableState(payload);
      status.textContent = "Import OK. Progress updated.";
      updateTopbar();
      if (route.view === "home") renderHome();
    } catch (e) {
      status.textContent = "Import failed (wrong password or corrupted code).";
    }
  }

