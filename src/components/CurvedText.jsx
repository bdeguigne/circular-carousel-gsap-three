import React, { useEffect } from "react";
import gsap from "gsap";

export default function CurvedText({ text, fontSize = 12 }) {
  function animateLetters() {
    // Créer un span pour chaque lettre pour l'animation
    const textPath = document.getElementById("textPath");
    if (!textPath) return;

    const letters = text
      .split("")
      .map(
        (char, i) =>
          `<tspan class="letter" dx="${i === 0 ? 0 : 0.3}">${char}</tspan>`,
      )
      .join("");
    textPath.innerHTML = letters;

    // Sélectionner toutes les lettres
    const tspans = document.querySelectorAll(".letter");

    const colors = [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF",
    ];

    // Animation d'apparition avec couleurs
    tspans.forEach((tspan, index) => {
      const timeline = gsap.timeline({ delay: index * 0.05 + 0.5 });

      timeline.fromTo(tspan, { opacity: 0 }, { opacity: 1, duration: 0.2 });

      for (let i = 0; i < 8; i++) {
        timeline.to(tspan, {
          fill: colors[Math.floor(Math.random() * colors.length)],
          duration: 0.08,
          ease: "none",
        });
      }

      timeline.to(tspan, {
        fill: "#000000",
        duration: 0.2,
        ease: "none",
      });
    });
  }

  useEffect(() => {
    animateLetters();
  }, [text]);

  return (
    // Svg d'une simple courbe génerée avec Figma (100x100)
    <svg
      viewBox="0 0 100 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <path
        id="circlePath"
        d="M-8.43914e-07 10.4999C38.3657 -2.45859 60.2008 -2.28276 100 10.4999"
        stroke="none"
      />

      <text
        id="text"
        fontFamily="Satoshi"
        fontSize={fontSize}
        fontWeight="bold"
        fill="black"
      >
        {/* C'est là que la magie opère, on créee un text avec le href lié au <path>, le texte suivra cette courbe */}
        <textPath
          id="textPath"
          href="#circlePath"
          startOffset="50%"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}
