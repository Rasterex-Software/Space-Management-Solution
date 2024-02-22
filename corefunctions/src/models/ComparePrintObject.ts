import {
    Globals,
    printCanvas
} from '../internal';
export class ComparePrintObject {
    pages: any[];
    bispdf: any;
    oispdf: any;
    bisimage: any;
    oisimage: any;
    bisdvector: any;
    oisvector: any;
    scaleratio: any;
    overlayScale: any;
    nudgeScalefactor: any;
    overlayCScale: any;
    OffsetX: any;
    OffsetY: any;
    backgroundScale: any;
    overlayOffsetX: number;
    overlayOffsetY: number;
    backgroundColor: string;
    overlayColor: string;
    backgroundready: boolean;
    overlayready: boolean;
    pageURL: string;
    ovpagecanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    ovpagectx: CanvasRenderingContext2D | null = {} as CanvasRenderingContext2D;
    bgpagecanvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    bgpagectx: CanvasRenderingContext2D | null = {} as CanvasRenderingContext2D;
    printcanvas: HTMLCanvasElement;
    printctx: CanvasRenderingContext2D | null;
    printobj: any;
    compareobj: any;
    bovinverted: boolean;
    bbginverted: boolean;
    compareMode: number;

    constructor(compareobj: any) {
        this.bovinverted = false;
        this.bbginverted = false;

        // TODO:JS->TS:CHECK refactor this because is referenced in internal methods
        this.compareobj = compareobj;

        // TODO:JS->TS:INFO was added because is referenced bellow in code
        this.compareMode = 0;

        compareobj.printing = true;
        this.pages = [];
        this.bispdf = compareobj.bispdf;
        this.oispdf = compareobj.oispdf;
        this.bisimage = compareobj.bisimage;
        this.oisimage = compareobj.oisimage;
        this.bisdvector = compareobj.bisdvector;
        this.oisvector = compareobj.oisvector;
        this.scaleratio = compareobj.scaleratio;
        this.overlayScale = compareobj.overlayScale;
        this.nudgeScalefactor = compareobj.nudgeScalefactor;
        this.overlayCScale = compareobj.overlayCScale;
        this.OffsetX = compareobj.OffsetX;
        this.OffsetY = compareobj.OffsetY;
        this.backgroundScale = compareobj.backgroundScale;
        this.overlayOffsetX = 0;
        this.overlayOffsetY = 0;
        this.pages[0] = compareobj.pages[0];
        this.pages[1] = compareobj.pages[1];

        this.pages[0].compositePrintreference = this;
        this.pages[1].compositePrintreference = this;

        this.backgroundColor = 'blue';
        this.overlayColor = '#ff8000';


        this.backgroundready = false;
        this.overlayready = false;

        this.pageURL = "";


        //this.combinedSize =

        if (this.oispdf) {
            this.ovpagecanvas = document.createElement('canvas');
            this.ovpagecanvas.width = this.pages[1].pagecanvas.width;
            this.ovpagecanvas.height = this.pages[1].pagecanvas.height;
            this.ovpagectx = this.ovpagecanvas.getContext('2d');

        }
        if (this.bispdf) {
            this.bgpagecanvas = document.createElement('canvas');
            this.bgpagecanvas.width = this.pages[0].pagecanvas.width;
            this.bgpagecanvas.height = this.pages[0].pagecanvas.height;
            this.bgpagectx = this.bgpagecanvas.getContext('2d');

        }


        this.printcanvas = document.createElement('canvas');
        this.printctx = this.printcanvas.getContext('2d');

        this.printobj = {
            paperimage: this.printcanvas,
            paperwidth: 297,
            paperheight: 210,
            docwidth: 1,
            docheight: 1,
            inchtomm: 25.4,
            DPI: 300,
            scrDPI: 96,
            scaleSet: false,
            pdx: 0,
            pdy: 0,
            pscale: 1,
            printctx: this.printctx,
            setRes: function (dpi:number) {
                this.DPI = dpi;
            },
            setPaperSize: function (width:number, height:number) {
                this.paperwidth = width;
                this.paperheight = height;
                Globals.PaperWidth = width;
                Globals.PaperHeight = height;
                this.paperimage.width = (width / this.inchtomm) * this.DPI;
                this.paperimage.height = (height / this.inchtomm) * this.DPI;
            },
            setDocSize: function (width:number, height:number) {
                this.docwidth = width;
                this.docheight = height;
            },
            setScale: function () {
                const xscale = this.paperimage.width / this.docwidth; //thispage.MainImageWidth;
                const yscale = this.paperimage.height / this.docheight; // thispage.MainImageHeight;

                this.pscale = Math.min(xscale, yscale);
                this.pdx = (this.paperimage.width - (this.docwidth * this.pscale)) / 2;
                this.pdy = (this.paperimage.height - (this.docheight * this.pscale)) / 2;
                this.scaleSet = true;
            },
            // JS->TS:INFO converted into arow function because was needed access to ComparePrintObject properties
            print:  (pageURL:string) => {
                if (!this.printobj.scaleSet) {
                    return;
                }

                this.pageURL = pageURL;
                this.scaleToBackground(true);
                /*if(thispage.usepdfjs){
                 //thispage.renderPDFpagePrint();
                 }else if (thispage.usevectorxml){
                 thispage.draw_vectorPrint();
                 }else if(thispage.usevector3Dxml){
                 //get imageurl.
                 thispage.print3Dimage.addEventListener('load', thispage.load3Dimage, false);
                 thispage.print3Dimage.src = renderer.domElement.toDataURL();

                 }else{
                 thispage.draw_imagePrint();
                 }*/

            }

        }
    }

