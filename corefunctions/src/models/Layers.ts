export class Layers {
    Layer: number;
    Name: string;
    Color: string;
    display: boolean;

    constructor(number: number, Color: string, Name: string, Display: boolean) {
        this.Layer = number;
        //this.Name = "Layer " + Number;
        this.Name = Name;
        this.Color = Color;
        this.display = Display;
    }
}
