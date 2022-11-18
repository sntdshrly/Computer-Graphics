// const kanvas = document.querySelector("#mycanvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
// const render = 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // nambahin canvas dari threejs

// nambahin benda
// benda mesh -> geometry + material
// const geo = new THREE.BoxGeometry(1,1,1);

const kustom_geo = new THREE.BufferGeometry();

const vertices = new Float32Array([
    -1, -1, 0, //0
    1, -1, 0, //1
    1, 1, 0, //2
    -1, 1, 0, //3
]);

kustom_geo.setAttribute('position', new THREE.BufferAttribute(vertices,3));
kustom_geo.setIndex([
    1, 2, 3,
    0, 1, 3
]);

const custom_color = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
    1, 0, 1
]);


kustom_geo.setAttribute('color', new THREE.BufferAttribute(custom_color,3));
// const mat = new THREE.MeshBasicMaterial({color:0xff0000, wireframe : true});
// const mat = new THREE.MeshBasicMaterial({color:0xff0000, side : THREE.DoubleSide});
const mat = new THREE.MeshBasicMaterial({vertexColors:true});
const mesh = new THREE.Mesh(kustom_geo, mat);

scene.add(mesh);

function draw() {
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();