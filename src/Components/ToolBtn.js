const ToolbarBtn = (props) => {
    const clickHandler = () => {
        console.log("click")
    }

    return <button className="w-16 h-16 bg-blue-500 text-white rounded-md m-2 mb-0" onClick={clickHandler}>{props.text}</button>;
}

export default ToolbarBtn;