import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { render } from "@testing-library/react";

let camera, scene, renderer, hemiLight, spotLight;

const loader = new GLTFLoader();

export function init() {

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );

  camera.position.z = 5;
  camera.rotation.z = 1;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  /*
  const light = new THREE.AmbientLight(0xffffff, 10);
  scene.add(light);

  const pointlight = new THREE.PointLight( 0xffffff, 1, 100 );
  pointlight.position.set( 5, 5, 5 );
scene.add( pointlight );
*/

  const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 40);
  scene.add(hemiLight);

  spotLight = new THREE.SpotLight(0xffffff, 40);
  spotLight.castShadow = true;
  scene.add(spotLight);

  scene.add(new THREE.AxesHelper(500));

  loader.load("/models/scene.gltf", (gltf) => {
    
    let model = gltf.scene;
    //model.position.set(0.1,0.1,0.1);
    model.scale.set(0.01, 0.01, 0.01);
    model.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
      }
    });

    GsapAnimate(model);

    scene.add(model);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 2.3;
  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  renderer.setClearColor(0x666666, 1);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animation() {
  //console.log('hello');

  renderer.render(scene, camera);
}

function GsapAnimate(model) {
  gsap.to(camera.position, {
    duration: 2,
    z: 1,
    ease: "back.out(1.7)",
  });

  gsap.to(camera.rotation, {
    duration: 1,
    z: 0,

    onComplete: () => {
      gsap.to(model.rotation, {
        delay: 1,
        y: 0.5,
        x: -0.5,
        duration: 2,

        onComplete: () => {
          gsap.to(model.rotation, {
            duration: 5,
            y: 0.015,
            x: 0.015,
            z: 0.015,
            repeat: -1,
            yoyo: true,
          });
        },
      });

      gsap.to(model.scale, {
        duration: 1,
        y: 0.015,
        x: 0.015,
        z: 0.015,
      });
    },
  });
}
