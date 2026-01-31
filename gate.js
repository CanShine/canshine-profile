(() => {
  const STORAGE_KEY = "canshine_profile_unlocked";
  const EXPECTED_SHA256_HEX = "cb35123e234f64e8598de48229dab70ed1f0f1a1185c12b7c2bda54704d3fb58";

  const STYLE_ID = "password-gate-style";

  function ensureGateStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html.page-locked { overflow: hidden; }
      html.page-locked body > :not(.password-gate) { display: none !important; }
      .password-gate {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(1100px 520px at 12% -10%, rgba(79, 70, 229, 0.2), transparent 60%),
          radial-gradient(900px 520px at 90% 0%, rgba(20, 184, 166, 0.18), transparent 58%),
          rgba(15, 23, 42, 0.55);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        z-index: 999;
      }
      .password-gate-panel {
        width: min(92vw, 520px);
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 18px;
        padding: 22px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.24);
      }
      .password-gate-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; }
      .password-gate-form { display: grid; gap: 12px; }
      .password-gate-label { display: grid; gap: 6px; color: #5b6b84; font-size: 13px; }
      .password-gate-input {
        width: 100%;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(15, 23, 42, 0.18);
        font-size: 14px;
      }
      .password-gate-input:focus {
        outline: 2px solid rgba(79, 70, 229, 0.35);
        outline-offset: 2px;
      }
      .password-gate-hint { color: #5b6b84; font-size: 12px; line-height: 1.5; }
      .password-gate-error { color: #b91c1c; font-size: 12px; min-height: 16px; }
    `;

    document.head.appendChild(style);
  }

  function isUnlocked() {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  }

  async function sha256Hex(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function lockPage() {
    ensureGateStyle();
    document.documentElement.classList.add("page-locked");

    if (document.querySelector(".password-gate")) {
      return;
    }

    const gate = document.createElement("div");
    gate.className = "password-gate";
    gate.innerHTML = `
      <div class="password-gate-panel" role="dialog" aria-modal="true" aria-label="访问验证">
        <div class="password-gate-title">请输入访问密码</div>
        <form class="password-gate-form">
          <label class="password-gate-label">
            <span>密码</span>
            <input class="password-gate-input" type="password" autocomplete="current-password" required />
          </label>
          <button class="primary" type="submit">进入</button>
          <div class="password-gate-hint">提示：这是“防路人”的前端保护，不是强安全。</div>
          <div class="password-gate-error" aria-live="polite"></div>
        </form>
      </div>
    `;

    document.body.appendChild(gate);

    const form = gate.querySelector("form");
    const input = gate.querySelector("input");
    const error = gate.querySelector(".password-gate-error");

    input?.focus?.();

    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!input) {
        return;
      }

      const candidate = input.value;
      input.value = "";

      try {
        const digest = await sha256Hex(candidate);
        if (digest === EXPECTED_SHA256_HEX) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          document.documentElement.classList.remove("page-locked");
          gate.remove();
          return;
        }
        if (error) {
          error.textContent = "密码不正确。";
        }
      } catch {
        if (error) {
          error.textContent = "校验失败，请刷新重试。";
        }
      }
    });
  }

  if (typeof window === "undefined") {
    return;
  }

  if (isUnlocked()) {
    return;
  }

  if (!window.crypto?.subtle) {
    return;
  }

  ensureGateStyle();
  document.documentElement.classList.add("page-locked");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", lockPage);
  } else {
    lockPage();
  }
})();
