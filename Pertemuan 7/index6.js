const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
camera.position.z = 5;
camera.position.y = 3;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', (evt)=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const controls = new THREE.OrbitControls(camera,renderer.domElement);
//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 2, 5 );
// controls.update();

const geo = new THREE.BoxGeometry(5,0.05,5);
// const mat = new THREE.MeshBasicMaterial({color:0xaaaaaa});
const mat = new THREE.MeshStandardMaterial({color:0xaaaaaa});
const mesh = new THREE.Mesh(geo,mat);
mesh.position.set(0,0.025,0);
mesh.receiveShadow = true;
scene.add(mesh);

const geo2 = new THREE.BoxGeometry(5,2.5,0.1);
// const mat2 = new THREE.MeshBasicMaterial({color:0x777777})
const mat2 = new THREE.MeshStandardMaterial({color:0x777777});
const mesh2 = new THREE.Mesh(geo2, mat2);
mesh2.position.set(0,1.25,-2.5);
mesh2.receiveShadow = true;
scene.add(mesh2);   

const geo3 = new THREE.BoxGeometry(0.1,2.5,5);
// const mat3 = new THREE.MeshBasicMaterial({color:0x999999})
const mat3 = new THREE.MeshStandardMaterial({color:0x999999});
const mesh3 = new THREE.Mesh(geo3, mat3);
mesh3.position.set(-2.5,1.25,0);
mesh3.receiveShadow = true;
scene.add(mesh3);   

const boxgeo =  new THREE.BoxGeometry(1,1,1);
// const boxMat= new THREE.MeshBasicMaterial({color:0xff0000});
const boxMat = new THREE.MeshStandardMaterial({color:0xff0000});
const box = new THREE.Mesh(boxgeo, boxMat);
box.position.set(0,1,0);
scene.add(box);
box.castShadow = true;
box.receiveShadow = true;

const light01 = new THREE.PointLight()
light01.color = new THREE.Color(1,0,0);
light01.intensity = 1;
light01.position.set(0,1,1);
light01.castShadow = true;

scene.add(light01);
const helper01 = new THREE.PointLightHelper(light01,0.1,new THREE.Color(1,0,0));
scene.add(helper01);

// const light02 = new THREE.SpotLight();
// light02.color = new THREE.Color(1,1,0);
// light02.intensity = 1;
// light02.position.set(1,1,0);

// scene.add(light02);

// const helper02 = new THREE.SpotLightHelper(light02,0.1, new THREE.Color(1,1,0));
// scene.add(helper02);

const ambient = new THREE.AmbientLight();
ambient.color = new THREE.Color(1,1,1);
ambient.intensity = 0.5;
scene.add(ambient);


function draw() {
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
    controls.autoRotate = true;
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
}

draw();