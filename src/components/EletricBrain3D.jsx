import { useEffect, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#35d8ff");
const VIOLET = new THREE.Color("#8b5cf6");
const FUCHSIA = new THREE.Color("#ff4fd8");

function deformBrainPoint(source, side = 1) {
  const normal = source.clone().normalize();

  const foldA = Math.sin(normal.y * 15.0 + normal.z * 7.0) * 0.055;
  const foldB = Math.sin(normal.z * 18.0 - normal.y * 4.0 + normal.x * 6.0) * 0.04;
  const foldC = Math.cos((normal.x + normal.y) * 14.0 - normal.z * 3.0) * 0.028;
  const foldD = Math.sin(normal.x * 22.0 + normal.z * 9.0) * 0.018;

  const radius = 1 + foldA + foldB + foldC + foldD;
  const point = normal.multiplyScalar(radius);

  point.x *= 0.68;
  point.y *= 1.04;
  point.z *= 0.9;
  point.x += side * 0.39;

  // Leggera incisione centrale per separare visivamente i due emisferi.
  const innerDistance = Math.abs(point.x);
  if (innerDistance < 0.18) {
    point.x += side * (0.18 - innerDistance) * 0.42;
  }

  return point;
}

function createLobeGeometry(side) {
  const geometry = new THREE.IcosahedronGeometry(1.22, 4);
  const position = geometry.getAttribute("position");
  const vector = new THREE.Vector3();

  for (let index = 0; index < position.count; index += 1) {
    vector.fromBufferAttribute(position, index);
    const point = deformBrainPoint(vector, side);
    position.setXYZ(index, point.x, point.y, point.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return geometry;
}

function randomBrainPoint(side) {
  const u = Math.random();
  const v = Math.random();
  const theta = u * Math.PI * 2;
  const phi = Math.acos(2 * v - 1);

  const point = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  );

  return deformBrainPoint(point, side);
}

function createElectricArc(index) {
  const sideA = Math.random() > 0.5 ? 1 : -1;
  const sideB = Math.random() > 0.35 ? sideA : -sideA;
  const start = randomBrainPoint(sideA);
  const end = randomBrainPoint(sideB);
  const midpoint = start.clone().lerp(end, 0.5);

  const outward = midpoint.clone().normalize().multiplyScalar(0.28 + Math.random() * 0.35);
  const tangent = new THREE.Vector3(
    (Math.random() - 0.5) * 0.35,
    (Math.random() - 0.5) * 0.35,
    (Math.random() - 0.5) * 0.35
  );

  const controlA = start
    .clone()
    .lerp(midpoint, 0.42)
    .add(outward)
    .add(tangent);

  const controlB = end
    .clone()
    .lerp(midpoint, 0.42)
    .add(outward.clone().multiplyScalar(0.65))
    .sub(tangent.clone().multiplyScalar(0.7));

  const curve = new THREE.CatmullRomCurve3([
    start,
    controlA,
    controlB,
    end,
  ]);

  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(28));
  const colors = [CYAN, VIOLET, FUCHSIA];
  const color = colors[index % colors.length];

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const line = new THREE.Line(geometry, material);
  line.userData.phase = Math.random() * Math.PI * 2;
  line.userData.speed = 1.8 + Math.random() * 3.2;
  line.userData.power = 8 + Math.random() * 9;

  return line;
}

function createParticleField() {
  const count = 520;
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 1.7 + Math.random() * 1.85;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[index * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[index * 3 + 1] = Math.cos(phi) * radius * 0.8;
    positions[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: CYAN,
    size: 0.018,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

export default function ElectricBrain3D({ active = true, className = "" }) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current || !hostRef.current) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const host = hostRef.current;
    let frameId = 0;
    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.05, 5.25);

    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      canvas.style.display = "none";
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const brain = new THREE.Group();
    brain.rotation.set(-0.08, -0.18, -0.04);
    scene.add(brain);

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#03050b"),
      roughness: 0.28,
      metalness: 0.7,
      transparent: true,
      opacity: 0.88,
      emissive: new THREE.Color("#07152a"),
      emissiveIntensity: 1.3,
    });

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: CYAN.clone() },
        uColorB: { value: VIOLET.clone() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = mvPosition.xyz;
          vPosition = position;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;

        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;

        void main() {
          vec3 viewDirection = normalize(-vViewPosition);
          float fresnel = pow(
            1.0 - max(dot(normalize(vNormal), viewDirection), 0.0),
            2.25
          );

          float flow = 0.5 + 0.5 * sin(
            vPosition.y * 5.0 +
            vPosition.z * 3.0 +
            uTime * 0.85
          );

          float ridgeA = sin(
            vPosition.y * 18.0 +
            sin(vPosition.z * 11.0 + uTime * 1.6) * 2.2
          );

          float ridgeB = sin(
            vPosition.z * 20.0 -
            vPosition.x * 9.0 -
            uTime * 1.2
          );

          float electricity =
            pow(max(ridgeA, 0.0), 18.0) * 0.35 +
            pow(max(ridgeB, 0.0), 22.0) * 0.22;

          vec3 color = mix(uColorA, uColorB, flow);
          float alpha = 0.08 + fresnel * 0.72 + electricity;
          vec3 finalColor = color * (0.9 + fresnel * 2.3 + electricity * 2.0);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const pointMaterial = new THREE.PointsMaterial({
      color: FUCHSIA,
      size: 0.017,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    [-1, 1].forEach((side) => {
      const geometry = createLobeGeometry(side);
      const base = new THREE.Mesh(geometry, baseMaterial);
      const glow = new THREE.Mesh(geometry, glowMaterial);
      const points = new THREE.Points(geometry, pointMaterial);

      glow.scale.setScalar(1.007);
      points.scale.setScalar(1.012);

      brain.add(base, glow, points);
    });

    const arcGroup = new THREE.Group();
    const arcs = Array.from({ length: 20 }, (_, index) => createElectricArc(index));
    arcs.forEach((arc) => arcGroup.add(arc));
    brain.add(arcGroup);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const rings = [
      new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.008, 8, 160), ringMaterial),
      new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.006, 8, 160), ringMaterial.clone()),
      new THREE.Mesh(new THREE.TorusGeometry(2.34, 0.004, 8, 160), ringMaterial.clone()),
    ];

    rings[0].rotation.set(Math.PI / 2.5, 0.2, 0.15);
    rings[1].rotation.set(0.45, Math.PI / 2.3, -0.2);
    rings[2].rotation.set(1.1, -0.65, 0.35);
    rings[1].material.color = VIOLET;
    rings[2].material.color = FUCHSIA;
    rings.forEach((ring) => scene.add(ring));

    const particles = createParticleField();
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0x4768ff, 0.55);
    const cyanLight = new THREE.PointLight(0x35d8ff, 13, 10, 2);
    const violetLight = new THREE.PointLight(0x8b5cf6, 10, 9, 2);
    const fuchsiaLight = new THREE.PointLight(0xff4fd8, 7, 8, 2);

    cyanLight.position.set(2.4, 1.4, 2.8);
    violetLight.position.set(-2.2, -0.5, 2.5);
    fuchsiaLight.position.set(0.2, 2.6, -1.2);
    scene.add(ambient, cyanLight, violetLight, fuchsiaLight);

    const pointer = new THREE.Vector2(0, 0);
    const smoothPointer = new THREE.Vector2(0, 0);

    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const resize = () => {
      if (disposed) return;

      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();

    const render = () => {
      if (disposed) return;

      const time = clock.getElapsedTime();
      smoothPointer.lerp(pointer, 0.055);

      brain.rotation.y += (smoothPointer.x * 0.42 + time * 0.08 - brain.rotation.y) * 0.045;
      brain.rotation.x += (smoothPointer.y * 0.2 - 0.06 - brain.rotation.x) * 0.045;
      brain.rotation.z = Math.sin(time * 0.45) * 0.035;
      brain.position.y = Math.sin(time * 0.75) * 0.055;

      glowMaterial.uniforms.uTime.value = time;
      pointMaterial.opacity = 0.42 + Math.sin(time * 2.2) * 0.12;

      arcs.forEach((arc) => {
        const wave = Math.max(
          0,
          Math.sin(time * arc.userData.speed + arc.userData.phase)
        );

        arc.material.opacity = Math.pow(wave, arc.userData.power) * 0.95;
        arc.scale.setScalar(1 + arc.material.opacity * 0.025);
      });

      rings[0].rotation.z += 0.0022;
      rings[1].rotation.y -= 0.0018;
      rings[2].rotation.x += 0.0014;
      particles.rotation.y -= 0.0007;
      particles.rotation.x = Math.sin(time * 0.2) * 0.08;

      cyanLight.intensity = 11 + Math.sin(time * 2.7) * 2.2;
      violetLight.intensity = 8.5 + Math.cos(time * 2.1) * 1.8;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => material.dispose());
        }
      });

      baseMaterial.dispose();
      glowMaterial.dispose();
      pointMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [active]);

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />

      <div className="pointer-events-none absolute inset-x-[12%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent shadow-[0_0_24px_rgba(53,216,255,.9)]" />
    </div>
  );
}