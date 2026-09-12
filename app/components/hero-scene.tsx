"use client";

import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { AdditiveBlending, type Group } from "three";
import type { NormalizedPointer } from "@/lib/use-window-pointer";

function makeSpherePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radial = Math.sqrt(1 - y * y);
    const theta = index * 2.399963229728653;
    positions[index * 3] = Math.cos(theta) * radial * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(theta) * radial * radius;
  }

  return positions;
}

function makeOrbitSegments(count: number) {
  const positions = new Float32Array(count * 6);

  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const nextAngle = ((index + 1) / count) * Math.PI * 2;
    const radius = index % 2 === 0 ? 2.45 : 2.85;
    const y = Math.sin(angle * 3) * 0.22;

    positions[index * 6] = Math.cos(angle) * radius;
    positions[index * 6 + 1] = y;
    positions[index * 6 + 2] = Math.sin(angle) * radius * 0.34;
    positions[index * 6 + 3] = Math.cos(nextAngle) * radius;
    positions[index * 6 + 4] = Math.sin(nextAngle * 3) * 0.22;
    positions[index * 6 + 5] = Math.sin(nextAngle) * radius * 0.34;
  }

  return positions;
}

type HeroSceneProps = {
  pointerRef: MutableRefObject<NormalizedPointer>;
  onContextLost?: () => void;
};

function Wireform({ pointerRef }: Pick<HeroSceneProps, "pointerRef">) {
  const groupRef = useRef<Group>(null);
  const particlePositions = useMemo(() => makeSpherePoints(180, 2.05), []);
  const orbitPositions = useMemo(() => makeOrbitSegments(72), []);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const pointer = pointerRef.current;

    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x += delta * 0.035;
    groupRef.current.position.x += (pointer.x * 0.32 - groupRef.current.position.x) * 0.035;
    groupRef.current.position.y += (pointer.y * 0.18 - groupRef.current.position.y) * 0.035;
  });

  return (
    <group ref={groupRef} position={[1.25, -0.04, 0]} rotation={[0.18, -0.45, 0.2]}>
      <Float speed={0.65} rotationIntensity={0.28} floatIntensity={0.22}>
        <mesh>
          <icosahedronGeometry args={[1.48, 3]} />
          <meshBasicMaterial
            color="#4F9CFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.18} rotation={[0.35, 0.2, -0.14]}>
          <icosahedronGeometry args={[1.48, 2]} />
          <meshBasicMaterial
            color="#FF6B35"
            wireframe
            transparent
            opacity={0.24}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#F5F5F7"
            size={0.025}
            transparent
            opacity={0.72}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
        <lineSegments rotation={[0.36, -0.22, 0.18]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[orbitPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#FF6B35"
            transparent
            opacity={0.22}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
        <Sparkles
          count={70}
          scale={[5.2, 3.2, 2.2]}
          size={2.2}
          speed={0.14}
          color="#4F9CFF"
          opacity={0.38}
        />
      </Float>
    </group>
  );
}

export function HeroScene({ pointerRef, onContextLost }: HeroSceneProps) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      fallback={null}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0A0A0B", 0);

        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onContextLost?.();
          },
          false,
        );

        gl.domElement.addEventListener("webglcontextrestored", () => {}, false);
      }}
    >
      <ambientLight intensity={0.8} />
      <Wireform pointerRef={pointerRef} />
    </Canvas>
  );
}
