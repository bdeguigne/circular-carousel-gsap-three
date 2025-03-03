import React, { useRef, useEffect } from "react";
import { Environment, Float } from "@react-three/drei";
import SodaCan from "./SodaCan";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRotation } from "../../context/RotationContext";
gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const groupRef = useRef();
  const { rotationValue } = useRotation();

  // Gérer les rotations en fonction des clics sur les boutons
  useEffect(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      y: rotationValue,
      duration: 1,
      ease: "back.inOut(1.4)",
    });
  }, [rotationValue]);

  useGSAP(() => {
    if (!groupRef.current) return;

    // Position initiale
    gsap.set(groupRef.current.position, { y: -0.1 }); // Léger décalage vers le bas
    gsap.set(groupRef.current.rotation, { z: 0 }); // Réinitialiser uniquement la rotation Z

    // Animation du scroll
    const scrollTl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Utiliser uniquement l'axe Z pour la rotation du scroll
    scrollTl
      .to(
        groupRef.current.rotation,
        {
          z: Math.PI * 2, // Rotation complète sur l'axe Z uniquement
        },
        0,
      )
      .to(
        groupRef.current.position,
        {
          y: -1.5,
        },
        0,
      );

    return () => {
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <group>
      <group ref={groupRef}>
        <Float>
          <SodaCan />
        </Float>
      </group>

      <Environment files="hdr/lobby.hdr" environmentIntensity={1.3} />
    </group>
  );
}
