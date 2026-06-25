// Gère l'animation de bienvenue : le texte typewriter s'écrit au centre,
// puis glisse sous le cube quand le fond s'efface

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const splashLines = splash.querySelector(".splash-lines");
  const line1 = splash.querySelector(".splash-line-1");
  const line2 = splash.querySelector(".splash-line-2");
  const cubeContainer = document.getElementById("rubiks-container");
  const hero = document.querySelector(".hero");

  // Cache le curseur clignotant quand la ligne 1 finit de s'écrire
  line1.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line1") {
      line1.style.borderColor = "transparent";
    }
  });

  // Cache le curseur de la ligne 2 puis lance la transition
  line2.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line2") {
      line2.style.borderColor = "transparent";

      setTimeout(() => {
        slideToCube();
      }, 600);
    }
  });

  // Fait glisser le texte du centre vers sous le cube
  function slideToCube() {
    const cubeRect = cubeContainer.getBoundingClientRect();
    const textRect = splashLines.getBoundingClientRect();

    const targetX = cubeRect.left + cubeRect.width * 0.15;
    const targetY = cubeRect.bottom + 20;

    const dx = targetX - textRect.left;
    const dy = targetY - textRect.top;

    splashLines.style.setProperty("--slide-to", `translate(${dx}px, ${dy}px)`);
    splash.classList.add("revealed");

    // Déplace le texte dans le hero pour qu'il scrolle normalement
    setTimeout(() => {
      const finalRect = splashLines.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();

      // Fige les animations avant le déplacement DOM pour éviter qu'elles rejouent
      line1.style.animation = "none";
      line2.style.animation = "none";
      line1.style.width = "7.5em";
      line1.style.opacity = "1";
      line2.style.width = "11em";
      line2.style.opacity = "1";
      line1.style.borderColor = "transparent";
      line2.style.borderColor = "transparent";

      splashLines.style.position = "absolute";
      splashLines.style.left = (finalRect.left - heroRect.left) + "px";
      splashLines.style.top = (finalRect.top - heroRect.top) + "px";
      splashLines.style.transform = "none";
      splashLines.style.transition = "none";

      hero.appendChild(splashLines);
      splash.remove();
    }, 1300);
  }
});
