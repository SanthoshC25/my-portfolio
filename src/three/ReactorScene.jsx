import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating particle cloud (Crimson Red) ── */
function Particles({ count = 150 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.04;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D62828"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/* ── Floating particle cloud (Gold) ── */
function GoldParticles({ count = 90 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = -state.clock.elapsedTime * 0.03;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#C9A45C"
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

/* ── Celestial Eclipse Disc & Glowing Corona Ring ── */
function EclipseCorona() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle pulsating rotation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.15]}>
      {/* Outer Corona Flare Ring */}
      <mesh>
        <ringGeometry args={[1.32, 1.48, 64]} />
        <meshBasicMaterial
          color="#D62828"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold Inner Eclipse Corona Ring */}
      <mesh>
        <ringGeometry args={[1.28, 1.34, 64]} />
        <meshBasicMaterial
          color="#C9A45C"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Visible Eclipse Disc Structure (Translucent Obsidian) */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.30, 64]} />
        <meshStandardMaterial
          color="#121620"
          emissive="#D62828"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Animated Torus Rings (Bold, Glowing Ellipses) ── */
function Ring({ radius, tube, color, speed, tiltX = 0, tiltZ = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, tube, 20, 120]} rotation={[tiltX, 0, tiltZ]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
    </Torus>
  );
}

/* ── Icosahedron core (Marvel Arc Reactor Center) ── */
function ReactorCore() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
      ref.current.rotation.x = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={ref}>
      {/* Outer glowing wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color="#D62828"
          emissive="#D62828"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
      {/* Inner glowing sphere core */}
      <mesh>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color="#C9A45C"
          emissive="#D62828"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0.0}
        />
      </mesh>
    </group>
  );
}

/* ── Outer Visible Geodesic / Distorted Shell ── */
function OuterShell() {
  const ref = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -state.clock.elapsedTime * 0.08;
      wireRef.current.rotation.x = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      {/* Outer Holographic Energy Sphere */}
      <Sphere ref={ref} args={[1.34, 64, 64]}>
        <MeshDistortMaterial
          color="#D62828"
          emissive="#660a0a"
          emissiveIntensity={0.7}
          metalness={0.7}
          roughness={0.2}
          distort={0.22}
          speed={2}
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </Sphere>

      {/* Visible Geodesic Cage Structure */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.36, 2]} />
        <meshStandardMaterial
          color="#C9A45C"
          emissive="#D62828"
          emissiveIntensity={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

/* ── Main exported scene (Clean Cinematic Arc Reactor with Eclipse) ── */
export default function ReactorScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#D62828" distance={10} />
      <pointLight position={[4, 2, 3]} intensity={1.5} color="#C9A45C" distance={12} />
      <pointLight position={[-4, -2, -3]} intensity={1.0} color="#D62828" distance={12} />

      {/* Deep starfield */}
      <Stars
        radius={25}
        depth={50}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Cosmic particle clouds */}
      <Particles count={150} />
      <GoldParticles count={90} />

      {/* Celestial Eclipse Disc & Radiant Corona */}
      <EclipseCorona />

      {/* Core reactor */}
      <ReactorCore />

      {/* Outer energy shell & geodesic structure */}
      <OuterShell />

      {/* Orbital gyroscopic energy rings (Bold & radiant) */}
      <Ring radius={1.75} tube={0.026} color="#D62828" speed={0.65}  tiltX={Math.PI / 2} tiltZ={0} />
      <Ring radius={2.05} tube={0.022} color="#C9A45C" speed={-0.45} tiltX={Math.PI / 4} tiltZ={Math.PI / 6} />
      <Ring radius={2.35} tube={0.020} color="#D62828" speed={0.35}  tiltX={Math.PI / 6} tiltZ={Math.PI / 3} />
      <Ring radius={1.48} tube={0.028} color="#C9A45C" speed={-0.75} tiltX={0}           tiltZ={Math.PI / 5} />
    </>
  );
}
