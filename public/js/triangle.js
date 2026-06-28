document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("triangle-svg");
  if (!svg) return;

  const LINES = 30;

  // Triangle vertices (top, bottom-left, bottom-right)
  const A = { x: 400, y: 30 };   // top
  const B = { x: 50, y: 690 };   // bottom-left
  const C = { x: 750, y: 690 };  // bottom-right

  const sides = [
    { from: A, to: B, color: "#4a9d5b", hoverColor: "#5bc46e", opposite: C, side: "top" },    // green (left edge)
    { from: B, to: C, color: "#c0392b", hoverColor: "#e74c3c", opposite: A, side: "left" },    // red (bottom edge)
    { from: C, to: A, color: "#2c6fbb", hoverColor: "#3b8de0", opposite: B, side: "right" },   // blue (right edge)
  ];

  function lerp(p1, p2, t) {
    return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t };
  }

  sides.forEach((s) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("tri-side");
    group.dataset.side = s.side;

    for (let i = 0; i <= LINES; i++) {
      const t = i / LINES;
      const p1 = lerp(s.from, s.to, t);
      const p2 = lerp(s.to, s.opposite, t);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("stroke", s.color);
      line.setAttribute("stroke-width", "1.2");
      line.setAttribute("stroke-opacity", "0.5");
      line.dataset.baseColor = s.color;
      line.dataset.hoverColor = s.hoverColor;

      group.appendChild(line);
    }

    // Invisible clickable area for the side
    const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const mid = lerp(s.from, s.to, 0.5);
    const center = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    const pull = 0.35;
    const inner = { x: mid.x + (center.x - mid.x) * pull, y: mid.y + (center.y - mid.y) * pull };
    hitArea.setAttribute("points", `${s.from.x},${s.from.y} ${s.to.x},${s.to.y} ${inner.x},${inner.y}`);
    hitArea.setAttribute("fill", "transparent");
    hitArea.style.cursor = "pointer";
    group.insertBefore(hitArea, group.firstChild);

    svg.appendChild(group);
  });

  // Hover effects
  const labels = document.querySelectorAll(".tri-label");
  const sideMap = { top: 0, left: 1, right: 2 };

  function highlightSide(sideName, active) {
    const group = svg.querySelectorAll(".tri-side")[sideMap[sideName]];
    if (!group) return;
    const lines = group.querySelectorAll("line");
    lines.forEach((line) => {
      line.setAttribute("stroke", active ? line.dataset.hoverColor : line.dataset.baseColor);
      line.setAttribute("stroke-opacity", active ? "0.85" : "0.5");
      line.setAttribute("stroke-width", active ? "1.8" : "1.2");
    });
  }

  // SVG side hover
  svg.querySelectorAll(".tri-side").forEach((group) => {
    group.addEventListener("mouseenter", () => {
      highlightSide(group.dataset.side, true);
      const label = document.querySelector(`.tri-label[data-side="${group.dataset.side}"]`);
      if (label) label.classList.add("active");
    });
    group.addEventListener("mouseleave", () => {
      highlightSide(group.dataset.side, false);
      const label = document.querySelector(`.tri-label[data-side="${group.dataset.side}"]`);
      if (label) label.classList.remove("active");
    });
    group.addEventListener("click", () => {
      const label = document.querySelector(`.tri-label[data-side="${group.dataset.side}"]`);
      if (label) window.location.href = label.href;
    });
  });

  // Label hover syncs with SVG
  labels.forEach((label) => {
    label.addEventListener("mouseenter", () => {
      highlightSide(label.dataset.side, true);
      label.classList.add("active");
    });
    label.addEventListener("mouseleave", () => {
      highlightSide(label.dataset.side, false);
      label.classList.remove("active");
    });
  });
});
