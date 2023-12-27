import { useSelector } from "react-redux";

const ToolbarBtn = (props) => {
    const canvasBrushType = useSelector(state => state.brushType);
    const isSearching = useSelector(state => state.isSearching);

    const clickHandler = () => {
        if (props.click && !isSearching) props.click(props.mode);
    }

    const getBtnColor = () => {
        if (isSearching) return 'bg-gray-500';
        else if (props.mode === canvasBrushType) return 'bg-blue-400';
        else return 'bg-blue-500';
    }

    return (
    <button 
        className={`w-16 h-16 ${getBtnColor()} text-white rounded-md m-2 mb-0 select-none`}
        onClick={clickHandler}
    >
        {!isSearching && props.text}
    </button>);
}

export default ToolbarBtn;