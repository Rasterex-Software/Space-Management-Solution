declare var RxCore: any;
declare var UUID: any;

// Import LitElement base class and html helper function
import { css, html, LitElement, property, PropertyValues, query } from 'lit-element';

import { spacingIcon } from './icons';
import { sharedStyles } from './shared-styles';

import './base-components/rx-spacer-button.js';
import './base-components/rx-spacer-loader.js';
import './base-components/rx-spacer-modal.js';
import './base-components/rx-spacer-popover.js';
import './base-components/rx-spacer-toggle.js';
import './rx-spacer-area-actions.js';
import './rx-spacer-area-list.js';
import './rx-spacer-calibrate';
import './rx-spacer-converter';

import { RasterexSpacerModal } from './base-components/rx-spacer-modal';
import { RasterexSpacerToggle } from './base-components/rx-spacer-toggle';

import store, { RootState } from './store';
import {
    addArea, addFields, initialize, removeArea, updateSelectedArea, updateSelectedFile,
} from './store/actions';
import { AreaAttribute, visibleFieldsSelector } from './store/reducers';
import { connect } from './utils/connect-mixin';

import RxEvents from 'rx-events';
import { getAttribute } from './utils/rxcore';

// import { UUID } from 'pure-uuid';

export class RasterexSpacer extends connect(store)(LitElement) {

    private readonly EVENTS = {
        NEW_AREA: 'rx-spacer-new-area',
        NEW_AREA_BULK: 'rx-spacer-new-area-bulk',
        TOGGLE_SPACER: 'rx-spacer-toggle-spacer',
    };

    private bulkCreate: boolean = false;
    private bulkAreas: any[] = [];
    private fileName = '';

    @query('#spacer-button')
    private spacerButtonElem: RasterexSpacerToggle;

    @query('#create-modal')
    private modal: RasterexSpacerModal;

    @property({ type: Array, reflect: false })
    private visibleFields: AreaAttribute[] = [];

    @property({ type: String, reflect: false })
    public area: any = null;

    @property({ type: Boolean, reflect: true, attribute: 'show-loader' })
    public showLoader = false;

    @property({ type: Boolean, reflect: true, attribute: 'show-create-modal' })
    public createModal = false;

    @property({ type: Boolean, reflect: true })
    public debug = false;

    @property({ type: Boolean, reflect: true, attribute: 'auto-convert' })
    public autoConvert = false;

    @property({ type: String, reflect: true })
    public convertedBlocksColor = 'rgba(46, 204, 113, 0.3)';

    @property({ type: String, reflect: true })
    public vectorBlockColor = 'rgba(46, 49, 49, 0.3)';

    @property({type: Array, reflect: true, attribute: 'ignore-conversion'})
    private ignoreConversion: string[] = [];

    @property({ type: Array, reflect: true })
    public areaProperties: AreaAttribute[] = [
        {
            name: 'name',
            label: 'Name',
            placeholder: 'Enter name',
            isVisible: true,
        },
        {
            name: 'description',
            label: 'Description',
            placeholder: 'Enter description',
            isVisible: true,
        },
        {
            name: 'type',
            label: 'Type',
            placeholder: 'Enter type',
            isVisible: true,
            type: 'select',
            options: ['P-OFFC', 'P-WKS', 'S-CONF', 'S-BREAK', 'S-LOBBY', 'X-ELEV', 'X-STAIR'],
        },
    ];

    public static get styles() {
        return [
            sharedStyles,
            css`
                :host{}

                #spacer-button {
                    text-align: center;
                    min-width: 120px;
                    -rx-spacer-button-padding: 3px;
                }

                #spacer-button .icon svg{
                    display: block
                }

                #spacer-button .icon{
                    display: inline-block;
                    vertical-align: bottom;
                }
            `,
        ];
    }

    protected render() {
        return html`
            <rx-spacer-toggle
                id="spacer-button"
                title="Rasterex Spacer Tool"
                @change=${this.changeHandler}>
                <span class="icon">${spacingIcon}</span> New Space
            </rx-spacer-toggle>

            <rx-spacer-modal id="create-modal" noExit>
                <div slot="content">
                    <form @submit=${this.onSubmit}>
                        ${this.visibleFields.map((field: AreaAttribute) => html`
                            <div class="form-group">
                                <label for="${field.name}">${field.label}</label>
                                ${field.type === 'select'
                                    ? html`
                                    <select
                                        class="form-control"
                                        name="${field.name}"
                                        id="${field.name}">
                                        ${field.options!.map((option: any) => html`
                                        <option
                                            value="${option}">${option}
                                        </option>`,
                                        )}
                                    </select>`
                                    : html`
                                    <input type="text"
                                        class="form-control"
                                        id="${field.name}"
                                        name="${field.name}"
                                        placeholder="${field.placeholder}"
                                    />`
                                }
                            </div>
                        `)}
                        <hr>
                        <button type="submit" class="save-button">Submit</button>
                    </form>
                </div>
            </rx-spacer-modal>

            <rx-spacer-converter
                .showLoader=${this.showLoader}
                .vectorBlockColor=${this.vectorBlockColor}
                .autoConvert=${this.autoConvert}
                .excludeFiles=${this.ignoreConversion}>
            </rx-spacer-converter>
        `;
    }

