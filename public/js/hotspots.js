document.addEventListener("DOMContentLoaded", () => {
  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach((spot) => {
    const popupId = spot.dataset.target;
    const popup = document.getElementById(popupId);
    if (!popup) return;

    let hideTimeout;

    function show() {
      clearTimeout(hideTimeout);
      document.querySelectorAll(".hotspot-popup.visible").forEach((p) => {
        if (p !== popup) p.classList.remove("visible");
      });
      popup.classList.add("visible");
    }

    function hide() {
      hideTimeout = setTimeout(() => popup.classList.remove("visible"), 300);
    }

    spot.addEventListener("mouseenter", show);
    spot.addEventListener("mouseleave", hide);
    popup.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    popup.addEventListener("mouseleave", hide);
  });
});