    public getpaperscale() {

        const compositedim = this.getwidthheight();
        let pwidtdh: number;
        let pheight: number;
        if (compositedim.x2 - compositedim.x1 > compositedim.y2 - compositedim.y1) {
            pwidtdh = this.printobj.paperwidth;
            pheight = this.printobj.paperheight;
        } else {
            pwidtdh = this.printobj.paperheight;
            pheight = this.printobj.paperwidth;

        }
        this.printobj.setPaperSize(pwidtdh, pheight);
        this.printobj.setDocSize(compositedim.x2 - compositedim.x1, compositedim.y2 - compositedim.y1);

    }

    public getwidthheight() {


        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        const compositestartx = Math.min(ovrlOffsetX, this.overlayOffsetX);
        const compositestarty = Math.min(ovrlOffsetY, this.overlayOffsetY);
        const compositeend = this.compareobj.getwidthheight();

        const compositeendx = Math.max(compositeend.x - this.OffsetX, compositeend.x + this.OffsetX);
        const compositeendy = Math.max(compositeend.y - this.OffsetY, compositeend.y + this.OffsetY);

        return { x1: compositestartx, y1: compositestarty, x2: compositeendx, y2: compositeendy };
    }

    //this.getpaperscale();

    public scaleToBackground(scalechanged: boolean) {


        this.OffsetX /= this.overlayScale;
        this.OffsetY /= this.overlayScale;


        if (this.bispdf) {
            this.backgroundready = false;

            if (this.oispdf) {
                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / this.bgpagecanvas.width;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscalepdf;
                this.overlayScale *= this.printobj.pscale;

                this.overlayCScale = this.backgroundScale;// * this.scaleratio;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayready = false;
                this.pages[0].pdfisrendered = !scalechanged;
                this.pages[1].pdfisrendered = !scalechanged;

                //this.draw_compare(scalechanged);

            } else if (this.oisimage) {
                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / this.bgpagecanvas.width;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscale;
                this.overlayScale *= this.printobj.pscale;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayCScale = this.backgroundScale;


                this.pages[0].pdfisrendered = !scalechanged;
                //this.draw_compare(scalechanged);
                this.overlayready = false;

                if (!scalechanged) {

                }

            } else if (this.oisvector) {

                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / this.bgpagecanvas.width;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayScale *= this.printobj.pscale;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayCScale = this.backgroundScale;// * this.scaleratio;

                this.pages[0].pdfisrendered = !scalechanged;

                this.overlayready = false;
                this.draw_compare_print(scalechanged);

                if (!scalechanged) {

                }



            }
        }

        if (this.bisimage) {
            this.backgroundready = false;
            this.pages[0].checkimageswitch();

            if (this.oispdf) {
                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;


                this.overlayCScale = this.backgroundScale;

                this.overlayScale = this.pages[1].dscalepdf;
                this.overlayScale *= this.printobj.pscale;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.pages[1].pdfisrendered = !scalechanged;

                if (!scalechanged) {
                    this.overlayready = false;
                    this.draw_compare_print(scalechanged);
                }

            } else if (this.oisimage) {

                //this.pages[0].currentimage = 0;
                //this.pages[1].currentimage = 0;
                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscale;
                this.overlayScale *= this.printobj.pscale;

                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;
                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayready = false;
                this.draw_compare_print(scalechanged);

            } else if (this.oisvector) {
                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / this.pages[0].MainImageWidth;
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayScale *= this.printobj.pscale;

                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayready = false;
                this.draw_compare_print(scalechanged);

            }

        }

        if (this.bisdvector) {
            this.backgroundready = false;

            if (this.oispdf) {
                this.backgroundScale = (this.ovpagecanvas.width * this.pages[1].dscalepdf) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscalepdf;
                this.overlayScale *= this.printobj.pscale;

                this.overlayCScale = this.backgroundScale;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.pages[1].pdfisrendered = !scalechanged;

                if (!scalechanged) {
                    this.overlayready = false;
                    this.draw_compare_print(scalechanged);
                }

            } else if (this.oisimage) {
                this.backgroundScale = (this.pages[1].dscale * this.pages[1].MainImageWidth) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscale;
                this.overlayScale *= this.printobj.pscale;

                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;
                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayCScale = this.backgroundScale;

                this.overlayready = false;
                this.draw_compare_print(scalechanged);

            } else if (this.oisvector) {
                this.backgroundScale = (this.pages[1].VectorPageObj.width * this.pages[1].dscalevector) / (this.pages[0].VectorPageObj.width);
                this.backgroundScale *= this.scaleratio;
                this.backgroundScale *= this.printobj.pscale;

                this.overlayScale = this.pages[1].dscalevector;
                this.overlayScale *= this.printobj.pscale;

                this.overlayCScale = this.backgroundScale;
                this.overlayOffsetX = 0;
                this.overlayOffsetY = 0;

                this.OffsetX *= this.overlayScale;
                this.OffsetY *= this.overlayScale;

                this.overlayready = false;
                this.draw_compare_print(scalechanged);

            }
        }
    }

