declare var RxCore: any;

import { css, html, LitElement, property, query } from 'lit-element';
import { sharedStyles } from './shared-styles';
import { calibration } from './utils/calibration-units';

import './base-components/rx-spacer-switch';

import { RasterexSpacerModal } from './base-components/rx-spacer-modal';

import store, { RootState } from './store';
import { removeField, toggleField } from './store/actions';
import { AreaAttribute } from './store/reducers';
import { connect } from './utils/connect-mixin';

export class RasterexSpacerSettings extends connect(store)(LitElement) {

    @query('#modal')
    private modal: RasterexSpacerModal;

    @query('.nav-tabs')
    private navTabs: HTMLElement;

    @query('.tab-content')
    private tabContent: HTMLElement;

    // TODO: change hardcoded position
    @property({ type: String, reflect: false })
    private unitType = 'Metric';

    // TODO: change hardcoded position
    @property({ type: String, reflect: false })
    private unit = 'Meter';

    // TODO: change hardcoded position
    @property({ type: String, reflect: false })
    private scale = '1:1';

    @property({ type: Array, reflect: false })
    private fields: AreaAttribute[] = [];

    private readonly lineWidth =  '1';

    public static get styles() {
        return [
            sharedStyles,
            css`
            .footer {
                margin-top: 20px;
            }
            .nav-tabs {
                background-color: #33b5e5;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
                padding: 5px;
                border-radius: 5px;
                margin-top: -40px;
                display: flex;
                list-style: none;
                color: #fff;
                text-align: center;
            }

            .nav-tabs li {
                flex: 1;
                padding: 6px;
                border-radius: 5px;
            }

            .nav-tabs li:hover {
                cursor: pointer
            }

            .nav-tabs li.active {
                background-color: rgba(0,0,0,.2);
            }
            .tab-content {
                min-width: 420px;
            }
            .tab-pane {
                display: none;
            }

            .tab-pane.active {
                display: block;
            }

            #fields-settings ul li {
                margin-bottom: 10px;
            }

            #fields-settings ul li rx-spacer-switch {
                margin-left: 10px;
                vertical-align: middle;
            }

            .remove {
                border: 1px solid #f00;
                color: #f00;
                border-radius: 50%;
                display: inline-block;
                font-size: 12px;
                line-height: 20px;
                margin-left: 10px;
                padding: 0;
                text-align: center;
                width: 20px;
            }

            .remove:hover {
                cursor: pointer;
            }

            .hidden {
                display: none;
            }
            `,
        ];
    }

    protected render() {
        return html`
            <rx-spacer-modal id="modal" hideTitlebar>
                <div slot="content">
                    <ul class="nav-tabs" @click=${this.setActiveTab}>
                        <li class="active" target="#calibration-settings">
                            Calibration
                        </li>
                        <li target="#fields-settings">
                            Fields
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div id="calibration-settings" class="tab-pane active">
                            <p>Units</p>
                            <div class="form-inline">
                                <div class="form-group">
                                    <select disabled
                                        class="form-control"
                                        id="calibrationUnitTypes"
                                        @change=${this.onUnitTypeSelect}>
                                        ${calibration.UNIT_TYPES.map((value) => html`
                                            <option ?selected=${value === this.unitType}>${value}</option>
                                        `)}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select disabled
                                        class="form-control"
                                        id="calibrationUnitTypes"
                                        @change=${this.onUnitSelect}>
                                        ${(calibration.UNITS as any)[this.unitType].map((value: string) => html`
                                            <option ?selected=${value === this.unit}>${value}</option>
                                        `)}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" id="calibrationUnitTypes"
                                        @change=${this.onScaleSelect}>
                                        ${calibration.SCALES.map((value) => html`
                                            <option ?selected=${value === this.scale}>${value}</option>
                                        `)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div id="fields-settings" class="tab-pane">
                            <p>Fields</p>
                            <ul>
                                ${this.fields.map((field) => html`
                                    <li>
                                        <span>${field.label}</span>
                                        <rx-spacer-switch ?checked=${field.isVisible} .name=${field.name}
                                            @change=${this.toggleField}>
                                        </rx-spacer-switch>
                                        <span class="remove hidden" @click="${this.removeField}" .name=${field.name}>
                                            -
                                        </span>
                                    </li>
                                `)}
                            </ul>
                        </div>
                    </div>

                    <div class="footer">
                        <hr>
                        <button type="submit" class="save-button" @click=${this.applySettings}>Apply</button>
                    </div>
                </div>
            </rx-spacer-modal>
        `;
    }

    protected firstUpdated() {
        // TODO: maybe add  input for this in settings form
        RxCore.setGlobalStyle(true);
        RxCore.setLineWidth(this.lineWidth);
        RxCore.setGlobalStyle(true);

        this.applySettings();
    }

    public stateChanged(state: RootState) {
        this.fields = state.rxspacer.areaAttributes;
    }

    public getAllAreaProperties() {
        return this.fields;
    }

    public getAreaPropertyValue(propName: string) {
        const prop = this.fields.find((field) => field.name === propName);

        if (prop) {
            if (prop.type === 'select') {
                return prop.options;
            }

            return prop.label;
        }

        return undefined;
    }

    public toggleModal() {
        if (this.modal.active) {
            this.modal.active = false;
        } else {
            this.modal.active = true;
        }
    }

    private onUnitTypeSelect(e: Event) {
        const value = (e.target as HTMLSelectElement).value;
        this.unitType = value;
        // TODO: change hardcoded position
        this.unit = (calibration.UNITS as any)[value][0];
    }

    private onUnitSelect(e: Event) {
        this.unit = (e.target as HTMLSelectElement).value;
    }

    private onScaleSelect(e: Event) {
        this.scale = (e.target as HTMLSelectElement).value;
    }

    private applySettings() {
        // close modal
        this.modal.active = false;

        // TODO: change hardcoded `Metric`
        if (this.unitType === 'Metric') {
            RxCore.metricUnit(this.unit);
        } else {
            RxCore.imperialUnit(this.unit);
        }

        RxCore.scale(this.scale);
    }

    private setActiveTab(e: Event) {
        const tab = e.composedPath()[0] as HTMLElement;
        const target = this.tabContent.querySelector(tab.getAttribute('target') as string) as HTMLElement;

        // deselect previous tab
        Array.from(this.navTabs.children).forEach((element) => {
            element.classList.remove('active');
        });

        Array.from(this.tabContent.children).forEach((element) => {
            element.classList.remove('active');
        });

        tab.classList.add('active');
        target.classList.add('active');
    }

    private removeField(e: any) {
        const name = e.target.name;
        store.dispatch(removeField(name));
    }

    private toggleField(e: any) {
        const name = e.target.name;
        store.dispatch(toggleField(name));
    }
}

// Register the element with the browser
customElements.define('rx-spacer-settings', RasterexSpacerSettings);
