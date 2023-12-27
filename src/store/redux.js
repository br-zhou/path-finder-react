import { createStore } from 'redux';
import { Tile } from '../game/engine/tile';
import { Vector2 } from '../game/engine/vector2';
import { getElapsedTime } from '../game/engine/animationLoop';

const initialState = {
    brushMode: "brush",
    mapData: {
        width: 15,
        height: 15,
        tileData: {},
        start: null,
        goals: {},
    },
};

const reducer = (state = initialState, action) => {
    let result = { ...state };
    const tileData = result.mapData.tileData;

    switch (action.type) {
        case "clear-map":
            result.mapData.tileData = {};
            result.mapData.start = null;
            result.mapData.goals = {};
            return result;
        case "set-start":
            result.mapData.start = { x: action.x, y: action.y }
            return result;
        case "add-goal":
            const goals = result.mapData.goals;
            if (goals[action.x] === undefined) goals[action.x] = {};
            goals[action.x][action.y] = "goal";
            return result;
        case "add-tile":
            if (!tileData[action.x]) {
                tileData[action.x] = {};
            }

            if (tileData[action.x][action.y] && tileData[action.x][action.y].type === "wall") return result;

            tileData[action.x][action.y] = new Tile(
                new Vector2(action.x, action.y),
                "wall",
                getElapsedTime(),
            );

            console.log("new tile!");

            return result;
        case "erase-tile":
            // delete walls
            if (
                tileData[action.x] &&
                tileData[action.x][action.y]
                && action.omit !== "wall"
            ) {
                delete tileData[action.x][action.y];

                if (Object.keys(tileData[action.x]).length === 0) {
                    delete tileData[action.x];
                }
            }
            // delete start
            if (result.mapData.start && action.omit !== "start") {
                if (result.mapData.start.x === action.x &&
                    result.mapData.start.y === action.y) {
                    result.mapData.start = null;
                }
            }

            // delete goals
            if (
                result.mapData.goals[action.x] &&
                result.mapData.goals[action.x][action.y] &&
                action.omit !== "goal"
            ) {
                delete result.mapData.goals[action.x][action.y];

                if (Object.keys(result.mapData.goals[action.x]).length === 0) {
                    delete result.mapData.goals[action.x];
                }
            }
            return result;
        default:
            return {
                ...state,
                [action.type]: action.value
            };
    }
}

const store = createStore(reducer);

export default store;