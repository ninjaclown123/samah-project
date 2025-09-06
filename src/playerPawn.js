import * as THREE from 'three';

export class PlayerPawn {
  constructor() {
    this.object = new THREE.Object3D();
    this.velocity = new THREE.Vector3();
    this.speed = 0.1;

    // Add a visible body (e.g., a cube)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.object.add(mesh);

    // Create and add the camera at eye height (e.g., 1.6m)
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 0); // position relative to the player object
    this.object.add(this.camera);
  }

  update(deltaTime) {
    const deltaPosition = this.velocity.clone().multiplyScalar(deltaTime);
    this.object.position.add(deltaPosition);
  }

  setVelocity(direction) {
    this.velocity.copy(direction).multiplyScalar(this.speed);
  }

  getPosition() {
    return this.object.position;
  }
}
