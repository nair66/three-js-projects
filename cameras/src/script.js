/**
 * Camera Types :
 * The Camera class is what we call an abstract class. You're not supposed to use it directly,
 * but you can inherit from it to have access to common properties and methods. Some of the following classes inherit from the Camera class.
 * 1. ArrayCamera : The ArrayCamera is used to render your scene multiple times by using multiple cameras.
 *  Each camera will render a specific area of the canvas. You can imagine this looking like old
 *  console multiplayer games where we had to share a split-screen.
 * 2. StereoCamera : The StereoCamera is used to render the scene through two cameras that mimic the eyes in order to create what we call a parallax effect that will lure your brain into thinking that there is depth.
 *  You must have the adequate equipment like a VR headset or red and blue glasses to see the result.
 * 3. CubeCamera : The CubeCamera is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding.
 *  You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.
 * 4. OrthographicCamera : The OrthographicCamera is used to create orthographic renders of your scene without perspective.
 *  It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.
 * 5. PerspectiveCamera : The PerspectiveCamera is the one we already used and simulated a real-life camera with perspective.
 *
 * We are going to focus on the OrthographicCamera and the PerspectiveCamera.
 */

import * as THREE from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Cursor
 * Taking cursor coordinates to move the camera along with the mouse movement
 */

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
  console.log(cursor.x);
});

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Perspective amera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
); // args : Fov in degrees, aspect ratio, near, far
/**
 * The third and fourth parameters called near and far,
 * correspond to how close and how far the camera can see. Any object or part of the object closer
 * to the camera than the near value or further away from the camera than the far value will not show up on the render.
 *
 * You can see that like in those old racing games where you could see the trees pop up in the distance.
 *
 * While you might be tempted to use very small and very large values like 0.0001 and 9999999
 * you might end up with a bug called z-fighting or depth buffer precision where two faces seem to fight for which one will be rendered above the other.
 * Try to use reasonable values and increase those only if you need it. In our case, we can use 0.1 and 100.
 */

// The aspect ration is required, otherwise the render canvas is stretching the cube or shrinking if the canvas height and width is not equal, this is because the orthographic projection size is a perfect square,
//  but your render canvas is not, so multiply the aspect ration to increase or decrease the width of the projection square, based on render viewport size.
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  //Update camera
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  //   camera.position.x = cursor.x * 3;
  //   camera.position.y = -(cursor.y * 3); // Inverting the mouse drag view here, so we see the top of the cube when we move the mouse up

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
