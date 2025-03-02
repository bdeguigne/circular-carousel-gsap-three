import React from "react";
import { View } from "@react-three/drei";
import Scene from "./Scene";

export default function CanView() {
  return (
    <View className="pointer-events-none fixed top-0 z-50 h-screen w-screen">
      <Scene />
    </View>
  );
}
