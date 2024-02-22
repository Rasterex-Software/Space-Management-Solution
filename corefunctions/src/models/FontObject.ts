export class FontObject {

    // TODO:JS->TS:FIX rename properties
    public scale: number = 1;
    public fontstring = "";
    public fontstringScaled = "";
    public fontName: string = "";
    public height: number = 14;
    public bold: boolean = false;
    public italic: boolean = false;

    constructor(fontName: string,
                height: number,
                bold: boolean,
                italic: boolean) {

        this.fontName = fontName;
        this.height = height;
        this.bold = bold;
        this.italic = italic;
        this.updateFont();
    }

    public setFontname(fontName: string) {
        this.fontName = fontName;
        this.updateFont();
    };

    public setHeight(height: number) {
        this.height = height;
        this.updateFont();
    };

    public setBold(bOnOff: boolean) {
        this.bold = bOnOff;

        if (bOnOff) {
            this.italic = false;
        }

        this.updateFont();
    };

    public setItalic(bOnOff: boolean) {
        this.italic = bOnOff;

        if (bOnOff) {
            this.bold = false;
        }

        this.updateFont();
    };

    public setScale(scale: number) {
        this.scale = scale;
        this.updateFont();
    };

    private updateFont() {
        // TODO:JS->TS:FIX create a separate method ( maybe public ) for scaledHeight
        // TODO:JS->TS:CHECK should this be rounded to a fixed number of decimal points?
        const scaledHeight = this.height * this.scale;

        // TODO:JS->TS:CHECK This will never allow a font to be bold and italic at the same time
        if (this.bold) {
            this.fontstring = "bold " + this.height + "pt " + this.fontName;
            this.fontstringScaled = "bold " + scaledHeight + "pt " + this.fontName;
        } else if (this.italic) {
            this.fontstring = "italic " + this.height + "pt " + this.fontName;
            this.fontstringScaled = "italic " + scaledHeight + "pt " + this.fontName;
        } else {
            this.fontstring = "normal " + this.height + "pt " + this.fontName;
            this.fontstringScaled = "normal " + scaledHeight + "pt " + this.fontName;
        }
    }
}