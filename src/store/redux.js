import { createStore } from 'redux';
import { Tile } from '../game/engine/tile';
import { Vector2 } from '../game/engine/vector2';
import { getElapsedTime } from '../game/engine/animationLoop';

const initialState = {
    brushType: "brush",
    isSearching: false,
    mapData: {
        width: 25,
        height: 25,
        tileData: {},
        start: null,
        goals: {},
    },
    errorMsg: null,
};

const reducer = (state = initialState, action) => {
    let result = { ...state };
    
    const tileData = result.mapData.tileData;
    const goalData = result.mapData.goals;

    switch (action.type) {
        case "toggle-search":
            if (result.isSearching === false) {
                if (result.mapData.start === null) {
                    result.errorMsg = "ERROR: MUST HAVE STARTING TILE";
                } else if (Object.keys(result.mapData.goals).length === 0) {
                    result.errorMsg = "ERROR: MUST HAVE AT LEAST 1 GOAL TILE";
                } else {
                    result.isSearching = true;
                    result.errorMsg = null;
                }
            } else {
                result.isSearching = false;
            }

            return result;
        case "clear-map":
            result.mapData.tileData = {};
            result.mapData.start = null;
            result.mapData.goals = {};
            return result;
        case "set-start":
            result.mapData.start = new Tile(
                new Vector2(action.x, action.y),
                "start",
                getElapsedTime(),
                "#00FF00"
            );
            return result;
        case "add-goal":
            const goals = result.mapData.goals;
            if (goals[action.x] === undefined) goals[action.x] = {};
            goals[action.x][action.y] = new Tile(
                new Vector2(action.x, action.y),
                "goal",
                getElapsedTime(),
                "#FF00FF"
            );

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

            return result;
        case "erase-tile":
            if (action.omit !== "wall") {
                if (
                    tileData[action.x] &&
                    tileData[action.x][action.y] &&
                    !tileData[action.x][action.y].deleted
                ) {
                    tileData[action.x][action.y].delete();
                }
            }

            if (action.omit !== "start") {
                const start = result.mapData.start;
                if (start !== null &&
                    start.gridPos.x === action.x &&
                    start.gridPos.y === action.y) {
                    start.delete();
                }
            }

            if (action.omit !== "goal") {
                if (
                    goalData[action.x] &&
                    goalData[action.x][action.y] &&
                    !goalData[action.x][action.y].deleted
                ) {
                    goalData[action.x][action.y].delete();
                }
            }

            return result;
        case "delete-tile":
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
                if (result.mapData.start.gridPos.x === action.x &&
                    result.mapData.start.gridPos.y === action.y) {
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