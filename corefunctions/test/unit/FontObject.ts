import { expect } from 'chai';
import { FontObject } from '../../src/internal';

describe('FontObject', () => {

    const fontStringHelper = function(bold:boolean, italic:boolean, height:number, fontName:string) {
        const fontString = ((bold===true)?'bold ':'')
            + ((italic===true)?'italic ':'')
            + ((bold===false && italic===false)?'normal ':'')
            + (height + 'pt ')
            + fontName;
        return fontString;
    };

    it('can be initialized', () => {
        const fontName = 'helvetica';
        const fontHeight = 16;
        const fontBold = true;
        const fontItalic = false;

        const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);

        expect(fontObject.fontName).to.equal(fontName);
        expect(fontObject.height).to.equal(fontHeight);
        expect(fontObject.bold).to.equal(fontBold);
        expect(fontObject.italic).to.equal(fontItalic);

    });
    it('fontstring is generated from internal properties (bold true, italic false) ', () =>{
        const fontName = 'helvetica';
        const fontHeight = 16;
        const fontBold = true;
        const fontItalic = false;

        const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);
        const fontString = fontStringHelper(fontBold, fontItalic, fontHeight, fontName);

        expect(fontObject.fontstring).to.equal(fontString);
    });
    it('fontstring is generated from internal properties (bold false, italic true) ', () =>{
        const fontName = 'helvetica';
        const fontHeight = 16;
        const fontBold = false;
        const fontItalic = true;

        const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);
        const fontString = fontStringHelper(fontBold, fontItalic, fontHeight, fontName);

        expect(fontObject.fontstring).to.equal(fontString);
    });
    it('fontstring is generated from internal properties (bold false, italic false) ', () =>{
        const fontName = 'helvetica';
        const fontHeight = 16;
        const fontBold = false;
        const fontItalic = false;

        const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);
        const fontString = fontStringHelper(fontBold, fontItalic, fontHeight, fontName);

        expect(fontObject.fontstring).to.equal(fontString);
    });
    // TODO:JS->TS:FIX
    // it('both italic and bold can be used at the same time', () =>{
    //     const fontName = 'helvetica';
    //     const fontHeight = 16;
    //     const fontBold = true;
    //     const fontItalic = true;
    //
    //     const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);
    //     const fontString = fontStringHelper(fontBold, fontItalic, fontHeight, fontName);
    //
    //     expect(fontObject.fontstring).to.equal(fontString);
    // });
    it('fontstringscaled is generated from internal properties ', () =>{
        const fontName = 'helvetica';
        const fontHeight = 16;
        const fontScale = 1.5;
        const fontBold = true;
        const fontItalic = false;
        const scaledHeight = fontHeight * fontScale;

        const fontObject = new FontObject(fontName, fontHeight, fontBold, fontItalic);
        fontObject.setScale(fontScale);
        const fontStringScaled = fontStringHelper(fontBold, fontItalic, scaledHeight, fontName);

        expect(fontObject.fontstringScaled).to.equal(fontStringScaled);
    });


});