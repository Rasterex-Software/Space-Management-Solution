import { LitElement, html, property, query } from "lit-element";
import '../generic/sm-panel';
import { removeFileAreaTenant, addFileAreaTenant } from "../../redux/actions/files/sync";
import { store } from "../../redux/store";
import { RxTenantState } from "../../redux/reducers/tenants";

export class SmTenantAssign extends LitElement {

    @query('#change-tenant-dd')
    private tenantDropdown: HTMLSelectElement;

    @property({ type: String, reflect: false })
    private fileName: string | undefined = '';

    @property({ type: String, reflect: false })
    public selectedArea: string = '';

    @property({ type: Object, reflect: false })
    public selectedAreaTenant: RxTenantState | undefined;

    @property({ type: Array, reflect: false })
    private tenants: any[] = [];

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        const selectedTenantId = this.selectedAreaTenant ? this.selectedAreaTenant.id : undefined;

        return html`
            <div>
                <select 
                    id="change-tenant-dd"
                    class="d-area-tenant-id form-control form-control-sm"
                    .areaId="${this.selectedArea}"
                    @change=${this.updateAssignedTenant}>
                    <option .selected=${selectedTenantId === undefined}>---</option>
                    ${this.tenants.map((tenant: any) => {
                        return html`<option value="${tenant.id}" .selected=${selectedTenantId === tenant.id}>
                            ${tenant.id} ${tenant.firstName} ${tenant.lastName}</option>`;
                    })}
                </select>
            </div>
        `;
    }

    private updateAssignedTenant() {
        const areaId = this.selectedArea;
        let tenantId: any = +this.tenantDropdown.value;

        if (!tenantId) {
            store.dispatch(removeFileAreaTenant(this.fileName, areaId));
        } else {
            store.dispatch(addFileAreaTenant(this.fileName, tenantId, areaId));
        }
    }
}

window.customElements.define('sm-tenant-assign', SmTenantAssign);