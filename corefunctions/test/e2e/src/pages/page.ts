import { Actions } from '../utils/actions';
import { W3CActions, JsonWireActions } from '../utils/actions';
import fs from 'fs';
declare const RxCore: any;
declare const RxConfig: any;

class Page {
    private actions: Actions;
    private localUrl = 'http://localhost:8080/';

    public readonly canvasID = '#imageTemp';
    public readonly rxCanvas = '#rxcanvas';


    /**
     * Initializations. Normally you should use this in the 'before' hook
     *
     * @memberof Page
     */
    public init() {

        // set actions protocol
        if (browser.isW3C) {
            this.setActions(new W3CActions())
        } else {
            this.setActions(new JsonWireActions())
        }

        // open local web page
        this.loadUrl(this.localUrl);
        // browser.debug();
        // initialize RxCore
        browser.execute(() => {
            RxCore.initialize();
        });

        // browser.pause(100);

    }

    /**
     *
     * @param {boolean} [fileName] demo file path to be opened
     * @memberof Page
     */
    public openDemoDocument(fileName: string='') {
        // open demo file
        const fName = encodeURI(fileName);
        (browser as any).execute((fName:string) => {
            let path = RxConfig.baseFileURL + fName;
            RxCore.openFile(path);
        }, fName);

        // wait until document is open
        browser.waitUntil(function () {
            const result: any = browser.execute(() => {
                return RxCore.documentOpened();
            });

            return result === true;
        }, 5000);
        // browser.debug();
    }


    /**
     * Set page actions protocol
     *
     * @param {Actions} actions
     * @memberof Page
     */
    public setActions(actions: Actions) {
        this.actions = actions;
    }


    /**
     * Set rxcore markup unique ID when creating
     *
     * @param id
     */
    public setMarkupID(id: string) {
        (browser as any).execute((id:string) => {
            RxCore.GUI_Markup.connect((markup, operation) => {
                if (operation.created) {
                    markup.setUniqueID(id);
                }
            });
        }, id);
    }

    /**
     * Protocol binding to load or get the URL of the browser.
     * If a baseUrl is specified in the config, it will be prepended to the url parameter using node's url.resolve() method.
     *
     * @param {string} path
     * @memberof Page
     */
    public loadUrl(path: string) {
        browser.url(path);
    }


    /**
     * Get Page.canvasID width and height
     *
     * @returns
     * @memberof Page
     */
    public getSize() {
        const width = $(this.canvasID).getSize('width');
        const height = $(this.canvasID).getSize('height');

        return {
            width ,
            height
        }
    }


    /**
     * Get rxcore markup object by id
     *
     * @param id
     */
    public getMarkupByID(id:string) {
        const markup = (browser as any).execute((id:string) => {
            return RxCore.getmarkupobjByGUID(id);
        }, id);

        return markup;
    }

    /**
     * PAGE ACTIONS.
     */

    /**
     * Click
     *
     * @param {string} [selector=this.canvasID]
     * @memberof Page
     */
    public click(selector: string = this.canvasID) {
        this.actions.click(selector);
    }

    /**
     * Double click
     *
     * @param {string} [selector=this.canvasID]
     * @memberof Page
     */
    public doubleClick(selector: string = this.canvasID) {
        this.actions.doubleClick(selector);
    }

    /**
     * Button down/press
     *
     * @param {string} [selector=this.canvasID]
     * @memberof Page
     */
    public buttonDown(selector: string = this.canvasID) {
        this.actions.buttonDown(selector);
    }

    /**
     * Button up/release
     *
     * @param {string} [selector=this.canvasID]
     * @memberof Page
     */
    public buttonUp(selector: string = this.canvasID) {
        this.actions.buttonUp(selector);
    }

    /**
     * Move the mouse by an offset of the specified element.
     * If no element is specified, the move is relative to Page.canvasID
     *
     * @param {number} x
     * @param {number} y
     * @param {string} [selector=this.canvasID]
     * @memberof Page
     */
    public moveTo(x: number, y: number, selector: string = this.canvasID) {
        this.actions.moveTo(selector, x, y);
    }
}

export default new Page();