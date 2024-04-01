import * as THREE from "three";
// console.log("Hello there", THREE);

//Scene
/**
 * Like a container where we put objects,models,particles, lights etc
 */
const scene = new THREE.Scene();

//Object
/**
 * Objects can be many things. You can have primitive geometries, imported models, particles, lights, and so on.
 * To create that red cube, we need to create a type of object named Mesh. A Mesh is the combination of a geometry (the shape) and a material (how it looks).
 */

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); //or "red" , #ff0000
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes (for camera aspect ratio)
const sizes = {
  width: 800,
  height: 600,
};

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); //Perspective camera with FoV, the Fov is from top to bottom, not left to right for some reason
scene.add(camera);

//Renderer

const canvas = document.querySelector("canvas.webgl"); //Get canvase to render to

const renderer = new THREE.WebGLRenderer({
  canvas,
});

//Resize canvas according to out width and height

renderer.setSize(sizes.width, sizes.height);

//Finally render to canvas, just to stare into darkness, since the camera is inside the cube all sitting at coordinate 0,0,0; move the camera back
// renderer.render(scene, camera);
camera.position.z = 3;
renderer.render(scene, camera);
