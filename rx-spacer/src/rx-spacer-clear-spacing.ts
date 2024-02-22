declare var RxCore: any;

import { css, html, LitElement } from 'lit-element';
import RxEvents from 'rx-events';
import store, { RootState } from './store';
import { clearAreas } from './store/actions';
import { currentAreasSelector } from './store/reducers';
import { connect } from './utils/connect-mixin';

export class RasterexSpacerClearSpacing extends connect(store)(LitElement) {

    private areas: any[] = [];
    private fileName: string | undefined = '';

    public static get styles() {
        return [
            css`
                :host{
                    --rx-spacer-button-padding: 3px;
                }

                #clear-button {
                    text-align: center;
                    min-width: 120px;
                }

                #clear-button .icon svg{
                    display: block
                }

                #clear-button .icon{
                    display: inline-block;
                    vertical-align: bottom;
                }
            `,
        ];
    }

    protected render() {
        return html`
            <rx-spacer-button
                id="clear-button"
                @click=${this.clearAreas}>Clear Spacing
            </rx-spacer-button>
        `;
    }

    public stateChanged(state: RootState) {
        this.fileName = state.rxspacer.selectedFile;
        this.areas = currentAreasSelector(state);
    }

    private clearAreas() {
        if (RxCore.getOpenFiles().length === 0) {
            alert('Please open a file first!');
            return;
        }

        if (this.areas.length === 0) {
            alert('The file does not contain spaces!');
            return;
        }

        const deleteIds: string[] = [];
        this.areas.map((id) => {
            RxCore.deleteMarkupbyGUID(id);
            deleteIds.push(id);
        });
        RxCore.markUpSave();
        store.dispatch(clearAreas(this.fileName));

        RxEvents.dispatchEvent('rx-spacer-clear-spacing', deleteIds );
    }
}

// Register the element with the browser
customElements.define('rx-spacer-clear-spacing', RasterexSpacerClearSpacing);
