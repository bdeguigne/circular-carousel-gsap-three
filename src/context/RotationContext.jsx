import { createContext, useContext, useState } from "react";

const RotationContext = createContext();

// Permets de gerer les rotations de la canette lors de l'appui des boutons du carrousel
export function RotationProvider({ children }) {
  const [rotationValue, setRotationValue] = useState(0);

  const handleRotation = (direction) => {
    setRotationValue(
      (prev) => prev + (direction === "right" ? Math.PI / 2 : -Math.PI / 2),
    );
  };

  return (
    <RotationContext.Provider value={{ rotationValue, handleRotation }}>
      {children}
    </RotationContext.Provider>
  );
}

export function useRotation() {
  const context = useContext(RotationContext);
  if (!context) {
    throw new Error("useRotation must be used within a RotationProvider");
  }
  return context;
}
