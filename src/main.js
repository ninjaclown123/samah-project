import * as THREE from 'three';
import { PlayerPawn } from './playerPawn.js';
import { PlayerController } from './playerController.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup player
const playerPawn = new PlayerPawn();
scene.add(playerPawn.object);

const playerController = new PlayerController(playerPawn, camera);

// Sample object to view
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);
cube.position.z = -5;

let lastTime = performance.now();
function animate() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 16.6667; // Normalize to ~60 FPS
    lastTime = now;

    playerController.update(deltaTime);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
