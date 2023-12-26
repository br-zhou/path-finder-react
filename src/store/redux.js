import { createStore } from 'redux';

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
    let result = {...state};
    const tileData = result.mapData.tileData;

    switch(action.type) {
        case "add-tile":
            if (!tileData[action.x]) {
                tileData[action.x] = {};
            }
            tileData[action.x][action.y] = action.blockType;
            return result;
        case "erase-tile":
            if (
                tileData[action.x] &&
                tileData[action.x][action.y]
              ) {
                delete tileData[action.x][action.y];
          
                if (Object.keys(tileData[action.x]).length === 0) {
                  delete tileData[action.x];
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