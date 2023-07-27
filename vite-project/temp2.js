import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { meshes } from './meshes';
function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
  renderer.setSize( window.innerWidth, window.innerHeight );

	const fov = 70;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
	camera.position.set( 0, 5, 20 );

	const controls = new FirstPersonControls( camera, canvas );
  controls.movementSpeed = 0.1;
  controls.lookSpeed = 0.009;
  controls.noFly = true;
	controls.update(1);
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'white' );
  meshes(scene);
  //floor

	{
		const planeSize = 400;
		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}
 

  //light
	{

		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

	}

  var shiftPressed = false
	function render() {
		renderer.render( scene, camera );
		requestAnimationFrame( render );
	  controls.update(1);

	}
	requestAnimationFrame( render );
}

main();
