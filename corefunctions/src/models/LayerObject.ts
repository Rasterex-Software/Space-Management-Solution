import {
    decimalToHex
} from '../internal';

export class LayerObject {
    index: number;
    color: string;
    state: number;
    isplottable: number;
    defaultstate: number;
    name: string;

    // TODO:JS->TS:CHECK binary param seems to not be used
    constructor (layerxmldata: DataView, binary: boolean) {

        // TODO:JS->TS:CHECK parseInt() seems to be redundant because getInt32() returns number, toString() was added in order to pass compilation
        this.index = parseInt(layerxmldata.getInt32(0, true).toString());
        const ncolor = parseInt(layerxmldata.getInt32(4, true).toString());
        this.color = decimalToHex(ncolor);
        const statevar = parseInt(layerxmldata.getInt32(8, true).toString());
        this.state = statevar;
        this.isplottable = parseInt(layerxmldata.getInt32(12, true).toString());
        this.defaultstate = statevar;

        let nname = layerxmldata.getUint16(16, true);
        let lname = (nname == 0) ? " " : String.fromCharCode(nname);

        let i = 18;
        while (i <= 128) {

            nname = layerxmldata.getUint16(i, true);
            lname += (nname == 0) ? " " : String.fromCharCode(nname);
            i += 2;
        }
        this.name = lname;
    }

    public turnLayerOnOff = function (index:number) {

    };
}
