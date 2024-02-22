import { Globals } from '../internal';
import * as THREE from 'three';

// TODO:TS->JS:CHECK this seems to not be used in rxcore
export class WalkthroughControl {
    object: any;
    domElement: any;
    rotateSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    rotateStart: THREE.Vector2;
    phiDelta: number;
    thetaDelta: number;
    offset: THREE.Vector3;
    movementSpeed: number;
    rollSpeed: number;
    dragToLook: boolean;
    autoForward: boolean;
    tmpQuaternion: THREE.Quaternion;
    mouseStatus: number;
    moveState: { up: number; down: number; left: number; right: number; forward: number; back: number; pitchUp: number; pitchDown: number; yawLeft: number; yawRight: number; rollLeft: number; rollRight: number; };
    moveVector: THREE.Vector3;
    rotationVector: THREE.Vector3;
    quat: THREE.Quaternion;
    quatInverse: any;
    rotateEnd: THREE.Vector2;
    rotateDelta: any;
    EPS: number;
    scale: number;
    lastPosition: THREE.Vector3;
    lastQuaternion: THREE.Quaternion;

    constructor() {
        this.object = Globals.DocObj.pages[Globals.DocObj.currentpage].camera;
        this.domElement = Globals.renderer.domElement;

        //controls.movementSpeed = 100;
        //controls.domElement = container;
        //controls.rollSpeed = Math.PI / 10;
        //controls.autoForward = false;
        //controls.dragToLook = true;

        //from oribit control
        this.rotateSpeed = 0.1;
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        this.EPS = 0.000001;
        this.rotateStart = new THREE.Vector2();
        this.rotateEnd = new THREE.Vector2();
        this.rotateDelta = new THREE.Vector2();
        this.phiDelta = 0;
        this.thetaDelta = 0;
        this.offset = new THREE.Vector3();


        this.scale = 1;
        this.lastPosition = new THREE.Vector3();
        this.lastQuaternion = new THREE.Quaternion();


        //from oribit control


        this.movementSpeed = 100.0;
        this.rollSpeed = Math.PI / 10;

        this.dragToLook = true;
        this.autoForward = false;

        this.tmpQuaternion = new THREE.Quaternion();

        this.mouseStatus = 0;

        this.moveState = {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        };
        this.moveVector = new THREE.Vector3(0, 0, 0);
        this.rotationVector = new THREE.Vector3(0, 0, 0);
        this.quat = new THREE.Quaternion().setFromUnitVectors(this.object.up, new THREE.Vector3(0, 1, 0));
        this.quatInverse = this.quat.clone().inverse();

    }

    private getAutoRotationAngle() {
        return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    }


    public rotateLeft(angle: number) {
        if (angle === undefined) {

            angle = this.getAutoRotationAngle();

        }

        this.thetaDelta -= angle;
    };

    public rotateUp(angle: number) {
        if (angle === undefined) {

            angle = this.getAutoRotationAngle();

        }

        this.phiDelta -= angle;
    };

    public StartRotate(x: number, y: number) {
        this.rotateStart.set(x, y);
    };

    public mousemove(x: number, y: number) {
        if (this.mouseStatus > 0) {
            const element = this.domElement === document ? this.domElement.body : this.domElement;

            //rotateStart.copy( rotStart );
            this.rotateEnd.set(x, y);

            this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);

            // rotating across whole screen goes 360 degrees around
            this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);

            this.rotateStart.copy(this.rotateEnd);


            const container = this.getContainerDimensions();

            const halfWidth = container.size[0] / 2;
            const halfHeight = container.size[1] / 2;
            this.moveState.yawLeft = -((x - container.offset[0]) - halfWidth) / halfWidth;
            this.moveState.pitchDown = ((y - container.offset[1]) - halfHeight) / halfHeight;

