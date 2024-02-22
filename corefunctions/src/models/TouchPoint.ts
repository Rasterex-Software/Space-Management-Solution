export class TouchPoint {
    pointID: string;
    x: number;
    y: number;

    constructor (touchID: string, x: number, y: number) {
        this.pointID = touchID;
        this.x = x;
        this.y = y;
    }
} 