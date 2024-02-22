import { LitElement, html, css, property, PropertyValues, query } from "lit-element";
import { dragIcon, collapseIcon, expandIcon } from "./sm-icons";
import Draggable from "../../utils/draggable";
import Collapsible from "../../utils/collapsible";

/**
 * Demo Usage
 * 
 * <sm-panel show draggable collapsible resizable>
 *     <h3 slot="title">Lorem ipsum</h3>
 *     <div slot="content">
 *         Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
 *         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
 *     </div>
 * </sm-panel> 
 */
class SmPanel extends LitElement {

    private draggableInstance: Draggable;
    private collapsibleInstance: Collapsible;
    private widthBeforeResize: string;
    private heightBeforeResize: string;
    private resized = false;

    @query('.sm-panel')
    private panelElem: HTMLElement;

    @query('.actions')
    private actionsContainerElem: HTMLElement;

    @query('.sm-panel-title')
    private titleElem: HTMLElement;

    // observed properties
    @property({ type: Boolean, reflect: true })
    public show = false;

    @property({ type: Boolean, reflect: true })
    draggable = false;

    @property({ type: Boolean, reflect: true })
    collapsible = false;

    @property({ type: Boolean, reflect: true })
    resizable = false;
    
    @property({ type: String, reflect: true, attribute: 'min-width' })
    minWidth = '300px';

    @property({ type: String, reflect: true, attribute: 'max-height' })
    maxHeight = '500px';

    static get styles() {
        return [
            css`
            :host {
                display: none;
                outline: none;
            }
            :host([show]) {
                display: inline-block;
            }
            :host([resizable]) .sm-panel{
                resize: both;
            }
            :host([resizable]) .sm-panel-header{
                position: sticky;
                top: -15px;
                background: #fff;
            }
            .sm-panel {
                background: #fff;
                padding: 15px;
                border: 2px solid #000;
                position: relative;
                overflow: auto;
                box-sizing: border-box;
            }
            .sm-panel-header {
                overflow: hidden;
            }
            .actions {
                float:left
            }
            .actions span {
                display: inline-block;
                height: 24px;
                width: 24px;
                vertical-align: middle;
            }
            `,
        ];
    }

    protected render() {
        return html`
            <div class="sm-panel" style="min-width:${this.minWidth}; max-height:${this.maxHeight}">
                <div class="sm-panel-header">
                    <div class="actions">
                    ${this.collapsible 
                        
                        ? html`
                            <span id="collapseToggle"
                                class="collapse-icon"
                                title="collapse"
                                @click=${this.onClickCollapse}>
                                ${collapseIcon}
                            </span>` 
                        : ``
                    }
                    ${this.draggable 
                        ? html`<span id="dragItem" title="drag">${dragIcon}</span>` 
                        : ``
                    }
                    </div>

                    <div class="sm-panel-title">
                        <slot name="title"></slot>
                    </div>
                </div>

                <div class="sm-panel-body">
                    <hr>
                    <div class="sm-panel-content">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('draggable')) {
            this.toggleDraggable();
        }

        if (changedProps.has('collapsible')) {
            this.toggleCollapsible();
        }

        if (changedProps.has('resizable')) {
            this.toggleResizable();
        }

        this.applyCss();
    }

    private applyCss() {
        this.actionsContainerElem.style.lineHeight = this.titleElem.clientHeight + 'px';
        this.titleElem.style.paddingLeft = this.actionsContainerElem.clientWidth + 10 + 'px';
    }

    private onClickCollapse(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;

        // collapse icon
        if (target.classList.contains('collapse-icon')) {
            // fix using with resize
            if (this.resized) {
                this.widthBeforeResize = (this.panelElem.clientWidth + 4) + 'px';
                this.heightBeforeResize = (this.panelElem.clientHeight + 4) + 'px';
                
                this.panelElem.style.width = 'auto';
                this.panelElem.style.height = 'auto';
            }

            target.innerHTML = expandIcon.getHTML();
            target.classList.remove('collapse-icon');
            return;
        }

        // expand icon
        target.innerHTML = collapseIcon.getHTML();
        target.classList.add('collapse-icon');

        // Resize fix
        if (this.resized) {
            this.panelElem.style.width = this.widthBeforeResize || 'auto';
            this.panelElem.style.height = this.heightBeforeResize || 'auto';
        }
    }

    private toggleDraggable() {
        // TODO: draggable works only once, if the draggable attribute is updated then must enable/disable again
        if (this.draggable) {
            if (this.draggableInstance === undefined) {
                this.draggableInstance = new Draggable(
                    this,
                    this.shadowRoot!.querySelector('#dragItem') as HTMLElement
                );
            }
        } else {
            if (this.draggableInstance) {
                this.draggableInstance.destroy();
            }
        }
    }

    private toggleCollapsible() {
        // TODO: Collapsible works only once, if the Collapsible attribute is updated then must enable/disable again
        if (this.collapsible) {
            if (this.collapsibleInstance === undefined) {
                this.collapsibleInstance = new Collapsible(
                    this.shadowRoot!.querySelector('.sm-panel-body') as HTMLElement,
                    this.shadowRoot!.querySelector('#collapseToggle') as HTMLElement
                );
            }
        } else {
            if (this.collapsibleInstance) {
                this.collapsibleInstance.destroy();
            }
        }
    }

    private toggleResizable() {
        if (this.resizable) {
            this.resized = true;
        } else {
            this.resized = false;
        }
    }
}

window.customElements.define('sm-panel', SmPanel);