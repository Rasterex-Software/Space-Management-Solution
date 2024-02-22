declare var RxCore: any;

import { css, html, LitElement } from 'lit-element';
import { uploadIcon } from './icons';

export class RasterexSpacerUpload extends LitElement {

    public static get styles() {
        return [
            css`
                :host{
                    --rx-spacer-button-padding: 3px;
                }

                #upload-button {
                    text-align: center;
                    min-width: 120px;
                }

                #upload-button .icon svg{
                    display: block
                }

                #upload-button .icon{
                    display: inline-block;
                    vertical-align: bottom;
                }
            `,
        ];
    }

    protected render() {
        return html`
            <rx-spacer-button
                id="upload-button"
                title="Upload File"
                @click=${this.uploadFile}>
                <span class="icon">${uploadIcon}</span> Upload File
            </rx-spacer-button>
        `;
    }

    protected firstUpdated() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'fileToUpload';
        fileInput.style.display = 'none';
        fileInput.onclick = function() { (this as any).value = null; };
        fileInput.onchange = () => { RxCore.fileSelected(); };
        document.querySelector('body')!.appendChild(fileInput);
    }

    private uploadFile() {
        document.getElementById('fileToUpload')!.click();
    }
}

// Register the element with the browser
customElements.define('rx-spacer-upload', RasterexSpacerUpload);
