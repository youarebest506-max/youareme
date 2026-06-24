// --- GSAP Animations ---
document.addEventListener("DOMContentLoaded", () => {
  // Intro fade ins
  gsap.to(".fade-in", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Floating card initial float animation
  gsap.to(".floating-card", {
    y: "-=20",
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
});

// --- Three.js Interactive 3D Background ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles wide
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create Material matching the brand color (Primary Indigo #4F46E5)
const material = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x4F46E5,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Create Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Add some floating geometric shapes
const shapes = [];
const shapeGeometries = [
  new THREE.TorusGeometry(3, 0.5, 16, 100),
  new THREE.IcosahedronGeometry(2, 0),
  new THREE.OctahedronGeometry(2.5, 0)
];

const shapeMaterial = new THREE.MeshBasicMaterial({
  color: 0x3B82F6, // Neutral blue
  wireframe: true,
  transparent: true,
  opacity: 0.15
});

for(let i = 0; i < 5; i++) {
  const geo = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
  const mesh = new THREE.Mesh(geo, shapeMaterial);

  mesh.position.x = (Math.random() - 0.5) * 60;
  mesh.position.y = (Math.random() - 0.5) * 40;
  mesh.position.z = (Math.random() - 0.5) * 40 - 10;

  // Random rotation speeds
  mesh.userData = {
    rx: (Math.random() - 0.5) * 0.02,
    ry: (Math.random() - 0.5) * 0.02
  };

  shapes.push(mesh);
  scene.add(mesh);
}

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse follow
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Rotate particle system slowly
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    // Mouse influence on particles
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Animate floating shapes
    shapes.forEach(shape => {
      shape.rotation.x += shape.userData.rx;
      shape.rotation.y += shape.userData.ry;

      // Gentle bobbing
      shape.position.y += Math.sin(elapsedTime * 2 + shape.position.x) * 0.01;
    });

    renderer.render(scene, camera);
}

animate();
