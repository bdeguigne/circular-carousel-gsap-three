import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { View, Loader, Environment } from "@react-three/drei";

const ViewCanvas = () => {
  return (
    <>
      <Canvas
        className="fixed top-0 left-0 z-10"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          pointerEvents: "none",
        }}
        camera={{
          fov: 25,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
        dpr={1}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default ViewCanvas;
