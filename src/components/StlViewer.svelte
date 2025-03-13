<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
  
    let container:any;
    let scene:any, camera:any, renderer:any, light:any, loader:any;
  
    onMount(() => {
      // Set up the scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 100); // Adjust distance
  
      // Add lighting
      light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);
  
      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
  
      // Load STL file
      loader = new STLLoader();
      loader.load("../assets/stepper-motor-attachment.stl", function (geometry:any) {
        const material = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    });
  </script>
  
  <div bind:this={container} style="width: 100%; height: 500px;"></div>