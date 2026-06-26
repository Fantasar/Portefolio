document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector(".books-track");
  if (!track) return;

  try {
    const res = await fetch("/api/books");
    const books = await res.json();

    track.innerHTML = books.map((b) => `
      <a href="${b.amazon_url}" target="_blank" rel="noopener" class="book-card">
        <div class="book-cover">
          <img loading="lazy" src="${b.cover_image}" alt="${b.title}" />
        </div>
        <div class="book-info">
          <h3>${b.title}</h3>
          <p>${b.description}</p>
        </div>
      </a>`).join("");
  } catch {
    track.innerHTML = "<p>Impossible de charger les livres.</p>";
    return;
  }

  if (track.children.length === 0) return;

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

  function pauseAndResume() {
    stopAutoScroll();
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(startAutoScroll, 3000);
  }

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

  track.addEventListener("click", (e) => {
    if (hasDragged) e.preventDefault();
  }, true);

  track.addEventListener("touchstart", () => {
    stopAutoScroll();
  }, { passive: true });

  track.addEventListener("touchend", () => {
    pauseAndResume();
  });

  startAutoScroll();
});
