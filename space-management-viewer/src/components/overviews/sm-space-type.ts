import { LitElement, html, property, queryAll } from 'lit-element';
import '@material/mwc-switch/';
import '../../../libs/gui-components/components/legend/rasterex-legend';
import * as RxCore from '../../rx-helpers/index';
import RxEvents from 'rx-events';

export class SmSpaceType extends LitElement {

    private readonly SELECT_COLOR_RGBA = 'rgba(191,58,209,0.3)';

    @queryAll('.general-item')
    private typeList: NodeListOf<HTMLElement>;

    @property({ type: Boolean, reflect: true })
    public active: boolean;

    @property({ type: Array, reflect: false })
    public floorAreas: any[];

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        const fileTypes = this.getFileTypes();

        return html`
            <rasterex-legend title="Floor Area Types" .show=${this.active}>
                <p>
                    <span class="switch-label">Select All</span>
                    <mwc-switch
                        class="overview-switch"
                        .checked="${this.active}"
                        @click=${this.onClickSwitch}>
                    </mwc-switch>
                </p>

                <hr>
                ${ fileTypes.length > 0
                    ? html`<ul class="list-unstyled general-list">
                            ${fileTypes.map((type) => html`
                                <li class="general-item prevent-text-selection"
                                    .type=${type}
                                    @click=${this.highlightType}>
                                    <rasterex-color-picker
                                        color=${this.SELECT_COLOR_RGBA}
                                        @color-selected=${this.onColorChange}
                                        position="left">
                                    </rasterex-color-picker>
                                    ${type}
                                </li>
                            `)}
                        </ul>`
                    : html`No type assigned`
                }
            </rasterex-legend>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('rx-spacer-edit-area', async (data) => {
            if (!this.active) {
                return;
            }

            if (data.hasOwnProperty('fields') && Array.isArray(data.fields) && data.fields.length > 0) {
                const type = (data.fields as Array<{name: string, value: string}>).find((field) => field.name === 'type');
                if (type) {
                    this.requestUpdate();
                    await this.updateComplete;
                    this.overviewHighlight();
                }
            }
        });
    }

    public async overviewHighlight(highlight = true) {
        await this.updateComplete;

        if (!this.active) {
            return;
        }

        this.typeList.forEach(item => {
            const color = (item.firstElementChild as any).color || this.SELECT_COLOR_RGBA;
            const areasByType: any[] = [];
            this.floorAreas.forEach(area => {
                let type = RxCore.getAttributeValue('type', {id: area});
                if (type ===  (item as any).type) {
                    areasByType.push(area);
                }
            });

            RxCore.highlightSpaces(areasByType, highlight, color);

            if (highlight) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    private getFileTypes() {
        const floorTypes: any[] = [];
        this.floorAreas.forEach(area => {
            const type = RxCore.getAttributeValue('type', {id: area});
            const existingType = floorTypes.find((eType) => eType === type);
            if (type !== null && type !== '' && !existingType) {
                floorTypes.push(type);
            }
        });

        return floorTypes;
    }

    private onClickSwitch(e: any) {
        const checked = !e.target.checked;
        this.overviewHighlight(checked);
    }

    private highlightType(e: any) {
        const elem = e.target as HTMLElement;
        if (elem.tagName !== 'LI') {
            return;
        }

        const color = (elem.firstElementChild as any).color || this.SELECT_COLOR_RGBA;
        elem.classList.toggle('selected');

        const areasByType: any[] = [];
        this.floorAreas.forEach(area => {
            let type = RxCore.getAttributeValue('type', {id: area});
            if (type ===  (elem as any).type) {
                areasByType.push(area);
            }
        });

        RxCore.highlightSpaces(areasByType, elem.classList.contains('selected'), color);
    }

    private onColorChange(e: CustomEvent) {
        const color = e.detail.color;
        if (color) {
            (e.target as any).color = color;
            this.overviewHighlight();
        }
    }

}

window.customElements.define('sm-space-type', SmSpaceType);