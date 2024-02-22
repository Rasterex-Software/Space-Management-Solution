
import {
    Globals,
    getURLPath
} from '../internal';

export class imageObject {
    public type:string;
    public blockname:string;
    public binary: boolean= false;
    public blockstate:number;
    public layerstate:number;
    public x1:any; //string|number;
    public y1:any;
    public x2:any;
    public y2:any;
    public layer:any;
    public drawmode:any;
    public selected:boolean = false;
    public image: HTMLImageElement;

    // TODO:JS->TS:CHECK recheck purpose
    public drawcompare:boolean = false;
    public comparecolor:string = '';

    constructor (xmldata:any, blockname:string, binary:boolean)
    {
        //<image x1='1908247.00' y1='1777044.00' x2='2851685.00' y2='2484622.00' type="png" encoding="base64">
        this.type = "image";
        this.blockname = blockname;
        this.blockstate = 1;
        this.layerstate = 1;

        this.x1 = xmldata.x1;
        this.y1 = xmldata.y1;
        this.x2 = xmldata.x2;
        this.y2 = xmldata.y2;

        this.layer = xmldata.layer;
        this.layerstate = xmldata.layerstate;
        this.drawmode = xmldata.drawmode;
        this.selected = false;

        var createimage = new Image();

        var cachfolder;

        if (xmldata.useref) {
            // TODO:JS->TS:FIX dependency
            cachfolder = getURLPath(Globals.DocObj.FileNameSRC);
            createimage.src = cachfolder + xmldata.image;
        } else {
            createimage.src = xmldata.image;
        }
        this.image = createimage;
        /*imageobject = {
         x1:lX1,
         y1:lY1,
         x2:lX2,
         y2:lY2,
         image : imagestr
         };*/
    }

    // TODO:JS->TS:CHECK none of the parameters are being used
    // public insidePolygon(x, y, scalefactor, offsetx, offsety, mediax, mediay, mediah){
    public insidePolygon(){
        return false;
    };

    public toggleselect(){
        this.selected = !this.selected;
    };

    // TODO:JS->TS:ADJUST
    public getRectangle(scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number){

        let minx = (this.x1 - mediax) * scalefactor;
        let miny = (mediah - this.y1) * scalefactor;
        let maxx = (this.x2 - mediax) * scalefactor;
        let maxy = (mediah - this.y2) * scalefactor;


        minx += offsetx;
        maxx += offsetx;
        miny += offsety;
        maxy += offsety;

        if (minx > maxx){
            const tempx = minx;
            minx = maxx;
            maxx = tempx;
        }
        if (miny > maxy){
            const tempy = miny;
            miny = maxy;
            maxy = tempy;
        }

        return  {
            found : true,
            x : minx,
            y : miny,
            w : maxx - minx,
            h : maxy - miny,
            wp : (maxx - minx) / 10,
            hp : (maxy - miny) / 10
        };

    };

    // TODO:JS->TS:CHECK none of the parameters are being used
    public findsnapPoint(x:number, y:number, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number) {
        return {
            found:false,
            x:0,
            y:0
        };
    };

    public drawemeoverlay(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, ls:number,bs:number){
        this.drawcompare = false; // TODO:JS->TS:CHECK recheck purpose
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah,ls,bs,false);
    };

    public drawemecompare(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number, color:string,ls:number,bs:number) {
        this.drawcompare = true; // TODO:JS->TS:CHECK recheck purpose
        this.comparecolor = color; // TODO:JS->TS:CHECK recheck purpose
        this.drawme(ctx, scalefactor, offsetx, offsety, mediax, mediay, mediah,ls,bs,false);

    };

    // TODO:JS->TS:CHECK drawprint is not used
    public drawme(ctx:any, scalefactor:number, offsetx:number, offsety:number, mediax:number, mediay:number, mediah:number,ls:number,bs:number,drawprint:any) {
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

        const height = y1scaled - y2scaled;
        const width = x2scaled - x1scaled;


        ctx.drawImage(this.image, x1scaled, y2scaled, width, height);
        //ctx.save();


    };

    public Close() {

    };

}
