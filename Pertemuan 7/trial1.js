// Create scene, camera (move the camera out a bit), and renderer and add the renderer element to our HTML document
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 15;
camera.position.y = 16;
camera.position.z = 13;
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF, 1.0); // For update backgorund color
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a cube and add to scene
var cubeGeometry = new THREE.BoxGeometry(
    10 * Math.random(),
    10 * Math.random(),
    10 * Math.random());
var cubeMaterial = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

// call the render function
renderer.render(scene, camera);