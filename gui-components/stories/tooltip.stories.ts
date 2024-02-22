import { storiesOf } from '@storybook/polymer';
import { html, TemplateResult } from 'lit-html';
import { withBackgrounds } from '@storybook/addon-backgrounds';

// import { RasterexTabs } from '../components/tabs/rasterex-tabs';
import '../src/components/tabs/rasterex-tabs';

storiesOf('Tooltip',module)
    // .addDecorator(withBackgrounds([{name: 'B1', value: '#00aced'}]))
    .add('Basic', ():TemplateResult => html`
        TODO
    `);


