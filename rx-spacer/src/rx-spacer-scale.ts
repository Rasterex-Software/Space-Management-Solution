declare var RxCore: any;

import { css, html, LitElement, query } from 'lit-element';
import RxEvents from 'rx-events';
import './base-components/rx-spacer-button';
import { RasterexSpacerModal } from './base-components/rx-spacer-modal';
import './base-components/rx-spacer-modal';
import { calibrateIcon } from './icons';
import './rx-spacer-calibrate';
import { RasterexSpacingCalibrate } from './rx-spacer-calibrate';
import { sharedStyles } from './shared-styles';
import { calibration } from './utils/calibration-units';

export class RasterexSpacerScale extends LitElement {

    @query('#modal')
    private modal: RasterexSpacerModal;

    @query('rx-spacer-calibrate')
    private calibrate: RasterexSpacingCalibrate;

    @query('#scale-input')
    private scaleInput: HTMLInputElement;

    // TODO: change hardcoded position
    private unitType = 'Metric';

    // TODO: change hardcoded position
    private unit = 'Meter';

    // TODO: change hardcoded position
    private scale = '1:1';

    public static get styles() {
        return [
            sharedStyles,
            css`
                .footer {
                    margin-top: 20px;
                }
            `,
        ];
    }

    protected render() {
            return html`
            <rx-spacer-button
                id="calibrate-button"
                class="button"
                title="Scale"
                @click=${this.toggleModal}>
                <span class="icon">${calibrateIcon}</span> Scale
            </rx-spacer-button>

            <rx-spacer-modal id="modal" title="Scale">
                <div slot="content">
                    <p>Scale</p>
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
                            <input type="text"
                                id="scale-input"
                                class="form-control"
                                value=${this.scale}
                            >
                        </div>
                    </div>

                    <br>
                    Calibrate
                    <br>
                    <rx-spacer-button
                        id="calibrate-button"
                        class="button"
                        title="Calibrate"
                        @click=${this.startCalibration}>
                        <span class="icon">${calibrateIcon}</span> Calibrate
                    </rx-spacer-button>

                    <div class="footer">
                        <hr>
                        <button type="submit" class="save-button" @click=${this.applyScale}>Apply Scale</button>
                    </div>
                </div>
            </rx-spacer-modal>

            <rx-spacer-calibrate></rx-spacer-calibrate>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('rx-spacer-modal-close', () => {
            RxCore.calibrate(false);
            RxEvents.dispatchEvent('rx-spacer-toggle-calibration', false);
        });
    }

    private toggleModal() {
        if (this.modal.active) {
            this.modal.active = false;
        } else {
            this.modal.active = true;
        }
    }

    private startCalibration() {
        this.toggleModal();
        this.calibrate.startCalibration();
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

    private applyScale() {
        const value = this.scaleInput.value;
        const scaleFormat = /([0-9]+:[0-9]+)/;

        // TODO: validation
        if (!value.match(scaleFormat) ) {
            alert('Invalid scale! Use something in the form of 1:10 or 1:100 or 5:1 ... ');
            return;
        }

        // close modal
        this.modal.active = false;

        // TODO: change hardcoded `Metric`
        if (this.unitType === 'Metric') {
            RxCore.metricUnit(this.unit);
        } else {
            RxCore.imperialUnit(this.unit);
        }

        this.scale = value;
        RxCore.scale(value);
        RxEvents.dispatchEvent('rx-spacer-scale', value);
    }
}

// Register the element with the browser
customElements.define('rx-spacer-scale', RasterexSpacerScale);
