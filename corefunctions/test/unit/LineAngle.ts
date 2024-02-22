import { expect } from 'chai';
import { lineangle } from '../../src/internal';

describe('lineangle', () => {

    it('can be initialized', () => {
        const startx = 10;
        const starty = 15;
        const endx = 20;
        const endy = 25;

        const lineangleObject = new lineangle(startx, starty, endx, endy);

        expect(lineangleObject.startx).to.equal(startx);
        expect(lineangleObject.starty).to.equal(starty);
        expect(lineangleObject.endx).to.equal(endx);
        expect(lineangleObject.endy).to.equal(endy);

    });
});