import { html } from 'lit-element';
import { PageViewElement } from '../generic/page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../shared-styles.js';

class MyView404 extends PageViewElement {
  static styles = SharedStyles;

  protected render() {
    return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
        </p>
      </section>
    `
  }
}

window.customElements.define('sm-view404', MyView404);
