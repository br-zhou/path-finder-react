import ToolbarBtn from "./ToolBtn";

const Toolbar = () => {
    return <div id="left-bar">
        <ToolbarBtn text="🖌️ Brush" />
        <ToolbarBtn text="❌ Eraser" />
        <ToolbarBtn text="🚀 Start" />
        <ToolbarBtn text="🚩 Finish" />
    </div>;
}

export default Toolbar;