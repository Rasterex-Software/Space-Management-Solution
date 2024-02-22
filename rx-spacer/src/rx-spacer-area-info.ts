declare const RxCore: any;

import { css, html, LitElement, property} from 'lit-element';

import store, { RootState } from './store';
import { connect } from './utils/connect-mixin';

export class RasterexSpacerAreaInfo extends connect(store)(LitElement) {

    @property({ type: String, reflect: false })
    private area: string  = '';

    /**
     * Exclude markup custom attributes
     * Default excluded fields: `id, SpaceId`
     */
    @property({type: Array, reflect: true})
    public excludeFields: string[] = ['id', 'SpaceID'];

    @property({ type: Boolean})
    public hidden = false;

    public static get styles() {
        return [
            css`
            #attr-list {
                padding: 0;
                margin: 0;
            }
            #attr-list th {
                text-align: left;
                padding-right: 10px;
                text-transform: capitalize;
                max-width: var(--rx-spacer-area-info-column-max-width, 150px);
                word-break: break-all;
            }

            #attr-list td {
                max-width: 150px;
                word-break: var(--rx-spacer-area-info-column-max-width, 150px);
            }
            `,
        ];
    }

    protected render() {
        if (this.area) {
            let allCustomProperties = RxCore.getmarkupobjByGUID(this.area).GetAttributes() || [];

            // check first if there are fields to hide
            if (this.excludeFields) {
                allCustomProperties = allCustomProperties.filter(
                    (field: any) => !this.excludeFields.includes(field.name),
                );
            }

            return html`
                <table id="attr-list">
                    ${allCustomProperties.map((field: any) => {
                            if (field.name === 'Rx_Area') {
                                return html`
                                    <tr>
                                        <th scope="row">Surface: </th>
                                        <td>${field.value}</td>
                                    </tr>
                                `;
                            } else {
                                return html`
                                    <tr>
                                        <th scope="row">${field.name}: </th>
                                        <td>${field.value}</td>
                                    </tr>
                                `;
                            }
                        })
                    }
                </table>
            `;
        }

        return html``;
    }

    public stateChanged(state: RootState) {
        this.area = state.rxspacer.selectedAreaId!;
    }
}

// Register the element with the browser
customElements.define('rx-spacer-area-info', RasterexSpacerAreaInfo);
