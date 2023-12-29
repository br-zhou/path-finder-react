import store from "../../store/redux";
import { CanvasTools } from "./canvasTools";
import { Heap } from "./myHeap";
// import { MAP_OFFSET, TILE_SIZE } from "./tileMap";
import { Vector2 } from "./vector2";

export class PathFinder {
    constructor() {
        this.mapData = null;
        this.isSearching = false;
        this.pathTiles = {};
        store.subscribe(this.reduxSubscriptionHandler);
        this.tools = new CanvasTools();
        this.heap = new Heap();
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

        const startPosition = this.mapData.start.gridPos;

        // insert starting position into frontier
        this.heap.insert(startPosition, 0, this.getHeuristic(startPosition));
    }

    update(dtSec, elapsedTimeSec) {
        if (!this.isSearching) return;

        // if time > wait time, step the generic search algo
        // make sure not to re-search nodes already on the tree!
    }

    getHeuristic(pos) {
        let minHeuristic = -1;

        for (const gridX of Object.keys(this.mapData.goals)) {
            for (const gridY of Object.keys(this.mapData.goals[gridX])) {
                const dist = this.getDist(pos, new Vector2(gridX, gridY));
                if (minHeuristic === -1 || dist < minHeuristic) {
                    minHeuristic = dist;
                }
            }
        } 

        return minHeuristic;
    }

    getDist(posA, posB) {
        return Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
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