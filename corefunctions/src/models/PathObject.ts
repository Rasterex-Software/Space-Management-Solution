import {
    Globals,
    subPathObject,
    get_polygon_centroid,
    insidepolygonpoints
} from '../internal';

export class pathObject {
    type: string;
    precision: number;
    parent: any;
    x: number;
    y: number;
    w: number;
    h: number;
    centroid: { x: number; y: number; };
    render: boolean;
    selected: boolean;
    svgpathstr: string;
    drawcompare: boolean;
    comparecolor: any;
    fillcolor: any;
    shape: any;
    blockname: any;
    blockstate: number;
    closed: boolean;
    layer: any;
    layerstate: number;
    drawmode: any;
    strokecolor: any;
    stroketempcolor: any;
    filltempcolor: any;
    filled: number;
    gotsubpath: boolean;
    subpaths: any[];
    linewidth: any;
    points: any;

    constructor(xmldata: { precision: number; layer: any; drawmode: any; layerstate: any; pen: any; strokecolor: any; fillcolor: any; linewidth: any; numpoints: number; points: number[]; filled: number; gotsubpath: boolean; shape: any; }, parent: any, blockname: any, binary: boolean) {

        this.type = "path";
        this.precision = xmldata.precision; //0 = float32, 1=float64
        this.parent = parent;

        this.x = 0.0;
        this.y = 0.0;
        this.w = 0.0;
        this.h = 0.0;

        this.centroid = { x: 0, y: 0 };

        this.render = true;
        this.selected = false;
        this.svgpathstr = '';
        this.drawcompare = false;
        this.comparecolor = this.fillcolor;

        this.shape = xmldata.shape;
        this.blockname = blockname;
        this.blockstate = 1;
        this.closed = false;

        this.layer = xmldata.layer;
        this.layerstate = 1;

        this.drawmode = xmldata.drawmode;
        this.strokecolor = xmldata.strokecolor;

        this.fillcolor = xmldata.fillcolor;
        this.stroketempcolor = xmldata.strokecolor;
        this.filltempcolor = xmldata.fillcolor;


        this.filled = xmldata.filled;
        this.gotsubpath = xmldata.gotsubpath;
        this.subpaths = [];

        if (xmldata.linewidth == 0) {
            //this.linewidth = 1;
        } else {
            this.linewidth = xmldata.linewidth;
        }

        // JS->TS:INFO this line was needed for ts validation
        let cpnts: number, numpoints:any, mainarray: any;

        if (xmldata.gotsubpath) {

            this.gotsubpath = true;

            if (this.precision == 0) {
                this.points = new Float32Array(xmldata.numpoints);
            } else if (this.precision == 1) {
                this.points = new Float64Array(xmldata.numpoints);
            }


            cpnts = 0;
            numpoints = xmldata.numpoints;
            mainarray = xmldata.points[0];
            while (cpnts < numpoints) {
                this.points[cpnts] = mainarray[cpnts];
                cpnts++;
            }


            /*pathobject = {
             layer : drawlayer,
             pen : drawpen,
             strokecolor : hexdrawcolor,
             fillcolor : hexfillcolor,
             linewidth : linewidth,
             numpoints : numpointarr[0],
             points : subpatharrays,
             filled : true,
             gotsubpath : true
             };*/

            let numsubpaths = xmldata.points.length;
            let spc = 1;
            let islasthole = false;
            while (spc < numsubpaths) {
                mainarray = xmldata.points[spc];
                if (spc == numsubpaths - 1) {
                    islasthole = true;
                }
                spc++;
                this.subpaths.push(new subPathObject(mainarray, this, islasthole, this.precision, true));
            }


        } else {

            if (this.precision == 0) {
                this.points = new Float32Array(xmldata.numpoints);
            } else if (this.precision == 1) {
                this.points = new Float64Array(xmldata.numpoints);
            }

            //this.points = new Float32Array(xmldata.numpoints);


            //this.points[0] = xmldata.points[0];
            //this.points[1] = xmldata.points[1];

            cpnts = 0;
            numpoints = xmldata.numpoints;

            while (cpnts < numpoints) {
                this.points[cpnts] = xmldata.points[cpnts];
                cpnts++;
            }

        }

        if (this.shape == 2) {
            if (this.points[0] == this.points[this.points.length - 2] && this.points[1] == this.points[this.points.length - 1]) {
                this.closed = true;
            }
        }


        /*                    var pathobject = {
         layer : drawlayer,
         pen : drawpen,
         strokecolor : hexdrawcolor,
         fillcolor : hexfillcolor,
         linewidth : linewidth,
         numpoints : numpoints,
         points : lpoints,
         filled : false,
         gotsubpath : false
         };
         */




        //fs='0' ls='0' lc="#FFFFFF" lw='0.00' wt='25' pen='7' la='8'

        // TODO:JS->TS:INFO in old version this was called at the bottom of the obhect
        this.findrectangle();
    }

