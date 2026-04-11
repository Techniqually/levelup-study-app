function bufToB64(buf) {
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function b64ToBuf(b64) {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  async function encryptPayload(password, json) {
    if (!window.crypto || !crypto.subtle) {
      // Fallback: base64 JSON, clearly tagged as plain
      return "v1-plain:" + bufToB64(new TextEncoder().encode(json));
    }
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(json)
    );
    return `v1:${bufToB64(salt.buffer)}:${bufToB64(iv.buffer)}:${bufToB64(cipher)}`;
  }

  async function decryptPayload(password, code) {
    if (code.startsWith("v1-plain:")) {
      const b64 = code.slice("v1-plain:".length);
      const buf = b64ToBuf(b64);
      return new TextDecoder().decode(buf);
    }
    const parts = code.split(":");
    if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Bad format");
    const salt = new Uint8Array(b64ToBuf(parts[1]));
    const iv = new Uint8Array(b64ToBuf(parts[2]));
    const data = b64ToBuf(parts[3]);
    if (!window.crypto || !crypto.subtle) throw new Error("Crypto not supported");
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return new TextDecoder().decode(plainBuf);
  }
