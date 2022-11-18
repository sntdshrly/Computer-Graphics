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
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array( [
	// depan
	-1,-1,1,
	1,-1,1,
	-1,1,1,

	-1,1,1,
	1,-1,1,
	1,1,1,

	// kanan
	1,-1,1,
	1,-1,-1,
	1,1,1,

	1,1,1,
	1,-1,-1,
	1,1,-1,


	// belakang
	1, -1, -1,
	-1, -1, -1,
	1,  1, -1,
   
	1,  1, -1,
	-1, -1, -1,
	-1,  1, -1,

	// kiri
	-1, -1, -1,
	-1, -1,  1,
	-1,  1, -1,
   
	-1,  1, -1,
	-1, -1,  1,
	-1,  1,  1,

	 // atas
	 1,  1, -1,
	 -1,  1, -1,
	 1,  1,  1,
	
	 1,  1,  1,
	 -1,  1, -1,
	 -1,  1,  1,

	 // bawah
	 1, -1,  1,
	 -1, -1,  1,
	 1, -1, -1,
	
	 1, -1, -1,
	 -1, -1,  1,
	 -1, -1, -1

] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xF4A900 } );
const mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 0, 0);
scene.add(mesh);

// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
	
}
animate();