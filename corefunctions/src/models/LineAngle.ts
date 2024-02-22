// TODO:JS->TS:FIX adjust names ( class, properties )
export class lineangle {
    startx: number;
    starty: number;
    endx: number;
    endy: number;
    width: number;
    height: number;
    angle: number;
    reangle: number;
    rehangle: number;
    rewangle: number;

    constructor (startx: number, starty: number, endx: number, endy: number) {
        this.startx = startx;
        this.starty = starty;
        this.endx = endx;
        this.endy = endy;
        this.width = endx - startx;
        this.height = endy - starty;

        const rewidth = startx - endx;
        const reheight = starty - endy;

        this.angle = Math.atan2(this.height, this.width);
        this.reangle = Math.atan2(reheight, rewidth);
        this.rehangle = Math.atan2(this.height, rewidth);
        this.rewangle = Math.atan2(reheight, this.width);
    }
};