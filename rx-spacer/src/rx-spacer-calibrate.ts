declare var RxCore: any;
import { html, LitElement, property, query } from 'lit-element';
import RxEvents from 'rx-events';
import { RasterexSpacerModal } from './base-components/rx-spacer-modal';
import { sharedStyles } from './shared-styles';

export class RasterexSpacingCalibrate extends LitElement {

    @query('#calibration-modal')
    private modal: RasterexSpacerModal;

    @property({ type: String })
    public label = 'Calibrate';

    @property({ type: Number, reflect: false })
    private calibrationValue = 0;

    public static get styles() {
        return [
            sharedStyles,
        ];
    }

    protected render() {
        // ${RxCore.helper().getAreaUnitLabel()} was changed with hardcoded value 'meters'

        return html`
            <rx-spacer-modal id="calibration-modal" title="Calibration">
                <div slot="content">
                    <div class="form-group">
                        <label>Measured line in meters </label>
                        <input type='text' class="form-control" .value=${this.calibrationValue} />
                    </div>

                    <div class="footer">
                        <hr>
                        <button type="submit" class="save-button" @click=${this.applyCalibration}>
                            Set Calibration
                        </button>
                    </div>
                </div>
            </rx-spacer-modal>
        `;
    }

    public startCalibration() {
        RxCore.restoreDefault();
        RxCore.calibrate(true);

        RxEvents.dispatchEvent('rx-spacer-toggle-calibration', true);
    }

    protected firstUpdated() {
        RxEvents.subscribe('calibrate-diag', async (data) => {
            this.calibrationValue = data;
            await this.updateComplete;

            this.modal.active = true;
        });
    }

    private applyCalibration() {
        const input = this.modal.querySelector('input');
        const value =  Number(input!.value.replace(/,/g, '.'));

        if (value) {
            // TODO: for the moment we don't need to set this.calibrationValue
            // this.calibrationValue = +value;

            const calibrateconn = RxCore.GUI_Calibratediag;
            calibrateconn.SetTempCal(value);
            calibrateconn.setCalibration(true);

            this.modal.active = false;
            RxCore.calibrate(false);
            RxEvents.dispatchEvent('rx-spacer-toggle-calibration', false);
            return;
        }

        alert('Please enter a valid number!');
    }
}

// Register the element with the browser
customElements.define('rx-spacer-calibrate', RasterexSpacingCalibrate);
