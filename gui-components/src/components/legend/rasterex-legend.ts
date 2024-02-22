import {
    html, css, customElement, property,
} from 'lit-element';

import { RasterexElement } from '../rasterex-element';

@customElement('rasterex-legend')
export class RasterexLegend extends RasterexElement {

    @property({ type: Boolean, reflect: true })
    public show = false;

    @property({ type: String, reflect: true })
    public title: string;

    public static get styles() {
        return [
            css`
                :host {
                    display: none;
                }

                :host([show]) {
                    display: block;
                    border: var(--rasterex-legend-border, 2px solid #000);
                    padding: var(--rasterex-legend-padding, 15px);
                    background: var(--rasterex-legend-background, #fff);
                }

                h2 {
                    display: none;
                    margin-top: 0;
                }

                h2[active] {
                    display: block;
                    text-align: center;
                    font-size: var(--rasterex-legend-title-size, 16px);
                }
            `,
        ];
    }

    protected render() {
        return html`
            <h2 ?active=${this.title}>${this.title}</h2>
            <slot></slot>
        `;
    }
}