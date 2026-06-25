// Gère les cartes de compétences : flip au clic + couleur par langage
// Le bouton "Retourner toutes les cartes" bascule l'état de toutes les cartes

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-card");
  const resetBtn = document.querySelector(".skills-reset");

  // Applique la couleur du langage sur le dos de la carte
  cards.forEach((card) => {
    const color = card.dataset.color;
    if (color) {
      const back = card.querySelector(".flip-back");
      const icon = card.querySelector(".skill-icon");
      back.style.background = `linear-gradient(135deg, ${color}18, ${color}08)`;
      back.style.borderColor = `${color}30`;
      if (icon) icon.style.color = color;
    }

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  // Retourne ou cache toutes les cartes d'un coup
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const allFlipped = document.querySelectorAll(".flip-card.flipped");
      if (allFlipped.length > 0) {
        allFlipped.forEach((c) => c.classList.remove("flipped"));
        resetBtn.textContent = "Retourner toutes les cartes";
      } else {
        cards.forEach((c) => c.classList.add("flipped"));
        resetBtn.textContent = "Cacher toutes les cartes";
      }
    });
  }
});
