import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
  renderer.setSize( window.innerWidth, window.innerHeight );

	const fov = 70;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
  controls.enableDamping = false;
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'white' );
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
  //cube
	{

		const cubeSize = 4;
		const cubeGeo = new THREE.BoxGeometry( cubeSize/4, cubeSize*2, cubeSize*2 );
		const cubeMat = new THREE.MeshPhongMaterial( { color: '#8AC' } );
		const mesh = new THREE.Mesh( cubeGeo, cubeMat );
		mesh.position.set( cubeSize + 1, cubeSize / 2, 0 );
		scene.add( mesh );

	}
  //sphere
	{

		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		scene.add( mesh );

	}
  //light
	{

		const color = 0xFFFFFF;
		const intensity = 2;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

	}

	function render() {
		renderer.render( scene, camera );
		requestAnimationFrame( render );
	}
	requestAnimationFrame( render );
}

main();
