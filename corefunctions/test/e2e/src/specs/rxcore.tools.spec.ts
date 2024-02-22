import { expect } from 'chai';
import Page from '../pages/page';

declare const RxCore: any;

describe('rxcore tools', () => {
    before(() => {
        Page.init();
        Page.openDemoDocument('040915 MOBSLAKT.pdf');
        browser.execute(() => {
            RxCore.zoomFit();
        });
    });


    it('should draw area markup', () => {
        const id = 'markup_type_area';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpArea(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x + 200, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();
        Page.moveTo(x + 200, y - 200);
        Page.click();
        Page.moveTo(x, y - 100);
        Page.doubleClick();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(8);
    });

    it('should draw arrow markup type 0', () => {
        const id = 'markup_type_arrow_0';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpArrow(true, 0);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(6);
        expect(markup.subtype).to.equal(0);
    });

    it('should draw arrow markup type 1', () => {
        const id = 'markup_type_arrow_1';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpArrow(true, 1);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(6);
        expect(markup.subtype).to.equal(1);
    });

    it('should draw arrow markup type 2', () => {
        const id = 'markup_type_arrow_2';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpArrow(true, 2);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(6);
        expect(markup.subtype).to.equal(2);
    });

    it('should draw arrow markup type 3', () => {
        const id = 'markup_type_arrow_3';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpArrow(true, 3);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(6);
        expect(markup.subtype).to.equal(3);
    });

    it('should draw circle markup', () => {
        const id = 'markup_type_circle';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markupCircle(true);
        });

        const x = Math.round(Page.getSize().width / 2);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 100, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(4);
        expect(markup.subtype).to.equal(1);
    });

    it('should draw dimension markup type 0', () => {
        const id = 'markup_type_dimension_0';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpDimension(true, 0);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(7);
        expect(markup.subtype).to.equal(0);
    });

    it('should draw dimension markup type 1', () => {
        const id = 'markup_type_dimension_1';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpDimension(true, 1);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(7);
        expect(markup.subtype).to.equal(1);
    });

    it('should draw dimension markup type 2', () => {
        const id = 'markup_type_dimension_2';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpDimension(true, 2);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(7);
        expect(markup.subtype).to.equal(2);
    });

    it('should draw freepen markup', () => {
        const id = 'markup_type_freepen';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpFreePen(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.buttonDown();
        Page.moveTo(x + 50, y);
        Page.moveTo(x + 100, y + 50);
        Page.moveTo(x, y + 100);
        Page.buttonUp();

        // after drawing freepen markup you must call the method again with 'false' param
        browser.execute(() => {
            RxCore.markUpFreePen(false);
        });

        Page.moveTo(x, y);

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(0);
        expect(markup.subtype).to.equal(0);
    });

    it('should draw highlight markup', () => {
        const id = 'markup_type_highlight';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpHighlight(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.buttonDown();
        Page.moveTo(x + 200, y + 100);
        Page.buttonUp();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(3);
        expect(markup.subtype).to.equal(3);
    });

    it('should draw measurePath markup', () => {
        const id = 'markup_type_measure';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markupMeasurePath(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        Page.moveTo(x + 200, y);
        Page.click();
        Page.moveTo(x + 200, y + 100);
        Page.click();
        Page.moveTo(x + 100, y + 200);
        Page.doubleClick();

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(1);
        expect(markup.subtype).to.equal(3);
    });


    it('should draw note markup', () => {
        const id = 'markup_type_note';
        Page.setMarkupID(id);

        (browser as any).execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpNote(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();

        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        (browser as any).execute((text:string) => {
            RxCore.setNoteText(text);
        }, text)

        const markup = Page.getMarkupByID(id);

        expect(markup.uniqueID).to.equal(id);
        expect(markup.type).to.equal(10);
        expect(markup.subtype).to.equal(0);
        expect(markup.text).to.equal(text);
    });
});