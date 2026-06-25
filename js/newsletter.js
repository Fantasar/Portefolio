// Affiche la popup newsletter après un délai sur la page d'accueil
// Ne réapparaît plus une fois fermée (sauvegardé en localStorage)

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("newsletter-popup");
  if (!popup) return;

  const closeBtn = popup.querySelector(".popup-close");
  const dismissed = localStorage.getItem("newsletter-dismissed");

  if (dismissed) return;

  // Apparaît après 4 secondes pour ne pas gêner l'animation d'accueil
  setTimeout(() => {
    popup.classList.add("visible");
  }, 4000);

  // Ferme au clic sur la croix
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("visible");
    localStorage.setItem("newsletter-dismissed", "true");
  });

  // Ferme au clic en dehors de la popup
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("visible");
      localStorage.setItem("newsletter-dismissed", "true");
    }
  });

  // Marque comme vu après soumission du formulaire
  popup.querySelector(".popup-form").addEventListener("submit", () => {
    localStorage.setItem("newsletter-dismissed", "true");
  });
});
