import React from "react";
import { View, Environment, Float } from "@react-three/drei";
import SodaCan from "./SodaCan";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const groupRef = useRef();

  useGSAP(() => {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: true,
      },
    });

    scrollTl.to(groupRef.current, {
      rotationY: 360,
      duration: 10,
      ease: "none",
    });
  });

  return (
    <View className="pointer-events-none sticky top-0 z-50 -mt-[100vh] h-screen w-screen">
      <group ref={groupRef}>
        <Float>{/* <SodaCan /> */}</Float>
      </group>

      <Environment files="hdr/lobby.hdr" environmentIntensity={1.2} />
    </View>
  );
}
