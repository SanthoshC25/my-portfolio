import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════════════
   IRON MAN MARK HELMET (3D Procedural Sculpt)
   Features:
   - Hot-rod Crimson Cranium Shell & Jawline
   - Metallic Titanium Gold Faceplate & Brow Crest
   - Luminous Cyan Arc Eyes with dynamic pulse
   - Ear Audio/Comm Pods with Concentric Grooves
   - Gyroscope Device Motion Tracking (Mobile)
   - Cursor Interactive Head-Tracking (Desktop)
   ══════════════════════════════════════════════════════════ */

export default function IronManHelmet() {
  const helmetGroup = useRef();
  const eyeGlowRef = useRef();
  const gyro = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  // Materials with authentic metallic Stark finishes
  const redMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9E1212',
        emissive: '#400000',
        emissiveIntensity: 0.25,
        metalness: 0.88,
        roughness: 0.18,
      }),
    []
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        emissive: '#382500',
        emissiveIntensity: 0.3,
        metalness: 0.92,
        roughness: 0.16,
      }),
    []
  );

  const darkAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#15181F',
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#E8FFFF',
      }),
    []
  );

  // Mobile Device Orientation (Gyroscope / Tilt) Listener
  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-right tilt [-90 to 90]
        // beta: front-back tilt [-180 to 180]
        const targetY = THREE.MathUtils.clamp((e.gamma / 40) * 0.65, -0.7, 0.7);
        const targetX = THREE.MathUtils.clamp(((e.beta - 45) / 40) * 0.45, -0.5, 0.5);
        gyro.current = { x: targetX, y: targetY };
      }
    };

    const handleMouseMove = (e) => {
      // Normalize mouse [-1, 1]
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.6,
        y: -(e.clientY / window.innerHeight - 0.5) * 0.45,
      };
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation Frame Loop: Smooth Lerp rotation with gyroscope & idle float
  useFrame((state, delta) => {
    if (!helmetGroup.current) return;

    const time = state.clock.elapsedTime;

    // Combined target rotation from mouse + gyroscope
    const targetRotY =
      mouse.current.x * 0.75 +
      gyro.current.y * 1.1 +
      Math.sin(time * 0.6) * 0.08;

    const targetRotX =
      -mouse.current.y * 0.6 +
      gyro.current.x * 0.85 +
      Math.cos(time * 0.8) * 0.05;

    // Smooth slerp interpolation
    helmetGroup.current.rotation.y = THREE.MathUtils.damp(
      helmetGroup.current.rotation.y,
      targetRotY,
      3.5,
      delta
    );
    helmetGroup.current.rotation.x = THREE.MathUtils.damp(
      helmetGroup.current.rotation.x,
      targetRotX,
      3.5,
      delta
    );

    // Subtle eye light pulse
    if (eyeGlowRef.current) {
      eyeGlowRef.current.intensity = 2.0 + Math.sin(time * 4) * 0.35;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={helmetGroup} position={[0, -0.1, 0]} scale={1.15}>
        {/* ═══ 1. CRANIUM (Red Dome & Back of Head) ═══ */}
        {/* Main upper cranium */}
        <mesh material={redMaterial} position={[0, 0.35, -0.05]} scale={[1.05, 1.12, 1.15]}>
          <sphereGeometry args={[0.9, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        </mesh>

        {/* Back and lower occipital shell */}
        <mesh material={redMaterial} position={[0, 0.05, -0.22]} scale={[0.98, 1.05, 1.05]}>
          <sphereGeometry args={[0.85, 32, 24]} />
        </mesh>

        {/* Forehead Brow Ridge (Red) */}
        <mesh material={redMaterial} position={[0, 0.68, 0.52]} rotation={[0.22, 0, 0]}>
          <boxGeometry args={[0.95, 0.22, 0.38]} />
        </mesh>

        {/* ═══ 2. GOLD FACEPLATE ═══ */}
        {/* Forehead Gold Inset */}
        <mesh material={goldMaterial} position={[0, 0.56, 0.64]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.76, 0.38, 0.16]} />
        </mesh>

        {/* Nose Bridge / Central Brow Plate */}
        <mesh material={goldMaterial} position={[0, 0.34, 0.72]}>
          <boxGeometry args={[0.32, 0.28, 0.16]} />
        </mesh>

        {/* Left Cheek Plate (Angled Titanium Gold) */}
        <mesh
          material={goldMaterial}
          position={[-0.42, 0.12, 0.58]}
          rotation={[0.1, 0.28, -0.08]}
        >
          <boxGeometry args={[0.42, 0.58, 0.22]} />
        </mesh>

        {/* Right Cheek Plate (Angled Titanium Gold) */}
        <mesh
          material={goldMaterial}
          position={[0.42, 0.12, 0.58]}
          rotation={[0.1, -0.28, 0.08]}
        >
          <boxGeometry args={[0.42, 0.58, 0.22]} />
        </mesh>

        {/* Center Mouth / Muzzle Plate (Gold) */}
        <mesh material={goldMaterial} position={[0, -0.08, 0.68]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.54, 0.32, 0.2]} />
        </mesh>

        {/* Chin / Mandible Plate (Gold) */}
        <mesh material={goldMaterial} position={[0, -0.32, 0.62]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.46, 0.26, 0.24]} />
        </mesh>

        {/* Mouth Inset Vent (Dark Shadow Gap) */}
        <mesh material={darkAccentMaterial} position={[0, -0.19, 0.76]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.38, 0.025, 0.05]} />
        </mesh>

        {/* ═══ 3. RED JAW & CHEEK GUARDS ═══ */}
        {/* Left Jaw Guard */}
        <mesh
          material={redMaterial}
          position={[-0.64, -0.16, 0.32]}
          rotation={[0.15, 0.38, -0.18]}
        >
          <boxGeometry args={[0.26, 0.65, 0.48]} />
        </mesh>

        {/* Right Jaw Guard */}
        <mesh
          material={redMaterial}
          position={[0.64, -0.16, 0.32]}
          rotation={[0.15, -0.38, 0.18]}
        >
          <boxGeometry args={[0.26, 0.65, 0.48]} />
        </mesh>

        {/* Lower Chin Tip Protector (Red) */}
        <mesh material={redMaterial} position={[0, -0.44, 0.48]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.36, 0.16, 0.32]} />
        </mesh>

        {/* ═══ 4. EAR COMM PODS (Concentric Circular Dials) ═══ */}
        {/* Left Ear Pod */}
        <group position={[-0.92, 0.08, -0.02]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh material={goldMaterial}>
            <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
          </mesh>
          <mesh material={darkAccentMaterial} position={[0, 0.045, 0]}>
            <torusGeometry args={[0.16, 0.025, 16, 32]} />
          </mesh>
          <mesh material={redMaterial} position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
          </mesh>
        </group>

        {/* Right Ear Pod */}
        <group position={[0.92, 0.08, -0.02]} rotation={[0, Math.PI / 2, 0]}>
          <mesh material={goldMaterial}>
            <cylinderGeometry args={[0.22, 0.24, 0.08, 32]} />
          </mesh>
          <mesh material={darkAccentMaterial} position={[0, 0.045, 0]}>
            <torusGeometry args={[0.16, 0.025, 16, 32]} />
          </mesh>
          <mesh material={redMaterial} position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
          </mesh>
        </group>

        {/* ═══ 5. LUMINOUS CYAN ARC EYES (The Soul of Iron Man) ═══ */}
        {/* Left Eye Slit (Angled Iconic Wedge) */}
        <group position={[-0.30, 0.26, 0.76]} rotation={[0.05, 0.18, -0.16]}>
          <mesh material={eyeMaterial}>
            <boxGeometry args={[0.24, 0.065, 0.04]} />
          </mesh>
          {/* Eye Border Accent */}
          <mesh material={darkAccentMaterial} position={[0, 0, -0.01]}>
            <boxGeometry args={[0.27, 0.085, 0.03]} />
          </mesh>
        </group>

        {/* Right Eye Slit (Angled Iconic Wedge) */}
        <group position={[0.30, 0.26, 0.76]} rotation={[0.05, -0.18, 0.16]}>
          <mesh material={eyeMaterial}>
            <boxGeometry args={[0.24, 0.065, 0.04]} />
          </mesh>
          {/* Eye Border Accent */}
          <mesh material={darkAccentMaterial} position={[0, 0, -0.01]}>
            <boxGeometry args={[0.27, 0.085, 0.03]} />
          </mesh>
        </group>

        {/* Eye Point Light Projectors (Cast light onto cheeks and space) */}
        <pointLight
          ref={eyeGlowRef}
          position={[0, 0.24, 0.95]}
          intensity={2.8}
          distance={4.5}
          color="#00F0FF"
        />

        {/* ═══ 6. SUBTLE NECK & COLLAR BASE ═══ */}
        <mesh material={darkAccentMaterial} position={[0, -0.58, -0.05]}>
          <cylinderGeometry args={[0.55, 0.68, 0.24, 32]} />
        </mesh>
      </group>
    </Float>
  );
}
