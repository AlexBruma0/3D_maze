import * as THREE from 'three';

const left_wallx = 5;
const left_wallz = -15;
const wall_height = 10;
const wall_width = 1;
const wall_depth = 20
const PI = 3.14
const unit_length = 3.3;

const walls = [
    {
        dimension:[wall_width,wall_height,2],
        position: [5,0,0],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,6],
        position: [7,0,0],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [5,0,3],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [3,0,1],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [1,0,3],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [3,0,5],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,2],
        position: [0,0,5],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,6],
        position: [0,0,7],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-3,0,5],
        rotation:0
    },
    //10
    {
        dimension:[wall_width,wall_height,4],
        position: [-1,0,3],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-5,0,3],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-3,0,1],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,6],
        position: [-7,0,0],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,2],
        position: [-5,0,0],
        rotation:0
    },
    //15
    {
        dimension:[wall_width,wall_height,4],
        position: [-5,0,-3],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-3,0,-1],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-1,0,-3],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [-3,0,-5],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,6],
        position: [0,0,-7],
        rotation:PI/2
    },
    //20
    {
        dimension:[wall_width,wall_height,2],
        position: [0,0,-5],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [3,0,-5],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [1,0,-3],
        rotation:0
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [3,0,-1],
        rotation:PI/2
    },
    {
        dimension:[wall_width,wall_height,4],
        position: [5,0,-3],
        rotation:PI/2
    },
    

]
export function meshes(scene) {
    floor(scene)
    for(var i = 0; i < walls.length; i++){
        const loader = new THREE.TextureLoader();
        const texture = loader.load( "./me.png" );
        texture.colorSpace = THREE.SRGBColorSpace;
        var material;

        const cubeGeo = new THREE.BoxGeometry( walls[i].dimension[0], walls[i].dimension[1], walls[i].dimension[2] * unit_length );
        if( i  == 2){
             material = new THREE.MeshBasicMaterial( {
                map: texture,
            } );
        }
        else{
            material = new THREE.MeshPhongMaterial( { color: '#000' } );
        }
        
        const mesh = new THREE.Mesh( cubeGeo, material );
        mesh.position.set(walls[i].position[0]*unit_length, walls[i].position[1]*unit_length + 4, -walls[i].position[2]*unit_length  );
        mesh.rotateY(walls[i].rotation)
        scene.add( mesh );
    }
}

function floor(scene){
    const planeSize = 400;
    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize/2 ;
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