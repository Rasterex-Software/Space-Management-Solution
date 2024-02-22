import { expect } from 'chai';
import { Rectangle } from '../../src/internal';

describe('Rectangle', () => {

    it('can be initialized', () => {
        const x = 10;
        const y = 10;
        const w = 10;
        const h = 10;

        const rectangle = new Rectangle(x, y, w, h);

        expect(rectangle.x).to.equal(x);
        expect(rectangle.y).to.equal(y);
        expect(rectangle.w).to.equal(w);
        expect(rectangle.h).to.equal(h);
    });
});