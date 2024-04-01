//! 3 axis, z is forward or back, x is left or right and y is up or down
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//Object Group, Use this to apply scale, rotation and translate on a group of meshes//

// const group = new THREE.Group();
// group.position.y = 1;
// group.scale.y = 2;
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "yellow" })
// );
// group.add(cube1);
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "pink" })
// );
// cube2.position.x = 2;
// group.add(cube2);
// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "purple" })
// );
// cube3.position.x = -2;
// group.add(cube3);

//-------//

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

/**
 * Any class that inherits from Object 3d as position, scale, rotate and quaternion properties
 * You can also add these properties after the scene.add() statement.
 * You can execute the scale, rotation or quaternion , position in any order, result will be the same.
 */

mesh.position.normalize(); // Move object back to position 1,1,1

mesh.position.x = 2;
mesh.position.y = -1;
mesh.position.z = -4;

// or mesh.position.set(1,-1,-4)

/**
 * Postion inherits from Vector3 which has many useful methods
 */

console.log(mesh.position.length()); //Distance away from origin

scene.add(mesh);

/** Axes Helper
 * Render a axis line to orient yourself
 */

const axisHelper = new THREE.AxesHelper(1); // arg is size of the the axis stroke

scene.add(axisHelper); // Add this object too, to the scene

/**
 * Scale
 */

mesh.scale.x = 2;
mesh.scale.y = 1;
mesh.scale.z = 2;

//or mesh.scale.set(2,1,2)

/**
 * Rotation
 * Values are in radians, so PI is half a rotation.
 * Gimbal Lock: When you rotate an item, the corresponging axis relative to the mesh also changes, so appying y rotation after x will yeild
 * an unexpected result, since the y axis was rotated when you rotated along the x first. To fix this, we have the reorder() func, which will execute
 * roation commands in the specified order.
 */

mesh.rotation.reorder("YXZ");
mesh.rotation.y = 1;
mesh.rotation.z = 2;
mesh.rotation.x = 1.5;

//Sizes
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
console.log(mesh.position.distanceTo(camera.position)); // Distance away from a target Vector3 like

scene.add(camera);

/**
 * Look At (look at me)
 * Rotate an Object3d instance which rotates the object so that it's z axis faces the target you provided
 */

camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
