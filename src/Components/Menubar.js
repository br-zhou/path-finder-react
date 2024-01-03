import { useState } from "react";
import { useSelector } from "react-redux";
import SettingsModal from "./Settings/SettingsModal";
import TutorialModal from "./TutorialModal";

const Menubar = () => {
    const isSearching = useSelector(state => state.isSearching);

    const [settingsModal, setSettingsModal] = useState(false);
    const [tutorialModal, setTutorialModal] = useState(false);

    const openSettings = () => {
        setSettingsModal(true);
    }

    const openTutorial = () => {
        setTutorialModal(true);
    }

    return !isSearching && (<>
        <SettingsModal open={settingsModal} setOpen={setSettingsModal} />
        <TutorialModal open={tutorialModal} setOpen={setTutorialModal} />
        <div id="top-right">
            <button className="bg-gray-300 hover:bg-gray-500 text-black hover:text-white font-bold py-2 px-4 rounded mx-2 select-none" onClick={openTutorial}>Controls 🎮</button>
            <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2 select-none" onClick={openSettings}>Settings ⚙️</button>
        </div>
    </>)
}

export default Menubar;