import {
    Globals
} from '../internal';

export class lineObject {
    parent: any;
    type: string;
    blockname: any;
    blockstate: number;
    layer: any;
    layerstate: number;
    drawmode: any;
    pen: any;
    strokecolor: any;
    fillcolor: any;
    stroketempcolor: any;
    filltempcolor: any;
    drawcompare: boolean;
    comparecolor: any;
    selected: boolean;
    linewidth: any;
    x1: any;
    y1: any;
    x2: any;
    y2: any;

    constructor(xmldata: any, parent: any, blockname: any, binary: boolean) {
        // <line x1="1108602768.00" y1="-433854298.00" x2="1108602767.00" y2="-433830557.00" fs='0' ls='0' lc="#FF69B4" lw='0.00' pen='2' la='41'/>
        this.parent = parent;
        this.type = "line";
        this.blockname = blockname;
        this.blockstate = 1;
        this.layer = xmldata.layer;
        this.layerstate = 1;
        this.drawmode = xmldata.drawmode;
        this.pen = xmldata.pen;
        this.strokecolor = xmldata.strokecolor;
        this.fillcolor = xmldata.fillcolor;
        this.stroketempcolor = xmldata.strokecolor;
        this.filltempcolor = xmldata.fillcolor;

        this.drawcompare = false;
        this.comparecolor = this.fillcolor;
        this.selected = false;

        const lw = xmldata.linewidth;
        if (lw == 0) {
            // TODO:JS->TS:CHECK recheck why this was commented out in the original code
            // this.linewidth = 1;
        } else {
            this.linewidth = lw;
        }


        this.layerstate = xmldata.layerstate;

        /*var lineobject = {
         layer : drawlayer,
         pen : drawpen,
         strokecolor : hexdrawcolor,
         fillcolor : hexfillcolor,
         linewidth : linewidth,
         x1 : lX1,
         y1 : lY1,
         x2 : lX2,
         y2 : lY2
         };*/


        this.x1 = xmldata.x1;
        this.y1 = xmldata.y1;
        this.x2 = xmldata.x2;
        this.y2 = xmldata.y2;

    }

    // TODO:JS->TS:CHECK none of params are used
    public insidePolygon(x: number, y: number, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number) {
        return false;
    };

    public getRectangle(scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number) {

        let minx = (this.x1 - mediax) * scalefactor;
        let miny = (mediah - this.y1) * scalefactor;
        let maxx = (this.x2 - mediax) * scalefactor;
        let maxy = (mediah - this.y2) * scalefactor;


        minx += offsetx;
        maxx += offsetx;
        miny += offsety;
        maxy += offsety;

        if (minx > maxx) {
            const tempx = minx;
            minx = maxx;
            maxx = tempx;
        }
        if (miny > maxy) {
            const tempy = miny;
            miny = maxy;
            maxy = tempy;
        }

        return {
            found: true,
            x: minx,
            y: miny,
            w: maxx - minx,
            h: maxy - miny,
            wp: (maxx - minx) / 10,
            hp: (maxy - miny) / 10
        };

    };

    public toggleselect() {
        const selectstate = !this.selected;
        this.selected = selectstate;

    };

    public findsnapPoint(x: number, y: number, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number) {
        let x1scaled = (this.x1 - mediax) * scalefactor;
        let y1scaled = (mediah - this.y1) * scalefactor;
        let x2scaled = (this.x2 - mediax) * scalefactor;
        let y2scaled = (mediah - this.y2) * scalefactor;

        x1scaled += offsetx;
        y1scaled += offsety;
        x2scaled += offsetx;
        y2scaled += offsety;

        const snapradius = 10;

        if (x1scaled > x - snapradius && x1scaled < x + snapradius) {
            if (y1scaled > y - snapradius && y1scaled < y + snapradius) {
                return {
                    found: true,
                    x: x1scaled,
                    y: y1scaled
                };
            }

        }
        if (x2scaled > x - snapradius && x2scaled < x + snapradius) {
            if (y2scaled > y - snapradius && y2scaled < y + snapradius) {
                return {
                    found: true,
                    x: x2scaled,
                    y: y2scaled
                };
            }

        }
        return {
            found: false,
            x: 0,
            y: 0
        };


    };

