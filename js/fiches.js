// Gère les filtres par catégorie sur la section fiches de révision
// Cliquer un filtre masque les fiches qui ne correspondent pas

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fiche-card");
  const filters = document.querySelectorAll(".fiche-filter");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});
