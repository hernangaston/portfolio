// Escena voxel del encabezado: un escritorio con una laptop en el campo,
// un rollo de alfalfa, una vaca y un alambrado. Hecha solo con cajas y un cilindro.
import * as THREE from '../vendor/three.module.min.js';

const contenedor = document.getElementById('escena');
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function soportaWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

if (contenedor && soportaWebGL()) {
  iniciar();
} else if (contenedor) {
  contenedor.classList.add('sin-3d');
}

function iniciar() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  contenedor.appendChild(renderer.domElement);

  const escena = new THREE.Scene();
  const mundo = new THREE.Group();
  escena.add(mundo);

  // Cámara ortográfica en vista isométrica
  const tamano = 7.4;
  const camara = new THREE.OrthographicCamera(-tamano, tamano, tamano, -tamano, 0.1, 200);
  camara.position.set(20, 15, 20);
  camara.lookAt(0, 0.6, 0);

  escena.add(new THREE.HemisphereLight(0xfff6e5, 0x3a3328, 1.6));
  const sol = new THREE.DirectionalLight(0xffffff, 2.4);
  sol.position.set(10, 18, 6);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  Object.assign(sol.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 50 });
  sol.shadow.bias = -0.0005;
  escena.add(sol);

  const materiales = new Map();
  function mat(color, extra = {}) {
    const clave = color + JSON.stringify(extra);
    if (!materiales.has(clave)) {
      materiales.set(clave, new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, ...extra }));
    }
    return materiales.get(clave);
  }
  const geoCaja = new THREE.BoxGeometry(1, 1, 1);

  // Caja definida por su esquina inferior (x, y, z) y su tamaño
  function caja(x, y, z, w, h, d, color, padre = mundo, extra) {
    const m = new THREE.Mesh(geoCaja, mat(color, extra));
    m.scale.set(w, h, d);
    m.position.set(x + w / 2, y + h / 2, z + d / 2);
    m.castShadow = true;
    m.receiveShadow = true;
    padre.add(m);
    return m;
  }

  // Terreno: 12 x 12 bloques de pasto sobre tierra, con variación de tono
  const verdes = [0x6f9a4a, 0x76a24f, 0x6a9346, 0x7aa655];
  let semilla = 7;
  const azar = () => ((semilla = (semilla * 9301 + 49297) % 233280) / 233280);
  for (let i = -6; i < 6; i++) {
    for (let j = -6; j < 6; j++) {
      caja(i, -0.5, j, 1, 0.5, 1, verdes[Math.floor(azar() * verdes.length)]);
    }
  }
  caja(-6, -2.2, -6, 12, 1.7, 12, 0x7b5a3c);
  caja(-6, -2.6, -6, 12, 0.4, 12, 0x5e4430);

  // Escritorio
  const madera = 0xa87a4f;
  caja(-4.6, 1.7, -1.6, 4.2, 0.25, 2.2, madera);
  for (const [x, z] of [[-4.5, -1.5], [-0.75, -1.5], [-4.5, 0.35], [-0.75, 0.35]]) {
    caja(x, 0, z, 0.25, 1.7, 0.25, 0x8a6240);
  }

  // Laptop con un gráfico de línea en la pantalla
  caja(-3.4, 1.95, -1.0, 1.8, 0.1, 1.2, 0x3a3d42);
  const pantalla = new THREE.Group();
  pantalla.position.set(-3.4, 2.05, -1.0);
  pantalla.rotation.x = -0.25;
  mundo.add(pantalla);
  caja(0, 0, -0.08, 1.8, 1.2, 0.08, 0x2c2f33, pantalla);
  caja(0.08, 0.08, 0.0, 1.64, 1.04, 0.02, 0x16302a, pantalla, { emissive: 0x0f2a24, emissiveIntensity: 0.6 });
  const alturas = [0.25, 0.35, 0.3, 0.5, 0.45, 0.65, 0.6, 0.8];
  alturas.forEach((a, i) => {
    caja(0.2 + i * 0.18, 0.15 + a * 0.85, 0.02, 0.14, 0.1, 0.02, 0x88ccca, pantalla, { emissive: 0x88ccca, emissiveIntensity: 0.9 });
  });

  // Taza y planta sobre el escritorio
  caja(-1.3, 1.95, -0.9, 0.35, 0.4, 0.35, 0xe9e2d3);
  caja(-4.3, 1.95, -1.3, 0.5, 0.4, 0.5, 0xb5653d);
  caja(-4.2, 2.35, -1.2, 0.3, 0.5, 0.3, 0x4f8a3c);
  caja(-4.35, 2.6, -1.25, 0.6, 0.25, 0.4, 0x5b9a45);

  // Silla
  caja(-3.2, 1.0, 0.8, 1.3, 0.2, 1.2, 0x2f3b45);
  caja(-3.2, 1.2, 1.8, 1.3, 1.4, 0.2, 0x2f3b45);
  for (const [x, z] of [[-3.1, 0.9], [-2.1, 0.9], [-3.1, 1.75], [-2.1, 1.75]]) {
    caja(x, 0, z, 0.18, 1.0, 0.18, 0x22292f);
  }

  // Rollo de alfalfa (acostado)
  const texturaRollo = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = '#d8b35a';
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = '#a9853a';
    g.lineWidth = 4;
    g.beginPath();
    for (let t = 0; t < 26; t += 0.1) {
      const r = t * 2.4;
      const x = 64 + r * Math.cos(t);
      const y = 64 + r * Math.sin(t);
      t === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  })();
  function rollo(x, z, rotY) {
    const geo = new THREE.CylinderGeometry(1.15, 1.15, 1.5, 20);
    const lados = new THREE.MeshStandardMaterial({ color: 0xcfa64f, roughness: 1 });
    const caras = new THREE.MeshStandardMaterial({ map: texturaRollo, roughness: 1 });
    const m = new THREE.Mesh(geo, [lados, caras, caras]);
    m.rotation.z = Math.PI / 2;
    m.rotation.y = rotY;
    m.position.set(x, 1.15, z);
    m.castShadow = true;
    m.receiveShadow = true;
    mundo.add(m);
  }
  rollo(-3.6, 3.9, 0.3);
  rollo(-1.2, 4.6, -0.2);

  // Vaca
  const vaca = new THREE.Group();
  vaca.position.set(2.2, 0, 0.6);
  vaca.rotation.y = -0.5;
  mundo.add(vaca);
  const blanco = 0xf1eee8, negro = 0x232323;
  caja(0, 0.9, 0, 2.4, 1.2, 1.2, blanco, vaca);
  caja(0.4, 1.6, -0.01, 0.8, 0.6, 0.02, negro, vaca);
  caja(1.4, 1.0, 1.19, 0.7, 0.7, 0.02, negro, vaca);
  caja(0.2, 2.09, 0.3, 0.9, 0.02, 0.6, negro, vaca);
  for (const [x, z] of [[0.1, 0.1], [0.1, 0.8], [1.95, 0.1], [1.95, 0.8]]) {
    caja(x, 0, z, 0.3, 0.9, 0.3, blanco, vaca);
    caja(x, 0, z, 0.3, 0.18, 0.3, negro, vaca);
  }
  const cabeza = new THREE.Group();
  cabeza.position.set(2.35, 1.1, 0.2);
  vaca.add(cabeza);
  caja(0, 0, 0, 0.9, 0.85, 0.8, blanco, cabeza);
  caja(0.75, 0, 0.05, 0.35, 0.4, 0.7, 0xe7a9a0, cabeza);
  caja(0.2, 0.85, -0.05, 0.15, 0.25, 0.15, 0xe8dcc0, cabeza);
  caja(0.2, 0.85, 0.7, 0.15, 0.25, 0.15, 0xe8dcc0, cabeza);
  caja(0.55, 0.5, -0.01, 0.12, 0.12, 0.02, negro, cabeza);
  caja(0.55, 0.5, 0.79, 0.12, 0.12, 0.02, negro, cabeza);
  caja(-0.15, 1.0, 1.2, 0.2, 0.7, 0.15, blanco, vaca);
  caja(-0.15, 0.85, 1.25, 0.2, 0.2, 0.15, negro, vaca);

  // Alambrado sobre el borde trasero
  for (let i = -5.6; i <= 5.6; i += 1.85) {
    caja(i, 0, -5.8, 0.25, 1.6, 0.25, 0x8a6240);
  }
  caja(-5.6, 1.15, -5.74, 11.4, 0.06, 0.06, 0x9aa0a6);
  caja(-5.6, 0.7, -5.74, 11.4, 0.06, 0.06, 0x9aa0a6);

  // Tamaño y animación
  function ajustar() {
    const w = contenedor.clientWidth;
    const h = contenedor.clientHeight;
    renderer.setSize(w, h, false);
    const aspecto = w / h;
    camara.left = -tamano * aspecto;
    camara.right = tamano * aspecto;
    camara.top = tamano;
    camara.bottom = -tamano;
    camara.updateProjectionMatrix();
  }
  new ResizeObserver(ajustar).observe(contenedor);
  ajustar();

  // Arrastrar para girar
  let arrastrando = false, xPrev = 0, velocidad = 0;
  const lienzo = renderer.domElement;
  lienzo.addEventListener('pointerdown', (e) => { arrastrando = true; xPrev = e.clientX; lienzo.setPointerCapture(e.pointerId); });
  lienzo.addEventListener('pointermove', (e) => {
    if (!arrastrando) return;
    const dx = e.clientX - xPrev;
    xPrev = e.clientX;
    mundo.rotation.y += dx * 0.008;
    velocidad = dx * 0.0008;
  });
  const soltar = () => { arrastrando = false; };
  lienzo.addEventListener('pointerup', soltar);
  lienzo.addEventListener('pointercancel', soltar);

  // Entrada: la escena gira desde un ángulo y frena
  let rotEntrada = reducirMovimiento ? 0 : -1.4;
  mundo.rotation.y = rotEntrada;
  let t = 0;
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(contenedor);

  function cuadro() {
    requestAnimationFrame(cuadro);
    if (!visible) return;
    t += 1 / 60;
    if (rotEntrada < 0) {
      const paso = Math.max(0.004, -rotEntrada * 0.04);
      rotEntrada = Math.min(0, rotEntrada + paso);
      mundo.rotation.y += paso;
    } else if (!arrastrando && !reducirMovimiento) {
      mundo.rotation.y += 0.0015 + velocidad;
      velocidad *= 0.95;
    }
    if (!reducirMovimiento) cabeza.rotation.z = -0.25 + Math.sin(t * 1.3) * 0.12;
    renderer.render(escena, camara);
  }
  cuadro();
  contenedor.classList.add('listo');
}
