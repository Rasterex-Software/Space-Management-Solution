import { Globals } from '../internal';
import * as THREE from 'three';

// TODO:JS->TS:INFO continue conversion
export class FirstPersonControl {
    object: any;
    domElement: any;
    target: THREE.Vector3;
    enabled: boolean;
    firstxyrecieved: boolean;
    movementSpeed: number;
    lookSpeed: number;
    lookVertical: boolean;
    autoForward: boolean;
    activeLook: boolean;
    heightSpeed: boolean;
    heightCoef: number;
    heightMin: number;
    heightMax: number;
    constrainVertical: boolean;
    verticalMin: number;
    verticalMax: number;
    autoSpeedFactor: number;
    mouseX: number;
    mouseY: number;
    lat: number;
    lon: number;
    phi: number;
    theta: number;
    moveForward: boolean;
    moveBackward: boolean;
    moveLeft: boolean;
    moveRight: boolean;
    moveUp: boolean;
    moveDown: boolean;
    mouseMove: boolean;
    mouseDragOn: boolean;
    viewHalfX: number;
    viewHalfY: number;
    reset: any; // () => void;
    setInitial: any; // (lat: any, lon: any, phi: any, theta: any) => void;
    handleResize: any; // () => void;
    onMouseDown: any; // (button: any) => void;
    onMouseUp: any; // (button: any) => void;
    onMouseMove: any; // (x: any, y: any) => void;
    update: any; // (delta: any) => void;

    constructor() {
        var scope = this;
        this.object = Globals.DocObj.pages[Globals.DocObj.currentpage].camera;
        this.domElement = Globals.renderer.domElement;
        this.target = new THREE.Vector3(0, 0, 0);
        //this.object.rotation.set(0, 0, 90 * Math.PI / 180);
        this.enabled = false;
        this.firstxyrecieved = false;
        this.movementSpeed = 1.0;
        this.lookSpeed = 0.005;
        this.lookVertical = true;
        this.autoForward = false;
        this.activeLook = true;
        this.heightSpeed = false;
        this.heightCoef = 1.0;
        this.heightMin = 0.0;
        this.heightMax = 1.0;
        this.constrainVertical = false;
        this.verticalMin = 0;
        this.verticalMax = Math.PI;
        this.autoSpeedFactor = 0.0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lat = 0;
        this.lon = 90;
        this.phi = 0;
        this.theta = 0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.mouseMove = false;
        this.mouseDragOn = false;
        this.viewHalfX = 0;
        this.viewHalfY = 0;
        if (this.domElement !== document) {
            ///this.domElement.setAttribute( 'tabindex', - 1 );
        }
        this.reset = function () {
            this.lat = 0;
            this.lon = 90;
            this.phi = 0;
            this.theta = 0;
        };
        this.setInitial = function (lat:any, lon:any, phi:any, theta:any) {
            this.lat = lat;
            this.lon = lon;
            this.phi = phi;
            this.theta = theta;
        };
        this.handleResize = function () {
            if (this.domElement === document) {
                this.viewHalfX = window.innerWidth / 2;
                this.viewHalfY = window.innerHeight / 2;
            }
            else {
                this.viewHalfX = this.domElement.offsetWidth / 2;
                this.viewHalfY = this.domElement.offsetHeight / 2;
            }
        };
        this.onMouseDown = function (button:any) {
            if (this.domElement !== document) {
                this.domElement.focus();
            }
            //event.preventDefault();
            //event.stopPropagation();
            if (this.activeLook && this.mouseMove) {
                switch (button) {
                    case 0:
                        this.moveForward = true;
                        break;
                    case 2:
                        this.moveBackward = true;
                        break;
                }
            }
            this.mouseDragOn = true;
        };
        this.onMouseUp = function (button:any) {
            //event.preventDefault();
            //event.stopPropagation();
            if (this.activeLook && this.mouseMove) {
                switch (button) {
                    case 0:
                        this.moveForward = false;
                        break;
                    case 2:
                        this.moveBackward = false;
                        break;
                }
            }
            this.mouseDragOn = false;
        };
        this.onMouseMove = function (x:any, y:any) {
            if (!scope.firstxyrecieved) {
                scope.firstxyrecieved = true;
            }
            if (this.domElement === document) {
                scope.mouseX = -(x - scope.viewHalfX);
                scope.mouseY = -(y - scope.viewHalfY);
            }
            else {
                if (scope.mouseDragOn) {
                    scope.mouseX = x - scope.domElement.offsetLeft - scope.viewHalfX;
                    scope.mouseY = y - scope.domElement.offsetTop - scope.viewHalfY;
                }
                else {
                    scope.mouseX = 0;
                    scope.mouseY = 0;
                }
            }
        };
        this.update = function (delta:any) {
            if (this.enabled === false || scope.firstxyrecieved === false)
                return;
            if (this.heightSpeed) {
                var z = THREE.Math.clamp(this.object.position.z, this.heightMin, this.heightMax);
                var heightDelta = z - this.heightMin;
                this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
            }
            else {
                this.autoSpeedFactor = 0.0;
            }
            var actualMoveSpeed = delta * this.movementSpeed;
            if (this.moveForward || (this.autoForward && !this.moveBackward))
                this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
            if (this.moveBackward)
                this.object.translateZ(actualMoveSpeed);
            if (this.moveLeft)
                this.object.translateX(-actualMoveSpeed);
            if (this.moveRight)
                this.object.translateX(actualMoveSpeed);
            if (this.moveUp)
                this.object.translateY(actualMoveSpeed);
            if (this.moveDown)
                this.object.translateY(-actualMoveSpeed);
            var actualLookSpeed = delta * this.lookSpeed;
            if (!this.activeLook) {
                actualLookSpeed = 0;
            }
            var verticalLookRatio = 1;
            if (this.constrainVertical) {
                verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
            }
            this.lon -= this.mouseX * actualLookSpeed;
            if (this.lookVertical)
                this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = THREE.Math.degToRad(90 - this.lat);
            //this.phi = THREE.Math.degToRad(  this.lat );
            this.theta = THREE.Math.degToRad(this.lon);
            if (this.constrainVertical) {
                this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
            }
            var targetPosition = this.target, position = this.object.position;
            targetPosition.x = position.x + 100 * (Math.sin(this.phi) * Math.cos(this.theta));
            //targetPosition.y = position.y + 100 * Math.cos( this.phi );
            //targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );
            targetPosition.y = position.y + 100 * Math.sin(this.phi) * Math.sin(this.theta);
            targetPosition.z = position.z + 100 * Math.cos(this.phi);
            this.object.lookAt(targetPosition);
            //console.log(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);
            //console.log(targetPosition);
        };
        this.handleResize();
    }
}
