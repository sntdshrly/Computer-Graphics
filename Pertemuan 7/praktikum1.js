// Create scene, camera (move the camera out a bit), and renderer and add the renderer element to our HTML document
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry, material, and mix it up (mesh)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x960144 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-3, 0, 0);
scene.add(cube);

const geometryCircle = new THREE.CircleGeometry(0.3, 32);
const materialCirlcle = new THREE.MeshBasicMaterial({ color: 0xF56ECE });
const circle = new THREE.Mesh(geometryCircle, materialCirlcle);
circle.position.set(0, 0, 0);
scene.add(circle);

const geometryTorus = new THREE.TorusGeometry(1, 0.1, 16, 100);
const materialTorus = new THREE.MeshBasicMaterial({ color: 0x211E61 });
const torus = new THREE.Mesh(geometryTorus, materialTorus);
torus.position.set(3, 0, 0);
scene.add(torus);

const geometrySphere = new THREE.OctahedronGeometry(0.5, 0)
const materialSpehere = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometrySphere, materialSpehere );
sphere.position.set(3, 0, 0);
scene.add( sphere )


// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    circle.rotation.x += 0.01;
    circle.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    camera.rotation.z += Math.PI * 0.001;
}
animate();