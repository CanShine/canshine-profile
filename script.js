function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }
}

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalTitle = document.getElementById("modal-title");
const modalCloseButton = modal?.querySelector?.(".modal-close") ?? null;
const modalPanel = modal?.querySelector?.(".modal-panel") ?? null;
let lastActiveElement;

function getFocusableElements(container) {
  if (!container) {
    return [];
  }
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
  });
}

function openModal(templateId) {
  const templateEl = document.getElementById(templateId);
  if (!templateEl || !modal || !modalBody) {
    return;
  }
  lastActiveElement = document.activeElement;

  let titleEl = null;
  if (templateEl instanceof HTMLTemplateElement) {
    const fragment = templateEl.content.cloneNode(true);
    titleEl = fragment.querySelector?.("h3") ?? null;
    titleEl?.remove?.();
    modalBody.replaceChildren(fragment);
  } else {
    modalBody.innerHTML = templateEl.innerHTML;
    titleEl = modalBody.querySelector("h3");
  }

  if (titleEl && modalTitle) {
    modalTitle.textContent = titleEl.textContent ?? "";
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalCloseButton?.focus?.();
}

function closeModal() {
  if (!modal) {
    return;
  }
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (modalBody) {
    modalBody.replaceChildren();
  }
  lastActiveElement?.focus?.();
}

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const templateId = btn.getAttribute("data-open");
    if (templateId) {
      openModal(templateId);
    }
  });
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (!modal || !modal.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
  }

  if (event.key === "Tab") {
    const focusables = getFocusableElements(modalPanel);
    if (focusables.length === 0) {
      event.preventDefault();
      modalCloseButton?.focus?.();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const quickLinks = Array.from(document.querySelectorAll(".quick-nav a"));
const sections = quickLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          quickLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

const awardViewport = document.querySelector(".award-viewport");
const awardTrack = document.querySelector(".award-track");
const awardPrev = document.querySelector("[data-award-prev]");
const awardNext = document.querySelector("[data-award-next]");
let awardResumeTimer;
const awardResumeDelay = 3500;

function pauseAndResumeAwards() {
  if (!awardTrack) {
    return;
  }
  awardTrack.style.animationPlayState = "paused";
  if (awardResumeTimer) {
    clearTimeout(awardResumeTimer);
  }
  awardResumeTimer = setTimeout(() => {
    if (awardTrack) {
      awardTrack.style.animationPlayState = "";
    }
  }, awardResumeDelay);
}

function scrollAwards(direction) {
  if (!awardViewport) {
    return;
  }
  pauseAndResumeAwards();
  const amount = awardViewport.clientWidth * 0.6;
  awardViewport.scrollBy({ left: direction * amount, behavior: "smooth" });
}

if (awardPrev) {
  awardPrev.addEventListener("click", () => scrollAwards(-1));
}

if (awardNext) {
  awardNext.addEventListener("click", () => scrollAwards(1));
}

// 图片灯箱：点击 .detail-image 放大查看
document.addEventListener("click", (e) => {
  const img = e.target.closest(".detail-image");
  if (!img) return;
  const lb = document.createElement("div");
  lb.className = "img-lightbox";
  const big = document.createElement("img");
  big.src = img.src;
  big.alt = img.alt;
  lb.appendChild(big);
  const close = () => lb.remove();
  lb.addEventListener("click", close);
  document.addEventListener(
    "keydown",
    function esc(ev) {
      if (ev.key === "Escape") {
        close();
        document.removeEventListener("keydown", esc);
      }
    },
    { once: true }
  );
  document.body.appendChild(lb);
});