    public toggleselect() {
        const selectstate = !this.selected;
        this.selected = selectstate;

        for (let scount = 0; scount < this.subpaths.length; scount++) {
            this.subpaths[scount].selected = selectstate;
        }

    };

    public unselect() {
        this.selected = false;

        for (let scount = 0; scount < this.subpaths.length; scount++) {
            this.subpaths[scount].selected = false;
        }

    };

    public select() {
        this.selected = true;

        for (let scount = 0; scount < this.subpaths.length; scount++) {
            this.subpaths[scount].selected = true;
        }

    };

    public findcentroid() {

        let pts = [];
        let pointsctr = 0;
        for (let counter = 0; counter < this.points.length; counter += 2) {
            pts[pointsctr] = { x: this.points[counter], y: this.points[counter + 1] };
            pointsctr++;

        }


        if (this.gotsubpath) {
            for (let scount = 0; scount < this.subpaths.length; scount++) {
                //this.subpaths[scount].selected = false;
                for (let counter = 0; counter < this.subpaths[scount].points.length; counter += 2) {
                    pts[pointsctr] = { x: this.subpaths[scount].points[counter], y: this.subpaths[scount].points[counter + 1] };
                    pointsctr++;

                }
            }

        }
        this.centroid = get_polygon_centroid(pts);


    };

    public getcentroid(scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay:number, mediah: number) {

        if (this.centroid.x == 0 && this.centroid.y == 0) {
            this.findcentroid();
        }

        let centrx = (this.centroid.x - mediax) * scalefactor;
        let centry = (mediah - this.centroid.y) * scalefactor;

        centrx += offsetx;
        centry += offsety;

        return { x: centrx, y: centry };
    };

    public findrectangle() {
        /* Andriy: variable initialization is reduntant as it's set to 2 in the first interation of the loop */
        /*var counter = 0;*/

        let minx = this.points[0];
        let miny = this.points[1];
        let maxx = this.points[0];
        let maxy = this.points[1];

        for (let counter = 2; counter < this.points.length; counter += 2) {
            let relxscaled = this.points[counter];
            let relyscaled = this.points[counter + 1];

            if (relxscaled < minx) {
                minx = relxscaled;
            }
            if (relyscaled < miny) {
                miny = relyscaled;
            }
            if (relxscaled > maxx) {
                maxx = relxscaled;
            }
            if (relyscaled > maxy) {
                maxy = relyscaled;
            }

        }


        if (this.gotsubpath) {
            for (let scount = 0; scount < this.subpaths.length; scount++) {
                //this.subpaths[scount].selected = false;
                for (let counter = 0; counter < this.subpaths[scount].points.length; counter += 2) {
                    let relxscaled = this.subpaths[scount].points[counter];
                    let relyscaled = this.subpaths[scount].points[counter + 1];

                    if (relxscaled < minx) {
                        minx = relxscaled;
                    }
                    if (relyscaled < miny) {
                        miny = relyscaled;
                    }
                    if (relxscaled > maxx) {
                        maxx = relxscaled;
                    }
                    if (relyscaled > maxy) {
                        maxy = relyscaled;
                    }

                }
            }

        }

        this.x = minx;
        this.y = miny;
        this.w = maxx;
        this.h = maxy;


    };

