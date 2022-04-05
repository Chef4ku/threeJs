import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh } from 'three';


// SCENE SETUP

const scene = new THREE.Scene();

//                                        (FOV,             Aspect Ratio             , Near, Far)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.setZ( 30 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector( '#bg' ),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// *SCENE SETUP


// Objects
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347, wireframe: false } );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );


function addStart() {
    const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
    const star = new Mesh( geometry, material );

    const [ x, y , z ] = Array( 3 ).fill().map( () => THREE.MathUtils.randFloatSpread( 200 ) );
    star.position.set( x, y, z );

    scene.add( star );
}

Array( 200 ).fill().forEach( addStart );


// Lights
const pointLight = new THREE.PointLight( 0xFFFFFF );

scene.add( pointLight );


/*/ Helpers
const lightHelper = new THREE.PointLightHelper( pointLight );     // Mark position of light
const gridHelper = new THREE.GridHelper();

scene.add( lightHelper, gridHelper );
/*/

// controls
const controls = new OrbitControls( camera, renderer.domElement );



// Game loop
function animate() {
    requestAnimationFrame( animate );
    
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.005;
    
    controls.update();

    renderer.render( scene, camera );
}
animate();