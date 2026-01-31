function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalTitle = document.getElementById("modal-title");

function openModal(templateId) {
  const template = document.getElementById(templateId);
  if (!template || !modal || !modalBody) {
    return;
  }
  modalBody.innerHTML = template.innerHTML;
  const title = template.content.querySelector("h3");
  if (title && modalTitle) {
    modalTitle.textContent = title.textContent;
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) {
    return;
  }
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
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
  if (event.key === "Escape") {
    closeModal();
  }
});

const quickLinks = Array.from(document.querySelectorAll(".quick-nav a"));
const sections = quickLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

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

function scrollAwards(direction) {
  if (!awardViewport) {
    return;
  }
  if (awardTrack) {
    awardTrack.style.animation = "none";
  }
  const amount = awardViewport.clientWidth * 0.6;
  awardViewport.scrollBy({ left: direction * amount, behavior: "smooth" });
}

if (awardPrev) {
  awardPrev.addEventListener("click", () => scrollAwards(-1));
}

if (awardNext) {
  awardNext.addEventListener("click", () => scrollAwards(1));
}
