const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const diceTexture1 = new THREE.TextureLoader().load('assets_dice/dice1.png');
const diceTexture2 = new THREE.TextureLoader().load('assets_dice/dice2.png');
const diceTexture3 = new THREE.TextureLoader().load('assets_dice/dice3.png');
const diceTexture4 = new THREE.TextureLoader().load('assets_dice/dice4.png');
const diceTexture5 = new THREE.TextureLoader().load('assets_dice/dice5.png');
const diceTexture6 = new THREE.TextureLoader().load('assets_dice/dice6.png');

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshLambertMaterial({color:0xffffff, map:diceTexture1});
const material = [
    new THREE.MeshBasicMaterial({map: diceTexture1}), 
    new THREE.MeshBasicMaterial({map: diceTexture2}),
    new THREE.MeshBasicMaterial({map: diceTexture3}),
    new THREE.MeshBasicMaterial({map: diceTexture4}),
    new THREE.MeshBasicMaterial({map: diceTexture5}),
    new THREE.MeshBasicMaterial({map: diceTexture6}),
]
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light01 = new THREE.PointLight();
light01.position.set(0,0,5);
scene.add(light01);


function draw(){
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();