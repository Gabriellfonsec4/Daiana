window.addEventListener("load", () => {
  window.setTimeout(() => {
    const preloader = document.querySelector(".preloader");

    if (preloader) {
      preloader.classList.add("hide");
    }
  }, 250);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
