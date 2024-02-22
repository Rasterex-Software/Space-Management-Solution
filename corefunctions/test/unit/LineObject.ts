import { expect } from 'chai';
import { lineObject } from '../../src/internal';

// TODO:JS->TS:INFO should add more tests for lineObject
describe('LineObject', () => {

    it('can be initialized', () => {
        const data = {
            drawmode: 13,
            fillcolor: "#00FFFF",
            layer: 4,
            layerstate: 1,
            linewidth: 0,
            pen: 4,
            strokecolor: "#00FFFF",
            x1: 24860.923828125,
            x2: 23662.779296875,
            y1: 128036.203125,
            y2: 128036.203125
        }
        const parent = {
            backgroundrender: true,
            viewmode: 0
        }
        const blockname = 1
        const binary = true;

        const LineObject = new lineObject(data, parent, blockname, binary);

        expect(LineObject.blockname).to.equal(blockname);
        expect(LineObject.parent).to.equal(parent);
        expect(LineObject.layer).to.equal(data.layer);
        expect(LineObject.drawmode).to.equal(data.drawmode);
        expect(LineObject.pen).to.equal(data.pen);
        expect(LineObject.strokecolor).to.equal(data.strokecolor);
        expect(LineObject.fillcolor).to.equal(data.fillcolor);
        expect(LineObject.stroketempcolor).to.equal(data.strokecolor);
        expect(LineObject.filltempcolor).to.equal(data.fillcolor);
        expect(LineObject.layerstate).to.equal(data.layerstate);
        expect(LineObject.x1).to.equal(data.x1);
        expect(LineObject.y1).to.equal(data.y1);
        expect(LineObject.x2).to.equal(data.x2);
        expect(LineObject.y2).to.equal(data.y2);
    });
});