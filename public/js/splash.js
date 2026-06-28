document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const line1 = splash.querySelector(".splash-line-1");
  const line2 = splash.querySelector(".splash-line-2");

  line1.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line1") {
      line1.style.borderColor = "transparent";
    }
  });

  line2.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line2") {
      line2.style.borderColor = "transparent";

      setTimeout(() => {
        splash.classList.add("revealed");
        setTimeout(() => splash.remove(), 1000);
      }, 600);
    }
  });
});
