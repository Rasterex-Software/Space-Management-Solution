import { expect } from 'chai';
import { Layers } from '../../src/internal';

describe('Layers', () => {

    it('can be initialized', () => {
        const number = 1;
        const color = 'blue';
        const name = 'Sam';
        const display = true;

        const layer = new Layers(number, color, name, display);

        expect(layer.Layer).to.equal(number);
        expect(layer.Color).to.equal(color);
        expect(layer.Name).to.equal(name);
        expect(layer.display).to.equal(display);
    });
});