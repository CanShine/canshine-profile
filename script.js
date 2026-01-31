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
