"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export default function SodaCan({ scale = 2, ...props }) {
  const { nodes } = useGLTF("/models/Soda-can.gltf");
  const label = useTexture("/labels/cherry.png");

  // Fixes upside down labels
  label.flipY = false;

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylinder.geometry}
        material={metalMaterial}
      />
      <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tab.geometry}
        material={metalMaterial}
      />
    </group>
  );
}
