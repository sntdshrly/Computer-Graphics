const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture
const stoneTexture = new THREE.TextureLoader().load('assets_pyramid/stone-block-wall_albedo.png');

let geometry = new THREE.BufferGeometry();
let vertices = new Float32Array([
    0,0,0, //v0 = 0
    0,1,0, //v1 = 1
    1,1,0,//v2 = 2
    1,0,0, //v3 = 3
    0.5,0.5,1, //v4 = 4
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([
    0,1,2,
    0,2,3,
    1,0,4,
    2,1,4,
    3,2,4,
    0,3,4
]);

let uvs = new Float32Array([
    0,0,
    1,1,
    0,1,
    1,0,
]);
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

let material = new THREE.MeshBasicMaterial({color: 0xffffff,map:stoneTexture});
let segitiga = new THREE.Mesh(geometry, material);
scene.add(segitiga);

// Light
const light01 = new THREE.PointLight();
light01.position.set(0,0,5);
scene.add(light01);

function draw() {
    segitiga.rotation.x += 0.01;
    segitiga.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();