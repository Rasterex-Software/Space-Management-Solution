import { LitElement, html, property, queryAll, query } from "lit-element";
import { LegendDesignerType, LegendOption } from "../legend-designer-type";
import { connect } from "pwa-helpers/connect-mixin";
import { store, RootState } from "../../../redux/store";
import { tenantsSelector } from "../../../redux/reducers/tenants";
import '@material/mwc-switch/';

let checkboxCounter = 0;

export class SmLegendTenantType extends connect(store)(LitElement) implements LegendDesignerType {
    
    @queryAll('.form-check-input')
    private checkboxList: NodeListOf<HTMLInputElement>

    @query('mwc-switch')
    private switchElem: any;
    
    @property( {type: Array, reflect: false})
    public options: LegendOption[] = [];

    get name() {
        return 'Tenant';
    }

    protected createRenderRoot() {
        return this;
    }

    public render() {
        return html`
            <p>
                <span class="switch-label">Legend Options</span>
                <mwc-switch
                    class="overview-switch"
                    @click=${this.onSelectAll}>
                </mwc-switch></p>
            </p>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Free Space" id="tenant-checkbox-option-${checkboxCounter}">
                <label class="form-check-label" for="tenant-checkbox-option-${checkboxCounter}">
                    Free Space
                </label>
            </div>

            ${this.options.map(option => {
                checkboxCounter++;
                return html`
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${option.value}" id="tenant-checkbox-option-${checkboxCounter}">
                        <label class="form-check-label" for="tenant-checkbox-option-${checkboxCounter}">
                            ${option.label}
                        </label>
                    </div>
                `
            })}
        `;
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

    public reset() {
        // reset inputs after processing
        if (this.checkboxList) {
            this.checkboxList.forEach(checkbox => checkbox.checked = false)
        }
        this.switchElem.checked = false;
    }


    public stateChanged(state: RootState) {
        const tenants = tenantsSelector(state);
        if (tenants) {
            this.options = tenants.map((tenant) => {
                return { 
                    value: tenant.id+'',
                    label: tenant.firstName + ' ' + tenant.lastName,
                    color: tenant.color
                };
            });
        }
    }

    private onSelectAll(e: any) {
        const checked = !e.target.checked;

        if (this.checkboxList) {
            this.checkboxList.forEach(checkbox => checkbox.checked = checked)
        }
    }

}

window.customElements.define('sm-legend-tenant-type', SmLegendTenantType);