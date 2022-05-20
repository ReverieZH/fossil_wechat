import { registerGLTFLoader } from '../loaders/gltf-loader'
//import { registerOBJLoader } from './OBJLoader'
import registerOrbit from "./orbit"
// import ResourceTracker from "../utils/track"
// let resMgr = new ResourceTracker();
// const track = resMgr.track.bind(resMgr);
export function renderModel(canvas, THREE, path) {
  registerGLTFLoader(THREE)
  var clock, mixer;
  var camera, scene, renderer, model, face, controls;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
    camera.position.set(- 5, 3, 10);
    camera.lookAt(new THREE.Vector3(0, 2, 0));
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
    clock = new THREE.Clock();
    // lights
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    scene.add(light);
    // model
    var loader = new THREE.GLTFLoader();
    loader.load(path, function (gltf) {
      model = gltf.scene;
      scene.add(model);
    }, undefined, function (e) {
      console.error(e);
    });
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    const { OrbitControls } = registerOrbit(THREE)
    controls = new OrbitControls( camera, renderer.domElement );

    camera.position.set( 5, 5, 10 );
    controls.update();
  }

  function animate() {
    var dt = clock.getDelta();
    if (mixer) mixer.update(dt);
    canvas.requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
  }
  return [scene, renderer]
}