    public getRectangle(scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay:number, mediah: number) {

        let minx = (this.x - mediax) * scalefactor;
        let miny = (mediah - this.y) * scalefactor;
        let maxx = (this.w - mediax) * scalefactor;
        let maxy = (mediah - this.h) * scalefactor;

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

    public insidePolygon(x:number, y:number, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay:number, mediah: number) {

        const polyshape = (this.shape == 3 || this.shape == 6 || this.shape == 23 || this.shape == 26);
        const closedpoly = (this.shape == 2 && this.closed);
        if (this.shape == 2) {
            //console.log('polyline');
        }

        if (!polyshape && !closedpoly) {
            this.unselect();
            return false;

        }
        /*if(this.shape != 3 && this.shape != 6 && this.shape != 23 && this.shape != 26){
            this.unselect();
            return false;
        }*/
        const mp = {
            x: x,
            y: y
        };

        let minx = (this.x - mediax) * scalefactor;
        let miny = (mediah - this.y) * scalefactor;
        let maxx = (this.w - mediax) * scalefactor;
        let maxy = (mediah - this.h) * scalefactor;

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

        //cntximg.strokeStyle = "yellow";
        //cntximg.lineWidth = 2;
        //cntximg.strokeRect(minx, miny, maxx - minx, maxy - miny);


        if ((mp.x < minx || mp.x > maxx) || (mp.y < miny || mp.y > maxy)) {
            if (!this.parent.multiselect) {
                this.unselect();
            }
            return false;
        }

        const epsilon = {
            x: minx - ((maxx - minx) / 100),
            y: maxy - ((maxy - miny) / 2)
        };

        const within = insidepolygonpoints(scalefactor, offsetx, offsety, mediax, mediay, mediah, this, mp, epsilon);
        if (within) {
            //this.toggleselect();
            return true;
            //console.log(this.blockname);
        } else {
            if (!this.parent.multiselect) {
                this.unselect();
            }
            return false;
        }


        /*var within = insidepolygonpoints(scalefactor,offsetx,offsety,mediax, mediay, mediah,this,mp,epsilon);
        if(within){
            this.select();
            return true;
            //console.log(this.blockname);
        }else{
            this.unselect();
            return false;
        }*/
        //(scalefactor,offsetx,offsety,mediax, mediay, mediah,this.points,mp,epsilon){



    };
    public findsnapPoint(x: number, y: number, scalefactor: number, offsetx: number, offsety: number, mediax: number, mediay:number, mediah: number) {

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
                    found: true,
                    x: absxscaled,
                    y: absyscaled
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
                        found: true,
                        x: relxscaled,
                        y: relyscaled
                    };
                }

            }


        }
        return {
            found: false,
            x: 0,
            y: 0
        };


    };

    public drawemeoverlay(ctx: any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, ls:number, bs:number) {
        this.drawcompare = false;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);
    };


    public drawemecompare(ctx: any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, color:number, ls:number, bs:number) {
        this.drawcompare = true;
        this.comparecolor = color;
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);

    };


    public drawme(ctx: any, scalefactor: any, offsetx: any, offsety: any, mediax: any, mediay: any, mediah: any, ls: any, bs: any, drawprint: boolean) {
        let absxscaled = (this.points[0] - mediax) * scalefactor;
        let absyscaled = (mediah - this.points[1]) * scalefactor;
        let relxscaled = 0;
        let relyscaled = 0;

        if (ls == 0 || bs == 0) {
            return;
        }

        absxscaled += offsetx;
        absyscaled += offsety;
        this.render = true;

        let minx = (this.x - mediax) * scalefactor;
        let miny = (mediah - this.y) * scalefactor;
        let maxx = (this.w - mediax) * scalefactor;
        let maxy = (mediah - this.h) * scalefactor;

        minx += offsetx;
        maxx += offsetx;
        miny += offsety;
        maxy += offsety;

        if (!this.parent.backgroundrender) {
            if ((minx < 0 && maxx < 0) || (miny < 0 && maxy < 0)) {
                this.render = false;

                return;
            }

            if ((minx > Globals.canvasowidth && maxx > Globals.canvasowidth) || (miny > Globals.canvasowidth && maxy > Globals.canvasoheight)) {
                this.render = false;

                return;
            }
        }

        /*if (DocObj.pages[DocObj.currentpage].VectorPageObj != undefined) {
            if (!DocObj.pages[DocObj.currentpage].VectorPageObj.backgroundrender) {

                if ((minx < 0 && maxx < 0) || (miny < 0 && maxy < 0)) {
                    this.render = false;
                    return;
                }

                if ((minx > canvasowidth && maxx > canvasowidth) || (miny > canvasowidth && maxy > canvasoheight)) {
                    this.render = false;
                    return;
                }

            }

        } else {
            if ((minx < 0 && maxx < 0) || (miny < 0 && maxy < 0)) {
                this.render = false;
                return;
            }

            if ((minx > canvasowidth && maxx > canvasowidth) || (miny > canvasowidth && maxy > canvasoheight)) {
                this.render = false;
                return;
            }

        }*/

        //ctx.save();

        //ctx.imageSmoothingEnabled = false;
        //ctx.restore();
        //ctx.globalCompositeOperation = 'source-over';
        if (!Globals.bKeepVectorColor) {
            if (this.filltempcolor == Globals.DocObj.backgroundColor) {
                if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                    this.filltempcolor = "#000000";
                }
                if (Globals.DocObj.backgroundColor == "#000000") {
                    this.filltempcolor = "#FFFFFF";
                }

            }

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
            this.filltempcolor = this.fillcolor;

        }

        if (drawprint && this.stroketempcolor == "#FFFFFF") {
            this.stroketempcolor = "#000000";
        }
        if (drawprint && this.filltempcolor == "#FFFFFF") {
            this.filltempcolor = "#000000";
        }

        if (this.drawcompare) {
            ctx.strokeStyle = this.comparecolor;
        } else if (this.parent.viewmode == 1) {

            ctx.strokeStyle = "black";

        } else {
            ctx.strokeStyle = this.stroketempcolor;
        }

        //console.log(this.linewidth * scalefactor);
        //console.log('path');
        //console.log(this.filled);
        //ctx.lineWidth = this.linewidth * scalefactor;
        if (this.linewidth * scalefactor < 1 && this.filled == 0) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = this.linewidth * scalefactor;
            //ctx.lineWidth = (0.5 + (this.linewidth * scalefactor)) | 0;


        }
        //ctx.lineWidth = this.linewidth * scalefactor;


        ctx.beginPath();


        //ctx.moveTo(markupobject.points[0].x, markupobject.points[0].y);
        ctx.moveTo(absxscaled, absyscaled); //convert to integer pixels.
        //ctx.moveTo(((0.5 + absxscaled) | 0), ((0.5 + absyscaled) | 0));
        /*Andriy: Unused variable var count = 0;*/
        for (let counter = 2; counter < this.points.length; counter += 2) {
            //            ctx.lineTo(markupobject.points[counter].x, markupobject.points[counter].y);
            relxscaled = ((this.points[counter] - mediax) * scalefactor);
            relyscaled = ((mediah - this.points[counter + 1]) * scalefactor);
            relxscaled += offsetx;
            relyscaled += offsety;
            //xscaled = xscaled + offsetx;
            //yscaled = yscaled + offsety;
            ctx.lineTo(relxscaled, relyscaled); //convert to integer pixels
            //ctx.lineTo(((0.5 + relxscaled) | 0), ((0.5 + relyscaled) | 0));

        }


        if (!this.gotsubpath) {

            if ((this.filled == 1 && this.parent.viewmode == 0) || this.selected || this.parent.blocklist[this.blockname].overridecolor) {
                ctx.lineWidth = 1;
                ctx.closePath();
                if (this.drawcompare) {
                    ctx.fillStyle = this.comparecolor;
                } else {
                    if (this.parent.blocklist[this.blockname].overridecolor) {
                        ctx.fillStyle = this.parent.blocklist[this.blockname].color;
                    } else if (this.selected) {
                        ctx.fillStyle = this.parent.selectColor;//"#bf3ad1";
                    } else {
                        ctx.fillStyle = this.filltempcolor;
                    }

                }

                ctx.fill();
            } else {
                //ctx.lineCap = 'round';
                //ctx.stroke();

            }
            ctx.lineCap = 'round';
            ctx.lineJoin = "round";
            ctx.stroke();

            if (!this.filled) {

            }


        } else {
            for (let scount = 0; scount < this.subpaths.length; scount++) {
                if (this.drawcompare) {
                    this.subpaths[scount].drawemecompare(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, this.comparecolor, ls, bs);
                    //this.drawemecompare (ctx,scalefactor,offsetx,offsety, mediax, mediay,mediah,color){
                } else {


                    this.subpaths[scount].drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, drawprint);
                }

            }

        }

        //ctx.clip();

        //ctx.restore();
        this.drawcompare = false;
    };
    public Close() {
        if (this.gotsubpath) {
            while (this.subpaths.length != 0) {
                this.subpaths.pop();
            }
        }
        this.points = null;

    };
}

