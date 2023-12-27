import store from "../store/redux";

const HotBar = () => {

    const clearMap = () => {
        store.dispatch({ type: "clear-map"});
    }

    return <div id="bot-right">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded select-none" id="start-search-btn">START SEARCH ⭐</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 select-none" onClick={clearMap}>CLEAR MAP ❌</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 select-none" id="random-map-btn">RANDOM 🎲</button>
    </div>
}

export default HotBar;