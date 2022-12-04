// Create scene, camera (move the camera out a bit), and renderer and add the renderer element to our HTML document
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Texture
const stoneTexture = new THREE.TextureLoader().load('assets_pyramid/stone-block-wall_albedo.png');

// Create geometry, material, and mix it up (mesh)
const geometry = new THREE.ConeGeometry( 3, 4, 5 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff, map:stoneTexture} );
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );

// Light
const light01 = new THREE.PointLight();
light01.position.set(0,0,5);
scene.add(light01);

// Rendering the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cone.rotation.y += 0.01;
}
animate();