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
        <button type="file" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded select-none" id="start-search-btn">START SEARCH ⭐</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 select-none" id="clear-map-btn">CLEAR MAP ❌</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 select-none" id="random-map-btn">RANDOM 🎲</button>
      </div>
    </>
  );
}

export default App;
