const scene = new THREE.Scene();
// const kanvas = document.querySelector("#mycanvas");
const cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
// const cam = new THREE.PerspectiveCamera(45, kanvas.width/kanvas.height,1,1000);

cam.position.z = 5;

const renderer = new THREE.WebGLRenderer();

// const renderer = new THREE.WebGLRenderer({canvas:kanvas});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement); // menambahkan canvas ke dalam body html

// mesh -> sebuah benda 3D
// mesh -> geometry and material

// let geo = new THREE.BoxGeometry(1, 1, 1);
// let mat = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
// let cube = new THREE.Mesh(geo, mat);

// cube.position.x = 0;
// scene.add(cube);

let c_geo = new THREE.BufferGeometry();
// let vertices = new Float32Array([
//     -1, -1, 0,
//     1, 1, 0,
//     -1, 1, 0,

//     1, 1, 0,
//     1, -1, 0,
//     -1, -1, 0
// ]);
let vertices = new Float32Array([
    -1, -1, 0,
    1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
]);
c_geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

let color = new Float32Array([
    1,0,0,
    0,1,0,
    0,0,1,
    1,1,0,
    0,1,1,
    1,0,1
])

c_geo.setAttribute('color', new THREE.BufferAttribute(color, 3))

// berlawanan arah jarum jam = di depan
// searah arah jarum jam = di belakang
c_geo.setIndex([
    0,3,1,
    0,1,2
]);

let mat = new THREE.MeshBasicMaterial({vertexColors:true});
let segitiga = new THREE.Mesh(c_geo, mat);
scene.add(segitiga);

function draw() {

    // cube.rotation.y += 0.01;

    // segitiga.rotation.y += 0.01
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();