import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the Redux store.
import { store, RootState } from '../redux/store.js';

// These are the elements needed by this element.;
import '../../libs/gui-components/components/list/rasterex-item.js';
import '../../libs/gui-components/components/list/rasterex-listbox.js';
import { PageViewElement } from './generic/page-view-element.js';
import * as RxHelpers from '../rx-helpers/index';
import RxEvents from 'rx-events';

class SmTools extends connect(store)(PageViewElement) {
    private readonly viewIconsPath = 'assets/view-icons.sprite.svg';
    private mode = '';

    static styles = [
        css`
          :host {
            display: block;
            position: absolute;
            padding: 0 12px;
            text-align: center;
            visibility: hidden;
            user-select: none;
            z-index: 999;
          }

          :host([active]) {
            visibility: visible;
          }

          rasterex-listbox {
            --rasterex-item-hover-bg: var(--view-tools-bg-highlight);
            --rasterex-item-selected-bg: transparent;
            background-color: var(--view-tools-bg);
            --rasterex-listbox-padding: 0;
          }

          .toolitem, svg.icon {
            width: 32px;
            height: 32px;
          }

          svg.icon {
              fill: var(--view-tools-icon-fill-color);
              stroke: var(--view-tools-icon-stroke-color);
          }

          svg.icon:not(.keep-stroke-width) {
            stroke-width: 3;
          }

          .toolbox-wrapper.collapsed {
            display:none;
          }
          .toolbox-wrapper.show {
            display:block;
          }
        `
    ];

    protected render() {
        return html`
            <div class="toolbox-wrapper">
                <rasterex-listbox id="toolbox" horizontal @selected=${this.onSelectItem}>
                    <rasterex-item class="toolitem" value="zoom_in">
                        <svg class="icon">
                            <use href="${this.viewIconsPath}#zoom-in"></use>
                        </svg>
                    </rasterex-item>
                    <rasterex-item class="toolitem" value="zoom_out">
                        <svg class="icon">
                            <use href="${this.viewIconsPath}#zoom-out"></use>
                        </svg>
                    </rasterex-item>
                    <rasterex-item class="toolitem" value="zoom_fit">
                        <svg class="icon">
                            <use href="${this.viewIconsPath}#fit-both"></use>
                        </svg>
                    </rasterex-item>
                    <rasterex-item class="toolitem" value="zoom_window">
                        <svg class="icon">
                            <use href="${this.viewIconsPath}#zoom-window"></use>
                        </svg>
                    </rasterex-item>
                    <rasterex-item class="toolitem" value="rotate">
                        <svg class="icon">
                            <use href="${this.viewIconsPath}#rotate"></use>
                        </svg>
                    </rasterex-item>
                </rasterex-listbox>
            </div>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('zoom-updated', (data: any) => {
            // TODO: review, for the moment is the only way to make a difference for zoom_window tool
            if (data.hasOwnProperty('sx') && data.hasOwnProperty('sy')) {
                // (document.querySelector('#imageTemp') as HTMLElement).setAttribute('style', 'cursor: pointer !important');
                RxHelpers.selectTool(this.mode);
            }
        })
    }

    public stateChanged(state: RootState) {
        this.mode = state.rxcore.smMode;
    }

    private async onSelectItem( e: CustomEvent) {
        // if (e.detail.selected === 'zoom_window') {
        //     (document.querySelector('#imageTemp') as HTMLElement).setAttribute('style', 'cursor: crosshair !important');
        // }

        RxHelpers.selectTool(this.mode, e.detail.selected);
    }
}

window.customElements.define('sm-tools', SmTools);