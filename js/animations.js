// Gère les animations au scroll, le menu burger, le bouton retour en haut,
// le mode sombre et le préchargement des pages au survol

document.addEventListener("DOMContentLoaded", () => {
  // Fait apparaître les éléments .fade-in quand ils entrent dans le viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Ouvre/ferme le menu burger au clic
  const burger = document.querySelector(".burger");
  const navUl = document.querySelector("nav ul");

  if (burger && navUl) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navUl.classList.toggle("open");
    });

    // Referme le menu quand on clique sur un lien
    navUl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("open");
        navUl.classList.remove("open");
      });
    });
  }

  // Affiche le bouton retour en haut après 400px de scroll
  const scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Bascule entre mode clair et sombre, sauvegardé en localStorage
  const darkToggle = document.querySelector(".dark-toggle");
  if (darkToggle) {
    if (localStorage.getItem("dark-mode") === "true") {
      document.body.classList.add("dark");
      darkToggle.textContent = "☀";
    }

    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("dark-mode", isDark);
      darkToggle.textContent = isDark ? "☀" : "☾";
    });
  }

  // Précharge les pages internes au survol des liens pour accélérer la navigation
  const prefetched = new Set();
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.endsWith(".html") || href.startsWith("http")) return;

    link.addEventListener("mouseenter", () => {
      if (prefetched.has(href)) return;
      prefetched.add(href);
      const prefetchLink = document.createElement("link");
      prefetchLink.rel = "prefetch";
      prefetchLink.href = href;
      document.head.appendChild(prefetchLink);
    }, { once: true });
  });
});
