const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const brickTexture = new THREE.TextureLoader().load('assets/woodparquet_68_BaseColor-1K.png');
const brickNormal = new THREE.TextureLoader().load('assets/woodparquet_68_Normal-1K.png');

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({color:0xff0000, map:brickTexture, normalMap:brickNormal});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light01 = new THREE.PointLight();
light01.position.set(0,0,5);
scene.add(light01);

const light02 = new THREE.PointLight();
light02.intensity = 2;
light02.position.set(1,0.2,0.2);
scene.add(light02);

function draw(){
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();