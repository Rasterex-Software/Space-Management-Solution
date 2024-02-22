import { expect } from 'chai';
import { point } from '../../src/internal';

describe('point', () => {

    it('can be initialized', () => {
        const x = 10;
        const y = 15;

        const pointObject = new point(x, y);

        expect(pointObject.x).to.equal(x);
        expect(pointObject.y).to.equal(y);
    });
});