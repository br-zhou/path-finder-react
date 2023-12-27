import { CanvasTools } from "./canvasTools";
import { TILE_SIZE, MAP_OFFSET } from "./tileMap";

export class Tile {
    constructor(gridPos, type, creationTime) {
        this.gridPos = gridPos;
        this.type = type;
        this.createdAt = creationTime;
        this.tools = new CanvasTools();
    }

    update(dtSec, elapsedTimeSec) { }

    render() {
        this.tools.drawRect(
            {
                x: this.gridPos.x * TILE_SIZE + MAP_OFFSET.x,
                y: this.gridPos.y * TILE_SIZE + MAP_OFFSET.y,
            },
            TILE_SIZE + TILE_SIZE / 100,
            TILE_SIZE + TILE_SIZE / 100,
            "#000000"
        );
    }

}