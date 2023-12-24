import { useEffect } from "react";
import { Editor } from "./game/editor.js";


function App() {
  useEffect(() => {
    void new Editor();
  }, []);

  console.log("PAGE RENDER");

  return (
    <>
      <div id="left-bar">
      </div>

      <div id="bot-right">

        <button type="file" className="btn btn-sm btn-primary" id="import-map-btn">IMPORT MAP</button>
        <button className="btn btn-sm btn-primary" id="export-map-btn">EXPORT MAP</button>
      </div>
    </>
  );
}

export default App;
