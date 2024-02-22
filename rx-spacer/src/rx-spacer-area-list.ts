declare var RxCore: any;

// Import LitElement base class and html helper function
import { css, html, LitElement, property, PropertyValues, queryAll } from 'lit-element';
import store, { RootState } from './store';
import { AreaAttribute, currentAreasSelector, visibleFieldsSelector } from './store/reducers';
import { connect } from './utils/connect-mixin';

import RxEvents from 'rx-events';
import './rx-spacer-area-surface';
import { getAttribute } from './utils/rxcore';

export class RasterexSpacerAreaList extends connect(store)(LitElement) {

    private readonly spaceAttribute = 'SpaceID';
    private scrollToItem = true;

    @queryAll('.area-list-item')
    private areaListItems: NodeListOf<HTMLElement>;

    @property({ type: Boolean, reflect: true })
    public hidden = false;

    @property({ type: String, reflect: false })
    public selectedFile: undefined | string = '';

    /**
     * Default fields: `name, description, type`
     */
    @property({type: Array, reflect: true})
    public excludeFields: string[];

    @property({
        type: Array,
        reflect: false,
        hasChanged(newVal, oldVal) {
            if (newVal !== oldVal) {
                return true;
            } else {
                return false;
            }
        },
    })
    private fields: AreaAttribute[] = [];

    @property({ type: Object, reflect: false})
    private areas: any[] = [];

    @property({ type: String, reflect: false })
    private selectedBlock: string | undefined = undefined;

    public static get styles() {
        return [
            css`
                :host[hidden] {
                    display: none;
                }
                .table {
                    width: 100%;
                    max-width: 100%;
                    margin-bottom: 1rem;
                    background-color: transparent;
                    border-collapse: collapse;
                    border: 1px solid #dee2e6;
                }

                td, th {
                    border: 1px solid #dee2e6;
                }

                .table thead th {
                    vertical-align: bottom;
                    border-bottom: 2px solid #dee2e6;
                }

                .table td, .table th {
                    padding: .75rem;
                    vertical-align: top;
                    border-top: 1px solid #dee2e6;
                }

                .table tbody tr[selected] {
                    background-color: rgba(0, 0, 0, 0.075);
                }

                th {
                    text-align: inherit;
                }

                #save-button {
                    text-align: center;
                    min-width: 120px;
                    --rx-spacer-button-padding: 3px;
                }

                #save-button .icon svg{
                    display: block
                }

                #save-button .icon{
                    display: inline-block;
                    vertical-align: bottom;
                }

                table tbody tr:hover{
                    cursor: pointer;
                    background-color: rgba(0,0,0,.075);
                }

                table {
                    display: block;
                    max-height: var(--rx-spacer-list-max-height, 300px);
                    overflow-y: scroll;
                }

                table td {
                    min-width: var(--rx-spacer-list-col-min-width, auto);
                }

                .area-list-item {
                    user-select: none;
                }
            `,
        ];
    }

    protected render() {
        let fields = this.fields;

        // check first if there are fields to hide
        if (this.excludeFields) {
            fields = fields.filter((field) => !this.excludeFields.includes(field.name));
        }

        return html`
        ${this.areas.length > 0
            ? html`
                <div id="areas">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Surface</th>
                                ${fields.map((field) => html`
                                    <th>${field.label}</th>
                                `)}
                            </tr>
                        </thead>

                        <tbody>
                            ${this.areas.map((areaId, index) => html`
                                <tr @click=${this.highlightArea}
                                    .area=${areaId}
                                    class="area-list-item">
                                    <th>${index + 1}</th>
                                    <td>
                                        <rx-spacer-area-surface .areaId=${areaId}></rx-spacer-area-surface>
                                    </td>
                                    ${fields.map((field) => html`
                                        <td>${getAttribute(field.name, areaId).value}</td>
                                    `)}
                                </tr>
                            `)}
                        </tbody>
                    </table>
                </div>
            `
            : ``
        }
        `;
    }

    protected firstUpdated() {
        // render again when calibration is complete
        RxEvents.subscribe('calibrate-complete', () => this.requestUpdate());
        // render again when an area is edited
        RxEvents.subscribe('rx-spacer-edit-area', () => this.requestUpdate());
        RxEvents.subscribe('rx-spacer-scale', () => this.requestUpdate());
    }

    protected updated(changedProp: PropertyValues) {
        if (changedProp.has('selectedBlock')) {
            this.selectItem();
        }
    }

    public stateChanged(state: RootState) {
        this.fields = visibleFieldsSelector(state);
        this.areas = currentAreasSelector(state);
        this.selectedFile = state.rxspacer.selectedFile;

        if (this.selectedBlock !== state.rxspacer.selectedAreaId) {
            this.selectedBlock = state.rxspacer.selectedAreaId;
        }
    }

    /**
     * Save areas, maybe convert it into a Rx Block Object
     */
    // TODO: this should save only space markups
    public saveAreas() {
        RxCore.markUpSave();
        RxEvents.dispatchEvent('rx-spacer-save-areas', { areas: this.areas, fileName: this.selectedFile });
    }

    private highlightArea(e: any) {
        e.composedPath().forEach((node: any) => {
            if (node.hasOwnProperty('area')) {
                const markup = RxCore.getmarkupobjByGUID(node.area);
                const spaceAttr = markup.GetAttributes().find(
                    (attribute: any) => attribute.name === this.spaceAttribute,
                );

                RxCore.selectRxSpaceEdit(spaceAttr.value);
                this.scrollToItem = false;
            }
        });
    }

    private async selectItem() {
        await this.updateComplete;

        this.areaListItems.forEach((element) => {
            if (element.hasAttribute('selected')) {
                element.removeAttribute('selected');
            }

            if ((element as any).area === this.selectedBlock) {
                element.setAttribute('selected', '');

                // skip scroll to if clicked on table
                if (this.scrollToItem) {
                    try {
                        element.closest('table.table')!.scrollTop = element.offsetTop;
                    } catch (err) {
                        console.log(err);
                    }

                    // element.scrollIntoView({
                    //     block: 'start',
                    //     behavior: 'smooth',
                    // });
                }

                this.scrollToItem = true;
            }
        });
    }
}

// Register the element with the browser
customElements.define('rx-spacer-area-list', RasterexSpacerAreaList);
