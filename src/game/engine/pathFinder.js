import store from "../../store/redux";
import { CanvasTools } from "./canvasTools";
import { MAP_OFFSET, TILE_SIZE } from "./tileMap";

export class PathFinder {
    constructor() {
        this.mapData = null;
        this.isSearching = false;
        this.pathTiles = {};
        store.subscribe(this.reduxSubscriptionHandler);
        this.tools = new CanvasTools();
    }

    reduxSubscriptionHandler = () => {
        const fullState = store.getState();
        const wasSearching = this.isSearching;
        this.isSearching = fullState.isSearching;

        if (this.isSearching && !wasSearching) {
            this.startSearch(fullState);
        }
    }

    startSearch = (state) => {
        this.pathTiles = {};
        this.mapData = JSON.parse(JSON.stringify(state.mapData));

        // delete all tiles that are in delete animation
        for (const gridX of Object.keys(this.mapData.tileData)) {
            for (const gridY of Object.keys(this.mapData.tileData[gridX])) {
                if (this.mapData.tileData[gridX][gridY].deleted) {
                    delete this.mapData.tileData[gridX][gridY];
                }
            }
        }

        for (const gridX of Object.keys(this.mapData.goals)) {
            for (const gridY of Object.keys(this.mapData.goals[gridX])) {
                if (this.mapData.goals[gridX][gridY].deleted) {
                    delete this.mapData.goals[gridX][gridY];
                }
            }
        }

        console.log(this.mapData);
    }

    update(dtSec, elapsedTimeSec) {
        if (!this.isSearching) return;
    }

    render() {
        if (!this.isSearching) return;

        for (const gridX of Object.keys(this.mapData.goals)) {
            for (const gridY of Object.keys(this.mapData.goals[gridX])) {
              console.log(gridX, gridY);
            }
        }    
    }
}