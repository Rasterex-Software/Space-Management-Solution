// TODO:JS->TS:INFO continue conversion
import {
    Globals,
    Rectangle,
    FontObject,
    point
} from '../internal';

export class MarkupUndoObject {
    markupnumber: any;
    type: number;
    subtype: number;
    alternative: number;
    consolidated: boolean;
    delete: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
    xscaled: number;
    yscaled: number;
    wscaled: number;
    hscaled: number;
    rotatedrect: any;
    timestamp: number;
    layer: number;
    pagenumber: number;
    layout: string;
    signature: string;
    color: string;
    transparency: number;
    fillcolor: string;
    strokecolor: string;
    textcolor: string;
    markercolor: string;
    scaling: number;
    xoffset: number;
    yoffset: number;
    scalingext: number;
    xoffsetext: number;
    yoffsetext: number;
    rotation: number;
    textrotate: number;
    dimtext: string;
    linewidth: number;
    textheight: number;
    measuretextheight: number;
    textwidth: number;
    text: string;
    font: any;
    points: any; // any[];
    pointlist: any; // any[];
    numpoints: number;
    SetUndoValues: any; // (MarkupObj: any) => void;
    display: any;
    constructor(id:any) {
        this.markupnumber = id;
        this.type = 0;
        this.subtype = 0;
        this.alternative = 0;
        this.consolidated = false;
        this.delete = false;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.xscaled = 0;
        this.yscaled = 0;
        this.wscaled = 0;
        this.hscaled = 0;
        this.rotatedrect = new Rectangle(0, 0, 0, 0);
        this.timestamp = 0;
        this.layer = 0;
        this.pagenumber = 0;
        this.layout = "Default";
        this.signature = "";
        this.color = "";
        this.transparency = 100;
        this.fillcolor = "rgba(255,0,0,1.0)";
        this.strokecolor = "rgba(255,0,0,1.0)";
        this.textcolor = "rgba(255,0,0,1.0)";
        this.markercolor = "rgba(255,0,0,1.0)";
        this.scaling = 0.0;
        this.xoffset = 0.0;
        this.yoffset = 0.0;
        this.scalingext = 0.0;
        this.xoffsetext = 0.0;
        this.yoffsetext = 0.0;
        this.rotation = 0.0;
        this.textrotate = 0;
        this.dimtext = "";
        this.linewidth = 0;
        this.textheight = 0;
        this.measuretextheight = 0;
        this.textwidth = 0;
        this.text = "";
        this.font = new FontObject("Helvetica", 24, false, false);
        //this.fontname = "";
        this.points = [];
        this.pointlist = [];
        this.numpoints = -1;
        this.SetUndoValues = function (MarkupObj:any) {
            var curpoint = 0;
            var tempx = 0;
            var tempy = 0;
            this.type = MarkupObj.type;
            this.subtype = MarkupObj.subtype;
            this.alternative = MarkupObj.alternative;
            this.consolidated = MarkupObj.consolidated;
            this.display = MarkupObj.display;
            this.x = MarkupObj.x;
            this.y = MarkupObj.y;
            this.w = MarkupObj.w;
            this.h = MarkupObj.h;
            this.xscaled = MarkupObj.xscaled;
            this.yscaled = MarkupObj.yscaled;
            this.wscaled = MarkupObj.wscaled;
            this.hscaled = MarkupObj.hscaled;
            this.rotatedrect = MarkupObj.rotatedrect;
            this.timestamp = MarkupObj.timestamp;
            this.layer = MarkupObj.layer;
            this.pagenumber = MarkupObj.pagenumber;
            this.layout = MarkupObj.layout;
            this.signature = MarkupObj.signature;
            this.color = MarkupObj.color;
            this.transparency = MarkupObj.transparency;
            this.fillcolor = MarkupObj.fillcolor;
            this.strokecolor = MarkupObj.strokecolor;
            this.textcolor = MarkupObj.textcolor;
            this.markercolor = MarkupObj.markercolor;
            this.scaling = MarkupObj.scaling;
            this.xoffset = MarkupObj.xoffset;
            this.yoffset = MarkupObj.yoffset;
            this.scalingext = MarkupObj.scalingext;
            this.xoffsetext = MarkupObj.xoffsetext;
            this.yoffsetext = MarkupObj.yoffsetext;
            this.rotation = MarkupObj.rotation;
            this.textrotate = MarkupObj.textrotate;
            this.dimtext = MarkupObj.dimtext;
            this.linewidth = MarkupObj.linewidth;
            this.textheight = MarkupObj.textheight;
            this.measuretextheight = MarkupObj.measuretextheight;
            this.textwidth = MarkupObj.textwidth;
            this.text = MarkupObj.text;
            this.font = MarkupObj.font;
            //this.fontname = MarkupObj.fontname;
            for (curpoint = 0; curpoint < MarkupObj.points.length; curpoint++) {
                this.points[curpoint] = new point(MarkupObj.points[curpoint].x, MarkupObj.points[curpoint].y);
            }
            this.numpoints = this.points.length - 1;
            for (var i = 0; i < MarkupObj.pointlist.length; i++) {
                this.pointlist[i] = [];
                for (var j = 0; j < MarkupObj.pointlist[i].length; j++) {
                    this.pointlist[i][j] = new point(MarkupObj.pointlist[i][j].x, MarkupObj.pointlist[i][j].y);
                }
            }
        };
    }
}
