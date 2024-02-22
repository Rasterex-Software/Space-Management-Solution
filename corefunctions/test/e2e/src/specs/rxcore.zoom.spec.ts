import { expect } from 'chai';
import Page from '../pages/page';

declare const RxCore: any;

describe('rxcore zoom', () => {
    before(() => {
        Page.init();
        Page.openDemoDocument('demo11.xlsx');
    });

    it('should zoom fit', () => {
        const result:any = browser.execute(() => {
            RxCore.zoomFit();

            return {
                pageSize: RxCore.getAllPageDimensions()[0],
                canvasSize: RxCore.getCanvasSize()
            }
        });

        expect(result.canvasSize.w).to.equal(result.pageSize.w);
    });

    it('should zoom width', () => {
        const result:any = browser.execute(() => {
            RxCore.zoomWidth();

            return {
                pageSize: RxCore.getAllPageDimensions()[0],
                canvasSize: RxCore.getCanvasSize()
            }
        });
        expect(result.canvasSize.w).to.equal(result.pageSize.w);
    });


    it('should zoom height', () => {
        const result:any = browser.execute(() => {
            RxCore.zoomHeight();

            return {
                pageSize: RxCore.getAllPageDimensions()[0],
                canvasSize: RxCore.getCanvasSize()
            }
        });
        expect(result.canvasSize.h).to.equal(result.pageSize.h);
    });

    it('should zoom in', () => {
        const initialPageDimension:any = browser.execute(() => {
            return RxCore.getAllPageDimensions()[0]
        });

        const pageDimension:any = browser.execute(() => {
            RxCore.zoomIn();

            return RxCore.getAllPageDimensions()[0]
        });
        expect(initialPageDimension.w).to.be.below(pageDimension.w);
    });

    it('should zoom out', () => {
        const initialPageDimension:any = browser.execute(() => {
            return RxCore.getAllPageDimensions()[0]
        });

        const pageDimension:any = browser.execute(() => {
            RxCore.zoomOut();

            return RxCore.getAllPageDimensions()[0]
        });
        expect(initialPageDimension.w).to.be.above(pageDimension.w);
    });

    it('should zoom window', () => {
        browser.execute(() => {
            RxCore.zoomWindow(true);
        });

        const x = Math.round(Page.getSize().width / 3);
        const y = Math.round(Page.getSize().height / 3);

        Page.moveTo(x, y);
        Page.buttonDown();
        browser.pause(10);
        Page.moveTo(x + 300, y + 300);
        Page.buttonUp();
        browser.pause(100);

        const result:any = browser.execute(() => {
            return {
                pageSize: RxCore.getAllPageDimensions()[0],
                canvasSize: RxCore.getCanvasSize()
            }
        });

        expect(result.pageSize.w).to.be.above(result.canvasSize.w);
    });
});