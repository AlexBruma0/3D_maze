import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


drawCube(1,1,1,0x00f100)
drawCube(1,0.5,5,0xf10000)
const color = 0x0000ff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
//scene.add(light);

function drawCube(width, height, depth, color){
  const geometry = new THREE.BoxGeometry( width, height, depth );
  const material = new THREE.MeshBasicMaterial( { color: color } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
}
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
	renderer.render( scene, camera );
}
const move_speed = 0.5;

document.addEventListener('keydown', (event) =>{
  moveCameraOnKey(event, 'w', () => camera.translateZ(-move_speed))
  moveCameraOnKey(event, 's', () => camera.translateZ(move_speed))
  moveCameraOnKey(event, 'a', () => camera.translateX(-move_speed))
  moveCameraOnKey(event, 'd', () => camera.translateX(move_speed))
})

document.addEventListener('mousemove', (event) =>{
  rotateCameraOnMouseMove(event)
})

function moveCameraOnKey(event, key, move){
  if(event.key === key){
    move()
  }
}
const rotate_speed = 0.05

function rotateCameraOnMouseMove(event){
  if(event.which === 3){
    if(event.movementX > 0){
      camera.rotateY(-rotate_speed)
    }
    if(event.movementX < 0){
      camera.rotateY(rotate_speed)
    }
    if(event.movementY > 0){
      camera.rotateX(-rotate_speed)
    }
    if(event.movementY < 0){
      camera.rotateX(rotate_speed)
    }
    
  }
}

animate();