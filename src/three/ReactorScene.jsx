import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Float, Stars } from '@react-three/drei';

/* ── Floating particle cloud (Crimson Red) ── */
function Particles({ count = 140 }) {
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
        size={0.025}
        color="#D62828"
        sizeAttenuation
        transparent
        opacity={0.75}
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
        size={0.018}
        color="#C9A45C"
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

/* ── Animated torus ring ── */
function Ring({ radius, tube, color, speed, tiltX = 0, tiltZ = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, tube, 16, 100]} rotation={[tiltX, 0, tiltZ]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.85}
        roughness={0.15}
        transparent
        opacity={0.65}
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
          emissiveIntensity={1.8}
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
          emissiveIntensity={1.0}
          metalness={1}
          roughness={0.0}
        />
      </mesh>
    </group>
  );
}

/* ── Outer distorted sphere shell ── */
function OuterShell() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <Sphere ref={ref} args={[1.35, 64, 64]}>
        <MeshDistortMaterial
          color="#D62828"
          emissive="#300000"
          emissiveIntensity={0.35}
          metalness={0.65}
          roughness={0.25}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.1}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

/* ── Main exported scene (Clean Cinematic Arc Reactor) ── */
export default function ReactorScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#D62828" distance={9} />
      <pointLight position={[4, 2, 2]} intensity={1.0} color="#C9A45C" distance={10} />
      <pointLight position={[-4, -2, -2]} intensity={0.6} color="#D62828" distance={10} />

      {/* Deep starfield inside hero */}
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

      {/* Core reactor */}
      <ReactorCore />

      {/* Outer energy shell */}
      <OuterShell />

      {/* Orbital gyroscopic energy rings */}
      <Ring radius={1.75} tube={0.014} color="#D62828" speed={0.65}  tiltX={Math.PI / 2} tiltZ={0} />
      <Ring radius={2.05} tube={0.011} color="#C9A45C" speed={-0.45} tiltX={Math.PI / 4} tiltZ={Math.PI / 6} />
      <Ring radius={2.35} tube={0.009} color="#D62828" speed={0.35}  tiltX={Math.PI / 6} tiltZ={Math.PI / 3} />
      <Ring radius={1.45} tube={0.016} color="#C9A45C" speed={-0.75} tiltX={0}           tiltZ={Math.PI / 5} />
    </>
  );
}
