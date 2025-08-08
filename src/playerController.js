import * as THREE from 'three';


export class PlayerController {
    constructor(pawn, camera) {
        this.pawn = pawn;
        this.camera = camera;
        this.keys = {};

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Create yaw and pitch containers
        this.yawObject = new THREE.Object3D();
        this.pitchObject = new THREE.Object3D();

        // Nest camera inside pitchObject
        this.pitchObject.add(this.camera);

        // Nest pitchObject inside yawObject
        this.yawObject.add(this.pitchObject);

        // Add yawObject to the scene (not the camera directly!)
        scene.add(this.yawObject);

        // Track pitch separately for clamping
        this.pitch = 0;

        // Pointer lock
        document.body.addEventListener('click', () => {
            document.body.requestPointerLock();
        });
    }

    update(deltaTime) {
        let direction = new THREE.Vector3();

        // Get the horizontal (XZ) forward direction of the camera
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        // Right vector is perpendicular to forward and up
        const right = new THREE.Vector3();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

        // Apply movement inputs
        if (this.keys['w']) direction.add(forward);
        if (this.keys['s']) direction.sub(forward);
        if (this.keys['a']) direction.sub(right);
        if (this.keys['d']) direction.add(right);

        // Normalize final direction
        if (direction.lengthSq() > 0) {
            direction.normalize(); // ✅ No need to apply rotation again
        }

        this.pawn.setVelocity(direction);
        this.pawn.update(deltaTime);
        this.camera.position.copy(this.pawn.getPosition());
    }


}
