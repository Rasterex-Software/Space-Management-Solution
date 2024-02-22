import { html, LitElement, property } from 'lit-element';
import RxEvents from 'rx-events';
import store, { RootState } from './store';
import { connect } from './utils/connect-mixin';
import { getAttribute } from './utils/rxcore';

class RasterexSpacerAreaSurface extends connect(store)(LitElement) {

    private selectedBlock: string | undefined;

    @property({ type: String, reflect: false })
    public areaId: '';

    protected render() {
        const surface = getAttribute('Rx_Area', this.areaId).value;

        return html`<span>${surface}</span>`;
    }

    protected firstUpdated() {
        // render again when calibration is complete
        RxEvents.subscribe('calibrate-complete', () => this.requestUpdate());
        // only update for selected area
        RxEvents.subscribe('markup-area-edit', () => {
            if (this.selectedBlock === this.areaId) {
                this.requestUpdate();
            }
        });
        RxEvents.subscribe('rx-spacer-scale', () => this.requestUpdate());
    }

    public stateChanged(state: RootState) {
        if (this.selectedBlock !== state.rxspacer.selectedAreaId) {
            this.selectedBlock = state.rxspacer.selectedAreaId;
        }
    }
}

// Register the element with the browser
customElements.define('rx-spacer-area-surface', RasterexSpacerAreaSurface);
