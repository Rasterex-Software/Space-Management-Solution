import {
    Globals
} from '../internal';

export class arcObject {
    type: string;
    parent: any;
    blockname: number;
    blockstate: number;
    selected: boolean;
    layer: any;
    layerstate: number;
    drawmode: any;
    clockwise: any;
    strokecolor: any;
    fillcolor: any;
    stroketempcolor: any;
    filltempcolor: any;
    drawcompare: boolean;
    comparecolor: any;
    linewidth: any;
    cx: any;
    cy: any;
    r: any;
    sa: any;
    ea: any;
    fullcircle: number;

    // TODO:JS->TS:CHECK binary param seems to not be used
    constructor(xmldata:any, parent:any, blockname:number, binary:boolean) {
        this.type = "arc";
        this.parent = parent;
        //circle cx="388466.18" cy="1351977.86" r="10152.93"  fs='0' ls='0' lc="#808080" lw='0.00' wt='25' pen='8' la='3'/>

        this.blockname = blockname;
        this.blockstate = 1;


        /*circleobject = {
         layer : drawlayer,
         pen : drawpen,
         strokecolor : hexdrawcolor,
         fillcolor : hexfillcolor,
         linewidth : linewidth,
         cx : cX,
         cy : cY,
         cr : cR,
         filled : false,
         };*/
        this.selected = false;
        this.layer = xmldata.layer;
        this.layerstate = 1;
        this.drawmode = xmldata.drawmode;
        //this.filled = xmldata.filled;
        this.clockwise = xmldata.clockwise;


        this.strokecolor = xmldata.strokecolor;
        this.fillcolor = xmldata.fillcolor;
        this.stroketempcolor = xmldata.strokecolor;
        this.filltempcolor = xmldata.fillcolor;


        this.drawcompare = false;
        this.comparecolor = this.fillcolor;

        const lw = xmldata.linewidth;
        // TODO:JS->TS:CHECK TODO:JS->TS:ADJUST
        if (lw == 0) {
            // this.linewidth = 1; // JS->TS:INFO was commented out in the original code
        } else {
            this.linewidth = lw;
        }

        this.cx = xmldata.ax;
        this.cy = xmldata.ay;
        this.r = xmldata.ar;
        this.sa = xmldata.asa;
        this.ea = xmldata.aea;
        this.fullcircle = Math.PI * 2;

    }

    // TODO:JS->TS:CHECK none of params are used
    public insidePolygon(x:number, y:number, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number) {
        return false;
    };

    public getRectangle(scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number) {

        const absxscaled = (this.cx - mediax) * scalefactor;
        const absyscaled = (mediah - this.cy) * scalefactor;
        const absradius = this.r * scalefactor;

        let minx = absxscaled - absradius;
        let miny = absyscaled - absradius;
        let maxx = absxscaled + absradius;
        let maxy = absyscaled + absradius;

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

    public findsnapPoint(x:number, y:number, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number) {
        let absxscaled = (this.cx - mediax) * scalefactor;
        let absyscaled = (mediah - this.cy) * scalefactor;

        absxscaled += offsetx;
        absyscaled += offsety;

        const snapradius = 10;

        if (absxscaled > x - snapradius && absxscaled < x + snapradius) {
            if (absyscaled > y - snapradius && absyscaled < y + snapradius) {
                return {
                    found: true,
                    x: absxscaled,
                    y: absyscaled
                };
            }

        } else {
            return {
                found: false,
                x: 0,
                y: 0
            };

        }

    };


    public drawemeoverlay(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, ls:number, bs:number) {
        this.drawcompare = false;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);
    };


    public drawemecompare(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, color:number, ls:number, bs:number) {
        this.drawcompare = true;
        this.comparecolor = color;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);

    };


    public drawme(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, ls:number, bs:number, drawprint:boolean) {
        let absxscaled = (this.cx - mediax) * scalefactor;
        let absyscaled = (mediah - this.cy) * scalefactor;
        const absradius = this.r * scalefactor;

        if (ls == 0 || bs == 0) {
            return;
        }

        absxscaled += offsetx;
        absyscaled += offsety;

        if (!this.parent.backgroundrender) {
            if (absxscaled < 0 && absxscaled + absradius < 0) {

                return;
            }
            if (absyscaled < 0 && absyscaled + absradius < 0) {

                return;
            }

            if (absxscaled > Globals.canvasowidth && absxscaled - absradius > Globals.canvasowidth) {

                return;
            }
            if (absyscaled > Globals.canvasoheight && absyscaled - absradius > Globals.canvasoheight) {

                return;
            }
        }



        if (!Globals.bKeepVectorColor) {
            if (this.stroketempcolor == Globals.DocObj.backgroundColor) {
                if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                    this.stroketempcolor = "#000000";
                }
                if (Globals.DocObj.backgroundColor == "#000000") {
                    this.stroketempcolor = "#FFFFFF";
                }
            }

            if (this.filltempcolor == Globals.DocObj.backgroundColor) {
                if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                    this.filltempcolor = "#000000";
                }
                if (Globals.DocObj.backgroundColor == "#000000") {
                    this.filltempcolor = "#FFFFFF";
                }

            }

        } else {
            this.stroketempcolor = this.strokecolor;
            this.filltempcolor = this.fillcolor;

        }

        if (drawprint && this.strokecolor == "#FFFFFF") {
            this.stroketempcolor = "#000000";
        }
        if (drawprint && this.fillcolor == "#FFFFFF") {
            this.filltempcolor = "#000000";
        }

        ctx.lineCap = 'round';
        if (this.drawcompare) {
            ctx.strokeStyle = this.comparecolor;
        } else if (this.parent.viewmode == 1) {
            ctx.fillStyle = "black";
        } else {
            ctx.strokeStyle = this.stroketempcolor;
        }

        if (this.linewidth * scalefactor < 1) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = this.linewidth * scalefactor;
        }
        //ctx.save();
        ctx.beginPath();
        //ctx.translate(absxscaled, absyscaled);
        //ctx.scale(1,-1);

        ctx.arc(absxscaled, absyscaled, absradius, this.fullcircle - this.sa, this.fullcircle - this.ea, this.clockwise);

        /*if (this.filled == 1 && this.parent.viewmode == 0) {
            if (this.drawcompare) {
                ctx.fillStyle = this.comparecolor;

            }else{
                if(parent.blocklist[this.blockname].overridecolor){
                    ctx.fillStyle = parent.blocklist[this.blockname].color;
                }else if (this.selected) {
                    ctx.fillStyle = parent.selectColor;//"#bf3ad1";
                }else{
                    ctx.fillStyle = this.filltempcolor;
                }

            }


            ctx.fill();
            //ctx.lineWidth = 5;
            //ctx.strokeStyle = '#003300';

        }*/
        ctx.stroke();
        //ctx.restore();
        this.drawcompare = false;

    };
    public Close() {

    };
}