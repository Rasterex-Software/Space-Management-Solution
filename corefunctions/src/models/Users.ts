export class Users {
    display: boolean;
    Signature: string;
    DisplayName: string;
    Layer: number;
    Color: string;

    //TODO: JS->TS: CHECK maybe params names should be same as internal properties, creates confusion
    constructor (Signature:string,  DispName:string, Layer:number, Color:string) {
        this.Signature = Signature;
        this.DisplayName = DispName;
        this.Layer = Layer;
        this.Color = Color;
        this.display = true;
    };
}