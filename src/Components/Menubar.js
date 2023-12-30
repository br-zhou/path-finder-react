import { useState } from "react";
import { useSelector } from "react-redux";
import SettingsModal from "./Settings/SettingsModal";

const Menubar = () => {
    const isSearching = useSelector(state => state.isSearching);
    
    const [isOpen, setIsOpen] = useState(false);

    const openSettings = () => {
        setIsOpen(true);
    }

    return <>
    <SettingsModal open={isOpen} setOpen={setIsOpen} />
    {!isSearching && <div id="top-right">
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mx-2 select-none" onClick={openSettings}>Settings ⚙️</button>
    </div>}
    </>
}

export default Menubar;