import "./App.css";
import { CircularCarousel } from "./components/CircularCarousel";
import CurvedText from "./components/CurvedText";
import Scene from "./components/3D/Scene";

function App() {
  return (
    <>
      {/* <Scene /> */}
      <div className="flex h-[55vh] flex-col items-center justify-center">
        <CurvedText text="ONLY THE BEST" />
      </div>
      <CircularCarousel />
    </>
  );
}

export default App;
