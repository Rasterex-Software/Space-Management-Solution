import { LitElement, html, property } from "lit-element";
import { getAttributeValue } from "../../rx-helpers/spaces";
import { store } from "../../redux/store";
import { selectArea } from "../../redux/actions/rxcore/async";
import RxEvents from "rx-events";

export class SmTenantSpaces extends LitElement {

    @property({ type: Array, reflect: false })
    private selectedAreaTenantSpaces: string[] = [];

    @property({ type: String, reflect: false })
    public selectedArea: string = '';

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        return html`
            <ul class="list-inline">
                ${this.selectedAreaTenantSpaces.map((id:any) => {
                    return html`
                        <li class="list-inline-item ${this.selectedArea === id ? 'selected' : ''}"
                            @click=${() => this.selectArea(id)}>
                            ${getAttributeValue('name', {id}, 'no name')}
                        </li>`
                })}
            </ul>
        `
    }

    protected firstUpdated() {
        RxEvents.subscribe('rx-spacer-edit-area', () => this.requestUpdate());
    }

    protected selectArea(areaId: string) {
        if (this.selectedArea !== areaId) {
            store.dispatch(selectArea(areaId));
        }
    }
}

window.customElements.define('sm-tenant-spaces', SmTenantSpaces);