    public invertpdf() {
        if (this.bispdf) {
            this.pages[0].invertpdfprint(1);
            this.bbginverted = true;

        }

        if (this.oispdf) {
            this.pages[1].invertpdfprint(2);
            this.bovinverted = true;
        }

        if (this.bispdf && this.oispdf) {
            if (this.bbginverted && this.bovinverted) {
                this.backgroundready = true;
                this.overlayready = true;
                this.draw_compare_print(true);
                this.bbginverted = false;
                this.bovinverted = false;
            }

        } else if (this.bispdf && !this.oispdf) {
            if (this.bbginverted) {
                this.backgroundready = true;
                this.draw_compare_print(true);
                this.bbginverted = false;

            }
        } else if (!this.bispdf && this.oispdf) {
            if (this.bovinverted) {
                this.overlayready = true;
                this.draw_compare_print(true);
                this.bovinverted = false;

            }
        }

        //this.usepdf = true;
        //this.pdfrendered = true;

        //this.scaleToBackground(true);
    }

    public renderPDFscale() {

        if (this.bispdf) {
            this.backgroundready = false;
            this.pages[0].queRenderCompareScale(0);
        }

        if (this.oispdf) {
            this.overlayready = false;
            this.pages[1].queRenderCompareScale(1);
        }


    }

