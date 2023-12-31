import * as THREE from 'three';

const wall_height = 10;
const wall_width = 1;
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
    let video = document.getElementById("video")
    let videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    for(var i = 0; i < walls.length; i++){
        const loader = new THREE.TextureLoader();
        var texture;
        if(i == 2){
            texture = loader.load( "./welcome.png" );
        }
        else if(i == 18 ){
            texture = loader.load( "./thankYou.png" );
        }
        else if(i == 10 ){
            texture = loader.load( "./book.png" );
        }
        else if(i == 7){
            texture = loader.load( "./work.png" );
        }
        else if(i == 14){
            texture = loader.load( "./cal.png" );
        }
        else if(i == 1 || i == 5 || i == 10|| i == 17 || i == 20|| i == 23 ){
            texture = loader.load( "./arrow.png" );
            texture.center = new THREE.Vector2(0.5,0.5)
            texture.rotation = Math.PI
        }
        else if(i == 12){
            texture = loader.load( "./personalProjects.png" );
        }

        else {
            texture = loader.load( "./arrow.png" );
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        var material;

        const cubeGeo = new THREE.BoxGeometry( walls[i].dimension[0], walls[i].dimension[1], walls[i].dimension[2] * unit_length );
        if(i == 8){
            material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                side:THREE.FrontSide,
                toneMapped: false
            })
        }
        //ends: i == 2,9,12
        else if(i ==2 || i == 7 || i ==9 || i == 1 || i == 5 || i == 13 || i == 15||i == 10 || i == 16  || i == 19 || i == 20 || i == 22){
            material = 
            [
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {map: texture} ),

                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
          ]
        }
        //i = 10,14, 
        else if (i == 0 || i == 3 || i == 4 || i == 6 || i == 12|| i == 14 || i ==18 || i == 11 || i == 17|| i == 21 || i == 23    ){
            material = 
            [
                new THREE.MeshBasicMaterial( {map: texture} ),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
          ]

        }
        else{
            material = 
            [
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
                new THREE.MeshBasicMaterial( {color: 'black'}),
          ]

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