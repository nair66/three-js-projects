import * as THREE from "three";
import gsap from "gsap"; //GREEN Sock External lib for timing functions and other stuff

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//Animations
/**
 */

let time = Date.now();
const tick = () => {
  //time
  //Multiply delta time to rotaion and movement, else the transfromation will be faster for systems with higher refesh rate.
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  //   console.log("tick");
  mesh.rotation.x += 0.001 * deltaTime;

  renderer.render(scene, camera);
  //   window.requestAnimationFrame(tick);
  setTimeout(tick, 16);
};

// tick();

//!GSAP library for tweens and other animations
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
//!-----------------

//Clock
const clock = new THREE.Clock();
const tickUsingClock = () => {
  //Elapsed time is increamenting in seconds from initialization
  const elapsedTime = clock.getElapsedTime(); //We also have getDelta(), but do not use this, you get strange results
  // console.log(elapsedTime);
  // mesh.rotation.x = elapsedTime * Math.PI * 2;
  mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickUsingClock);
};

tickUsingClock();
