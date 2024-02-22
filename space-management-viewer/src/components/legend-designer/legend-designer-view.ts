import { TemplateResult } from "lit-html";
import { LegendOption } from "./legend-designer-type";

export interface LegendDesignerView {
    name: string;
    options: LegendOption[];
    active: boolean;
    render(): TemplateResult;
    highlightOption(option: any, highlight: boolean): void;
    highlightAll(highlight: boolean): void;
}