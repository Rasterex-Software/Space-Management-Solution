import { TemplateResult } from "lit-html";

export interface LegendOption {
    value: string;
    label?: string;
    color?: string;
}

export interface LegendDesignerType {
    name: string;
    options: LegendOption[];
    render(): TemplateResult;
    getSelectedOptions(): LegendOption[] | null;
    reset():void;
}