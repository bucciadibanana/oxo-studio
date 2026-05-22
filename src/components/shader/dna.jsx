import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const DNAScene = ({ modelPath = "/3dmodels/dna.gltf" }) => {
  const containerRef = useRef();
  const requestRef = useRef();
  const rendererRef = useRef();
  const mixerRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  // Stato per larghezza/altezza
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const pointLight = new THREE.PointLight(0xffffff, 2.0);
    pointLight.position.set(2, 3, 4);
    scene.add(ambientLight, pointLight);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        const animations = gltf.animations;

        model.scale.set(0.6, 0.6, 0.6);
        model.position.set(4, 1, 0);
        model.rotation.x = 2;
        model.rotation.y = 7;
        model.rotation.z = 0;

        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x00ccff,
              wireframe: true,
            });
          }
        });

        scene.add(model);

        if (animations && animations.length) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const action = mixer.clipAction(animations[0]);
          action.timeScale = 0.1;
          action.play();

          console.log("Animazione avviata:", animations[0].name);
        }

        const animate = () => {
          const delta = clockRef.current.getDelta();
          if (mixerRef.current) mixerRef.current.update(delta);

          renderer.render(scene, camera);
          requestRef.current = requestAnimationFrame(animate);
        };
        animate();
      },
      (xhr) => {
        console.log(`📦 Caricamento modello: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
      },
      (error) => {
        console.error("❌ Errore nel caricamento del modello:", error);
      }
    );

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setSize({ width: newWidth, height: newHeight });
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [modelPath, size.width, size.height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        position: "fixed", // resta dietro, se vuoi
        top: 0,
        left: 0,
        zIndex: -1, // dietro tutto
      }}
    />
  );
};

export default DNAScene;
