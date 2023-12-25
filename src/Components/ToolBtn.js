import { useSelector } from "react-redux";

const ToolbarBtn = (props) => {
    const canvasBrushMode = useSelector(state => state.brushMode);

    const clickHandler = () => {
        if (props.click) props.click(props.mode);
    }

    return <button className={`w-16 h-16 ${props.mode === canvasBrushMode ? 'bg-blue-400' : 'bg-blue-500'} text-white rounded-md m-2 mb-0 select-none`} onClick={clickHandler}>{props.text}</button>;
}

export default ToolbarBtn;