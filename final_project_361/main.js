import * as THREE from 'three';
import { meshes } from './meshes.js';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let camera, scene, renderer, controls;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let prevTime = performance.now();
const direction = new THREE.Vector3();
var color = 0xaaaaFF;
var intensity = 1;
var light;
init();
animate();


function init() {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 2;
  camera.position.x = 20;


  scene = new THREE.Scene();
  scene.background = new THREE.Color( 'black' );


  light = new THREE.DirectionalLight(color, intensity);
  light.name = 'light'
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, -5);
  scene.add(light);
  scene.add(light.target);

  setInterval(() => {
    intensity = (Math.round(intensity) + 1) % 2;
    if(intensity == 0){
      intensity += 0.1
    }
  },100)

  controls = new PointerLockControls( camera, document.body );

  const blocker = document.getElementById( 'blocker' );
  const instructions = document.getElementById( 'instructions' );

  instructions.addEventListener( 'click', function () {

    controls.lock();

  } );

  controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

  } );

  controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

  } );

  scene.add( controls.getObject() );

  const onKeyDown = function ( event ) {

    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW':
        moveForward = true;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = true;
        break;

      case 'ArrowDown':
      case 'KeyS':
        moveBackward = true;
        break;

      case 'ArrowRight':
      case 'KeyD':
        moveRight = true;
        break;

    }

  };

  const onKeyUp = function ( event ) {

    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW':
        moveForward = false;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = false;
        break;

      case 'ArrowDown':
      case 'KeyS':
        moveBackward = false;
        break;

      case 'ArrowRight':
      case 'KeyD':
        moveRight = false;
        break;

    }

  };

  document.addEventListener( 'keydown', onKeyDown );
  document.addEventListener( 'keyup', onKeyUp );



  meshes(scene)

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
const max_left = 19
const max_right = 21
const max_forwards = -8
const max_backwards = 8
const pushback = 0.09

function animate() {

  requestAnimationFrame( animate );

  const time = performance.now();

  if ( controls.isLocked === true ) {

    const delta = ( time - prevTime ) / 200;
    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); 
    

    controls.moveRight(  direction.x * delta );
    controls.moveForward(  direction.z * delta );
    console.log(camera.position)
    
    if((camera.position.x <=max_left && camera.position.z >= (max_forwards + 3)
    && camera.position.z <= (max_backwards - 3)  && camera.position.x > -5) || (camera.position.z <= (-5) && camera.position.z > (-15) && camera.position.x < 6 && camera.position.x > 0) ) 
    camera.position.x += pushback;

    if(camera.position.x >=max_right || (camera.position.z <= (max_forwards ) && camera.position.x > 7))
     camera.position.x -= pushback;

    if(camera.position.z <= max_forwards && camera.position.x > (max_left - 8)) 
    camera.position.z += pushback;

    if((camera.position.z >= max_backwards && camera.position.x > 0 && camera.position.z < 0) ||(camera.position.z > max_forwards + 2 && camera.position.x <= max_left && camera.position.x > 10 && camera.position.z < 0 ))
     camera.position.z -= pushback;


  }

  prevTime = time;

  scene.remove(scene.getObjectByName('light'))


  light = new THREE.DirectionalLight(color, intensity);
  light.name = 'light'
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, -5);
  scene.add(light);
  scene.add(light.target);

  renderer.render( scene, camera );

}