    // TODO:JS->TS:CHECK parm is not used
    public draw_image(clear: any) {

        if (!this.bisimage && !this.oisimage) {
            return;
        }

        /*if(this.bisimage){
            var curimage = this.pages[0].currentimage;
        }else if(this.oisimage){
            curimage = this.pages[1].currentimage;
        }*/

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;
        /*if (clear) {
         contexto.fillStyle = "rgb(62,62,62)";
         contexto.fillRect(0, 0, canvasowidth, canvasoheight);
         }*/



        //var tx = (canvasowidth / 2);
        //var ty = (canvasoheight / 2);

        //var drawscale = this.pages[1].dscale / this.overlayScale;
        //var drawscaleext = this.pages[1].dscaleextent / this.overlayScale;
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        this.printobj.printctx.save();

        if (this.bisimage) {
            this.printobj.printctx.globalCompositeOperation = 'source-over';
            this.printobj.printctx.drawImage(this.pages[0].largeimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].MainImageWidth * this.overlayCScale, this.pages[0].MainImageHeight * this.overlayCScale);
            this.backgroundready = true;
        }
        if (this.oisimage) {
            this.printobj.printctx.globalCompositeOperation = 'darken';
            this.printobj.printctx.drawImage(this.pages[1].largeimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].MainImageWidth * overlayscalenudge, this.pages[1].MainImageHeight * overlayscalenudge);
            this.overlayready = true;
        }
        this.printobj.printctx.restore();


        /*switch (curimage) {
            case 0:

                if (this.pages[1].drotation == 0) {

                } else {
                    contexto.save();
                    contexto.translate(tx, ty);
                    contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
                    contexto.translate(-tx, -ty);
                    if (this.bisimage){
                        contexto.globalCompositeOperation = 'source-over';
                        contexto.drawImage(this.pages[0].largeimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].MainImageWidth * this.overlayCScale, this.pages[0].MainImageHeight * this.overlayCScale);
                    }
                    if (this.oisimage){
                        contexto.globalCompositeOperation = 'darken';
                        contexto.drawImage(this.pages[1].largeimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].MainImageWidth * this.overlayScale, this.pages[1].MainImageHeight * this.overlayScale);

                    }


                    contexto.restore();

                }
                break;
            case 1:
                var bgscale = this.overlayCScale / this.pages[0].bitmapratio;
                var ovscale = this.overlayScale / this.pages[1].bitmapratio;

                this.printobj.printctx.save();
                //contexto.drawImage(this.smallimagecnv, this.dxextent, this.dyextent, this.SmallImageWidth * this.dscaleextent, this.SmallImageHeight * this.dscaleextent);
                if (this.bisimage){
                    this.printobj.printctx.globalCompositeOperation = 'source-over';
                    this.printobj.printctx.drawImage(this.pages[0].smallimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].SmallImageWidth * bgscale, this.pages[0].SmallImageHeight * bgscale);


                }
                if (this.oisimage){
                    this.printobj.printctx.globalCompositeOperation = 'darken';
                    this.printobj.printctx.drawImage(this.pages[1].smallimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].SmallImageWidth * ovscale, this.pages[1].SmallImageHeight * ovscale);

                }

                this.printobj.printctx.restore();


                if (this.pages[1].drotation == 0) {
                } else {
                    contexto.save();
                    contexto.translate(tx, ty);
                    contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
                    contexto.translate(-tx, -ty);
                    //contexto.drawImage(this.smallimagecnv, this.dxextent, this.dyextent, this.SmallImageWidth * this.dscaleextent, this.SmallImageHeight * this.dscaleextent);
                    if (this.bisimage){
                        contexto.globalCompositeOperation = 'source-over';
                        contexto.drawImage(this.pages[0].smallimagecnv, this.overlayOffsetX, this.overlayOffsetY, this.pages[0].SmallImageWidth * bgscale, this.pages[0].SmallImageHeight * bgscale);


                    }
                    if (this.oisimage){
                        contexto.globalCompositeOperation = 'darken';
                        contexto.drawImage(this.pages[1].smallimagecnv, ovrlOffsetX, ovrlOffsetY, this.pages[1].SmallImageWidth * ovscale, this.pages[1].SmallImageHeight * ovscale);


                    }


                    contexto.restore();

                }

                break;
        }*/

    }

    public draw_vector(refresh: any) {

        this.bisdvector = (this.pages[0].VectorPageObj != undefined);
        this.oisvector = (this.pages[1].VectorPageObj != undefined);


        if (!this.bisdvector && !this.oisvector) {
            return;
        }

        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;

        this.printobj.printctx.save();
        if (this.bisdvector) {
            this.pages[0].VectorPageObj.drawallcmpre(this.printobj.printctx, this.overlayCScale, this.overlayOffsetX, this.overlayOffsetY, refresh, this.backgroundColor, true, this.compareMode);
            this.backgroundready = true;
        }

        if (this.oisvector) {
            this.pages[1].VectorPageObj.drawallcmpre(this.printobj.printctx, overlayscalenudge, this.overlayOffsetX + this.OffsetX, this.overlayOffsetY + this.OffsetY, refresh, this.overlayColor, false, this.compareMode);
            this.overlayready = true;

        }

        this.printobj.printctx.restore();

        //var tx = (canvasowidth / 2);
        //var ty = (canvasoheight / 2);




        /*if (this.pages[1].drotation == 0) {

        } else {
            contexto.save();
            contexto.translate(tx, ty);
            contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
            contexto.translate(-tx, -ty);
            if (this.bisdvector){
                this.pages[0].VectorPageObj.drawallcmpre(contexto, this.overlayCScale, this.overlayOffsetX, this.overlayOffsetY, refresh, this.backgroundColor, true);

            }

            if (this.oisvector){
                //this.pages[1].VectorPageObj.drawallcmpre(contexto, this.pages[1].dscalevector, this.pages[1].dxvector, this.pages[1].dyvector, refresh, this.overlayColor, false);
                this.pages[1].VectorPageObj.drawallcmpre(contexto, this.overlayScale, this.overlayOffsetX + this.OffsetX, this.overlayOffsetY + this.OffsetY, refresh, this.overlayColor, false);

            }

            contexto.restore();

        }*/

        //contexto.restore();
    }

    // TODO:JS->TS:CHECK parm is not used
    public draw_canvas(clear: any) {

        if (!this.bispdf && !this.oispdf) {
            return;
        }
        const overlayscalenudge = this.overlayScale + this.nudgeScalefactor;
        //var tx = (canvasowidth / 2);
        //var ty = (canvasoheight / 2);

        //documentopen = true;
        const ovrlOffsetX = this.overlayOffsetX + this.OffsetX;
        const ovrlOffsetY = this.overlayOffsetY + this.OffsetY;

        this.printobj.printctx.save();

        if (this.bispdf) {
            this.printobj.printctx.globalCompositeOperation = 'source-over';
            this.printobj.printctx.drawImage(this.bgpagecanvas, this.overlayOffsetX, this.overlayOffsetY, this.bgpagecanvas.width * this.overlayCScale, this.bgpagecanvas.height * this.overlayCScale);
        }
        if (this.oispdf) {
            this.printobj.printctx.globalCompositeOperation = 'darken';
            this.printobj.printctx.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * overlayscalenudge, this.ovpagecanvas.height * overlayscalenudge);
        }
        this.printobj.printctx.restore();


        /*if (this.pages[1].drotation == 0) {



        } else {
            contexto.save();
            contexto.translate(tx, ty);
            contexto.rotate(this.pages[1].drotation * (Math.PI / 180));
            contexto.translate(-tx, -ty);
            if (this.bispdf){
                contexto.globalCompositeOperation = 'source-over';
                contexto.drawImage(this.bgpagecanvas, this.overlayOffsetX, this.overlayOffsetY, this.bgpagecanvas.width * this.overlayCScale, this.bgpagecanvas.height * this.overlayCScale);
            }
            if (this.oispdf){
                contexto.globalCompositeOperation = 'darken';
                contexto.drawImage(this.ovpagecanvas, ovrlOffsetX, ovrlOffsetY, this.ovpagecanvas.width * this.overlayScale, this.ovpagecanvas.height * this.overlayScale);
            }

            contexto.restore();

        }*/


    }

    public draw_compare_print(refresh: boolean) {

        this.printobj.printctx.save();
        this.printobj.printctx.fillStyle = "rgb(255,255,255)";
        this.printobj.printctx.fillRect(0, 0, this.printobj.paperimage.width, this.printobj.paperimage.height);

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

        if (this.overlayready && this.backgroundready) {
            ///console.log('only once I hope');
            printCanvas(this.pageURL);

        }
        //
    }

}

