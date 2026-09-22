const body = document.body;
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.querySelector(".preloader").classList.add("hide");
  }, 350);
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
};

updateHeader();

window.addEventListener("scroll", updateHeader, {
  passive: true,
});

function closeMenu() {
  menuButton.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");

  nav.classList.remove("open");
  body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const willOpen = !nav.classList.contains("open");

  menuButton.classList.toggle("active", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute(
    "aria-label",
    willOpen ? "Fechar menu" : "Abrir menu",
  );

  nav.classList.toggle("open", willOpen);
  body.classList.toggle("menu-open", willOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");

      openItem.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  body.classList.remove("lightbox-open");
}

document.querySelectorAll(".result-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.querySelector("img").alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("lightbox-open");

    lightbox.querySelector(".lightbox__close").focus();
  });
});

lightbox
  .querySelector(".lightbox__close")
  .addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
