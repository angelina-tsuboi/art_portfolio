var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
renderer.setClearColor(0x808080);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


//CREATION OF THE CAMERA
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 0, 20);


var controls = new THREE.OrbitControls(camera);
//controls.update() must be called after any manual changes to the camera's transform
controls.update();


//CREATION OF THE SCENE
var scene = new THREE.Scene();


//ADDING LIGHTS TO THE SCENE
//Ambient Light
var light1 = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(light1);


//PointLight
var posizioneLuce = [10, 10, 10];

var light2 = new THREE.PointLight(0xFFFFFF, 0.5, 600);
light2.castShadow = true;
light2.position.set(posizioneLuce[0], posizioneLuce[1], posizioneLuce[2]);
scene.add(light2);

light2.shadow.mapSize.width = 512;
light2.shadow.mapSize.height = 512;
light2.shadow.camera.near = 0.5;
light2.shadow.camera.far = 500;

//For the sake of ■■■■ this is just a visualiser
vedilo = new THREE.SphereBufferGeometry(1, 32, 32);
var vediMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    //AGGIUNGERE IL MODO WIREFRAME
});
var visto = new THREE.Mesh(vedilo, vediMat);
visto.position.set(posizioneLuce[0], posizioneLuce[1], posizioneLuce[2]);
scene.add(visto);


//CREATION OF MATERIAL
//Shoe material
var material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('textures/diffuse.jpg'),
    normalMap: new THREE.TextureLoader().load('textures/normals.jpg'),
});

//Floor material
var material1 = new THREE.MeshLambertMaterial({
    color: 0xAFEEEE,
    side: THREE.DoubleSide
});


//OBJECTS
//Load the shoe model
var loader = new THREE.GLTFLoader();
loader.load('models/meshia.glb', handle_load);

var mesh;

function handle_load(gltf) {
    mesh = gltf.scene.children[0];
    mesh.material = material;
    mesh.material.shading = THREE.SmoothShading;
    //mesh.castShadow = true;
    //mesh.receiveShadow = false;
    scene.add(mesh);
}

//Creation of the circular floor
circle = new THREE.CircleBufferGeometry(10, 50);
var cerchio = new THREE.Mesh(circle, material1);
cerchio.rotation.x = -1.5708;
cerchio.position.y = -2;
//cerchio.castShadow = false;
//cerchio.receiveShadow = true;
scene.add(cerchio);


//EVERY FRAME UPDATE
render();

var delta = 0;
var prevTime = Date.now();

function render() {
    delta += 0.1;
    if (mesh) {
        mesh.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}