    public drawemeoverlay(ctx: any, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, ls: number, bs: number) {
        this.drawcompare = false;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);
    };


    public drawemecompare(ctx: any, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, color: string, ls: number, bs: number) {
        this.drawcompare = true;
        this.comparecolor = color;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);

    };


    public drawme(ctx: any, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, ls: number, bs: number, drawprint: any) {
        let x1scaled = (this.x1 - mediax) * scalefactor;
        let y1scaled = (mediah - this.y1) * scalefactor;
        let x2scaled = (this.x2 - mediax) * scalefactor;
        let y2scaled = (mediah - this.y2) * scalefactor;

        if (ls == 0 || bs == 0) {
            return;
        }


        x1scaled += offsetx;
        y1scaled += offsety;
        x2scaled += offsetx;
        y2scaled += offsety;

        if (!this.parent.backgroundrender) {
            if (x1scaled < 0 && x2scaled < 0) {

                return;

            }
            if (y1scaled < 0 && y2scaled < 0) {

                return;

            }

            if (x1scaled > Globals.canvasowidth && x2scaled > Globals.canvasowidth) {

                return;
            }
            if (y1scaled > Globals.canvasoheight && y2scaled > Globals.canvasoheight) {

                return;
            }
        }


        /*if (Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj != undefined) {
            if (!Globals.DocObj.pages[Globals.DocObj.currentpage].VectorPageObj.backgroundrender) {
                if (x1scaled < 0 && x2scaled < 0) {
                    return;
                }
                if (y1scaled < 0 && y2scaled < 0) {
                    return;
                }

                if (x1scaled > Globals.canvasowidth && x2scaled > Globals.canvasowidth) {
                    return;
                }
                if (y1scaled > Globals.canvasoheight && y2scaled > Globals.canvasoheight) {
                    return;
                }
            }

        } else {
            if (x1scaled < 0 && x2scaled < 0) {
                return;
            }
            if (y1scaled < 0 && y2scaled < 0) {
                return;
            }

            if (x1scaled > Globals.canvasowidth && x2scaled > Globals.canvasowidth) {
                return;
            }
            if (y1scaled > Globals.canvasoheight && y2scaled > Globals.canvasoheight) {
                return;
            }

        }*/

        //ctx.save();
        ctx.lineCap = 'round';
        //ctx.globalAlpha = 0.5;
        //ctx.imageSmoothingEnabled = false;
        if (!Globals.bKeepVectorColor) {

            if (this.stroketempcolor == Globals.DocObj.backgroundColor) {
                if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                    this.stroketempcolor = "#000000";
                }
                if (Globals.DocObj.backgroundColor == "#000000") {
                    this.stroketempcolor = "#FFFFFF";
                }
            }

        } else {
            this.stroketempcolor = this.strokecolor;
            //this.filltempcolor = xmldata.fillcolor;

        }

        if (drawprint && this.stroketempcolor == "#FFFFFF") {
            this.stroketempcolor = "#000000";
        }

        if (this.drawcompare) {
            ctx.strokeStyle = this.comparecolor;
        } else if (this.parent.viewmode == 1) {

            ctx.strokeStyle = "black";
        } else {
            ctx.strokeStyle = this.stroketempcolor;
        }

        if (this.linewidth * scalefactor < 1) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = this.linewidth * scalefactor;
        }
        //ctx.lineWidth = this.linewidth * scalefactor;


        ctx.beginPath();
        ctx.moveTo(x1scaled, y1scaled);
        ctx.lineTo(x2scaled, y2scaled);
        ctx.stroke();

        this.drawcompare = false;
        //ctx.restore();
    };

    public Close() {

    };


}