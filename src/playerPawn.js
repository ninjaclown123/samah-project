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
