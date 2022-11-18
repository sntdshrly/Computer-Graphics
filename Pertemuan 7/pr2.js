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
const geometry1 = new THREE.BufferGeometry();
const vertices1 = new Float32Array([
	// depan
	-1, -1, 1,
	1, -1, 1,
	-1, 1, 1,

	-1, 1, 1,
	1, -1, 1,
	1, 1, 1,

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(0, 0, 0);
scene.add(mesh1);

const geometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array([
	// kanan
	1, -1, 1,
	1, -1, -1,
	1, 1, 1,

	1, 1, 1,
	1, -1, -1,
	1, 1, -1,

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3));
const material2 = new THREE.MeshBasicMaterial({ color: 0xff8c69 }); // salmon
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 0, 0);
scene.add(mesh2);

const geometry3 = new THREE.BufferGeometry();
const vertices3 = new Float32Array([
	// kiri
	-1, -1, -1,
	-1, -1, 1,
	-1, 1, -1,

	-1, 1, -1,
	-1, -1, 1,
	-1, 1, 1,

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry3.setAttribute('position', new THREE.BufferAttribute(vertices3, 3));
const material3 = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0, 0, 0);
scene.add(mesh3);

const geometry4 = new THREE.BufferGeometry();
const vertices4 = new Float32Array([
	// belakang
	1, -1, -1,
	-1, -1, -1,
	1,  1, -1,
   
	1,  1, -1,
	-1, -1, -1,
	-1,  1, -1,

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry4.setAttribute('position', new THREE.BufferAttribute(vertices4, 3));
const material4 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // blue
const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(0, 0, 0);
scene.add(mesh4);

const geometry5 = new THREE.BufferGeometry();
const vertices5 = new Float32Array([
	// atas
	1, 1, -1,
	-1, 1, -1,
	1, 1, 1,

	1, 1, 1,
	-1, 1, -1,
	-1, 1, 1,

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry5.setAttribute('position', new THREE.BufferAttribute(vertices5, 3));
const material5 = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // cyan
const mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(0, 0, 0);
scene.add(mesh5);

const geometry6 = new THREE.BufferGeometry();
const vertices6 = new Float32Array([
	 // bawah
	 1, -1,  1,
	 -1, -1,  1,
	 1, -1, -1,
	
	 1, -1, -1,
	 -1, -1,  1,
	 -1, -1, -1

]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry6.setAttribute('position', new THREE.BufferAttribute(vertices6, 3));
const material6 = new THREE.MeshBasicMaterial({ color: 0x00ff000 });
const mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.set(0, 0, 0);
scene.add(mesh6);

// Rendering the scene
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	mesh1.rotation.x += 0.01;
	mesh1.rotation.y += 0.01;
	mesh2.rotation.x += 0.01;
	mesh2.rotation.y += 0.01;
	mesh3.rotation.x += 0.01;
	mesh3.rotation.y += 0.01;
	mesh4.rotation.x += 0.01;
	mesh4.rotation.y += 0.01;
	mesh5.rotation.x += 0.01;
	mesh5.rotation.y += 0.01;
	mesh6.rotation.x += 0.01;
	mesh6.rotation.y += 0.01;
}

animate();