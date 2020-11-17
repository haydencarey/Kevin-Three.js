// what we need:
// 1. a scene
// 2. a camera
// 3. a renderer

//create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue')

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

//create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);


// add items to the scene.
// for each item, we need three things:
// 1. the geomertry (The shape)
// 2. the material (the skin / appearence of the shape)
// 3. the mesh (the object that pairs the geometry and the mesh)

// 1. Initialize the geomertry (The shape)
let geometry = new THREE.BoxGeometry(1, 1, 1);

// 2. Initialize  the material (the skin / appearence of the shape)
//let material = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false });

// set the material †ø be the image
let  imageLink = 'kevin_01.jpg'
let  imageLoader = new THREE.TextureLoader();
let imageTexture = imageLoader.load(imageLink);
//now we can pass the texture onto the material
let material = new THREE.MeshBasicMaterial({ map: imageTexture })

// 3. Initialize the mesh (the object that pairs the geometry and the mesh)
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let rotate = true;
let rotateX = 0.01;
let rotateY = 0.01;

//define the animate function and call it repeatedly
function animate() {
    if (rotate) {
        cube.rotation.x += rotateX;
        cube.rotation.y += rotateY;
    }

    // allow for controls to update. controls.update() must be called after any manual changes to the camera's transform
    controls.update();

    //call render
    renderer.render(scene, camera);

    // call animate again 
    requestAnimationFrame(animate);
}

animate();

function updateImage() {
    if (imageLink === 'kevin_01.jpg') {
        imageLink = 'kevin_02.jpg'
    } else {
        imageLink = 'kevin_01.jpg'
    }

    let imageLoaderUpdate = new THREE.TextureLoader();
    let imageTextureUpdate = imageLoaderUpdate.load(imageLink);

    cube.material.map = imageTextureUpdate;

    //set needsUpdate to "true"
    cube.material.needsUpdate = true;
}

let rotateToggle = document.getElementById("rotate-toggle");
rotateToggle.addEventListener('click', () => {
    rotate = !rotate;

})

let imageToggle = document.getElementById("image-toggle");
imageToggle.addEventListener('click', () => {
    updateImage();

})