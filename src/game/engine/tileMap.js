import { CanvasTools } from "./canvasTools.js";
import { Vector2 } from "./vector2.js";
import store from "../../store/redux.js";

export const TILE_SIZE = 2;

const tileColorMap = {
  "wall" : "#000000",
  "start" : "#00FF00",
  "finish" : "#FF0000"
}
/**
 * TileMap for ground
 */
export class TileMap {
  constructor() {
    this.mapData_ = null;
    this.tools = new CanvasTools();

    store.subscribe(this.reduxSubscriptionHandler);

    this.mapData_ = this.getReduxSlice();

    this.offsetX_ = 0;
    this.offsetY_ = 0;
  }

  getReduxSlice = () => {
    const fullState = store.getState();
    return fullState.mapData;
  }

  reduxSubscriptionHandler = () => {
    const slice = this.getReduxSlice();
    this.mapData_ = {...slice};
    console.log("tilemap updated!");
  }

  render() {
    this.tools.drawRectOutline(
      new Vector2(0, (this.mapData_.height - 1) * TILE_SIZE),
      this.mapData_.width * TILE_SIZE,
      this.mapData_.height * TILE_SIZE
    );

    if (this.mapData_.tileData != null) {
      // todo: optimize rendering to only show tiles visible to camera
      for (const gridX of Object.keys(this.mapData_.tileData)) {
        for (const gridY of Object.keys(this.mapData_.tileData[gridX])) {
          const blockType = this.mapData_.tileData[gridX][gridY];
          this.colorGrid({ x: gridX, y: gridY }, tileColorMap[blockType]);
        }
      }
    }
  }

  /**
   * @param {x, y} position colors tile at index {x,y}
   * @param {string} color the specified color
   */
  colorGrid({ x, y }, color) {
    this.tools.drawRect(
      {
        x: x * TILE_SIZE + this.offsetX_,
        y: y * TILE_SIZE + this.offsetY_,
      },
      TILE_SIZE + TILE_SIZE / 100,
      TILE_SIZE + TILE_SIZE / 100,
      color
    );
  }

  /**
   * @param {x, y} position outlines tile at index {x,y}
   * @param {string} color the specified color
   */
  outlineGrid({ x, y }, color) {
    this.tools.drawRectOutline(
      {
        x: x * TILE_SIZE + this.offsetX_,
        y: y * TILE_SIZE + this.offsetY_,
      },
      TILE_SIZE,
      TILE_SIZE,
      color
    );
  }

  get offsetX() {
    return this.offsetX_;
  }

  get offsetY() {
    return this.offsetY_;
  }

  /**
   * @param {number, number} position world position
   * @returns {number, number} index in tileGrid
   */
  positionToGridIndex({ x, y }) {
    const OffsetPosition = { x: x - this.offsetX_, y: y - this.offsetY_ };

    const gridIndex = {
      x: Math.floor(OffsetPosition.x / TILE_SIZE),
      y: Math.ceil(OffsetPosition.y / TILE_SIZE),
    };

    return gridIndex;
  }

  /**
   *
   * @param {number, number} gridIndex x and y indexes in tileGrid
   * @returns {number, number} world position of grid
   */
  gridIndexToPosition({ x, y }) {
    const worldPosition = {
      x: x * TILE_SIZE + this.offsetX_,
      y: y * TILE_SIZE + this.offsetY_,
    };

    return worldPosition;
  }

  /**
   *
   * @param {vector2} gridIndexPosition of block
   * @returns enitity that represents block
   * NOTE: altering the enitity does not alter the block
   */
  tileIndexToEntity({ x, y }) {
    return {
      position_: this.gridIndexToPosition(new Vector2(x, y)),
      size_: new Vector2(TILE_SIZE, TILE_SIZE),
    };
  }
}
