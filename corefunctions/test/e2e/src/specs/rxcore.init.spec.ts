import { expect } from 'chai';
import Page from '../pages/page';

declare const RxCore: any;

describe('rxcore init', () => {

    before(() => {
        Page.init();
        Page.openDemoDocument('040915 MOBSLAKT.pdf');
    });

    it('should initialize RxCore', () => {
        // rxcanvas element exists only if RxCore was initialized
        const rxCanvas = $(Page.rxCanvas);

        expect(rxCanvas.isExisting()).to.equal(true);
    });

    it('should open only one file', () => {
        const result: any = browser.execute(() => {
            return {
                fileCount: RxCore.getOpenFiles()['length'],
            };
        });

        expect(result.fileCount).to.equal(1);
    });
});