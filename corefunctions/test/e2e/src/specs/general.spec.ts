import { expect } from 'chai';
import Page from '../pages/page';

declare const RxCore: any;

describe('general', () => {
    // runs before all tests in this block
    before(() => {
        Page.init();
        Page.openDemoDocument('040915 MOBSLAKT.pdf');
        browser.execute(() => {
            RxCore.zoomFit();
        });
    });

    it('should initialize RxCore', () => {
        // rxcanvas element exists only if RxCore was initialized
        const rxCanvas = $(Page.rxCanvas);

        expect(rxCanvas.isExisting()).to.equal(true);
    });

    it('should open pdf file', () => {
        const result: any = browser.execute(() => {
            return {
                fileCount: RxCore.getOpenFiles()['length'],
                is_pdf: RxCore.getOpenFiles()[0].isPDF
            };
        });

        //browser.debug();
        // rxcanvas element exists only if RxCore was initialized
        const rxCanvas = $(Page.rxCanvas);

        expect(rxCanvas.isExisting()).to.equal(true);
        expect(result.fileCount).to.equal(1);
        expect(result.is_pdf).to.equal(true);
    });

    it('should draw arrow markup', () => {
        const id = 'markup_build_with_webdriverio';

        (browser as any).execute((id:string) => {
            RxCore.zoomFit();
            const onMarkUpFinished = (markup, operation) => {
                if (operation.created) {
                    markup.setUniqueID(id);
                }
            }
            RxCore.GUI_Markup.connect(onMarkUpFinished);
            RxCore.markUpArrow(true, 1);
        }, id);

        const x = Math.round(Page.getSize().width / 2);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y - 200);
        Page.click();
        Page.moveTo(x + 30, y);
        browser.pause(5);
        Page.moveTo(x + 70, y + 100);
        browser.pause(5);
        Page.moveTo(x + 100, y + 200);
        Page.click();

        const result: any = (browser as any).execute((id:string) => {
            return {
                markup_id: RxCore.getmarkupobjByGUID(id).uniqueID
            }
        }, id);

        expect(result.markup_id).to.equal(id);
    });

    it('should draw free pen markup', () => {
        browser.execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpFreePen(true);
        });

        let x = Math.round(Page.getSize().width / 3);
        let y = Math.round(Page.getSize().height / 3);

        Page.moveTo(x, y)
        Page.buttonDown()
        for (let i = 0; i < 200; i += 20) {
            browser.pause(5);
            Page.moveTo(x + i, y)
        }

        x += 200;
        for (let i = 0; i < 200; i += 20) {
            browser.pause(5);
            Page.moveTo(x - i, y + i)
        }

        x -= 200;
        y += 200;
        for (let i = 0; i < 240; i += 20) {
            browser.pause(5);
            Page.moveTo(x + i, y)
        }

        Page.buttonUp()

        const result: any = browser.execute(() => {
            RxCore.markUpFreePen(false);
            return {
                length: RxCore.GUI_Markuplist.markupList['length']
            }
        });

        browser.pause(5);
        Page.moveTo(100, 100);

        expect(result.length).to.equal(1);
    })

    it('should draw circle shape markup', () => {
        browser.execute(() => {
            RxCore.clearMarkup();
            RxCore.markUpShape(true, 1);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 3);

        Page.moveTo(x, y)
        Page.buttonDown()
        for (let i = 0; i < 300; i += 30) {
            browser.pause(5);
            Page.moveTo(x + i, y + i)
        }
        Page.buttonUp()

        const result: any = browser.execute(() => {
            return {
                length: RxCore.GUI_Markuplist.markupList['length']
            }
        });

        browser.pause(5);
        Page.moveTo(100, 100);

        expect(result.length).to.equal(1);
    });

    it('should measure path', () => {
        browser.execute(() => {
            RxCore.clearMarkup();
            RxCore.markupMeasurePath(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.click();
        browser.pause(10);
        Page.moveTo(x + 200, y);
        browser.pause(10);
        Page.doubleClick();

        const result: any = browser.execute(() => {
            return {
                length: RxCore.GUI_Markuplist.markupList['length']
            }
        });

        expect(result.length).to.equal(1);
    });

    it('should draw text markup', () => {
        browser.execute(() => {
            RxCore.clearMarkup();
            function textInputCallback(rect) {
                const textarea = document.getElementById('textinput');
                textarea.style.display = 'block';
                textarea.style.position = 'fixed';
                textarea.style.left = rect.x + 'px';
                textarea.style.top = rect.y + 'px';
                textarea.style.width = rect.w + 'px';
                textarea.style.height = rect.h + 'px';
                textarea.style.zIndex = '2000';
            }
            RxCore.GUI_TextInput.connect(textInputCallback);
            RxCore.markUpTextRect(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 2);

        Page.moveTo(x, y);
        Page.buttonDown();
        browser.pause(10);
        Page.moveTo(x + 200, y + 100);
        Page.buttonUp();
        ($(Page.canvasID) as any).waitForDisplayed(3000);

        const textareaElem = $('#textinput');
        textareaElem.click();

        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        textareaElem.setValue(text);

        const result = (browser as any).execute((value:string) => {
            RxCore.GUI_TextInput.setText(value);
            document.getElementById('textinput').style.display = 'none';

            return RxCore.GUI_Markuplist.markupList[0].text;
        }, textareaElem.getValue());

        Page.moveTo(x, y);
        Page.click();

        expect(result).to.equal(text);
    });

});