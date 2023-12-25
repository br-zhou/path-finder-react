import ToolbarBtn from "./ToolBtn";
import store from "../store/redux";

const Toolbar = () => {

    const clickHandler = (mode) => {
        console.log(mode);
        store.dispatch({type: "brushMode", value: mode});
    }

    return <div id="left-bar">
        <ToolbarBtn mode="brush" text="🖌️ Brush" selected='true' click={clickHandler} />
        <ToolbarBtn mode="eraser" text="❌ Eraser" click={clickHandler} />
        <ToolbarBtn mode="start" text="🚀 Start" click={clickHandler} />
        <ToolbarBtn mode="end" text="🚩 Finish" click={clickHandler} />
    </div>;
}

export default Toolbar;