            this.updateRotationVector();
        }
    };


    public update(delta: number) {
        const moveMult = delta * this.movementSpeed;
        const rotMult = delta * this.rollSpeed;

        //var position = this.object.position;
        //this.offset.copy( position );

        //var position = this.object.position;
        //this.offset.applyQuaternion( this.quat );

        //this.object.rotation.order = "YXZ";

        //var theta = this.object.rotation.y;
        //var phi = this.object.rotation.x;
        //var gamma = this.object.rotation.z;

        //theta += this.thetaDelta;
        //phi += this.phiDelta * Math.cos(theta);
        //phi += this.phiDelta;
        //gamma += this.phiDelta;// * Math.sin(theta);

        //var camEuler = new THREE.Euler(phi, theta, gamma);

        //var camquat = new THREE.Quaternion();
        //camquat.setFromEuler(camEuler);


        //this.offset.x = Math.sin( phi ) * Math.sin( theta );
        //this.offset.y = Math.cos( phi );
        //this.offset.z = Math.sin( phi ) * Math.cos( theta );

        //this.offset.applyQuaternion(this.quatInverse );

        //this.object.lookAt( this.offset );
        //this.object.rotation.set(phi,theta,gamma, 'XYZ');
        //this.object.quaternion.copy(camquat);

        //position.copy( 0,0,0 ).add( this.offset );

        /*var targetPosition = new THREE.Vector3(),
         position = this.object.position;

         targetPosition.x = position.x + 100 * Math.sin( phi ) * Math.cos( theta );
         targetPosition.y = position.y + 100 * Math.cos( phi );
         targetPosition.z = position.z + 100 * Math.sin( phi ) * Math.sin( theta );

         this.object.lookAt( targetPosition );*/


        //this.object.rotation.z = theta;
        //this.object.rotation.x = phi;
        //this.object.rotation.y = gamma;

        //this.object.updateMatrix();

        /*if (theta > 0){
         this.object.rotation.z = phi * (phi/theta);
         }*/

        //this.object.rotation.z = phi * Math.sin( phi ) * Math.sin( theta );


        //console.log( 'phi:', phi * (180/Math.PI) );
        //console.log( 'theta:', theta * (180/Math.PI) );
        //console.log( 'gamma:', gamma * (180/Math.PI) );
        //console.log( 'sintheta:', Math.sin(theta) );
        //console.log( 'costheta:', Math.cos(theta) );

        //console.log( 'phixtheta:', (phi * (180/Math.PI)) * (theta * (180/Math.PI)) );
        //console.log( 'phidividetheta:', (phi * (180/Math.PI)) / (theta * (180/Math.PI)) );

        //offset.x = radius * Math.sin( phi ) * Math.sin( theta );
        //offset.y = radius * Math.cos( phi );
        //offset.z = radius * Math.sin( phi ) * Math.cos( theta );
        //var direction = new THREE.Vector3();
        //direction.copy(this.object.lookat);


        //console.log( 'direction:', [ direction.x , direction.y, direction.z ] );
        //console.log( 'angles:', [ Math.sin( phi ) * Math.sin( theta ), Math.cos( phi ), Math.sin( phi ) * Math.cos( theta )] );


        this.object.translateX(this.moveVector.x * moveMult);
        this.object.translateY(this.moveVector.y * moveMult);
        this.object.translateZ(this.moveVector.z * moveMult);


        //this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
        this.tmpQuaternion.set(this.phiDelta, this.thetaDelta, this.rotationVector.z * rotMult, 1).normalize();
        this.object.quaternion.multiply(this.tmpQuaternion);

        //console.log( 'rotate:', [ this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult ] );
        //console.log( 'phidelta:', this.phiDelta );
        //console.log( 'thetadelta:', this.thetaDelta );

        // expose the rotation vector for convenience
        this.object.rotation.setFromQuaternion(this.object.quaternion, this.object.rotation.order);
        //console.log( 'camera:', [ this.object.rotation.x, this.object.rotation.y, this.object.rotation.z * (180/Math.PI) ] );

        this.thetaDelta = 0;
        this.phiDelta = 0;



    };

    public updateMovementVector() {
        const forward = (this.moveState.forward || (this.autoForward && !this.moveState.back)) ? 1 : 0;

        this.moveVector.x = (-this.moveState.left + this.moveState.right);
        this.moveVector.y = (-this.moveState.down + this.moveState.up);
        this.moveVector.z = (-forward + this.moveState.back);
        //console.log(this.object.position);

        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
    };

    public updateRotationVector() {
        this.rotationVector.x = (-this.moveState.pitchDown + this.moveState.pitchUp);
        this.rotationVector.y = (-this.moveState.yawRight + this.moveState.yawLeft);
        this.rotationVector.z = (-this.moveState.rollRight + this.moveState.rollLeft);

        //console.log( 'rotate:', [ this.rotationVector.x , this.rotationVector.y , this.rotationVector.z  ] );
    };

    public getContainerDimensions() {
        if (this.domElement != document) {

            return {
                size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
                offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
            };

        } else {
            return {
                size: [window.innerWidth, window.innerHeight],
                offset: [0, 0]
            };

        }
    };
}