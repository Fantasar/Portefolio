document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector(".fiches-grid");
  const filters = document.querySelectorAll(".fiche-filter");
  if (!grid) return;

  const categoryLabels = { html: "HTML", css: "CSS", js: "JS" };

  try {
    const res = await fetch("/api/fiches");
    const fiches = await res.json();

    grid.innerHTML = fiches.map((f) => {
      const badgeLabel = f.badge === "gratuit" ? "Gratuit" : "Premium";
      const btn = f.badge === "gratuit" && f.pdf_url
        ? `<a href="${f.pdf_url}" download class="fiche-btn">Télécharger le PDF</a>`
        : `<a href="#" class="fiche-btn fiche-btn-premium">Bientôt disponible</a>`;

      return `
        <div class="fiche-card" data-category="${f.category}">
          <div class="fiche-preview">
            <img loading="lazy" src="${f.preview_image}" alt="${f.title}" />
            <span class="fiche-badge ${f.badge}">${badgeLabel}</span>
          </div>
          <div class="fiche-info">
            <span class="fiche-category">${categoryLabels[f.category] || f.category}</span>
            <h3>${f.title}</h3>
            <p>${f.description}</p>
            ${btn}
          </div>
        </div>`;
    }).join("");
  } catch {
    grid.innerHTML = "<p>Impossible de charger les fiches.</p>";
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const cards = grid.querySelectorAll(".fiche-card");

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
