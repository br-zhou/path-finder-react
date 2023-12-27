import { useEffect } from "react";
import { Editor } from "./game/editor.js";
import Toolbar from "./Components/Toolbar.js";
import HotBar from "./Components/Hotbar.js";


function App() {
  useEffect(() => {
    void new Editor();
  }, []);

  console.log("PAGE RENDER");

  return (
    <>
      <Toolbar />

      <HotBar />
    </>
  );
}

export default App;
