// Crée et anime le Rubik's Cube 3D avec Three.js
// Le cube tourne lentement et peut être manipulé au drag/scroll

// Palette de couleurs café pour les 6 faces du cube
const COLORS = {
  right: 0xc8a27a,
  left: 0xb5896b,
  top: 0xe8d5c0,
  bottom: 0xa07050,
  front: 0xd4b896,
  back: 0x8b6548,
};

const CUBE_SIZE = 1;
const GAP = 0.08;
const STEP = CUBE_SIZE + GAP;

let scene, camera, renderer, cubeGroup;
let isDragging = false;
let previousMouse = { x: 0, y: 0 };

// Initialise la scène Three.js et lance le rendu
function init() {
  const container = document.getElementById("rubiks-container");

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  camera.position.set(5, 4, 5);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Lumières : ambiante + deux directionnelles pour le volume
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xfff5e6, 0.8);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xfff5e6, 0.3);
  dirLight2.position.set(-5, -2, -5);
  scene.add(dirLight2);

  buildCube();

  // Gestion des interactions souris et tactile
  container.addEventListener("wheel", onWheel, { passive: false });
  container.addEventListener("mousedown", onMouseDown);
  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseup", onMouseUp);
  container.addEventListener("mouseleave", onMouseUp);

  container.addEventListener("touchstart", onTouchStart, { passive: false });
  container.addEventListener("touchmove", onTouchMove, { passive: false });
  container.addEventListener("touchend", onTouchEnd);

  window.addEventListener("resize", onResize);

  animate();
}

// Crée un petit cube (cubie) avec les bonnes couleurs sur chaque face
function createCubie(x, y, z) {
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  const darkEdge = 0x6b4a30;
  const materials = [];
  materials.push(
    new THREE.MeshPhongMaterial({ color: x === 1 ? COLORS.right : darkEdge }),
  );
  materials.push(
    new THREE.MeshPhongMaterial({ color: x === -1 ? COLORS.left : darkEdge }),
  );
  materials.push(
    new THREE.MeshPhongMaterial({ color: y === 1 ? COLORS.top : darkEdge }),
  );
  materials.push(
    new THREE.MeshPhongMaterial({ color: y === -1 ? COLORS.bottom : darkEdge }),
  );
  materials.push(
    new THREE.MeshPhongMaterial({ color: z === 1 ? COLORS.front : darkEdge }),
  );
  materials.push(
    new THREE.MeshPhongMaterial({ color: z === -1 ? COLORS.back : darkEdge }),
  );

  const mesh = new THREE.Mesh(geometry, materials);
  mesh.position.set(x * STEP, y * STEP, z * STEP);

  // Arêtes visibles entre les cubies
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x5a3d25, linewidth: 2 }),
  );
  mesh.add(line);

  return mesh;
}

// Assemble les 27 cubies pour former le Rubik's Cube complet
function buildCube() {
  cubeGroup = new THREE.Group();

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cubie = createCubie(x, y, z);
        cubeGroup.add(cubie);
      }
    }
  }

  scene.add(cubeGroup);
}

// Rotation du cube à la molette
function onWheel(e) {
  e.preventDefault();
  cubeGroup.rotation.y += e.deltaY * 0.003;
  cubeGroup.rotation.x += e.deltaX * 0.003;
}

// Rotation du cube au cliquer-glisser
function onMouseDown(e) {
  isDragging = true;
  previousMouse.x = e.clientX;
  previousMouse.y = e.clientY;
}

function onMouseMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - previousMouse.x;
  const dy = e.clientY - previousMouse.y;
  cubeGroup.rotation.y += dx * 0.008;
  cubeGroup.rotation.x += dy * 0.008;
  previousMouse.x = e.clientX;
  previousMouse.y = e.clientY;
}

function onMouseUp() {
  isDragging = false;
}

// Rotation du cube au toucher (mobile)
function onTouchStart(e) {
  e.preventDefault();
  isDragging = true;
  previousMouse.x = e.touches[0].clientX;
  previousMouse.y = e.touches[0].clientY;
}

function onTouchMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - previousMouse.x;
  const dy = e.touches[0].clientY - previousMouse.y;
  cubeGroup.rotation.y += dx * 0.008;
  cubeGroup.rotation.x += dy * 0.008;
  previousMouse.x = e.touches[0].clientX;
  previousMouse.y = e.touches[0].clientY;
}

function onTouchEnd() {
  isDragging = false;
}

// Boucle de rendu — rotation idle lente quand on ne touche pas le cube
function animate() {
  requestAnimationFrame(animate);

  if (!isDragging) {
    cubeGroup.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

// Adapte le rendu quand la fenêtre change de taille
function onResize() {
  const container = document.getElementById("rubiks-container");
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

document.addEventListener("DOMContentLoaded", init);
