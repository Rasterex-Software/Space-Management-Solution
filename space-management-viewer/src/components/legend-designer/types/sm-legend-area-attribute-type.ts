import { LitElement, html, property, queryAll } from "lit-element";
import { LegendDesignerType, LegendOption } from "../legend-designer-type";
import { getFileMarkups } from "../../../rx-helpers/markups";

let checkboxCounter = 0;
export class SmLegendAreaAttributeType extends LitElement implements LegendDesignerType {
    
    @queryAll('.form-check-input')
    private checkboxList: NodeListOf<HTMLInputElement>

    @property( {type: Array, reflect: false})
    public options: LegendOption[] = [];

    get name() {
        return 'Area Attribute';
    }

    public render() {
        const attributes = this.getAllMarkupsAttributes();
        
        return html`
            ${attributes.map(option => {
                checkboxCounter++;
                return html`
                    <div class="form-check">
                        <input class="form-check-input" 
                            type="radio" 
                            value="${option}"
                            name="space-attribute-radio"
                            id="tenant-checkbox-option-${checkboxCounter}"
                        >
                        <label class="form-check-label" for="tenant-checkbox-option-${checkboxCounter}"
                            style="text-transform: capitalize">
                            ${ option === 'Rx_Area'
                                ? 'Surface'
                                : option
                            }
                        </label>
                    </div>
                `
            })}
        `;
    }

    public reset() {
        // reset inputs after processing
        if (this.checkboxList) {
            this.checkboxList.forEach(checkbox => checkbox.checked = false)
        }
    }

    public getSelectedOptions() {
        if (this.checkboxList) {
            const selectedOption: LegendOption[] = [];
            this.checkboxList.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedOption.push({
                        value: checkbox.value,
                        label: (checkbox.nextElementSibling! as HTMLElement).innerText || undefined
                        // color:
                    });
                }
            });

            return selectedOption;
        }

        return null;
    }

    private getAllMarkupsAttributes() {
        const markups = getFileMarkups();
        // TODO: review, find a way to get default values from spacer or move edit attributes logic form spacer to viewer
        const uniqueAttributes = ['name', 'description', 'type'];
        const excludeAttributes = ['id', 'SpaceID', 'Rx_Area'];

        if (markups) {
            markups.forEach((markup: any) => {
                const attributes: Array<{name: string, value: string}> = markup.GetAttributes();
                
                if (attributes) {
                    attributes.filter(attribute => !excludeAttributes.includes(attribute.name)).forEach(attribute => {
                        if (!uniqueAttributes.includes(attribute.name)) {
                            uniqueAttributes.push(attribute.name);
                        }
                    })
                }
            });
        }

        return uniqueAttributes;
    }


}

window.customElements.define('sm-legend-area-attribute-type', SmLegendAreaAttributeType);