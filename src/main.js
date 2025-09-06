import * as THREE from 'three';
import { PlayerPawn } from './playerPawn.js';
import { PlayerController } from './playerController.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.domElement.addEventListener('click', () => {
    renderer.domElement.requestPointerLock()
})

// Setup player
const playerPawn = new PlayerPawn();
scene.add(playerPawn.object);

const playerController = new PlayerController(playerPawn, renderer.domElement);

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

    renderer.render(scene, playerPawn.camera);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    playerPawn.camera.aspect = window.innerWidth / window.innerHeight;
    playerPawn.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

