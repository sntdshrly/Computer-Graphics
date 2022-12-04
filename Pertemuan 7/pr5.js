const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,1,1000);
camera.position.z = 5;
camera.position.y = 4;
camera.position.x = 2;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Texture
const puzzleTexture = new THREE.TextureLoader().load('assets_puzzle/puzzle.png');

let geometry = new THREE.BufferGeometry();
let vertices = new Float32Array([
    -1, -1, 0, //0
    1, 2, 0, //1
    -1, 2, 0, //2

    -1, -1, 0, //3
    1, -1, 0, //4
    1, 2, 0, //5

    1, -1, 0, //0
    3, 2, 0, //1
    1, 2, 0, //2

    1, -1, 0, //3
    3, -1, 0, //4
    3, 2, 0, //5

    3, -1, 0, //0
    5, 2, 0, //1
    3, 2, 0, //2

    3, -1, 0, //3
    5, -1, 0, //4
    5, 2, 0, //5

// -----------------------------------------
    -1, 2, 0, //0
    1, 5, 0, //1
    -1, 5, 0, //2

    -1, 2, 0, //3
    1, 2, 0, //4
    1, 5, 0, //5

    1, 2, 0, //0
    3, 5, 0, //1
    1, 5, 0, //2

    1, 2, 0, //3
    3, 2, 0, //4
    3, 5, 0, //5

    3, 2, 0, //0
    5, 5, 0, //1
    3, 5, 0, //2

    3, 2, 0, //3
    5, 2, 0, //4
    5, 5, 0, //5

// -----------------------------------------
    -1, 5, 0, //0
    1, 8, 0, //1
    -1, 8, 0, //2

    -1, 5, 0, //3
    1, 5, 0, //4
    1, 8, 0, //5

    1, 5, 0, //0
    3, 8, 0, //1
    1, 8, 0, //2

    1, 5, 0, //3
    3, 5, 0, //4
    3, 8, 0, //5

    3, 5, 0, //0
    5, 8, 0, //1
    3, 8, 0, //2

    3, 5, 0, //3
    5, 5, 0, //4
    5, 8, 0, //5

]);

let uvs = new Float32Array([
    0.66, 0.33,
    1, 0.66,
    0.66, 0.66,
    
    0.66, 0.33,
    1, 0.33,
    1, 0.66,

    0.66, 0,
    1, 0.33,
    0.66, 0.33,

    0.66, 0,
    1,0,
    1, 0.33,

    0.33,0.66,
    0.66,1,
    0.33,1,

    0.33,0.66,
    0.66,0.66,
    0.66,1,

    0,0.33,
    0.33,0.66,
    0,0.66,

    0,0.33,
    0.33,0.33,
    0.33,0.66,

    0.33,0,
    0.66,0.33,
    0.33,0.33,

    0.33,0,
    0.66,0,
    0.66,0.33,

    0,0.66,
    0.33,1,
    0,1,

    0,0.66,
    0.33,0.66,
    0.33,1,

    0.66,0.66,
    1,1,
    0.66,1,

    0.66,0.66,
    1,0.66,
    1,1,

    0,0,
    0.33,0.33,
    0,0.33,

    0,0,
    0.33,0,
    0.33,0.33,

    0.33,0.33,
    0.66,0.66,
    0.33,0.66,

    0.33,0.33,
    0.66,0.33,
    0.66,0.66

]);
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

let material = new THREE.MeshBasicMaterial({color:0xffffff,map:puzzleTexture});
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light01 = new THREE.PointLight();
light01.position.set(0,0,5);
scene.add(light01);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();