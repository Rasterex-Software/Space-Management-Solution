import { expect } from 'chai';
import { circleObject } from '../../src/internal';

// TODO:JS->TS:INFO should add more tests for circleObject
describe('circleObject', () => {

    it('can be initialized', () => {
        const data = {
            cr: 46.98604965209961,
            cx: 162906.25,
            cy: 90836.6953125,
            drawmode: 13,
            fillcolor: "#FF00FF",
            filled: 0,
            layer: 5,
            layerstate: 1,
            linewidth: 0,
            pen: 6,
            strokecolor: "#FF00FF",
        }
        const parent = {
            backgroundrender: true,
            blocklist: [
                {color: "#FFFFFF",defaultcolor: "#FFFFFF",defaultstate: 1,index: 0,name: "Main",overridecolor: false,selected: false,state: 1},
                {color: "#FFFFFF",defaultcolor: "#FFFFFF",defaultstate: 1,index: 1,name: "CHAIR7",overridecolor: false,selected: false,state: 1},
                {color: "#00FFFF",defaultcolor: "#00FFFF",defaultstate: 1,index: 2,name: "Block 0",overridecolor: false,selected: false,state: 1},
                {color: "#00FFFF",defaultcolor: "#00FFFF",defaultstate: 1,index: 3,name: "DIGITIZE",overridecolor: false,selected: false,state: 1}
            ],
            selectColor: "rgba(191,58,209,0.3)",
            viewmode: 0
        }
        const blockname = 3
        const binary = true;

        const CircleObject = new circleObject(data, parent, blockname, binary);

        expect(CircleObject.blockname).to.equal(blockname);
        expect(CircleObject.type).to.equal('circle');
        expect(CircleObject.layer).to.equal(data.layer);
        expect(CircleObject.drawmode).to.equal(data.drawmode);
        expect(CircleObject.filled).to.equal(data.filled);
        expect(CircleObject.strokecolor).to.equal(data.strokecolor);
        expect(CircleObject.fillcolor).to.equal(data.fillcolor);
        expect(CircleObject.stroketempcolor).to.equal(data.strokecolor);
        expect(CircleObject.filltempcolor).to.equal(data.fillcolor);
        expect(CircleObject.cx).to.equal(data.cx);
        expect(CircleObject.cy).to.equal(data.cy);
        expect(CircleObject.r).to.equal(data.cr);
    });
});