import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

export default function Card({ title, description, animationName }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (!animationName) return;
    // Dynamically import the animation file
    import(`../assets/lottie/${animationName}.json`)
      .then((data) => {
        setAnimationData(data.default || data);
      })
      .catch((error) => {
        console.error("Failed to load animation:", error);
      });
  }, [animationName]);

  return (
    <div className="card flex h-[50vh] max-h-[530px] min-h-[430px] w-[40vw] max-w-[430px] min-w-[330px] flex-col xl:h-[70vh] xl:max-h-[880px] xl:max-w-[930px]">
      <div className="bg-primary flex h-16 w-full items-center justify-center rounded-2xl text-2xl text-white uppercase xl:h-22 xl:text-4xl">
        {title}
      </div>
      <div className="flex h-full flex-1 flex-col items-center rounded-2xl bg-white p-6">
        <p className="w-5/6 text-center text-xl leading-tight xl:text-2xl">
          {description}
        </p>

        <div className="flex h-5/6 w-4/7 items-center justify-center">
          <Lottie animationData={animationData} loop play />
        </div>
      </div>
    </div>
  );
}
