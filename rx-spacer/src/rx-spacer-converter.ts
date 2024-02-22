declare var RxCore: any;
import { css, html, LitElement, property, query } from 'lit-element';
import RxEvents from 'rx-events';
import { RasterexSpacerLoader } from './base-components/rx-spacer-loader';
import { RasterexSpacerSnackBar } from './base-components/rx-spacer-snack-bar';
import './base-components/rx-spacer-snack-bar';
import store, { RootState } from './store';
import { addAreas, addBlocksToConvert } from './store/actions';
import { connect } from './utils/connect-mixin';

export class RasterexSpacerConverter extends connect(store)(LitElement) {

    /**
     * CONVERTER PROPERTIES
     */
    private readonly EVENTS = {
        START_CONVERT: 'rx-spacer-start-convert',
        END_CONVERT: 'rx-spacer-end-convert',
    };
    private blocksToConvert: string[] | undefined;
    protected fileName: string;
    protected showLoader = false;
    private fileUploaded = false;
    private conversionDone = false;

    public vectorBlockColor = 'rgba(46, 49, 49, 0.3)';

    @query('#loader')
    protected loader: RasterexSpacerLoader;

    @query('rx-spacer-snack-bar')
    protected snackBar: RasterexSpacerSnackBar;

    @property({type: Boolean})
    private autoConvert = false;

    @property({type: Array, reflect: true, attribute: 'exclude-files'})
    private excludeFiles: string[] = [];

    public static get styles() {
        return [
            css`
                h3 {
                    font-weight: normal;
                    margin: 0;
                }
            `,
        ];
    }

    /**
     * CONVERTER METHODS
     */

    public stateChanged(state: RootState) {
        this.blocksToConvert = state.rxspacer.blocksToConvert;
    }

    protected render() {
        return html`
            <rx-spacer-loader id="loader"></rx-spacer-loader>
            <rx-spacer-snack-bar>
                <div slot="content">
                    <h3>Use existing areas?</h3>
                </div>
            </rx-spacer-snack-bar>
        `;
    }

    protected firstUpdated() {
        RxEvents.subscribe('file-load-complete', () => {
            const openedFileInfo = RxCore.getFileInfo();
            if (this.fileName !== openedFileInfo.FileName) {
                this.fileName = openedFileInfo.FileName;
            }
        });
        RxEvents.subscribe('page', () => {
            const openedFileInfo = RxCore.getFileInfo();
            if (openedFileInfo && this.fileName !== openedFileInfo.FileName) {
                this.fileName = openedFileInfo.FileName;
            }
        });
        RxEvents.subscribe('vector-blocks-loaded', (blocks: any) => {
            if (!this.excludeFiles.includes(this.fileName)) {
                this.prepareVectorBlocks(blocks);
            }
        });
        RxEvents.subscribe('upload', this.fileUploadedHandler.bind(this));
        RxEvents.subscribe('markup-load-complete', this.loadExistingMarkups.bind(this));
    }

    //  Added to convert spaces in demo files
    public forceConversion() {
        this.blocksToConvert = [];
        this.conversionDone = false;
        this.fileUploaded = true;

        const vectorBlocks = RxCore.get2DVectorBlocks();
        if (Array.isArray(vectorBlocks)) {
            this.prepareVectorBlocks(vectorBlocks);
        }
    }

    private async convertVectorBlocks() {
        if (this.conversionDone) {
            return;
        }

        await this.updateComplete;
        const blocksConverted: string[] = [];
        RxEvents.dispatchEvent(this.EVENTS.START_CONVERT);

        // prepare vector blocks
        if (this.blocksToConvert !== undefined) {
            const blocksToConvert = this.blocksToConvert.map((index) => {
                const attr = RxCore.getBlockAttributes(index);
                const ref = attr.length > 0 ? attr[0].value : '';

                return {
                    ref,
                    index,
                };
            });

            // difference can be all vector blocks or remaining blocks
            const differences = blocksToConvert.filter((x: any) => !blocksConverted.includes(x.ref));

            if (differences.length > 0 ) {
                if (!this.autoConvert) {
                    // highlight existing vector blocks
                    differences.forEach((block) => {
                        RxCore.setBlockColor(block.index, this.vectorBlockColor, true);
                    });

                    // confirm notification
                    try {
                        await this.snackBar.show();

                        // accepted conversion, create spaces
                        differences.forEach((block: any) => {
                            RxCore.createSpacefromBlock(block.index);
                        });
                        // clear blocks to convert
                        store.dispatch(addBlocksToConvert());
                    } catch (e) {
                        // rejected conversion
                        RxCore.restoreBlockStates();
                    }

                    this.snackBar.hide();
                } else {
                    // accepted conversion, create spaces
                    differences.forEach((block: any) => {
                        RxCore.createSpacefromBlock(block.index);
                    });
                    // clear blocks to convert
                    store.dispatch(addBlocksToConvert());
                }

                this.conversionDone = true;
                this.fileUploaded = false;
            }
        }

        // conversion done
        if (this.conversionDone) {
            RxEvents.dispatchEvent(this.EVENTS.END_CONVERT);
            // TODO
            // this.hideLoaderComponent();
        }
    }

    private prepareVectorBlocks(blocks: any) {
        if (Array.isArray(blocks) && blocks.length === 0) {
            this.conversionDone = true;
            this.fileUploaded = false;
        }

        if (this.fileUploaded) {
             // filter area blocks
            const areaBlocks = blocks.filter((block: any) => block.name.indexOf('Area') !== -1);
            if (areaBlocks.length > 0) {
                const blocksIndex: number[] = [];
                areaBlocks.forEach((block: any) => blocksIndex.push(block.index));

                store.dispatch(addBlocksToConvert(blocksIndex));

                // TODO: temporary fix, sometimes markup-list rx-event triggers before,
                // so we need to call convertVectorBlocks method here
                // Sometimes when convert automatically the file is not fully processed
                // so whe need to delay the conversion
                setTimeout(() => {
                    this.convertVectorBlocks();
                }, 100);
            }
        }
    }

    private fileUploadedHandler() {
        this.fileUploaded = true;
        this.conversionDone = false;
    }

    private loadExistingMarkups(markuplist: any) {
        const areas: any[] = [];
        const vectorBlockIds: string[] = [];
        markuplist.forEach((markup: any) => {
            // deal only with space markup
            const spaceID = markup.GetAttributes().find((element: any) => element.name === 'SpaceID');
            if (spaceID === undefined) {
                return;
            }

            // TODO: bulk operation
            const blockId = markup.GetAttributes().find((element: any) => element.name === 'id');
            if (blockId) {
                vectorBlockIds.push(blockId);
            }

            areas.push(markup.getUniqueID());
        });

        if (areas.length > 0) {
            store.dispatch(addAreas(this.fileName, areas));
            // TODO: review, for the moment is needed because blocks are highlighted ???
            RxCore.restoreBlockStates();
        }
    }
}

// Register the element with the browser
customElements.define('rx-spacer-converter', RasterexSpacerConverter);
