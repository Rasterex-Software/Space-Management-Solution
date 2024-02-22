import { ComparePrintObject } from './ComparePrintObject';
import {
    Globals,
    RxCore_GUI_State,
    RxCore_GUI_Page,
    RxCore_GUI_CompareAlign,
    set_tool,
    DeactivateAll,
    RxCore_GUI_CompareDiag,
    rotate_pointrad,
    rotate_point,
    RxCore_setActiveFile
} from '../internal';
export class CompareObject {
    printing: boolean;
    printref: any;
    pages: any[];
    fileindex: number;
    scaleindex: number;
    bActive: boolean;
    Type: string;
    compareMode: number;
    bisdvector: any;
    oisvector: any;
    bisimage: boolean;
    oisimage: boolean;
    bispdf: any;
    oispdf: any;
    currentpage: any;
    currentDocPage: any;
    backgroundColor: any;
    overlayColor: any;
    scaleratio: number;
    scaleratioextent: number;
    backgroundMScale: number;
    backgroundMScaleext: number;
    backgroundCScale: number;
    backgroundScale: number;
    fgdrawangle: number;
    bnudgeangleused: boolean;
    originalpdfpagescale: number;
    originalpdfscale: number;
    bgpageheight: number;
    bgpagewidth: number;
    backgroundWidth: any;
    backgroundHeigth: any;
    backgroundOffsetX: number;
    backgroundOffsetY: number;
    backgroundAlOffsetX: number;
    backgroundAlOffsetY: number;
    backgroundAlOffsetXext: number;
    backgroundAlOffsetYext: number;
    backgroundOffset: number;
    overlayMScale: number;
    overlayMScaleext: number;
    overlayCScale: number;
    overlayScale: number;
    nudgeScalefactor: number;
    ovpageheight: number;
    ovpagewidth: number;
    overlayWidth: any;
    overlayHeigth: any;
    overlayOffsetX: number;
    overlayOffsetY: number;
    overlayAlOffsetX: number;
    overlayAlOffsetY: number;
    overlayAlOffsetXunscaled: number;
    overlayAlOffsetYunscaled: number;
    OffsetX: number;
    OffsetY: number;
    AlignOffsetBackup: { x: number; y: number; bgcanvwidth: any; };
    overlayOffset: number;
    bendy: any;
    bstarty: any;
    bendx: any;
    bstartx: any;
    oendy: any;
    ostarty: any;
    oendx: any;
    ostartx: any;
    backgroundAlOffsetXunscaled: any;
    backgroundAlOffsetYunscaled: any;
    isActiveDoc: boolean;
    ovpagecanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    ovpagectx: any;
    bgpagecanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    bgpagectx: any;
    bbginverted: boolean;
    bovinverted: boolean;

    constructor(pageobjectb: any, pageobjecto: any) {
        this.bovinverted = false;
        this.bbginverted = false;

        this.printing = false;
        this.printref = {};
        this.pages = [];
        this.fileindex = 0;
        this.scaleindex = 0;
        this.bActive = true;
        this.Type = 'Compare';


        this.compareMode = 0;
        //this.overlayPage = pageobjecto;
        //this.backgroundPage = pageobjectb;

        this.pages[0] = pageobjectb;
        this.pages[1] = pageobjecto;

        this.pages[0].backupScaleAndOffset();
        this.pages[1].backupScaleAndOffset();

        this.pages[1].DocRef.Drawmarkup = false;
        this.pages[0].DocRef.Drawmarkup = false;


        this.pages[0].usedincomposite = true;
        this.pages[0].compositereference = this;
        this.pages[0].isbackground = true;
        this.pages[0].isoverlay = false;


        this.pages[1].usedincomposite = true;
        this.pages[1].compositereference = this;
        this.pages[1].isbackground = false;
        this.pages[1].isoverlay = true;


        this.bisdvector = pageobjectb.usevectorxml;
        this.oisvector = pageobjecto.usevectorxml;

        this.bisimage = !pageobjectb.usevectorxml && !pageobjectb.usepdfjs;
        this.oisimage = !pageobjecto.usevectorxml && !pageobjecto.usepdfjs;


        this.bisdvector = (pageobjectb.VectorPageObj != undefined);
        this.oisvector = (pageobjecto.VectorPageObj != undefined);

        this.bispdf = pageobjectb.usepdfjs;
        this.oispdf = pageobjecto.usepdfjs;


        this.currentpage = pageobjecto.pagenumber;
        this.currentDocPage = pageobjecto.DocRef.currentpage;


        this.backgroundColor = Globals.overlayBGColor;
        this.overlayColor = Globals.overlayFGColor;

        //future

        this.scaleratio = 1;
        this.scaleratioextent = 1;
        this.backgroundMScale = 1;
        this.backgroundMScaleext = 1;
        this.backgroundCScale = 1;
        this.backgroundScale = 1;
        this.fgdrawangle = 0;
        this.bnudgeangleused = false;

        this.originalpdfpagescale = 1;
        this.originalpdfscale = 1;


        this.bgpageheight = pageobjectb.endy - pageobjectb.starty;
        this.bgpagewidth = pageobjectb.endx - pageobjectb.startx;

        this.backgroundWidth = this.bgpagewidth;
        this.backgroundHeigth = this.bgpageheight;


        this.backgroundOffsetX = 0;
        this.backgroundOffsetY = 0;
        this.backgroundAlOffsetX = 0;
        this.backgroundAlOffsetY = 0;

        this.backgroundAlOffsetXext = 0;
        this.backgroundAlOffsetYext = 0;

        this.backgroundOffset = 0;

        this.overlayMScale = 1;
        this.overlayMScaleext = 1;
        this.overlayCScale = 1;
        this.overlayScale = 1;
        this.nudgeScalefactor = 0;

        this.ovpageheight = pageobjecto.endy - pageobjecto.starty;
        this.ovpagewidth = pageobjecto.endx - pageobjecto.startx;

        this.overlayWidth = this.bgpagewidth;
        this.overlayHeigth = this.bgpageheight;

        this.overlayOffsetX = 0;
        this.overlayOffsetY = 0;

        this.overlayAlOffsetX = 0;
        this.overlayAlOffsetY = 0;

        this.overlayAlOffsetXunscaled = 0;
        this.overlayAlOffsetYunscaled = 0;

        this.OffsetX = 0;
        this.OffsetY = 0;
        this.AlignOffsetBackup = { x: 0, y: 0, bgcanvwidth: this.bgpagewidth };


        this.overlayOffset = 0;

        // TODO:JS->TS:INFO add new internal properties since pageobjectb is referenced into object methods
        this.bendy = pageobjectb.endy;
        this.bstarty = pageobjectb.starty;
        this.bendx = pageobjectb.endx;
        this.bstartx = pageobjectb.startx;
        this.oendy = pageobjecto.endy;
        this.ostarty = pageobjecto.starty;
        this.oendx = pageobjecto.endx;
        this.ostartx = pageobjecto.startx;

        // TODO:JS->TS:CHECK this was added from the middle of the object, check implications
        this.initialScale();
        this.isActiveDoc = true;
    }

    public resetCompare() {
        this.scaleratio = 1;
        this.scaleratioextent = 1;
        this.backgroundMScale = 1;
        this.backgroundMScaleext = 1;
        this.backgroundCScale = 1;
        this.backgroundScale = 1;
        this.fgdrawangle = 0;

        this.originalpdfpagescale = 1;
        this.originalpdfscale = 1;


        this.bgpageheight = this.bendy - this.bstarty;
        this.bgpagewidth = this.bendx - this.bstartx;

        this.backgroundWidth = this.bgpagewidth;
        this.backgroundHeigth = this.bgpageheight;


        this.backgroundOffsetX = 0;
        this.backgroundOffsetY = 0;
        this.backgroundAlOffsetX = 0;
        this.backgroundAlOffsetY = 0;

        this.backgroundAlOffsetXext = 0;
        this.backgroundAlOffsetYext = 0;

        this.backgroundOffset = 0;

        this.overlayMScale = 1;
        this.overlayMScaleext = 1;
        this.overlayCScale = 1;
        this.overlayScale = 1;
        this.nudgeScalefactor = 0;

        this.ovpageheight = this.oendy - this.ostarty;
        this.ovpagewidth = this.oendx - this.ostartx;

        this.overlayWidth = this.bgpagewidth;
        this.overlayHeigth = this.bgpageheight;

        this.overlayOffsetX = 0;
        this.overlayOffsetY = 0;

        this.overlayAlOffsetX = 0;
        this.overlayAlOffsetY = 0;

        this.overlayAlOffsetXunscaled = 0;
        this.overlayAlOffsetYunscaled = 0;

        this.backgroundAlOffsetXunscaled = 0;
        this.backgroundAlOffsetYunscaled = 0;


        this.OffsetX = 0;
        this.OffsetY = 0;


        this.overlayOffset = 0;

        this.initialScale();

        this.renderPDFscale();
        this.scaleToBackground(true);
    }

