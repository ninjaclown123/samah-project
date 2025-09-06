import * as THREE from 'three';

export class PlayerController {
  constructor(pawn, domElement) {
    this.pawn = pawn;
    this.domElement = domElement;

    //keyboard
    this.keys = {};
    this.speed = 2;

    //mouse
    this.sensitivity = 0.002;
    this.pitch = 0;

    window.addEventListener('keydown', (e) => this.onKeyDown(e), false);
    window.addEventListener('keyup', (e) => this.onKeyUp(e), false);

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

  }

  onKeyDown(event) {
    this.keys[event.code] = true;
  }

  onKeyUp(event) {
    this.keys[event.code] = false;
  }

  update(deltaTime) {
    const direction = new THREE.Vector3();


    if (this.keys['KeyW']) direction.z -= 1;
    if (this.keys['KeyS']) direction.z += 1;
    if (this.keys['KeyA']) direction.x += 1;
    if (this.keys['KeyD']) direction.x -= 1;

    const yaw = this.pawn.object.rotation.y;

    // Forward: (cos(yaw), 0, sin(yaw))
    const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));

    // Right: cross product with world up (0,1,0)
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();



    // Normalize direction to avoid faster diagonal movement
    let movement = forward.clone().multiplyScalar(direction.z)
      .add(right.clone().multiplyScalar(direction.x));

    if (movement.length() > 0) movement.normalize();
    movement.multiplyScalar(this.speed * deltaTime);

    this.pawn.setVelocity(movement);

    this.pawn.update(deltaTime);
  }

  onMouseMove(event) {

    if (document.pointerLockElement === this.domElement) {
      const yawDelta = -event.movementX * this.sensitivity;
      const pitchDelta = -event.movementY * this.sensitivity;

      this.pawn.object.rotation.y += yawDelta;

      this.pitch += pitchDelta;
      const pi_2 = Math.PI / 2;
      this.pitch = Math.max(-pi_2, Math.min(pi_2, this.pitch));
      this.pawn.camera.rotation.x = this.pitch;

    }
  }
}
