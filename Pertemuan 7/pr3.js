// Create scene, camera (move the camera out a bit), and renderer and add the renderer element to our HTML document
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry, material, and mix it up (mesh)
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const geometryCustom = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1, -1, 1, // 0
    1, -1, 1, // 1
    -1, 1, 1, // 2
    1, 1, 1, // 3
    1, -1, -1, // 4
    1, 1, -1 //5
]);

// itemSize = 3 because there are 3 values (components) per vertex
geometryCustom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometryCustom.setIndex([
    0, 1, 2, // depan segitiga bawah
    2, 1, 3, // depan segitiga atas
    // 1, 4, 3, // kanan segitiga atas
    // 3, 4, 5 // kanan segitiga bawah
]);
const material = new THREE.MeshBasicMaterial({ color: 0xF4A900 });
const mesh = new THREE.Mesh(geometryCustom, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// // For cut the box
const geometryCutter = new THREE.BufferGeometry();
const verticesCutter = new Float32Array([
    -0.3, 0.1, 1.001, //0
    1, 0.5, 1.001, //1
    -0.3, 0.5, 1.001, //2
    1, 0.1, 1.001, //3
    0.3, -0.75, 1.001, //4
    0.3, -0.3, 1.001, //5
    -1, -0.75, 1.001, //6
    -1, -0.3, 1.001 //7
]);
// itemSize = 3 because there are 3 values (components) per vertex
geometryCutter.setAttribute('position', new THREE.BufferAttribute(verticesCutter, 3));
geometryCutter.setIndex([
    0, 1, 2, // depan segitiga atas (kanan atas)
    3, 1, 0, // depan segitiga bawah (kanan bawah)
    5, 7, 6,// depan segitiga atas (kiri bawah)
    4, 5, 6 // depan segitiga bawah (kiri bawah)
]);
const materialCutter = new THREE.MeshBasicMaterial({ color: 0x000000 });
const meshCutter = new THREE.Mesh(geometryCutter, materialCutter);
meshCutter.position.set(0, 0, 0);
scene.add(meshCutter);

// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // mesh.rotation.x += 0.01;
    // meshCutter.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // meshCutter.rotation.y += 0.01;
}
animate();