    public initialScale() {
        //calculate initial scaleratio. I.E difference between background and overlay.
        if (this.bisimage) {

            this.originalpdfpagescale = this.pages[0].curpagescale;
            this.originalpdfscale = this.pages[0].dscalepdf;

            if (this.oispdf) {

                this.ovpagecanvas = document.createElement('canvas');
                this.ovpagecanvas.width = this.pages[1].pagecanvas.width;
                this.ovpagecanvas.height = this.pages[1].pagecanvas.height;
                this.ovpagectx = this.ovpagecanvas.getContext('2d');


                this.ovpageheight = this.pages[1].pdfpageheight;
                this.ovpagewidth = this.pages[1].pdfpagewidth;

                this.overlayScale = this.pages[1].getdscale();
                this.overlayOffsetX = this.pages[1].getdx();
                this.overlayOffsetY = this.pages[1].getdy();

            } else if (this.oisimage) {

                this.overlayScale = this.pages[1].dscale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;
                this.overlayCScale = this.overlayScale * this.scaleratio;



            } else if (this.oisvector) {

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayOffsetX = this.pages[1].dxvector;
                this.overlayOffsetY = this.pages[1].dyvector;
                this.overlayCScale = this.overlayScale * this.scaleratio;

            }
            this.backgroundScale = this.pages[0].dscale;
            this.backgroundOffsetX = this.pages[0].dx;
            this.backgroundOffsetY = this.pages[0].dy;

        }
        if (this.bispdf) {
            this.bgpagecanvas = document.createElement('canvas');
            this.bgpagecanvas.width = this.pages[0].pagecanvas.width;
            //console.log(this.bgpagecanvas.width);
            this.bgpagecanvas.height = this.pages[0].pagecanvas.height;
            this.bgpagectx = this.bgpagecanvas.getContext('2d');


            this.bgpagewidth = this.pages[0].pdfpagewidth;
            this.bgpageheight = this.pages[0].pdfpageheight;

            this.backgroundScale = this.pages[0].dscalepdf;


            this.backgroundOffsetX = this.pages[0].getdx();
            this.backgroundOffsetY = this.pages[0].getdy();


            if (this.oispdf) {
                this.ovpagecanvas = document.createElement('canvas');
                this.ovpagecanvas.width = this.pages[1].pagecanvas.width;
                this.ovpagecanvas.height = this.pages[1].pagecanvas.height;
                this.ovpagectx = this.ovpagecanvas.getContext('2d');


                this.ovpageheight = this.pages[1].pdfpageheight;
                this.ovpagewidth = this.pages[1].pdfpagewidth;

                this.overlayScale = this.pages[1].getdscale();
                this.overlayOffsetX = this.pages[1].getdx();
                this.overlayOffsetY = this.pages[1].getdy();

            } else if (this.oisimage) {

                this.overlayScale = this.pages[1].dscale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;


                this.overlayCScale = this.overlayScale * this.scaleratio;

            } else if (this.oisvector) {
                this.overlayOffsetX = this.backgroundOffsetX;
                this.overlayOffsetY = this.backgroundOffsetY;
                this.overlayCScale = 1;

            }
        }
        if (this.bisdvector) {

            if (this.oispdf) {
                this.ovpagecanvas = document.createElement('canvas');
                this.ovpagecanvas.width = this.pages[1].pagecanvas.width;
                this.ovpagecanvas.height = this.pages[1].pagecanvas.height;
                this.ovpagectx = this.ovpagecanvas.getContext('2d');

                this.ovpageheight = this.pages[1].pdfpageheight;
                this.ovpagewidth = this.pages[1].pdfpagewidth;

                this.overlayScale = this.pages[1].getdscale();
                this.overlayOffsetX = this.pages[1].getdx();
                this.overlayOffsetY = this.pages[1].getdy();


            } else if (this.oisimage) {


                this.overlayScale = this.pages[1].dscale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;
                this.overlayCScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / (this.pages[0].VectorPageObj.width);

            } else if (this.oisvector) {

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayOffsetX = this.pages[1].dxvector;
                this.overlayOffsetY = this.pages[1].dyvector;
                this.overlayCScale = this.overlayScale * this.scaleratio;

            }

            this.backgroundScale = this.pages[0].dscalevector;
            this.backgroundOffsetX = this.pages[0].dxvector;
            this.backgroundOffsetY = this.pages[0].dyvector;


        }
    }

    // TODO:JS->TS:CHECK this was commented and added to constructor
    // this.initialScale();
    // this.isActiveDoc = true;

    public print(PrintpgURL: string) {
        this.printref = new ComparePrintObject(this);
        this.printref.printobj.setRes(300);
        //this.printref.printobj.setPaperSize(paper.width,paper.height);
        this.printref.getpaperscale();

        this.printref.printobj.setScale();
        this.printref.printobj.print(PrintpgURL);
    }

    public printClose() {
        if (this.printing) {
            this.printref.printobj.paperwidth = 1;
            this.printref.printobj.paperheight = 1;
            this.printref = {};
            this.printing = false;
        }


    }

    public getoverlayOffsets(zoomtype: number) {
        const compositeend = this.getwidthheight();

        //var compwidthHalf = compositeend.x / 2;
        //var compheighthHalf = compositeend.y / 2;

        let totaloffsetx = this.pages[1].dxpdf;
        let totaloffsety = this.pages[1].dypdf;


        if (zoomtype == 0) {



            totaloffsetx = (Globals.canvasowidth - (compositeend.x * this.pages[1].dscalepdf)) / 2;
            totaloffsety = (Globals.canvasoheight - (compositeend.y * this.pages[1].dscalepdf)) / 2;

            //this.overlayOffsetX = totaloffsetx - this.OffsetX;
            //this.overlayOffsetY = totaloffsety - this.OffsetY;
        } else if (zoomtype == 1) {



            totaloffsetx = (Globals.canvasowidth - (compositeend.x * this.pages[1].dscalepdf)) / 2;
            totaloffsety = (Globals.canvasoheight - (compositeend.y * this.pages[1].dscalepdf)) / 2;

        }

        return {
            x: totaloffsetx,
            y: totaloffsety
        }
    }

    public getoverlayScaleFactor(zoomtype: number) {

        let bgScalefactor = this.pages[1].dscalepdf;
        //added calculation of total composite extent.
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        const compositestartx = Math.min(ovrlOffsetX, this.overlayOffsetX);
        const compositestarty = Math.min(ovrlOffsetY, this.overlayOffsetY);
        const compositeend = this.getwidthheight();

        const zoomwidth = this.ovpagecanvas.width * this.pages[1].dscalepdf;
        const zoomheight = this.ovpagecanvas.height * this.pages[1].dscalepdf;

        //console.log(zoomtype);

        if (zoomtype == 3 || zoomtype == 4 || zoomtype == 5 || zoomtype == 6) {
            //var totaloffsetx = ((canvasowidth - compositeend.x) / 2);
            //var totaloffsety = ((canvasoheight - compositeend.y) / 2);

            //this.overlayOffsetX = totaloffsetx - this.OffsetX;
            //this.overlayOffsetY = totaloffsety - this.OffsetY;

            var zoomscale = compositeend.x / zoomwidth;
            if (zoomscale != 0) {
                bgScalefactor = 1 / zoomscale;
            }
            //this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / this.bgpagecanvas.width;
            //this.overlayScale = this.pages[1].dscalepdf;
            //this.overlayCScale = this.backgroundScale;// * this.scaleratio;

            /*if(this.OffsetX != 0){
                this.OffsetX /= zoomscale;
            }
            if(this.OffsetY != 0){
                this.OffsetY /= zoomscale;
            }*/
            //this.renderPDFscale();
            //this.pages[0].pdfisrendered = false;
            //this.pages[1].pdfisrendered = false;

        }


        return bgScalefactor;
    }

    public offsetScaling(bgwidth: number, ovwidth: number) {
        let pdfbackgroundscale = bgwidth / this.pages[0].pdfpagewidth;
        pdfbackgroundscale *= this.overlayCScale;

        const backgroundAlOffsetX = this.backgroundAlOffsetXunscaled * pdfbackgroundscale;
        const backgroundAlOffsetY = this.backgroundAlOffsetYunscaled * pdfbackgroundscale;

        const pdfoverlayscale = ovwidth / this.pages[1].pdfpagewidth;

        const overlayAlOffsetX = (this.overlayAlOffsetXunscaled * pdfoverlayscale);
        const overlayAlOffsetY = (this.overlayAlOffsetYunscaled * pdfoverlayscale);

        //x : -((overlayAlOffsetX) - (backgroundAlOffsetX*this.scaleratio)),
        //y : -((overlayAlOffsetY) - (backgroundAlOffsetY*this.scaleratio))

        return {
            x: -((overlayAlOffsetX) - (backgroundAlOffsetX)),
            y: -((overlayAlOffsetY) - (backgroundAlOffsetY))
        }

    }

