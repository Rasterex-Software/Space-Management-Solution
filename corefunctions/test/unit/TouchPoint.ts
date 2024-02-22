import { expect } from 'chai';
import { TouchPoint } from '../../src/internal';

describe('touchpoint', () => {

    it('can be initialized', () => {
        const touchID = 'demo';
        const x = 15;
        const y = 20;


        const touchPoint = new TouchPoint(touchID, x, y);

        expect(touchPoint.pointID).to.equal(touchID);
        expect(touchPoint.x).to.equal(x);
        expect(touchPoint.y).to.equal(y);
    });
});