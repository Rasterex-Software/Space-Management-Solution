import { Globals } from '../internal';
// TODO:JS->TS:INFO continue conversion
export class textObject {
    type: string;
    blockname: any;
    blockstate: number;
    layerstate: number;
    x1: any;
    y1: any;
    height: any;
    fontname: any;
    weight: any;
    rotation: number;
    layer: any;
    drawmode: any;
    text: any;
    strokecolor: any;
    fillcolor: any;
    stroketempcolor: any;
    filltempcolor: any;
    selected: boolean;
    insidePolygon: any;
    toggleselect: any;
    getRectangle: any;
    findsnapPoint: any;
    drawemeoverlay: any;
    drawcompare: any;
    drawme: any;
    drawemecompare: any;
    comparecolor: any;
    Close: any;

    constructor(texobject: any, fontobject:any, blockname:any) {
        var scope = this;
        this.type = "text";
        this.blockname = blockname;
        this.blockstate = 1;
        this.layerstate = 1;
        this.x1 = texobject.x1;
        this.y1 = texobject.y1;
        this.height = fontobject.height;
        this.fontname = fontobject.name;
        this.weight = fontobject.weight;
        this.rotation = -(fontobject.rotation * (Math.PI / 180));
        this.layer = texobject.layer;
        this.layerstate = texobject.layerstate;
        this.drawmode = texobject.drawmode;
        this.text = texobject.text;
        this.strokecolor = texobject.strokecolor;
        this.fillcolor = texobject.fillcolor;
        this.stroketempcolor = texobject.strokecolor;
        this.filltempcolor = texobject.fillcolor;
        this.selected = false;
        this.insidePolygon = function (x:any, y:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any) {
            return false;
        };
        this.toggleselect = function () {
            var selectstate = !scope.selected;
            scope.selected = selectstate;
        };
        this.getRectangle = function (scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any) {
            var minx = (scope.x1 - mediax) * scalefactor;
            var miny = (mediah - scope.y1) * scalefactor;
            //var maxx = (scope.x2 - mediax) * scalefactor;
            //var maxy = (mediah - scope.y2) * scalefactor;
            var height = scope.height * scalefactor;
            var maxy = miny + height;
            var maxx = minx + height;
            minx += offsetx;
            maxx += offsetx;
            miny += offsety;
            maxy += offsety;
            if (minx > maxx) {
                var tempx = minx;
                minx = maxx;
                maxx = tempx;
            }
            if (miny > maxy) {
                var tempy = miny;
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
        this.findsnapPoint = function (x:any, y:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any) {
            return {
                found: false,
                x: 0,
                y: 0
            };
        };
        this.drawemeoverlay = function (ctx:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any, ls:any, bs:any) {
            this.drawcompare = false;
            this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);
        };
        this.drawemecompare = function (ctx:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any, color:any, ls:any, bs:any) {
            this.drawcompare = true;
            this.comparecolor = color;
            this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah, ls, bs, false);
        };
        this.drawme = function (ctx:any, scalefactor:any, offsetx:any, offsety:any, mediax:any, mediay:any, mediah:any, ls:any, bs:any, drawprint:any) {
            var x1scaled = (scope.x1 - mediax) * scalefactor;
            var y1scaled = (mediah - scope.y1) * scalefactor;
            var height = scope.height * scalefactor;
            y1scaled += height;
            //var x2scaled = (this.x2-mediax) * scalefactor;
            //var y2scaled = (mediah - this.y2) * scalefactor;
            if (ls == 0 || bs == 0) {
                return;
            }
            if (!Globals.bKeepVectorColor) {
                if (scope.stroketempcolor == Globals.DocObj.backgroundColor) {
                    if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                        scope.stroketempcolor = "#000000";
                    }
                    if (Globals.DocObj.backgroundColor == "#000000") {
                        scope.stroketempcolor = "#FFFFFF";
                    }
                }
                if (scope.filltempcolor == Globals.DocObj.backgroundColor) {
                    if (Globals.DocObj.backgroundColor == "#FFFFFF") {
                        scope.filltempcolor = "#000000";
                    }
                    if (Globals.DocObj.backgroundColor == "#000000") {
                        scope.filltempcolor = "#FFFFFF";
                    }
                }
            }
            else {
                this.stroketempcolor = scope.strokecolor;
                this.filltempcolor = scope.fillcolor;
            }
            if (drawprint && scope.stroketempcolor == "#FFFFFF") {
                scope.stroketempcolor = "#000000";
            }
            if (drawprint && scope.filltempcolor == "#FFFFFF") {
                scope.filltempcolor = "#000000";
            }
            if (height < 5) {
                var fontvalue = "800 " + height + "px " + scope.fontname + ", Helvetica";
                //console.log(height);
            }
            else {
                fontvalue = "normal " + height + "px " + scope.fontname + ", Helvetica";
            }
            //ctx.font = this.weight + " " + height + "pt " +  this.fontname;
            ctx.font = fontvalue;
            if (scope.drawcompare) {
                ctx.fillStyle = scope.comparecolor;
                ctx.strokeStyle = scope.comparecolor;
            }
            else {
                ctx.fillStyle = scope.filltempcolor;
                ctx.strokeStyle = scope.stroketempcolor;
            }
            x1scaled += offsetx;
            y1scaled += offsety;
            ctx.save();
            if (scope.rotation != 0) {
                ctx.translate(x1scaled, y1scaled - height);
                ctx.rotate(scope.rotation);
                ctx.translate(-x1scaled, -(y1scaled - height));
            }
            ctx.fillText(scope.text, x1scaled, y1scaled);
            ctx.restore();
        };
        this.Close = function () {
        };
    }
}
