import {
    Globals
} from '../internal';

export class subPathObject {
    type: string;
    precision: any;
    parentpath: any;
    blockname: any;
    blockstate: any;
    layer: any;
    layerstate: any;
    drawmode: any;
    strokecolor: any;
    fillcolor: any;
    stroketempcolor: any;
    filltempcolor: any;
    filled: any;
    selected: boolean;
    linewidth: any;
    svgpathstr: string;
    points: any;
    last: boolean;
    drawcompare: boolean;
    comparecolor: any;

    // TODO:JS->TS:ADJUST the binary param is not used
    constructor (points: any, parentpath: any, last: boolean, precision: any, binary: boolean) {
        this.type = "subpath";
        this.precision = precision;
        this.parentpath = parentpath;
        this.blockname = parentpath.blockname;
        this.blockstate = parentpath.blockstate;
        this.layer = parentpath.layer;
        this.layerstate = parentpath.layerstate;
        this.drawmode = parentpath.drawmode;
        this.strokecolor = parentpath.strokecolor;
        this.fillcolor = parentpath.fillcolor;
        this.stroketempcolor = parentpath.strokecolor;
        this.filltempcolor = parentpath.fillcolor;
        this.filled = parentpath.filled;
        this.selected = false;
        this.linewidth = parentpath.linewidth;
        this.svgpathstr = '';

        this.points = null; // TODO:JS->TS:CHECK this was added because no initializer was found
        this.drawcompare = false; // TODO:JS->TS:CHECK this was added because no initializer was found

        if(this.precision == 0){
            this.points = new Float32Array(points.length);
        }else if(this.precision == 1){
            this.points = new Float64Array(points.length);
        }
        const numpoints = points.length;
        this.last = last;
        let pctr = 0;
        while (pctr < numpoints) {
            this.points[pctr] = points[pctr];
            pctr++;
        }
    }
    public findsnapPoint (x: number, y: number, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number) {

        let absxscaled = (this.points[0] - mediax) * scalefactor;
        let absyscaled = (mediah - this.points[1]) * scalefactor;

        let relxscaled = 0;
        let relyscaled = 0;

        absxscaled += offsetx;
        absyscaled += offsety;
        const snapradius = 10;


        if (absxscaled > x - snapradius && absxscaled < x + snapradius) {
            if (absyscaled > y - snapradius && absyscaled < y + snapradius) {

                return {
                    found:true,
                    x:absxscaled,
                    y:absyscaled
                };
            }

        }

        for (let counter = 2; counter < this.points.length; counter += 2) {

            relxscaled = ((this.points[counter] - mediax) * scalefactor);
            relyscaled = ((mediah - this.points[counter + 1]) * scalefactor);
            relxscaled += offsetx;
            relyscaled += offsety;
            if (relxscaled > x - snapradius && relxscaled < x + snapradius) {
                if (relyscaled > y - snapradius && relyscaled < y + snapradius) {

                    return {
                        found:true,
                        x:relxscaled,
                        y:relyscaled
                    };
                }

            }


        }
        return {
            found:false,
            x:0,
            y:0
        };


    };

    public drawemeoverlay (ctx:any, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, ls: number,bs: number){
        this.drawcompare = false;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah,ls,bs,false);
    };


    public drawemecompare (ctx:any, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay: number, mediah: number, color: number,ls: number,bs: number) {
        this.drawcompare = true;
        this.comparecolor = color;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah,ls,bs,false);

    };


    public drawme (ctx: any, scalefactor: any, offsetx: any, offsety: any, mediax: any, mediay: any, mediah: any,ls: any,bs: any,drawprint: boolean) {
        let absxscaled = (this.points[0] - mediax) * scalefactor;
        let absyscaled = (mediah - this.points[1]) * scalefactor;
        let relxscaled = 0;
        let relyscaled = 0;

        if (ls == 0 || bs == 0) {
            return;
        }

        absxscaled += offsetx;
        absyscaled += offsety;

        if (!this.parentpath.render) {
            return;
        }

        //ctx.save();

        //ctx.imageSmoothingEnabled = false;
        //ctx.globalCompositeOperation = 'destination-out';
        if(!Globals.bKeepVectorColor){
            if (this.stroketempcolor == Globals.DocObj.backgroundColor) {
                if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                    this.stroketempcolor = "#000000";
                    this.filltempcolor = "#000000";
                }
                if (Globals.DocObj.backgroundColor == "#000000") {
                    this.stroketempcolor = "#FFFFFF";
                    this.filltempcolor = "#FFFFFF";
                }
            }

        }else{
            this.stroketempcolor = this.strokecolor;
            this.filltempcolor = this.fillcolor;

        }

        if(drawprint && this.stroketempcolor == "#FFFFFF"){
            this.stroketempcolor = "#000000";
            this.filltempcolor = "#000000";
        }

        if (this.drawcompare) {
            ctx.strokeStyle = this.comparecolor;
        } else if (this.parentpath.viewmode == 1) {

            ctx.strokeStyle = "black";

        }else{
            ctx.strokeStyle = this.stroketempcolor;
        }

        //console.log('subpath');
        //console.log(this.filled);

        //ctx.lineWidth = this.linewidth * scalefactor;
        if (this.linewidth * scalefactor < 1 && this.filled == 0) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = this.linewidth * scalefactor;
            //const linew = (0.5 + (this.linewidth * scalefactor)) | 0;
            //ctx.lineWidth = linew;


        }
        //ctx.lineWidth = this.linewidth * scalefactor;


        //ctx.beginPath();


        //      ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);

        ctx.moveTo(absxscaled, absyscaled); //round off test for better performance
        //ctx.moveTo(((0.5 + absxscaled) | 0), ((0.5 + absyscaled) | 0));

        /* Andriy: unused constiable const count = 0; */
        for (let counter = 2; counter < this.points.length; counter += 2) {
            //            ctx.lineTo(markupobject.points[counter].x, markupobject.points[counter].y);
            relxscaled = ((this.points[counter] - mediax) * scalefactor);
            relyscaled = ((mediah - this.points[counter + 1]) * scalefactor);
            relxscaled += offsetx;
            relyscaled += offsety;
            //xscaled = xscaled + offsetx;
            //yscaled = yscaled + offsety;
            ctx.lineTo(relxscaled, relyscaled); //round off test for better performance
            //ctx.lineTo(((0.5 + relxscaled) | 0), ((0.5 + relyscaled) | 0));

        }
        ctx.closePath();
        ctx.lineCap = 'round';

        if (this.last) {
            if ((this.filled == 1 && this.parentpath.parent.viewmode == 0) || this.selected || this.parentpath.parent.blocklist[this.blockname].overridecolor ) {

                if (this.drawcompare) {
                    ctx.fillStyle = this.comparecolor;
                } else {
                    if(this.parentpath.parent.blocklist[this.blockname].overridecolor){
                        ctx.fillStyle = this.parentpath.parent.blocklist[this.blockname].color;
                    }else if (this.selected) {
                        ctx.fillStyle = this.parentpath.parent.selectColor;
                    }else{
                        ctx.fillStyle = this.filltempcolor;
                    }

                }


                ctx.fill();
            } else {
                //ctx.closePath();
                //ctx.stroke();
                //ctx.fillStyle = this.fillcolor;
                //ctx.fill();

            }
            //ctx.closePath();

            ctx.stroke();

        }
        //ctx.clip();
        //ctx.restore();
        this.drawcompare = false;
    };

    public Close () {

        this.points = null;
    };
}