    protected firstUpdated() {
        store.dispatch(initialize(true));

        RxEvents.subscribe('markup', this.onMarkupChange.bind(this));
        RxEvents.subscribe('file-load-complete', () => {
            const openedFileInfo = RxCore.getFileInfo();
            if (this.fileName !== openedFileInfo.FileName) {
                this.fileName = openedFileInfo.FileName;
                store.dispatch(updateSelectedFile(this.fileName));
            }
        });
        RxEvents.subscribe('page', () => {
            const openedFileInfo = RxCore.getFileInfo();

            if (openedFileInfo && this.fileName !== openedFileInfo.FileName) {
                this.fileName = openedFileInfo.FileName;
                store.dispatch(updateSelectedFile(this.fileName));
            }
        });
        RxEvents.subscribe('2d-block-id', this.onBlockSelect.bind(this));
        RxEvents.subscribe('rx-spacer-start-convert', () => this.startConversion());
        RxEvents.subscribe('rx-spacer-end-convert', () => this.endConversion());
        RxEvents.subscribe('rx-spacer-toggle-calibration', (active) => {
            if (active) {
                this.spacerButtonElem.pressed = false;
            }
        });
        RxEvents.subscribe('rx-spacer-scale', () => {
            this.spacerButtonElem.pressed = false;
            this.changeHandler({detail: {pressed: false}});
        });
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('areaProperties')) {
            store.dispatch(addFields(this.areaProperties));
        }
    }

    public stateChanged(state: RootState) {
        if (this.debug) {
            console.log(store.getAction(), state);
        }

        this.visibleFields = visibleFieldsSelector(state);

        this.area = state.rxspacer.selectedAreaId;
    }

    /**
     * Gets markup surface based on current selected unit
     *
     * @param {string} markupId
     * @returns
     * @memberof RasterexSpacer
     */
    public getMarkupSurface(markupId: string) {
        const markup = RxCore.getmarkupobjByGUID(markupId);
        const markupscalesq = markup.docdscale * markup.docdscale;
        const dimarea = markup.PolygonArea();
        const surface = RxCore.printhelper().getUnitArea(dimarea / markupscalesq);

        return surface.toFixed(2);
    }

    /**
     * Gets area attributes
     *
     * @param areaId
     */
    public getAreaAttributes(areaId: string) {
        if (areaId === undefined || areaId === '') {
            return;
        }

        // check for settings an return visible fields
        if (this.visibleFields) {
            const data: Array<{name: string, value: string}> = [];

            this.visibleFields.map((field) => {
                const attribute = getAttribute(field.name, areaId);
                if (attribute.value !== '') {
                    data.push(attribute);
                }
            });

            // surface/area is added because for the moment is not part of the settings
            const surface = getAttribute('Rx_Area', areaId);
            data.push(surface);

            return data;
        }

        // if no settings are set then return all area attributes
        return RxCore.getmarkupobjByGUID(areaId).GetAttributes();
    }

    private changeHandler(e: any) {
        const selected = e.detail.pressed;

        RxCore.restoreDefault();
        RxCore.markupSpace(selected);

        RxEvents.dispatchEvent(this.EVENTS.TOGGLE_SPACER, selected);
    }

    private onMarkupChange(markup: any, operation: any) {
        // TODO: know issue: can't select correct snap point when areas are to close
        // TODO: know issue: area actions should automatically reposition/zoom when markup position is changed
        // TODO: should check for annotation type to be area/space

        // markup === undefined means is clicked on the same markup
        if (markup === undefined) {
            return;
        }

        // unselect operation
        if (markup === -1) {
            if (store.getState().rxspacer.selectedAreaId !== undefined) {
                store.dispatch(updateSelectedArea());
            }
        } else if (operation.created) {
            // deal only with space markup
            const spaceID = markup.GetAttributes().find((element: any) => element.name === 'SpaceID');
            if (spaceID === undefined) {
                return;
            }

            const uniqueID = this.generateAreaUniqueId();
            markup.setUniqueID(uniqueID);

            // set custom attribute unique SpaceID
            // TODO: find another way to generate unique id
            spaceID.value = uniqueID;

            // provide empty values if areas are from converter
            // TODO: refactor, this is just a temporary fix
            if (this.bulkCreate) {
                this.bulkAreas.push(markup.getUniqueID());
            }

            // store markup/area
            store.dispatch(addArea(this.fileName, markup.getUniqueID()));

            if (!this.bulkCreate) {
                // modal
                if (this.createModal) {
                    this.modal.active = true;
                } else {
                    RxEvents.dispatchEvent(this.EVENTS.NEW_AREA, { areaId: uniqueID, fileName: this.fileName });
                }

                // select markup
                RxCore.selectMarkUp(true);
                store.dispatch(updateSelectedArea(markup.uniqueID));

                // toggle pressed
                this.spacerButtonElem.pressed = false;
                this.spacerButtonElem.blur();
            }
            // delete operation
        } else if (operation.deleted) {
            RxEvents.dispatchEvent('rx-spacer-delete-area', markup.getUniqueID());
            store.dispatch(removeArea(this.fileName, markup.getUniqueID()));
            // select/edit operation
        } else if (operation.modified) {
            store.dispatch(updateSelectedArea(markup.uniqueID));
        }
    }

    private onBlockSelect(info: any) {
        if (!info.hasOwnProperty('attr')) {
            if (this.area !== undefined && this.area !== null)  {
                store.dispatch(updateSelectedArea());
            }
            return;
        }

        const id = info.attr.find((element: any) => element.name === 'SpaceID').value;
        const markup = RxCore.getmarkupobjByGUID(id);

        if (markup !== -1) {
            // deselect
            if (this.area !== undefined && this.area === markup.uniqueID) {
                store.dispatch(updateSelectedArea());
                return;
            }

            // select
            store.dispatch(updateSelectedArea(markup.getUniqueID()));
        }
    }

    /**
     * Generates area unique id
     *
     * @private
     * @returns {string}
     * @memberof RasterexSpacer
     */
    private generateAreaUniqueId(): string {
        const uuid = new UUID(1);
        return uuid.format('std'); // standard format
    }

    // TODO: find another way to update rx-spacer-area-list, maybe via state
    private updateAreasComp() {
        const areaElements = document.querySelectorAll('rx-spacer-area-list');

        areaElements.forEach((element: any) => {
            // update rx-spacer-area-list when edit area
            element.requestUpdate();
        });
    }

    /**
     * Form submit handler, add custom attributes on area/markup object
     *
     * @param e
     * @fires 'new-area` event
     */
    private onSubmit(e: Event) {
        e.preventDefault();
        this.modal.active = false;

        const elements = Array.from((e.target as HTMLFormElement).elements) as HTMLInputElement[];

        elements.map((element: HTMLInputElement) => {
            if (element.value !== '') {
                this.addCustomAttribute(element.name, element.value);
            }
        });

        (e.target as HTMLFormElement).reset();
        RxEvents.dispatchEvent(this.EVENTS.NEW_AREA, { areaId: this.area, fileName: this.fileName });
        this.updateAreasComp();
    }

    /**
     * Add or update custom attribute on area/markup object
     *
     * @param {string} name
     * @param {string} value
     */
    private addCustomAttribute(name: string, value: string) {
        if (this.area === null) {
            return;
        }
        const markup = RxCore.getmarkupobjByGUID(this.area);
        // add operation
        if (markup) {
            markup.AddAttribute(name, value);
        }
    }

    private startConversion() {
        this.bulkCreate = true;
        this.bulkAreas = [];
    }

    private endConversion() {
        this.bulkCreate = false;

        if (this.bulkAreas.length > 0) {
            RxCore.restoreBlockStates();
            // highlight converted spaces
            if (!this.autoConvert) {
                this.bulkAreas.forEach((area) => {
                    RxCore.setBlockColor(area, this.vectorBlockColor, false);
                    RxCore.setBlockColor(area, this.convertedBlocksColor, true);
                });
            }

            RxEvents.dispatchEvent(this.EVENTS.NEW_AREA_BULK, { areas: this.bulkAreas, fileName: this.fileName });
            this.bulkAreas = [];
        }
    }
}

// Register the element with the browser
customElements.define('rx-spacer', RasterexSpacer);
