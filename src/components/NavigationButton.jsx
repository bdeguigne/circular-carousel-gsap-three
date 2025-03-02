import React from "react";
import { gsap } from "gsap";

export default function NavigationButton({ left, onClick }) {
  const enterAnimation = (element) => {
    gsap.to(element.target, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(element.target, {
      scale: 1,
      duration: 0.4,
      ease: "bounce.out",
      delay: 0.2,
    });
  };

  return (
    <button
      className={`bg-button absolute ${
        left ? "left-1/7" : "right-1/7"
      } cursor-pointer rounded-full p-4`}
      onClick={onClick}
      onMouseEnter={enterAnimation}
    >
      <img
        src={`/assets/arrow-${left ? "left" : "right"}.svg`}
        alt={left ? "Previous" : "Next"}
        className="size-6"
      />
    </button>
  );
}
