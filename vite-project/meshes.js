import * as THREE from 'three';
export function meshes(scene) {
    cube(scene,5,5,5)
    cube(scene,-5,5,5)
}
function cube(scene,x,y,z){
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry( cubeSize/4, cubeSize*4, cubeSize*20 );
    const cubeMat = new THREE.MeshPhongMaterial( { color: '#999' } );
    const mesh = new THREE.Mesh( cubeGeo, cubeMat );
    mesh.position.set( x,y,z );
    scene.add( mesh );
}