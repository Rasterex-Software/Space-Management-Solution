import { storiesOf, addDecorator } from '@storybook/polymer';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, text } from '@storybook/addon-knobs';
import { document } from 'global';

import '../src/components/accordion/rasterex-accordion';
import '../src/components/accordion/rasterex-accordion-heading';
import '../src/components/accordion/rasterex-accordion-panel';
import './accordion.css';

addDecorator(withKnobs);

storiesOf('Accordion', module)
    .addDecorator(withBackgrounds([{ name: 'B1', value: '#00aced' }]))
    .add('Example 1', () =>
        `<rasterex-accordion>
            <rasterex-accordion-heading>${text('Heading 1 Label', 'Heading 1')}</rasterex-accordion-heading>
            <rasterex-accordion-panel>${text('Panel 1 Content', 'Content 1')}</rasterex-accordion-panel>
            <rasterex-accordion-heading>${text('Heading 2 Label', 'Heading 2')}</rasterex-accordion-heading>
            <rasterex-accordion-panel>${text('Panel 2 Content', 'Content 2')}</rasterex-accordion-panel>
            <rasterex-accordion-heading>${text('Heading 3 Label', 'Heading 3')}</rasterex-accordion-heading>
            <rasterex-accordion-panel>${text('Panel 3 Content', 'Content 3')}</rasterex-accordion-panel>
        </rasterex-accordion>`
    )
    .add('Example 2', (): HTMLElement => {
        const accEl = document.createElement('rasterex-accordion');
        const docFrag = document.createDocumentFragment();

        for (let i = 0; i < 5; i++) {
            const accHeading = document.createElement('rasterex-accordion-heading');
            accHeading.innerHTML = `Heading ${i}`;
            const accPanel = document.createElement('rasterex-accordion-panel');
            accPanel.innerHTML = `<h2>Panel ${i}</h2><p>Contents ${i}</p>`;
            docFrag.appendChild(accHeading);
            docFrag.appendChild(accPanel);
        }
        accEl.appendChild(docFrag);

        return accEl;
    });
