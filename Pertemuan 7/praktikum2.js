// Create scene, camera (move the camera out a bit), and renderer and add the renderer element to our HTML document
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry, material, and mix it up (mesh)
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
    1,3,1,
    1,3,-1,
    1,-1,1,
    1,-1,-1,
    -1,3,-1,
    -1,3,1,
    -1,-1,-1,
    -1,-1,1
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setIndex([
    0,2,1,
    2,3,1,
    4,6,5,
    6,7,5,
    4,5,1,
    5,0,1,
    7,6,2,
    6,3,2,
    5,7,0,
    7,2,0,
    1,3,4,
    3,6,4,
   
]);
const material = new THREE.MeshBasicMaterial( { color: 0xFFBF00 } );
const mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 0, 0);
scene.add(mesh);

// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.y += 0.01;
}
animate();