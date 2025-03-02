import "./App.css";
import { CircularCarousel } from "./components/CircularCarousel";
import CurvedText from "./components/CurvedText";
import CanView from "./components/3D/CanView";

function App() {
  return (
    <>
      <CanView />
      <div className="curved flex h-[75vh] flex-col items-center justify-center pb-14">
        <CurvedText text="ONLY THE BEST" />
      </div>
      <CircularCarousel />
    </>
  );
}

export default App;
