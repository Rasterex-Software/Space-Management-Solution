declare var RxCore: any;

import {
    css, html, LitElement, property, query,
} from 'lit-element';

import { addPointIcon, deleteIcon, editIcon, removePointIcon } from './icons';
import './rx-spacer-area-edit';

import store, { RootState } from './store';
import { connect } from './utils/connect-mixin';

import RxEvents from 'rx-events';

export class RasterexSpacerAreaActions extends connect(store)(LitElement) {

    @query('#wrapper')
    private wrapper: HTMLElement;

    @property({ type: String, reflect: false })
    public area: any = null;

    @property({ type: Boolean })
    public editing = false;

    /**
     * Actions: `edit-area, delete-area, add-point, delete-point`
     */
    @property({type: Array, reflect: true})
    public excludeActions: string[] = [];

    public static get styles() {
        return [
            css`
            :host {
                --rx-spacer-button-padding: 0px;
            }
            #wrapper {
                display: none;
                z-index: -1;
                background: #fff;
                padding: 5px 10px;
                box-shadow: 0 5px 10px rgba(0,0,0,.2);
                border: 1px solid #000;
            }

            #wrapper.expanded {
                display: block;
                z-index: 999;
            }

            rx-spacer-button[hidden] {
                display: block;
            }
            `,
        ];
    }

    public constructor() {
        super();

        this.show = this.show.bind(this);
    }

    protected render() {
        return html`
            <div id="wrapper">
                <rx-spacer-area-edit
                    ?hidden=${this.editing === false}>
                </rx-spacer-area-edit>

                <div ?hidden=${this.editing === true}>
                    ${this.actionsHtml()}
                </div>
            </div>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('markup', this.onMarkupChange.bind(this));
        RxEvents.subscribe('markup-unselect', () => this.hide());
        RxEvents.subscribe('file-load-complete', () => this.hide());
        // show actions when a new area is created
        RxEvents.subscribe('rx-spacer-new-area', () => this.show());
        RxEvents.subscribe('rx-spacer-area-edit', () => this.editAreaHandler());
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        RxEvents.subscribe('rx-spacer-new-area', () => this.show());
    }

    public stateChanged(state: RootState) {
        const area = state.rxspacer.selectedAreaId;
        if (area && area !== '') {
            this.area = area;
        }
    }

    /**
     * Expand/show popover
     */
    public show() {
        if (!this.wrapper.classList.contains('expanded')) {
            this.wrapper.classList.add('expanded');
        }
    }

    /**
     * Collapse/hide popover
     */
    public hide() {
        if (this.wrapper.classList.contains('expanded')) {
            this.wrapper.classList.remove('expanded');
            this.editing = false;
        }
    }

    /**
     * Get actions buttons html
     */
    private actionsHtml() {
        return html`
            <rx-spacer-button ?hidden=${this.excludeActions.includes('edit-area')} @click="${this.showEditForm}">
                <span class="icon">${editIcon}</span>
            </rx-spacer-button>
            <rx-spacer-button ?hidden=${this.excludeActions.includes('add-point')} @click="${this.addPoint}">
                <span class="icon">${addPointIcon}</span>
            </rx-spacer-button>
            <rx-spacer-button ?hidden=${this.excludeActions.includes('delete-point')} @click="${this.removePoint}">
                <span class="icon">${removePointIcon}</span>
            </rx-spacer-button>
            <rx-spacer-button ?hidden=${this.excludeActions.includes('delete-area')} @click="${this.deleteSelectedArea}">
                <span class="icon">${deleteIcon}</span>
            </rx-spacer-button>
        `;
    }

    /**
     * Change component state into edit mode
     */
    private showEditForm() {
        this.editing = true;
    }

    /**
     * Deletes area/markup form RxCore
     *
     * @fires `delete-area` event
     */
    private deleteSelectedArea() {
        if (this.area === null || this.area === undefined) {
            alert('No area selected. Please select area before!');
            return;
        }

        const confirmation = confirm('Are you sure you want to delete area?');

        if (confirmation) {
            RxCore.deleteMarkUp();
        }
    }

    private addPoint() {
        RxCore.insertPoint();
    }

    private removePoint() {
        RxCore.deletePoint();
    }

    private onMarkupChange(markup: any, operation: any) {
        // markup === undefined means is clicked on the same markup
        if (markup === undefined) {
            return;
        }

        // unselect operation
        if (markup === -1) {
            this.hide();
        } else if (operation.deleted) {
            this.hide();

            // select/edit operation
        } else if (operation.modified) {
            this.show();
        }
    }

    private editAreaHandler() {
        this.editing = false;
    }
}

// Register the element with the browser
customElements.define('rx-spacer-area-actions', RasterexSpacerAreaActions);
