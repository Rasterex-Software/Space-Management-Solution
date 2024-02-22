import { expect } from 'chai';
import { arcObject } from '../../src/internal';

// TODO:JS->TS:INFO should add more tests for ArcObject
describe('arcObject', () => {

    it('can be initialized', () => {
        const data = {
            aea: 1.8545904159545898,
            ar: 146.83140563964844,
            asa: -1.8545904159545898,
            ax: 24819.810546875,
            ay: 128177.1640625,
            clockwise: true,
            drawmode: 13,
            fillcolor: "#00FFFF",
            layer: 4,
            layerstate: 1,
            linewidth: 0,
            pen: 4,
            strokecolor: "#00FFFF"
        }
        const parent = {
            backgroundrender: true,
            viewmode: 0
        }
        const blockname = 1
        const binary = true;

        const ArcObject = new arcObject(data, parent, blockname, binary);

        expect(ArcObject.type).to.equal('arc');
        expect(ArcObject.blockname).to.equal(blockname);
        expect(ArcObject.layer).to.equal(data.layer);
        expect(ArcObject.drawmode).to.equal(data.drawmode);
        expect(ArcObject.clockwise).to.equal(data.clockwise);
        expect(ArcObject.strokecolor).to.equal(data.strokecolor);
        expect(ArcObject.fillcolor).to.equal(data.fillcolor);
        expect(ArcObject.stroketempcolor).to.equal(data.strokecolor);
        expect(ArcObject.filltempcolor).to.equal(data.fillcolor);
        expect(ArcObject.cx).to.equal(data.ax);
        expect(ArcObject.cy).to.equal(data.ay);
        expect(ArcObject.r).to.equal(data.ar);
        expect(ArcObject.sa).to.equal(data.asa);
        expect(ArcObject.ea).to.equal(data.aea);
    });
});