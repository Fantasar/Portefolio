// Gère le carrousel de livres : défilement automatique infini
// + drag à la souris pour naviguer manuellement

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".books-track");
  if (!track) return;

  // Duplique les cartes pour créer un défilement en boucle
  const cards = Array.from(track.children);
  cards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  let isDown = false;
  let hasDragged = false;
  let startX;
  let scrollLeft;
  let autoScrollId;
  let pauseTimeout;

  // Fait défiler le carrousel pixel par pixel, revient au début à mi-parcours
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollId = setInterval(() => {
      track.scrollLeft += 1;
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      }
    }, 30);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollId);
  }

  // Met en pause l'auto-scroll puis le relance après 3 secondes
  function pauseAndResume() {
    stopAutoScroll();
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(startAutoScroll, 3000);
  }

  // Gestion du drag souris pour naviguer dans le carrousel
  track.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDown = true;
    hasDragged = false;
    startX = e.pageX;
    scrollLeft = track.scrollLeft;
    stopAutoScroll();
  });

  track.addEventListener("mouseleave", () => {
    if (isDown) pauseAndResume();
    isDown = false;
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    pauseAndResume();
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 3) hasDragged = true;
    track.scrollLeft = scrollLeft - dx;
  });

  // Empêche l'ouverture du lien Amazon si on a fait un drag
  track.addEventListener("click", (e) => {
    if (hasDragged) e.preventDefault();
  }, true);

  // Gestion tactile mobile
  track.addEventListener("touchstart", () => {
    stopAutoScroll();
  }, { passive: true });

  track.addEventListener("touchend", () => {
    pauseAndResume();
  });

  startAutoScroll();
});
