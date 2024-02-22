export class Block3DObject {
    name: any;
    index: any;
    state: any;
    level: any;
    position: any;
    selected: boolean;

    constructor(name:any, index:any, state:any, level:any, listposition:any) {
        this.name = name;
        this.index = index;
        this.state = state;
        this.level = level;
        this.position = listposition;
        this.selected = false;
    }

    public setSelected(selected:any) {
        this.selected = selected;
    }
}

