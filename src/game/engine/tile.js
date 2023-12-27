export class Tile {
    constructor(gridPos, type, creationTime) {
        this.gridPos = gridPos;
        this.type = type;
        this.createdAt = creationTime;
    }

    update(dtSec, elapsedTimeSec) {}

    render() {}
}