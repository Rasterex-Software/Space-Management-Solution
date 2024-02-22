export class BlockObject {
    index: number;
    name: string;
    state: number;
    defaultstate: number;
    defaultcolor: string;
    color: string;
    overridecolor: boolean;
    selected: boolean;

    constructor(index: number, name: string, state:number, color: string) {
        this.index = index;
        this.name = name;
        this.state = state;
        this.defaultstate = state;
        this.defaultcolor = color;
        this.color = color;
        this.overridecolor = false;
        this.selected = false;

        //BloclistGUIContainer
        //BlocksContainer.Addblock(this.index,this.name,this.state);
        /*var nametd = "<TD>" + this.name + "</TD>";
    
         if (this.state == 1){
         var checkboxtd = "<TD>" + "<input type='checkbox' name='"+ this.name + "' value='On' checked onChange='VturnBlockOnOff(" + "\"" +  this.name + "\"" + ")'>"+"</TD>\n";
         }else{
         checkboxtd = "<TD>" + "<input type='checkbox' name='"+ this.name + "' value='Off' onChange='VturnBlockOnOff(" + "\"" + this.name + "\"" + ")'>"+"</TD>\n";
         }
    
         this.tableline = '<TR>' + nametd + checkboxtd + '</TR>';*/
    };
} 