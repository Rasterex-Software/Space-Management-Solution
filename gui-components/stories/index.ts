import { storiesOf } from '@storybook/polymer';
import { html, TemplateResult } from 'lit-html';
import { withBackgrounds } from '@storybook/addon-backgrounds';

storiesOf('Welcome',module)
    .addDecorator(withBackgrounds([{name: 'B1', value: '#00aced'}]))
;    // .add('Welcome', ():TemplateResult => html`<h1>Storybook</h1>`);

