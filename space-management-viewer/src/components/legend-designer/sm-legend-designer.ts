import { LitElement, html, property, query } from "lit-element";
import { LegendDesignerType } from "./legend-designer-type";
import { SmLegendTenantType } from './types/sm-legend-tenant-type';
import { SmLegendAreaAttributeType } from "./types/sm-legend-area-attribute-type";
import { createLegend } from "../../redux/actions/legends";
import { store, RootState } from "../../redux/store";
import { connect } from "pwa-helpers/connect-mixin";
import { RxLegendsState } from "../../redux/reducers/legends";
import './views/sm-legend-tenant-view';
import { SmLegendTenantView } from "./views/sm-legend-tenant-view";
import { LegendDesignerView } from "./legend-designer-view";
import { SmLegendAreaAttributeView } from "./views/sm-legend-area-attribute-view";

export class SmLegendDesigner extends connect(store)(LitElement) {
    
    private types: LegendDesignerType[] = [];
    private legends: RxLegendsState;
    private views: {[key:string]:LegendDesignerView} = {};

    @query('#legend-designer-form')
    private form: HTMLFormElement;

    @query('#legend-name')
    private nameInput: HTMLInputElement;

    @property({ type: Object, reflect: false })
    private selectedType: LegendDesignerType | null = null;

    public constructor() {
        super();

        this.types.push(
            new SmLegendTenantType(),
            new SmLegendAreaAttributeType()
        )
    }

    protected createRenderRoot() {
        return this;
    }
 
    protected render() {
        return html`
            <form id="legend-designer-form" class="needs-validation" novalidate>
                <div class="form-group">
                    <label>Legend name</label>
                    <input 
                        type="text" 
                        id="legend-name" 
                        class="form-control" 
                        required
                        @keyup=${this.onKeyupValidation} 
                    />
                    <div class="invalid-feedback">
                        Please enter a name.
                    </div>
                </div>

                <div class="form-group">
                    <label>Legend type</label>
                    <select class="form-control legend-designer-type" @change=${this.onSelectType} required>
                        <option value="" .selected=${this.selectedType === null}>---</option>
                        ${this.types.map((type) => {
                            return html`<option value=${type.name}>${type.name}</option>`
                        })}
                    </select>
                    <div class="invalid-feedback">
                        Please choose a type.
                    </div>
                </div>

                ${this.selectedType !== null 
                    ? this.selectedType
                    : ``
                }
            </form>
        `;
    }

    public createLegend() {
        // validate unique name
        const name = this.nameInput.value
        if (name !== '' && this.legendExists(name)) {
            this.sameLegendNameMessage();
        }
        
        if(this.form.checkValidity() === false) {
            this.form.classList.add('was-validated');
            return false;
        }
        
        // get selected options of selected type
        if (this.selectedType) {
            const options = this.selectedType.getSelectedOptions();
            store.dispatch(createLegend(name, this.selectedType.name, options));
        }

        // reset inputs
        this.reset();

        return true;
    }

    public reset() {
        this.form.classList.remove('was-validated');
        if (this.selectedType !== null) {
            this.selectedType.reset();
            this.selectedType = null;
        }
        this.nameInput.value = '';
    }

    public stateChanged(state: RootState) {
        this.legends = state.legends;
    }

    public getLegendView(key: string) {
        // deselect all views
        for (const key in this.views) {
            if (this.views.hasOwnProperty(key)) {
                this.views[key].active = false;
                
            }
        }

        // if view exist for key return that view
        if (this.views.hasOwnProperty(key)) {
            this.views[key].active = true;
            return this.views[key]
        }

        // create view
        if (this.legends.hasOwnProperty(key)) {
            const legend = this.legends[key];
            let view: LegendDesignerView;
            
            switch (legend.type) {
                case 'Tenant':
                    view = new SmLegendTenantView();
                    view.name = legend.name || '';
                    view.options = legend.options || [];
                    view.active = true;
                    this.views[key] = view;

                    return view;
                case 'Area Attribute':
                    view = new SmLegendAreaAttributeView();
                    view.name = legend.name || '';
                    view.options = legend.options || [];
                    view.active = true;
                    this.views[key] = view;

                    return view;
                default:
                    return html``;
            }
        }

        return html``;
    }

    private onSelectType(e: any) {
        const selectedIndex = e.target.selectedIndex;
        if (selectedIndex === 0) {
            this.selectedType = null;
        } else {
            this.selectedType = this.types[selectedIndex - 1];
        }
    }

    private legendExists(name: string) {
        // legend key is generated from name by replacing spaces with underscores
        const key = name.replace(/ /g,"_");
        
        if (this.legends.hasOwnProperty(key)) {
            return true;
        }

        return false
    }

    private onKeyupValidation(e: Event) {
        const input = e.target as HTMLInputElement;
        
        if (input.value !== '' && input.checkValidity() === false) {
            if (!this.legendExists(name)) {
                input.setCustomValidity('');
            } else {
                this.sameLegendNameMessage();
            }
        }

        if (input.value === '') {
            input.setCustomValidity('Please enter a name.');
            input.nextElementSibling!.textContent = 'Please enter a name.';
        }
    }

    private sameLegendNameMessage() {
        this.nameInput.setCustomValidity("A legend with the same name already exists.");
        this.nameInput.nextElementSibling!.textContent = this.nameInput.validationMessage;
        this.form.classList.add('was-validated');
    }
}

window.customElements.define('sm-legend-designer', SmLegendDesigner);