    public scaleToBackground(scalechanged: boolean) {


        if (this.OffsetX != 0) {
            this.OffsetX /= this.overlayScale;
        }
        if (this.OffsetY != 0) {
            this.OffsetY /= this.overlayScale;
        }

        /*var ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        var ovrlOffsetY = this.overlayOffsetY + this.OffsetY;


        var compositestartx = Math.min(ovrlOffsetX, this.overlayOffsetX);
        var compositestarty = Math.min(ovrlOffsetY, this.overlayOffsetY);
        var compositeend = this.getwidthheight();*/


        if (this.bispdf) {


            if (this.oispdf) {


                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / this.bgpagecanvas.width;

                this.backgroundScale *= this.scaleratio;

                this.overlayScale = this.pages[1].dscalepdf;

                this.overlayCScale = this.backgroundScale;// * this.scaleratio;


                this.overlayOffsetX = this.pages[1].dxpdf;
                this.overlayOffsetY = this.pages[1].dypdf;

                //this.AlignOffsetBackup.x = this.OffsetX;
                //this.AlignOffsetBackup.y = this.OffsetY;
                //this.AlignOffsetBackup.scale = this.scaleratio;

                //var bgratio = this.bgpagecanvas.width / this.AlignOffsetBackup.bgcanvwidth;
                //bgratio /= this.scaleratio;

                const scaledoffsets = this.offsetScaling(this.bgpagecanvas.width, this.ovpagecanvas.width);
                let tenpercent: number;
                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                    const diffx = this.OffsetX - scaledoffsets.x;
                    tenpercent = 0.2 * this.OffsetX;
                    if (Math.abs(diffx) < Math.abs(tenpercent)) {
                        this.OffsetX = scaledoffsets.x;
                    }

                    //console.log('newcalcX',scaledoffsets.x);
                    //console.log('OffsetX',this.OffsetX);


                }

                if (this.OffsetY != 0) {

                    this.OffsetY *= this.overlayScale;
                    const diffy = this.OffsetY - scaledoffsets.y;
                    tenpercent = 0.2 * this.OffsetY;

                    if (Math.abs(diffy) < Math.abs(tenpercent)) {
                        this.OffsetY = scaledoffsets.y;
                    }
                    //bgratio /= this.scaleratio;
                    //this.OffsetY = scaledoffsets.y;
                    //console.log('newcalcY',scaledoffsets.y);
                    //console.log('OffsetY',this.OffsetY);
                    //this.OffsetY = scaledoffsets.y;
                }

                if (this.OffsetX < 0) {
                    this.overlayOffsetX += Math.abs(this.OffsetX);

                }

                if (this.OffsetY < 0) {
                    this.overlayOffsetY += Math.abs(this.OffsetY);

                }

                this.pages[0].pdfisrendered = !scalechanged;
                this.pages[1].pdfisrendered = !scalechanged;

                this.draw_compare(scalechanged);


            } else if (this.oisimage) {
                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / this.bgpagecanvas.width;
                this.backgroundScale *= this.scaleratio;
                this.overlayScale = this.pages[1].dscale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }



                this.overlayCScale = this.backgroundScale;


                this.pages[0].pdfisrendered = !scalechanged;
                this.draw_compare(scalechanged);

                if (!scalechanged) {

                }



            } else if (this.oisvector) {

                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / this.bgpagecanvas.width;
                this.backgroundScale *= this.scaleratio;

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayOffsetX = this.pages[1].dxvector;
                this.overlayOffsetY = this.pages[1].dyvector;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.overlayCScale = this.backgroundScale;// * this.scaleratio;


                this.pages[0].pdfisrendered = !scalechanged;

                this.draw_compare(scalechanged);

                if (!scalechanged) {

                }

            }
        }

        if (this.bisimage) {

            this.pages[0].checkimageswitch();

            if (this.oispdf) {
                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;



                this.overlayCScale = this.backgroundScale;

                this.overlayScale = this.pages[1].dscalepdf;
                this.overlayOffsetX = this.pages[1].dxpdf;
                this.overlayOffsetY = this.pages[1].dypdf;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }



                this.pages[1].pdfisrendered = !scalechanged;

                if (!scalechanged) {
                    this.draw_compare(scalechanged);
                }


            } else if (this.oisimage) {

                this.pages[0].currentimage = this.pages[1].currentimage;
                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;

                this.backgroundWidth = this.pages[0].MainImageWidth * this.backgroundScale;
                this.backgroundHeigth = this.pages[0].MainImageHeight * this.backgroundScale;


                this.overlayScale = this.pages[1].dscale;

                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.draw_compare(scalechanged);

            } else if (this.oisvector) {
                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = this.pages[1].dxvector;
                this.overlayOffsetY = this.pages[1].dyvector;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.draw_compare(scalechanged);
            }

        }

        if (this.bisdvector) {


            if (this.oispdf) {
                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;


                this.overlayScale = this.pages[1].dscalepdf;
                this.overlayCScale = this.backgroundScale;

                this.overlayOffsetX = this.pages[1].dxpdf;
                this.overlayOffsetY = this.pages[1].dypdf;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.pages[1].pdfisrendered = !scalechanged;


                if (!scalechanged) {
                    this.draw_compare(scalechanged);
                }


            } else if (this.oisimage) {

                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;
                this.overlayScale = this.pages[1].dscale;
                this.overlayOffsetX = this.pages[1].dx;
                this.overlayOffsetY = this.pages[1].dy;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.overlayCScale = this.backgroundScale;

                this.draw_compare(scalechanged);


            } else if (this.oisvector) {
                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;
                this.overlayScale = this.pages[1].dscalevector;

                this.backgroundWidth = this.pages[0].VectorPageObj.width * this.backgroundScale;
                this.backgroundHeigth = this.pages[0].VectorPageObj.height * this.backgroundScale;


                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = this.pages[1].dxvector;
                this.overlayOffsetY = this.pages[1].dyvector;

                if (this.OffsetX != 0) {
                    this.OffsetX *= this.overlayScale;
                }

                if (this.OffsetY != 0) {
                    this.OffsetY *= this.overlayScale;
                }


                this.draw_compare(scalechanged);
            }

        }


    }

    //OpenFiles[OpenFiles.length-2].Drawmarkup = false;
    //OpenFiles[OpenFiles.length-1].Drawmarkup = false;

    public invertpdf() {
        if (this.compareMode == 0) {
            if (this.bispdf) {
                this.pages[0].invertpdf(1);
                this.bbginverted = true;

            }

            if (this.oispdf) {
                this.pages[1].invertpdf(2);
                this.bovinverted = true;
            }

        } else {
            if (this.bispdf) {
                this.pages[0].transparentpdf(1);
                this.bbginverted = true;
            }

            if (this.oispdf) {
                this.pages[1].transparentpdf(2);
                this.bovinverted = true;
            }

        }

        if (this.bispdf && this.oispdf) {
            if (this.bbginverted && this.bovinverted) {
                this.draw_compare(true);
                this.bbginverted = false;
                this.bovinverted = false;
            }

        } else {
            this.draw_compare(true);
        }

        this.scaleToBackground(false);

    }

    public invertimages() {

        if (this.compareMode == 0) {
            if (this.bisimage) {
                this.pages[0].invert(1);
            }
            if (this.oisimage) {
                this.pages[1].invert(2);
            }

        } else {
            if (this.bisimage) {
                this.pages[0].transparentimage(1);
            }
            if (this.oisimage) {
                this.pages[1].transparentimage(2);
            }

        }

    }


    public SetActive() {

        //setSmoothingEnabled(false);
        Globals.documentcompare = true;
        this.isActiveDoc = true;
        this.bActive = true;

        this.pages[0].backupScaleAndOffset();
        this.pages[1].backupScaleAndOffset();

        this.pages[1].DocRef.Drawmarkup = false;
        this.pages[0].DocRef.Drawmarkup = false;

        this.pages[0].usedincomposite = true;
        this.pages[1].usedincomposite = true;

        this.pages[0].isbackground = true;
        this.pages[0].isoverlay = false;

        this.pages[1].isbackground = false;
        this.pages[1].isoverlay = true;

        if (this.pages[0].VectorPageObj != undefined) {
            this.pages[0].VectorPageObj.docompare = true;
        }

        if (this.pages[1].VectorPageObj != undefined) {
            this.pages[1].VectorPageObj.docompare = true;
        }
        //this.disableMenu = true;

        this.invertimages();
        this.invertpdf();
        /*if(this.bisimage){
            this.pages[0].invert(1);
        }
        if(this.oisimage){
            this.pages[1].invert(2);
        }*/


        Globals.DocObj = Globals.OpenFiles[this.pages[1].DocRef.fileindex];
        Globals.DocObj.SetActive(this);

        this.draw_compare(true);
        //console.log('setactive');

        const stateobj = {
            iscompare: Globals.documentcompare,
            numOpenFiles: Globals.OpenFiles.length,
            isPDF: Globals.DocObj.pages[Globals.DocObj.currentpage].usepdfjs,
            is3D: Globals.DocObj.pages[Globals.DocObj.currentpage].usevector3Dxml,
            is2D: Globals.DocObj.pages[Globals.DocObj.currentpage].usevectorxml,
            numpages: Globals.DocObj.pages.length,
            currentpage: Globals.DocObj.getcurPage(),
            disableMenu: true
        };

        if (RxCore_GUI_State != undefined) {
            RxCore_GUI_State.setGUIState(stateobj);
        }

        const pagingobject = {
            numpages: Globals.DocObj.pages.length,
            currentpage: Globals.DocObj.getcurPage()
        };

        if (RxCore_GUI_Page != undefined) {
            RxCore_GUI_Page.pageEvent(pagingobject);
        }


    }

    public Suspend() {
        this.isActiveDoc = false;
        if (this.pages[0].VectorPageObj == undefined) {
            this.pages[0].VectorPageObj.docompare = false;
        }

        if (this.pages[1].VectorPageObj == undefined) {
            this.pages[1].VectorPageObj.docompare = false;
        }

        if (this.bisimage) {
            this.pages[0].resetimage();
        }
        if (this.oisimage) {
            this.pages[1].resetimage();
        }


    }

    public Close() {
        this.pages[1].DocRef.Drawmarkup = true;
        this.pages[0].DocRef.Drawmarkup = true;

        this.pages[0].usedincomposite = false;
        this.pages[0].compositereference = undefined;
        this.pages[0].isbackground = false;
        this.pages[0].isoverlay = false;

        if (this.pages[0].VectorPageObj != undefined) {
            this.pages[0].VectorPageObj.docompare = false;
        }

        this.pages[1].usedincomposite = false;
        this.pages[1].compositereference = undefined;
        this.pages[1].isbackground = false;
        this.pages[1].isoverlay = false;
        if (this.pages[1].VectorPageObj != undefined) {
            this.pages[1].VectorPageObj.docompare = false;
        }

        if (this.bisimage) {
            this.pages[0].resetimage();
        }
        if (this.oisimage) {
            this.pages[1].resetimage();
        }

        this.isActiveDoc = false;

    }

    public setdistance(dist: number, offset: { x: number; y: number; }, pwidth: number) {
        this.nudgeScale(2);

        let pdfscale:any;
        if (this.scaleindex == 0) {

            this.backgroundMScale = dist / pwidth;
            this.overlayAlOffsetXunscaled = offset.x;
            this.overlayAlOffsetYunscaled = offset.y;


            if (this.bispdf) {
                pdfscale = this.bgpagecanvas.width / this.pages[0].pdfpagewidth;
                this.backgroundAlOffsetX = offset.x * pdfscale;
                this.backgroundAlOffsetY = offset.y * pdfscale;

            } else {
                this.backgroundAlOffsetX = offset.x * this.backgroundScale;
                this.backgroundAlOffsetY = offset.y * this.backgroundScale;

            }


            if (RxCore_GUI_CompareAlign != undefined) {
                RxCore_GUI_CompareAlign.AlignComplete(1);
            }

            this.scaleindex = 1;

            this.pages[this.scaleindex].usedincomposite = false;
            RxCore_setActiveFile(this.pages[this.scaleindex].DocRef.fileindex);
            this.pages[this.scaleindex].enableSnap(true);
            set_tool('overlayscale', { p1: this });
            //tool = new tools['overlayscale'](this);


        } else {
            if (this.oispdf) {
                pdfscale = this.ovpagecanvas.width / this.pages[1].pdfpagewidth;
                this.overlayAlOffsetX = offset.x * pdfscale;
                this.overlayAlOffsetY = offset.y * pdfscale;

            } else {
                this.overlayAlOffsetX = offset.x * this.overlayScale;
                this.overlayAlOffsetY = offset.y * this.overlayScale;

            }

            this.overlayMScale = (dist / pwidth) / this.backgroundMScale;

            if (this.oisimage) {

                this.scaleratio = this.overlayMScale;

            } else {
                this.scaleratio = this.overlayMScale;
            }

            if (RxCore_GUI_CompareAlign != undefined) {
                RxCore_GUI_CompareAlign.AlignComplete(2);
            }


            this.OffsetX = -((this.overlayAlOffsetX) - (this.backgroundAlOffsetX * this.scaleratio));
            this.OffsetY = -((this.overlayAlOffsetY) - (this.backgroundAlOffsetY * this.scaleratio));


            this.pages[0].usedincomposite = true;
            this.pages[1].usedincomposite = true;
            DeactivateAll();
            this.SetActive();
            this.scaleindex = 0;
            set_tool('markupedit', {});

            this.scaleToBackground(true);


        }


    }



    public setColors(bgColor: string, fgColor: string) {
        this.backgroundColor = bgColor;
        this.overlayColor = fgColor;
        this.invertimages();
        this.draw_compare(true);

        if (RxCore_GUI_CompareDiag != undefined) {
            RxCore_GUI_CompareDiag.CompareDialog();
        }


    }

    public getColors() {

        return {
            bg: this.backgroundColor,
            fg: this.overlayColor
        };


    }



    public setcomparescale(scalearray: any) {

        this.nudgeScale(2);
        this.resetCompare();
        //this.OffsetX = 0;
        //this.OffsetY = 0;

        //this.initialScale();
        //this.renderPDFscale();

        //this.scaleToBackground(true);

        //var curScopeoffsetX = this.OffsetX;
        //var curScopeoffsetY = this.OffsetY;

        let bgangle: any;
        let fgangle: any;
        let pdfscale: any;
        for (let i = 0; i < scalearray.length; i++) {

            if (i == 0) {
                bgangle = scalearray[i].angle;

                this.backgroundMScale = scalearray[i].dist / scalearray[i].pwidth;

                if (this.bispdf) {
                    pdfscale = this.bgpagecanvas.width / this.pages[0].pdfpagewidth;
                    //var pdfscale = this.bgpagecanvas.width / scalearray[i].pwidth;

                    pdfscale *= this.overlayCScale;
                    this.backgroundAlOffsetX = scalearray[i].offset.x * pdfscale;
                    this.backgroundAlOffsetY = scalearray[i].offset.y * pdfscale;

                    this.backgroundAlOffsetXunscaled = scalearray[i].offset.x;
                    this.backgroundAlOffsetYunscaled = scalearray[i].offset.y;


                    //this.backgroundAlOffsetX /= this.scaleratio;
                    //this.backgroundAlOffsetY /= this.scaleratio;


                    /*context.lineWidth = 3;
                    context.strokeStyle = 'red';
                    context.strokeRect(scalearray[i].offset.x - 10, scalearray[i].offset.y - 10, 20, 20);*/

                    // TODO:JS->TS:CHECK netx 4 variables are not used
                    const bovroffsetx = this.backgroundAlOffsetX + this.overlayOffsetX;
                    const bovroffsety = this.backgroundAlOffsetY + this.overlayOffsetY;

                    const snsbovroffsetx = this.backgroundAlOffsetX;
                    const snsbovroffsety = this.backgroundAlOffsetY;


                    //var centerx = (this.bgpagecanvas.width * 0.5) + this.overlayOffsetX;
                    //var centery = (this.bgpagecanvas.height * 0.5) + this.overlayOffsetY;

                    /*context.lineWidth = 3;
                    context.strokeStyle = 'blue';
                    context.strokeRect(bovroffsetx - 10, bovroffsety - 10, 20, 20);

                    context.lineWidth = 3;
                    context.strokeStyle = 'yellow';
                    context.strokeRect(this.overlayOffsetX - 10, this.overlayOffsetY - 10, 20, 20);*/




                } else {
                    this.backgroundAlOffsetX = scalearray[i].offset.x * this.backgroundScale;
                    this.backgroundAlOffsetY = scalearray[i].offset.y * this.backgroundScale;

                }

            } else {
                fgangle = scalearray[i].angle;

                this.overlayAlOffsetXunscaled = scalearray[i].offset.x;
                this.overlayAlOffsetYunscaled = scalearray[i].offset.y;

                this.overlayMScale = (scalearray[i].dist / scalearray[i].pwidth) / this.backgroundMScale;

                let boffsetnewscalex = this.backgroundAlOffsetX * this.overlayMScale;
                let boffsetnewscaley = this.backgroundAlOffsetY * this.overlayMScale;
                boffsetnewscalex += this.overlayOffsetX;
                boffsetnewscaley += this.overlayOffsetY;



                if (this.oispdf) {

                    /*context.lineWidth = 3;
                    context.strokeStyle = 'black';
                    context.strokeRect(boffsetnewscalex - 10, boffsetnewscaley - 10, 20, 20);*/

                    pdfscale = this.ovpagecanvas.width / this.pages[1].pdfpagewidth;



                    /*context.lineWidth = 3;
                    context.strokeStyle = 'red';
                    context.strokeRect(scalearray[i].offset.x - 10, scalearray[i].offset.y - 10, 20, 20);*/

                    this.overlayAlOffsetX = (scalearray[i].offset.x * pdfscale);
                    this.overlayAlOffsetY = (scalearray[i].offset.y * pdfscale);

                    //this.overlayAlOffsetX += this.OffsetX;
                    //this.overlayAlOffsetY += this.OffsetY;

                    // TODO:JS->TS:CHECK netx 4 variables are not used
                    const ovroffsetx = this.overlayAlOffsetX + this.overlayOffsetX + this.OffsetX;
                    const ovroffsety = this.overlayAlOffsetY + this.overlayOffsetY + this.OffsetY;

                    const snsovroffsetx = this.overlayAlOffsetX + this.OffsetX;
                    const snsovroffsety = this.overlayAlOffsetY + this.OffsetY;

                    //this.overlayAlOffsetX = scalearray[i].offset.x * this.overlayMScale;
                    //this.overlayAlOffsetY = scalearray[i].offset.y * this.overlayMScale;

                    /*context.lineWidth = 3;
                    context.strokeStyle = 'red';
                    context.strokeRect(ovroffsetx - 10, ovroffsety - 10, 20, 20);*/


                    /*context.lineWidth = 3;
                    context.strokeStyle = 'blue';
                    context.strokeRect(this.overlayAlOffsetX - 10, this.overlayAlOffsetY - 10, 20, 20);*/


                } else {
                    this.overlayAlOffsetX = scalearray[i].offset.x * this.overlayScale;
                    this.overlayAlOffsetY = scalearray[i].offset.y * this.overlayScale;

                }



                if (this.oisimage) {

                    this.scaleratio = this.overlayMScale;

                } else {
                    this.scaleratio = this.overlayMScale;
                }

                this.OffsetX = -((this.overlayAlOffsetX) - (this.backgroundAlOffsetX * this.scaleratio));
                this.OffsetY = -((this.overlayAlOffsetY) - (this.backgroundAlOffsetY * this.scaleratio));

                this.AlignOffsetBackup.x = this.OffsetX;
                this.AlignOffsetBackup.y = this.OffsetY;
                this.AlignOffsetBackup.bgcanvwidth = this.bgpagecanvas.width;
                //var pdfscale = this.bgpagecanvas.width / this.pages[0].pdfpagewidth;

                //console.log('Offsets :', this.OffsetX, this.OffsetY);
                //var diffx = snsbovroffsetx - snsovroffsetx;
                //var diffy = snsbovroffsety - snsovroffsety;
                //console.log('Diffscurscale :', diffx, diffy);



                /*if (this.OffsetX == 0 && this.OffsetY == 0){
                }else{
                    var diffx = snsbovroffsetx - snsovroffsetx;
                    var diffy = snsbovroffsety - snsovroffsety;
                    this.OffsetX += diffx;
                    this.OffsetY += diffy;
                }*/



            }//end else


        }//end for

        this.fgdrawangle = bgangle - fgangle;

        this.scaleToBackground(true);
    }


    public nudgeRotate(clockwise: boolean) {
        //0.01745329252
        if (clockwise) {
            this.fgdrawangle -= 0.001;
        } else {
            this.fgdrawangle += 0.001;
        }
        this.bnudgeangleused = true;
        this.draw_compare(true);

    }

    public nudgeScale(updown: number) {

        const onepermillescale = this.overlayScale / 5000;

        /*0 - up
        1 - down
        2 - reset*/

        switch (updown) {
            case 0:
                this.nudgeScalefactor += onepermillescale;
                break;
            case 1:
                this.nudgeScalefactor -= onepermillescale;
                break;
            case 2:
                this.nudgeScalefactor = 0;

        }

        this.draw_compare(true);


    }

    public nudgeoffset(direction: number) {

        /*0 - left
        1 - right
        2 - up
        3 - down*/

        switch (direction) {
            case 0:
                this.OffsetX += 0.1;
                break;
            case 1:
                this.OffsetX -= 0.1;
                break;
            case 2:
                this.OffsetY -= 0.1;
                break;
            case 3:
                this.OffsetY += 0.1;
                break;
        }

        this.draw_compare(true);

    }

    public scalecompare() {
        this.pages[this.scaleindex].usedincomposite = false;

        RxCore_setActiveFile(this.pages[this.scaleindex].DocRef.fileindex);
        this.pages[this.scaleindex].enableSnap(true);

        if (RxCore_GUI_CompareAlign != undefined) {
            RxCore_GUI_CompareAlign.AlignComplete(0);
        }
        set_tool('overlayscale', { p1: this });
        //tool = new tools['overlayscale'](this);

        //RxCore_setActiveFile(indx);


    }

    public getwidthheight() {
        let endx = 0;
        let endy = 0;
        let endxo = 0;
        let endyo = 0;
        let endxb = 0;
        let endyb = 0;
        let ovcover = false;


        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        let curimage: any;
        if (this.bispdf) {
            endxb = this.bgpagecanvas.width * this.overlayCScale;
            endyb = this.bgpagecanvas.height * this.overlayCScale;


        } else if (this.bisimage) {
            curimage = this.pages[0].currentimage;
            const bgscale = this.overlayCScale / this.pages[0].bitmapratio;

            switch (curimage) {
                case 0:
                    endxb = this.pages[0].MainImageWidth * this.overlayCScale;
                    endyb = this.pages[0].MainImageHeight * this.overlayCScale;

                    break;
                case 1:
                    endxb = this.pages[0].SmallImageWidth * bgscale;
                    endyb = this.pages[0].SmallImageHeight * bgscale;

                    //
                    break;

            }
        } else if (this.bisdvector) {
            endxb = this.pages[0].VectorPageObj.width * this.overlayCScale;
            endyb = this.pages[0].VectorPageObj.height * this.overlayCScale;


        }

        if (this.oispdf) {
            endxo = this.ovpagecanvas.width * overlayscalenudge;
            endyo = this.ovpagecanvas.height * overlayscalenudge;


        } else if (this.oisimage) {
            curimage = this.pages[1].currentimage;

            const ovscale = overlayscalenudge / this.pages[1].bitmapratio;
            switch (curimage) {
                case 0:
                    endxo = this.pages[1].MainImageWidth * overlayscalenudge;
                    endyo = this.pages[1].MainImageHeight * overlayscalenudge;
                    break;
                case 1:
                    //
                    endxo = this.pages[1].SmallImageWidth * ovscale;
                    endyo = this.pages[1].SmallImageHeight * ovscale;

                    break;
            }



        } else if (this.oisvector) {
            endxo = this.pages[1].VectorPageObj.width * overlayscalenudge;
            endyo = this.pages[1].VectorPageObj.height * overlayscalenudge;

        }
        endx = Math.max(endxo, endxb);
        endy = Math.max(endyo, endyb);

        if (endx == endxo && endy == endyo) {
            ovcover = true;
        }

        return { x: endx, y: endy, ovcover: ovcover };

    }

    // TODO:JS->TS:CHECK parm is not used
    public draw_image(clear?: any) {

        if (!this.bisimage && !this.oisimage) {
            return;
        }

        let curimage:any;
        if (this.bisimage) {
            curimage = this.pages[0].currentimage;
        } else if (this.oisimage) {
            curimage = this.pages[1].currentimage;
        }

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;
        /*if (clear) {
            contexto.fillStyle = "rgb(62,62,62)";
            contexto.fillRect(0, 0, canvasowidth, canvasoheight);
        }*/

        const tx = (Globals.canvasowidth / 2);
        const ty = (Globals.canvasoheight / 2);

        //var drawscale = this.pages[1].dscale / this.overlayScale;
        //var drawscaleext = this.pages[1].dscaleextent / this.overlayScale;
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        let bgalignX: any;
        let bgalignY: any;
        let otx:any;
        let oty:any;
        let rotpoint: any;
        let rotoffsetX: any;
        let rotoffsetY: any;
        let offsetX: any;
        let offsetY: any;
        switch (curimage) {
            case 0:
                bgalignX = this.overlayOffsetX + (this.overlayAlOffsetXunscaled * overlayscalenudge);
                bgalignY = this.overlayOffsetY + (this.overlayAlOffsetYunscaled * overlayscalenudge);
                otx = this.overlayOffsetX + (this.backgroundWidth / 2);
                oty = this.overlayOffsetY + (this.backgroundHeigth / 2);

                rotpoint = rotate_pointrad({ x: bgalignX, y: bgalignY }, otx, oty, -this.fgdrawangle);
                rotoffsetX = rotpoint.x - bgalignX;
                rotoffsetY = rotpoint.y - bgalignY;

                if (this.pages[1].drotation == 0) {
                    Globals.contexto.save();

                    if (this.bisimage) {
                        Globals.contexto.globalCompositeOperation = 'source-over';
                        Globals.contexto.drawImage(this.pages[0].largeimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].MainImageWidth * this.overlayCScale, this.pages[0].MainImageHeight * this.overlayCScale);
                    }
                    if (this.oisimage) {
                        Globals.contexto.globalCompositeOperation = 'darken';

                        if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                            Globals.contexto.save();
                            Globals.contexto.translate(otx, oty);
                            Globals.contexto.rotate(-this.fgdrawangle);
                            Globals.contexto.translate(-otx, -oty);

                            offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                            offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;

                            Globals.contexto.drawImage(this.pages[1].largeimagecnv, offsetX, offsetY, this.pages[1].MainImageWidth * overlayscalenudge, this.pages[1].MainImageHeight * overlayscalenudge);

                            Globals.contexto.restore();
                            this.bnudgeangleused = false;

                        } else {
                            Globals.contexto.drawImage(this.pages[1].largeimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].MainImageWidth * overlayscalenudge, this.pages[1].MainImageHeight * overlayscalenudge);

                        }

                    }
                    Globals.contexto.restore();

                } else {
                    Globals.contexto.save();
                    Globals.contexto.translate(tx, ty);
                    Globals.contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
                    Globals.contexto.translate(-tx, -ty);
                    if (this.bisimage) {
                        Globals.contexto.globalCompositeOperation = 'source-over';
                        Globals.contexto.drawImage(this.pages[0].largeimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].MainImageWidth * this.overlayCScale, this.pages[0].MainImageHeight * this.overlayCScale);
                    }
                    if (this.oisimage) {
                        Globals.contexto.globalCompositeOperation = 'darken';
                        Globals.contexto.drawImage(this.pages[1].largeimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].MainImageWidth * overlayscalenudge, this.pages[1].MainImageHeight * overlayscalenudge);

                    }


                    Globals.contexto.restore();

                }
                break;
            case 1:
                const bgscale = this.overlayCScale / this.pages[0].bitmapratio;
                const ovscale = overlayscalenudge / this.pages[1].bitmapratio;
                bgalignX = this.overlayOffsetX + (this.overlayAlOffsetXunscaled * overlayscalenudge);
                bgalignY = this.overlayOffsetY + (this.overlayAlOffsetYunscaled * overlayscalenudge);

                otx = this.overlayOffsetX + (this.backgroundWidth / 2);
                oty = this.overlayOffsetY + (this.backgroundHeigth / 2);


                rotpoint = rotate_pointrad({ x: bgalignX, y: bgalignY }, otx, oty, -this.fgdrawangle);
                rotoffsetX = rotpoint.x - bgalignX;
                rotoffsetY = rotpoint.y - bgalignY;


                if (this.pages[1].drotation == 0) {
                    Globals.contexto.save();
                    //contexto.drawImage(this.smallimagecnv, this.dxextent, this.dyextent, this.SmallImageWidth * this.dscaleextent, this.SmallImageHeight * this.dscaleextent);
                    if (this.bisimage) {
                        Globals.contexto.globalCompositeOperation = 'source-over';
                        Globals.contexto.drawImage(this.pages[0].smallimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].SmallImageWidth * bgscale, this.pages[0].SmallImageHeight * bgscale);


                    }
                    if (this.oisimage) {
                        Globals.contexto.globalCompositeOperation = 'darken';
                        if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                            Globals.contexto.save();
                            Globals.contexto.translate(otx, oty);
                            Globals.contexto.rotate(-this.fgdrawangle);
                            Globals.contexto.translate(-otx, -oty);
                            offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                            offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;
                            Globals.contexto.drawImage(this.pages[1].smallimagecnv, offsetX, offsetY, this.pages[1].SmallImageWidth * ovscale, this.pages[1].SmallImageHeight * ovscale);
                            Globals.contexto.restore();
                            this.bnudgeangleused = false;
                        } else {
                            Globals.contexto.drawImage(this.pages[1].smallimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].SmallImageWidth * ovscale, this.pages[1].SmallImageHeight * ovscale);
                        }


                    }

                    Globals.contexto.restore();
                } else {
                    Globals.contexto.save();
                    Globals.contexto.translate(tx, ty);
                    Globals.contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
                    Globals.contexto.translate(-tx, -ty);
                    //contexto.drawImage(this.smallimagecnv, this.dxextent, this.dyextent, this.SmallImageWidth * this.dscaleextent, this.SmallImageHeight * this.dscaleextent);
                    if (this.bisimage) {
                        Globals.contexto.globalCompositeOperation = 'source-over';
                        Globals.contexto.drawImage(this.pages[0].smallimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].SmallImageWidth * bgscale, this.pages[0].SmallImageHeight * bgscale);


                    }
                    if (this.oisimage) {
                        Globals.contexto.globalCompositeOperation = 'darken';
                        Globals.contexto.drawImage(this.pages[1].smallimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].SmallImageWidth * ovscale, this.pages[1].SmallImageHeight * ovscale);


                    }


                    Globals.contexto.restore();

                }

                break;
        }

    }

    public draw_vector(refresh: any) {

        this.bisdvector = (this.pages[0].VectorPageObj != undefined);
        this.oisvector = (this.pages[1].VectorPageObj != undefined);


        if (!this.bisdvector && !this.oisvector) {
            return;
        }

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        //contexto.save();
        //contexto.fillStyle = "rgb(62,62,62)";
        //contexto.fillStyle = "rgb(160,160,160)";
        //contexto.fillRect(0, 0, canvasowidth, canvasoheight);
        const tx = (Globals.canvasowidth / 2);
        const ty = (Globals.canvasoheight / 2);
        //documentopen = true;

        const bgalignX = this.overlayOffsetX + (this.overlayAlOffsetXunscaled * overlayscalenudge);
        const bgalignY = this.overlayOffsetY + (this.overlayAlOffsetYunscaled * overlayscalenudge);


        const otx = this.overlayOffsetX + (this.backgroundWidth / 2);
        const oty = this.overlayOffsetY + (this.backgroundHeigth / 2);

        //var drawscale = this.pages[1].dscalevector / this.overlayScale;
        //context,scalefactor,offsetx,offsety
        //this.dxvector = dx;
        //this.dyvector = dy;
        //this.dscalevector = dscale;

        const rotpoint = rotate_pointrad({ x: bgalignX, y: bgalignY }, otx, oty, -this.fgdrawangle);
        const rotoffsetX = rotpoint.x - bgalignX;
        const rotoffsetY = rotpoint.y - bgalignY;
        let offsetX: any;
        let offsetY: any;
        if (this.pages[1].drotation == 0) {
            if (this.bisdvector) {

                this.pages[0].VectorPageObj.drawallcmpre(Globals.contexto, this.overlayCScale, this.overlayOffsetX, this.overlayOffsetY, refresh, this.backgroundColor, true, this.compareMode);
            }

            if (this.oisvector) {
                if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                    Globals.contexto.save();
                    Globals.contexto.translate(otx, oty);
                    Globals.contexto.rotate(-this.fgdrawangle);
                    Globals.contexto.translate(-otx, -oty);

                    offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                    offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;

                    this.pages[1].VectorPageObj.drawallcmpre(Globals.contexto, overlayscalenudge, offsetX, offsetY, refresh, this.overlayColor, false, this.compareMode);

                    Globals.contexto.restore();
                    this.bnudgeangleused = false;

                } else {

                    this.pages[1].VectorPageObj.drawallcmpre(Globals.contexto, overlayscalenudge, this.overlayOffsetX + this.OffsetX, this.overlayOffsetY + this.OffsetY, refresh, this.overlayColor, false, this.compareMode);
                }


            }

        } else {
            Globals.contexto.save();
            Globals.contexto.translate(tx, ty);
            Globals.contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
            Globals.contexto.translate(-tx, -ty);
            if (this.bisdvector) {
                this.pages[0].VectorPageObj.drawallcmpre(Globals.contexto, this.overlayCScale, this.overlayOffsetX, this.overlayOffsetY, refresh, this.backgroundColor, true, this.compareMode);


            }

            if (this.oisvector) {
                //this.pages[1].VectorPageObj.drawallcmpre(contexto, this.pages[1].dscalevector, this.pages[1].dxvector, this.pages[1].dyvector, refresh, this.overlayColor, false);
                if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                    Globals.contexto.save();
                    Globals.contexto.translate(otx, oty);
                    Globals.contexto.rotate(-this.fgdrawangle);
                    Globals.contexto.translate(-otx, -oty);

                    offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                    offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;

                    this.pages[1].VectorPageObj.drawallcmpre(Globals.contexto, overlayscalenudge, offsetX, offsetY, refresh, this.overlayColor, false, this.compareMode);

                    Globals.contexto.restore();
                    this.bnudgeangleused = false;


                } else {
                    this.pages[1].VectorPageObj.drawallcmpre(Globals.contexto, overlayscalenudge, this.overlayOffsetX + this.OffsetX, this.overlayOffsetY + this.OffsetY, refresh, this.overlayColor, false, this.compareMode);
                }


            }

            Globals.contexto.restore();

        }

        //contexto.restore();
    }

    // TODO:JS->TS:CHECK param is not used
    public draw_canvas(clear?: any) {

        if (!this.bispdf && !this.oispdf) {
            return;
        }

        const tx = (Globals.canvasowidth / 2);
        const ty = (Globals.canvasoheight / 2);

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;
        //documentopen = true;
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        const pdfscale = this.ovpagecanvas.width / this.pages[1].pdfpagewidth;

        const bgalignX = this.overlayOffsetX + (this.overlayAlOffsetXunscaled * pdfscale);
        const bgalignY = this.overlayOffsetY + (this.overlayAlOffsetYunscaled * pdfscale);


        const otx = this.overlayOffsetX + (this.bgpagecanvas.width / 2);
        const oty = this.overlayOffsetY + (this.bgpagecanvas.height / 2);

        const otxpnt = ovrlOffsetX + (this.overlayAlOffsetXunscaled * pdfscale);
        const otypnt = ovrlOffsetY + (this.overlayAlOffsetYunscaled * pdfscale);

        /*context.lineWidth = 3;
          context.strokeStyle = 'blue';
          context.strokeRect(bovroffsetx - 10, bovroffsety - 10, 20, 20);*/

        const rotpoint = rotate_pointrad({ x: bgalignX, y: bgalignY }, otx, oty, -this.fgdrawangle);
        //console.log(this.fgdrawangle*(180/Math.PI));

        // TODO:JS->TS:CHECK next 2 variables are not used
        const rotoffsetX = rotpoint.x - bgalignX;
        const rotoffsetY = rotpoint.y - bgalignY;

        if (this.pages[1].drotation == 0) {

            Globals.contexto.save();

            if (this.bispdf) {
                Globals.contexto.globalCompositeOperation = 'source-over';
                Globals.contexto.drawImage(this.bgpagecanvas, this.overlayOffsetX, this.overlayOffsetY, this.bgpagecanvas.width * this.overlayCScale, this.bgpagecanvas.height * this.overlayCScale);
            }
            if (this.oispdf) {
                Globals.contexto.globalCompositeOperation = 'darken';
                if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                    Globals.contexto.save();
                    Globals.contexto.translate(otxpnt, otypnt);
                    Globals.contexto.rotate(this.fgdrawangle);
                    Globals.contexto.translate(-otxpnt, -otypnt);
                    //var offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                    //var offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;
                    //contexto.drawImage(this.ovpagecanvas, offsetX, offsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                    //contexto.drawImage(this.ovpagecanvas, 0, 0, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                    Globals.contexto.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);

                    /*context.lineWidth = 3;
                    context.strokeStyle = 'red';
                    context.strokeRect(ovrlOffsetX - 10, ovrlOffsetY - 10, 20, 20);

                    context.lineWidth = 3;
                    context.strokeStyle = 'blue';
                    context.strokeRect(otxpnt - 10, otypnt - 10, 20, 20);*/
                    Globals.contexto.restore();
                    this.bnudgeangleused = false;


                } else {
                    Globals.contexto.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                }

            }
            Globals.contexto.restore();


        } else {
            Globals.contexto.save();
            Globals.contexto.translate(tx, ty);
            Globals.contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
            Globals.contexto.translate(-tx, -ty);
            if (this.bispdf) {
                Globals.contexto.globalCompositeOperation = 'source-over';
                Globals.contexto.drawImage(this.bgpagecanvas, this.overlayOffsetX, this.overlayOffsetY, this.bgpagecanvas.width * this.overlayCScale, this.bgpagecanvas.height * this.overlayCScale);
            }
            if (this.oispdf) {
                Globals.contexto.globalCompositeOperation = 'darken';
                if (Math.abs(this.fgdrawangle) > 0.02 || this.bnudgeangleused) {
                    /*contexto.translate(otx, oty);
                    contexto.rotate(-this.fgdrawangle);
                    contexto.translate(-otx, -oty);*/
                    Globals.contexto.save();
                    Globals.contexto.translate(otxpnt, otypnt);
                    Globals.contexto.rotate(this.fgdrawangle);
                    Globals.contexto.translate(-otxpnt, -otypnt);

                    //offsetX = (this.overlayOffsetX + this.OffsetX) - rotoffsetX;
                    //offsetY = (this.overlayOffsetY + this.OffsetY) - rotoffsetY;
                    //contexto.drawImage(this.ovpagecanvas, offsetX, offsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                    Globals.contexto.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                    Globals.contexto.restore();
                    this.bnudgeangleused = false;

                } else {
                    Globals.contexto.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
                }

            }

            Globals.contexto.restore();

        }


    }



    public draw_compare(refresh: boolean) {
        if (!this.bActive) {
            return;

        }

        // TODO:JS->TS:CHECK next 2 variables are not used
        const tx = (Globals.canvasowidth / 2);
        const ty = (Globals.canvasoheight / 2);

        Globals.contexto.save();
        Globals.contexto.fillStyle = Globals.displayBGColor;
        //contexto.fillStyle = "rgb(160,160,160)";
        Globals.contexto.fillRect(0, 0, Globals.canvasowidth, Globals.canvasoheight);
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        const compositestartx = Math.min(ovrlOffsetX, this.overlayOffsetX);
        const compositestarty = Math.min(ovrlOffsetY, this.overlayOffsetY);

        const compositeend = this.getwidthheight();

        // TODO:JS->TS:CHECK next 2 variables are not used
        const compositeendx = Math.max(compositeend.x - this.OffsetX, compositeend.x + this.OffsetX);
        const compositeendy = Math.max(compositeend.y - this.OffsetY, compositeend.y + this.OffsetY);

        const centerx = compositestartx + (compositeend.x / 2);
        const centery = compositestarty + (compositeend.y / 2);

        /*if (Math.abs(this.fgdrawangle) < 0.02){
            //we have rotation

            var rotpointul = rotate_pointrad({x:bgalignX,y : bgalignY},otx,oty,-this.fgdrawangle);

        }*/


        if (this.pages[1].drotation != 0) {
            Globals.contexto.save();
            Globals.contexto.translate(centerx, centery);
            Globals.contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
            Globals.contexto.translate(-centerx, -centery);
            Globals.contexto.fillStyle = "rgb(255,255,255)";
            Globals.contexto.fillRect(compositestartx, compositestarty, compositeend.x, compositeend.y);
            Globals.contexto.restore();
        } else {
            if ((Math.abs(this.fgdrawangle) > 0.02) && compositeend.ovcover) {
                Globals.contexto.save();
                Globals.contexto.translate(centerx, centery);
                Globals.contexto.rotate(this.fgdrawangle);
                Globals.contexto.translate(-centerx, -centery);
                Globals.contexto.fillStyle = "rgb(255,255,255)";
                Globals.contexto.fillRect(compositestartx, compositestarty, compositeend.x, compositeend.y);
                Globals.contexto.restore();
            } else {
                Globals.contexto.fillStyle = "rgb(255,255,255)";
                Globals.contexto.fillRect(compositestartx, compositestarty, compositeend.x, compositeend.y);

            }
            /*contexto.fillStyle = "rgb(255,255,255)";
            contexto.fillRect(compositestartx, compositestarty, compositeend.x, compositeend.y);
            contexto.strokeStyle = 'red';
            contexto.fillRect(centerx - 10, centery - 10, 20, 20);*/


        }



        if (this.bisdvector) {

            this.draw_vector(refresh);
            this.draw_image(refresh);
            this.draw_canvas(refresh);

        } else if (this.bisimage) {
            this.draw_image(refresh);
            this.draw_vector(refresh);
            this.draw_canvas(refresh);
        } else if (this.bispdf) {

            this.draw_canvas(refresh);
            this.draw_vector(refresh);
            this.draw_image(refresh);
        }

        Globals.contexto.restore();


    }

    public renderPDFscale() {

        if (this.bispdf) {
            this.pages[0].queRenderCompareScale(0);
        }

        if (this.oispdf) {
            this.pages[1].queRenderCompareScale(1);
        }


    }

    public checkPDFmagnify(scale: any) {

        if (this.bispdf) {
            this.pages[0].renderPDFMagnify(scale);
        }

        if (this.oispdf) {
            this.pages[1].renderPDFMagnify(scale);
        }


    }


    public drawmagnify(mousepos: any, ctx: any, magnificationScale: number) {
        if (!this.bActive) {
            return;
        }

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, Globals.magcanvas.width, Globals.magcanvas.height);

        if (this.bisdvector) {
            this.draw_maginfyvector(mousepos, ctx, magnificationScale);
            this.draw_maginfyimage(mousepos, ctx, magnificationScale);
            this.draw_magnifycanvas(mousepos, ctx, magnificationScale);

        } else if (this.bisimage) {
            this.draw_maginfyimage(mousepos, ctx, magnificationScale);
            this.draw_maginfyvector(mousepos, ctx, magnificationScale);
            this.draw_magnifycanvas(mousepos, ctx, magnificationScale);
        } else if (this.bispdf) {
            this.draw_magnifycanvas(mousepos, ctx, magnificationScale);
            this.draw_maginfyvector(mousepos, ctx, magnificationScale);
            this.draw_maginfyimage(mousepos, ctx, magnificationScale);
        }

        ctx.restore();

    }

    public draw_maginfyvector(mousepos: any, ctx: any, magnificationScale: number) {

        this.bisdvector = (this.pages[0].VectorPageObj != undefined);
        this.oisvector = (this.pages[1].VectorPageObj != undefined);

        if (!this.bisdvector && !this.oisvector) {
            return;
        }
        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        let rectCenterX:any;
        let rectCenterY:any;
        if (this.pages[1].drotation == 0) {
            rectCenterX = (mousepos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (mousepos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        } else {
            const rotpos = rotate_point(mousepos, (Globals.canvasowidth / 2), (Globals.canvasoheight / 2), (360 - this.pages[1].drotation));
            rectCenterX = (rotpos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (rotpos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        }

        const tx = (Globals.magcanvas.width / 2);
        const ty = (Globals.magcanvas.height / 2);

        let drawscale:any;
        let xoffset: any;
        let yoffset: any;
        let pagenum: any;
        let ovrlbackground: any;
        let drawcolor: any;
        if (this.bisdvector) {
            //this.overlayCScale, this.overlayOffsetX, this.overlayOffsetY

            drawscale = this.overlayCScale * magnificationScale;
            xoffset = -(rectCenterX) + (this.overlayOffsetX); // - (thispage.dxvector + wscale);
            yoffset = -(rectCenterY) + (this.overlayOffsetY);// - (thispage.dyvector + hscale);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;

            pagenum = 0;
            ovrlbackground = true;
            drawcolor = this.backgroundColor;

            if (this.pages[1].drotation == 0) {
                this.pages[pagenum].VectorPageObj.drawallmagnifycmpre(ctx, drawscale, xoffset, yoffset, drawcolor, ovrlbackground);
            } else {
                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(this.pages[1].drotation * (Math.PI / 180));
                ctx.translate(-tx, -ty);
                this.pages[pagenum].VectorPageObj.drawallmagnifycmpre(ctx, drawscale, xoffset, yoffset, drawcolor, ovrlbackground);
                ctx.restore();

            }

        }
        if (this.oisvector) {
            //this.overlayScale, this.overlayOffsetX + this.OffsetX, this.overlayOffsetY + this.OffsetY
            drawscale = overlayscalenudge * magnificationScale;
            xoffset = -(rectCenterX) + (this.overlayOffsetX + this.OffsetX); // - (thispage.dxvector + wscale);
            yoffset = -(rectCenterY) + (this.overlayOffsetY + this.OffsetY);// - (thispage.dyvector + hscale);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;

            pagenum = 1;

            ovrlbackground = false;
            drawcolor = this.overlayColor;

            if (this.pages[1].drotation == 0) {
                this.pages[pagenum].VectorPageObj.drawallmagnifycmpre(ctx, drawscale, xoffset, yoffset, drawcolor, ovrlbackground);
            } else {
                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(this.pages[1].drotation * (Math.PI / 180));
                ctx.translate(-tx, -ty);
                this.pages[pagenum].VectorPageObj.drawallmagnifycmpre(ctx, drawscale, xoffset, yoffset, drawcolor, ovrlbackground);
                ctx.restore();

            }

        }

    }

    public draw_magnifycanvas(mousepos: any, ctx: any, magnificationScale: number) {

        if (!this.bispdf && !this.oispdf) {
            return;
        }

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        let rectCenterX: any;
        let rectCenterY: any;
        if (this.pages[1].drotation == 0) {
            rectCenterX = (mousepos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (mousepos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        } else {
            const rotpos = rotate_point(mousepos, (Globals.canvasowidth / 2), (Globals.canvasoheight / 2), (360 - this.pages[1].drotation.drotation));
            rectCenterX = (rotpos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (rotpos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        }

        const tx = (Globals.magcanvas.width / 2);
        const ty = (Globals.magcanvas.height / 2);

        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;


        if (this.pages[1].drotation != 0) {


            ctx.save();
            ctx.translate(tx, ty);
            ctx.rotate(this.pages[1].drotation * (Math.PI / 180));
            ctx.translate(-tx, -ty);


        }

        ctx.save();
        let drawscale: any;
        let xoffset: any;
        let yoffset: any;
        if (this.bispdf) {
            drawscale = this.overlayCScale * magnificationScale;
            xoffset = -(rectCenterX) + (this.overlayOffsetX);
            yoffset = -(rectCenterY) + (this.overlayOffsetY);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;

            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(this.pages[0].magnifycanvas, xoffset, yoffset);

        }
        if (this.oispdf) {
            drawscale = overlayscalenudge * magnificationScale;
            xoffset = -(rectCenterX) + (ovrlOffsetX);
            yoffset = -(rectCenterY) + (ovrlOffsetY);
            xoffset *= magnificationScale;
            yoffset *= magnificationScale;

            ctx.globalCompositeOperation = 'darken';
            ctx.drawImage(this.pages[1].magnifycanvas, xoffset, yoffset);
        }
        ctx.restore();

        if (this.pages[1].drotation != 0) {
            ctx.restore();
        }

    }

    public draw_maginfyimage(mousepos: any, ctx: any, magnificationScale: number) {
        if (!this.bisimage && !this.oisimage) {
            return;
        }
        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        let rectCenterX: any;
        let rectCenterY: any;
        if (this.pages[1].drotation == 0) {
            rectCenterX = (mousepos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (mousepos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        } else {
            const rotpos = rotate_point(mousepos, (Globals.canvasowidth / 2), (Globals.canvasoheight / 2), (360 - this.pages[1].drotation.drotation));
            rectCenterX = (rotpos.x - ((Globals.magcanvas.width / 2) / magnificationScale));
            rectCenterY = (rotpos.y - ((Globals.magcanvas.height / 2) / magnificationScale));

        }

        const tx = (Globals.magcanvas.width / 2);
        const ty = (Globals.magcanvas.height / 2);

        //var drawscale = this.pages[1].dscale / this.overlayScale;
        //var drawscaleext = this.pages[1].dscaleextent / this.overlayScale;
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        let drawscale: any;
        let xoffset: any;
        let yoffset: any;
        let bgscale: any;
        let ovscale: any;
        switch (this.pages[1].currentimage) {

            case 0:

                if (this.pages[1].drotation != 0) {


                    ctx.save();
                    ctx.translate(tx, ty);
                    ctx.rotate(this.pages[1].drotation * (Math.PI / 180));
                    ctx.translate(-tx, -ty);


                }
                ctx.save();
                if (this.bisimage) {
                    drawscale = this.overlayCScale * magnificationScale;
                    xoffset = -(rectCenterX) + (this.overlayOffsetX);
                    yoffset = -(rectCenterY) + (this.overlayOffsetY);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;

                    ctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(this.pages[0].largeimagecnv, xoffset, yoffset, this.pages[0].MainImageWidth * drawscale, this.pages[0].MainImageHeight * drawscale);

                }
                if (this.oisimage) {
                    drawscale = overlayscalenudge * magnificationScale;
                    xoffset = -(rectCenterX) + (ovrlOffsetX);
                    yoffset = -(rectCenterY) + (ovrlOffsetY);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;

                    ctx.globalCompositeOperation = 'darken';
                    ctx.drawImage(this.pages[1].largeimagecnv, xoffset, yoffset, this.pages[1].MainImageWidth * drawscale, this.pages[1].MainImageHeight * drawscale);
                }
                ctx.restore();

                if (this.pages[1].drotation != 0) {
                    ctx.restore();
                }

                break;
            case 1:
                bgscale = this.overlayCScale / this.pages[0].bitmapratio;
                ovscale = overlayscalenudge / this.pages[1].bitmapratio;

                if (this.pages[1].drotation != 0) {

                    ctx.save();
                    ctx.translate(tx, ty);
                    ctx.rotate(this.pages[1].drotation * (Math.PI / 180));
                    ctx.translate(-tx, -ty);

                }

                ctx.save();
                if (this.bisimage) {
                    drawscale = bgscale * magnificationScale;
                    xoffset = -(rectCenterX) + (this.overlayOffsetX);
                    yoffset = -(rectCenterY) + (this.overlayOffsetY);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;

                    ctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(this.pages[0].smallimagecnv, xoffset, yoffset, this.pages[0].SmallImageWidth * drawscale, this.pages[0].SmallImageHeight * drawscale);


                }
                if (this.oisimage) {
                    drawscale = ovscale * magnificationScale;
                    xoffset = -(rectCenterX) + (ovrlOffsetX);
                    yoffset = -(rectCenterY) + (ovrlOffsetY);
                    xoffset *= magnificationScale;
                    yoffset *= magnificationScale;

                    ctx.globalCompositeOperation = 'darken';
                    ctx.drawImage(this.pages[1].smallimagecnv, xoffset, yoffset, this.pages[1].SmallImageWidth * drawscale, this.pages[1].SmallImageHeight * drawscale);


                }

                ctx.restore();

                if (this.pages[1].drotation != 0) {
                    ctx.restore();
                }

                break;
        }
    }
}
