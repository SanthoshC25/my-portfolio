import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import IronManHelmet from './IronManHelmet';

/* ── Nanotech Floating Sparkles (Crimson & Gold) ── */
function NanoParticles({ count = 80 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#F0A500"
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export default function IronManScene() {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.55} color="#2A2D3A" />

      {/* Main Front-Right Key Light (Brings out Gold Faceplate) */}
      <directionalLight position={[4, 3, 5]} intensity={2.8} color="#FFF6E0" />

      {/* Left Hot-Rod Crimson Rim Light (Brings out Red Cranium) */}
      <directionalLight position={[-4, 1.5, 2]} intensity={2.2} color="#D62828" />

      {/* Back High-Angle Silhouette Rim Light (Metallic Edge Flare) */}
      <directionalLight position={[0, 4, -4]} intensity={2.5} color="#E5B03A" />

      {/* Under-Jaw Cyan Reflection Light */}
      <pointLight position={[0, -2, 1.5]} intensity={0.8} color="#00F0FF" distance={6} />

      {/* Floating Nanotech Energy Embers */}
      <NanoParticles count={80} />

      {/* The 3D Iron Man Helmet */}
      <IronManHelmet />
    </>
  );
}
