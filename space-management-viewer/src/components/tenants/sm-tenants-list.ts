import { html, property, LitElement } from "lit-element";
import { store, RootState } from "../../redux/store";
import { connect } from "pwa-helpers/connect-mixin";
import '../../../libs/gui-components/components/color-picker/rasterex-color-picker';
import '../../../libs/gui-components/components/legend/rasterex-legend';

export class SmTenantsList extends connect(store)(LitElement) {

    @property({type: Array, reflect: false})
    private tenants: any[] = [];

    @property({ type: Boolean, reflect: true })
    private active: boolean;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <rasterex-legend title="All Tenants" .show=${this.active}>
                <ul class="list-unstyled tenant-list">
                    ${this.tenants.map((tenant) => html`
                        <li class="tenant prevent-text-selection">
                            <rasterex-color-picker
                                disabled
                                position="left"
                                color="${tenant.color}">
                            </rasterex-color-picker>
                            ${tenant.firstName} ${tenant.lastName}
                        </li>
                    `)}
                </ul>
            </rasterex-legend>
        `
    }

    public stateChanged(state: RootState) {
        this.active = state.app.tenantListLegend;
    }
}

window.customElements.define('sm-tenants-list', SmTenantsList);