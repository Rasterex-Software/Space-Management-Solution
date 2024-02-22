import { expect } from 'chai';
import { BlockObject } from '../../src/internal';

describe('BlockObject', () => {

    it('can be initialized', () => {
        const index = 1;
        const name = 'test block';
        const state = 1;
        const color = '#fff';

        const blockObject = new BlockObject(index, name, state, color);

        expect(blockObject.index).to.equal(index);
        expect(blockObject.name).to.equal(name);
        expect(blockObject.state).to.equal(state);
        expect(blockObject.color).to.equal(color);
    });
});