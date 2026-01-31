(() => {
  const STORAGE_KEY = "canshine_profile_unlocked";
  const EXPECTED_SHA256_HEX = "cb35123e234f64e8598de48229dab70ed1f0f1a1185c12b7c2bda54704d3fb58";

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
    document.documentElement.classList.add("page-locked");

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", lockPage);
  } else {
    lockPage();
  }
})();
