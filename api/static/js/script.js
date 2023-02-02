// Crear escena, cámara y renderizador
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cargar modelo GLTF y agregarlo a la escena
var loader = new THREE.GLTFLoader();
loader.load("modelo.gltf", function (gltf) {
  scene.add(gltf.scene);
});

// Colocar la cámara y renderizar la escena
camera.position.z = 5;
var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();