document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  if (sessionStorage.getItem("splash-seen")) {
    splash.remove();
    return;
  }

  const line1 = splash.querySelector(".splash-line-1");
  const line2 = splash.querySelector(".splash-line-2");

  function measureWidth(el) {
    el.style.width = "auto";
    el.style.visibility = "hidden";
    el.style.opacity = "1";
    const w = el.scrollWidth;
    el.style.width = "0";
    el.style.visibility = "";
    el.style.opacity = "";
    return w;
  }

  const w1 = measureWidth(line1);
  const w2 = measureWidth(line2);

  line1.style.setProperty("--text-width", w1 + "px");
  line2.style.setProperty("--text-width", w2 + "px");

  line1.classList.add("typing");

  line1.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line1") {
      line1.style.borderColor = "transparent";
      line1.style.width = w1 + "px";
      line2.classList.add("typing");
    }
  });

  line2.addEventListener("animationend", (e) => {
    if (e.animationName === "type-line2") {
      line2.style.borderColor = "transparent";
      line2.style.width = w2 + "px";

      setTimeout(() => {
        splash.classList.add("revealed");
        sessionStorage.setItem("splash-seen", "true");
        setTimeout(() => splash.remove(), 1000);
      }, 1600);
    }
  });
});
