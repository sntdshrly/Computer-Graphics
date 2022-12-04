const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 3;
camera.position.y = 4;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', (evt)=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
const controls = new THREE.OrbitControls(camera,renderer.domElement);

// Lantai
const geo = new THREE.BoxGeometry(5,0.05,5);
const mat = new THREE.MeshStandardMaterial({color:0xaaaaaa});
const mesh = new THREE.Mesh(geo,mat);
mesh.position.set(0,0.025,0);
mesh.receiveShadow = true;
scene.add(mesh);

// Dinding belakang
const geo2 = new THREE.BoxGeometry(5,2.5,0.1);
const mat2 = new THREE.MeshStandardMaterial({color:0x777777});
const mesh2 = new THREE.Mesh(geo2, mat2);
mesh2.position.set(0,1.25,-2.5);
mesh2.receiveShadow = true;
scene.add(mesh2);   

// Dinding kiri
const geo3 = new THREE.BoxGeometry(0.1,2.5,5);
const mat3 = new THREE.MeshStandardMaterial({color:0x999999});
const mesh3 = new THREE.Mesh(geo3, mat3);
mesh3.position.set(-2.5,1.25,0);
mesh3.receiveShadow = true;
scene.add(mesh3);   

// Texture
const stoneTexture = new THREE.TextureLoader().load('assets_pyramid/stone-block-wall_albedo.png');

// Create geometry, material, and mix it up (mesh)
const geometry = new THREE.ConeGeometry( 1, 1, 5 );
const material = new THREE.MeshBasicMaterial( {color: 0xffffff, map:stoneTexture} );
const cone = new THREE.Mesh( geometry, material );
cone.position.set(0,1,0);
scene.add( cone );

const light01 = new THREE.PointLight(0x696880);
light01.intensity = 2;
light01.position.set(0,1,0);
light01.castShadow = true;
scene.add(light01);

const helper01 = new THREE.PointLightHelper(light01,0.1,new THREE.Color(1,0,0));
scene.add(helper01);

function draw(){
    cone.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();