import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, hlight;

function init(){

    const container = document.createElement( 'div' );
	document.getElementById('bio').appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff);

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.25, 5000 );
    camera.position.set( 60, 40, 70 );

    hlight = new THREE.AmbientLight( 0x404040, 100);
    scene.add(hlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(900, 600);
    renderer.setPixelRatio( window.devicePixelRatio );

    const controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 2;
	controls.maxDistance = 1000;
	controls.target.set( 0, 0, - 0.2 );
	controls.update();

    let loader = new GLTFLoader();
    loader.load('trees.glb', function(gltf){
        scene.add(gltf.scene);
        render();
    });

    container.appendChild( renderer.domElement );
}

function render() {

    renderer.render( scene, camera );

}

init();