import { useEffect } from "react";
import { Editor } from "./game/editor.js";
import Toolbar from "./Components/Toolbar.js";


function App() {
  useEffect(() => {
    void new Editor();
  }, []);

  console.log("PAGE RENDER");

  return (
    <>
      <Toolbar />

      <div id="bot-right">

        <button type="file" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="import-map-btn">IMPORT MAP</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="export-map-btn">EXPORT MAP</button>
      </div>
    </>
  );
}

export default App;
