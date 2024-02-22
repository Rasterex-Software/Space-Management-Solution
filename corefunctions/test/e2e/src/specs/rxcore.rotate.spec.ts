import { expect } from 'chai';
import Page from '../pages/page';

declare const RxCore: any;

describe('rxcore rotate', () => {
    before(() => {
        Page.init();
        Page.openDemoDocument('040915 MOBSLAKT.pdf');

        browser.execute(() => {
            RxCore.zoomFit();
        });
    });

    it('should rotate file', () => {
        const initialRotation = browser.execute(() => {
            return RxCore.getPageRotation();
        });

        const rotation = browser.execute(() => {
            RxCore.rotate(true);
            return RxCore.getPageRotation();
        });


        expect(initialRotation).to.not.be.equal(rotation);
    });

    it('should rotate file 180 degrees', () => {
        const rotation = browser.execute(() => {
            RxCore.rotate(false, 180);
            return RxCore.getPageRotation();
        });

        expect(rotation).to.be.equal(180);
    });

    it('should rotate page 90 degrees', () => {
        const rotation = browser.execute(() => {
            RxCore.rotatePage(0, 90);
            return RxCore.getPageRotation();
        });

        expect(rotation).to.be.equal(90);
    });
});