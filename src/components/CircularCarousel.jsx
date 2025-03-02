import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Card from "./Card";
import NavigationButton from "./NavigationButton";

const data = [
  {
    title: "Without the crash",
    description: "A gentle wave of energy. To get you going without the crash.",
    animationName: "Wave",
  },
  {
    title: "Natural caffeine",
    description:
      "This certified organic caffeine comes from the plant. A gift from Mother Nature.",
    // animationName: "Caffeine",
  },
  {
    title: "Antioxidant",
    description: "Richer in antioxidants than tea. Not bad.",
    animationName: "Antioxidant",
  },
  {
    title: "Vegan",
    description:
      "A plant-based drink that tastes like heaven. Who could ask for more?",
    // animationName: "Vegan",
  },
];

const ROTATION_STEP = 30;

/* Création d'un grand cercle sur lesquels seront positionnées les cards, on fait une rotation du cercle entier afin de gérer l'animation de défilement */
export function CircularCarousel() {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const circlesRef = useRef([]);

  const getRotation = (index) => {
    const itemRotation = index * ROTATION_STEP;
    return currentRotation + itemRotation;
  };

  const setInitialPositions = (items) => {
    items.forEach((_, index) => {
      if (circlesRef.current[index]) {
        gsap.set(circlesRef.current[index], {
          rotation: getRotation(index),
        });
      }
    });
  };

  const animateRotation = () => {
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    carouselItems.forEach((_, index) => {
      if (circlesRef.current[index]) {
        timeline.to(
          circlesRef.current[index],
          {
            rotation: getRotation(index),
            duration: 1,
            ease: "back.inOut(1.4)",
          },
          0, // Le '0' fait que toutes les animations commencent en même temps
        );
      }
    });
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setCurrentRotation((prev) => prev + ROTATION_STEP);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setCurrentRotation((prev) => prev - ROTATION_STEP);
    }
  };

  useEffect(() => {
    // On duplique les données pour remplir le carousel et avoir une animation infinie
    const duplicatedItems = Array(3)
      .fill(data)
      .flat()
      .map((item, index) => ({
        ...item,
        id: `item-${index + 1}`,
      }));

    setCarouselItems(duplicatedItems);
  }, []);

  useEffect(() => {
    setInitialPositions(carouselItems);
  }, [carouselItems]);

  useEffect(() => {
    animateRotation();
  }, [currentRotation]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {carouselItems.length > 0 &&
          carouselItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (circlesRef.current[index] = el)}
              className="circle absolute h-[450vw] w-[450vw] rounded-full"
            >
              <Card
                title={item.title}
                description={item.description}
                animationName={item.animationName}
              />
            </div>
          ))}
      </div>

      {/* Boutons de navigation */}
      <div className="absolute top-1/2 right-0 left-0 z-10 flex -translate-y-1/2 transform justify-between px-4 md:px-8 lg:px-16">
        <NavigationButton left onClick={handlePrev} />
        <NavigationButton right onClick={handleNext} />
      </div>
    </div>
  );
}
