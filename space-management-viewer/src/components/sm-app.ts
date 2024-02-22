import { LitElement, html, property, PropertyValues} from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.;
import '../../libs/rx-spacer/src/rx-spacer.js';
import '../../libs/rx-spacer/src/rx-spacer-area-edit.js';
import '../../libs/rx-spacer/src/rx-spacer-area-info.js';

import './sm-mode-changer';
import './sm-header';
import './sm-rxcontainer';

// This element is connected to the Redux store.
import { store, RootState } from '../redux/store.js';

// import { currentFloorSelector } from '../reducers/rxcore.js';

// These are the actions needed by this element.
import {
    navigate,
    updateOffline
} from '../redux/actions/app.js';

import '@material/mwc-switch/';

class SmApp extends connect(store)(LitElement) {

    @property({ type: String })
    appTitle = '';

    @property({ type: String })
    private page = '';

    // @property({ type: Boolean })
    // private fileOpened = false;

    // @property({ type: Boolean })
    // private offline = false;

    protected createRenderRoot() {
        return this;
    }

    protected render() {
        // Anything that's related to rendering should be done in here.
        return html`
        <!-- Header -->
        <sm-header></sm-header>

        <div class="content-wrapper">
            <sm-landing class="page" ?active="${this.page === 'sm-landing'}"></sm-landing>
            <sm-rxcontainer class="page" ?active="${this.page === 'sm-rxcontainer'}"></sm-rxcontainer>
            <sm-view404 class="page" ?active="${this.page === 'view404'}"></sm-view404>
        </div>
        `;
    }

    constructor() {
        super();
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
        setPassiveTouchGestures(true);
    }

    protected firstUpdated() {
        store.dispatch(navigate('/sm-landing'));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    }

    protected updated(changedProps: PropertyValues) {
        if (changedProps.has('_page')) {
            const pageTitle = this.appTitle + ' - ' + this.page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }

    public stateChanged(state: RootState) {
        // const floor = currentFloorSelector(state);
        this.page = state.app!.page;
        // if (floor && floor.isFetched) {
        //     this.fileOpened = true;
        // }
    }

}

window.customElements.define('sm-app', SmApp);
