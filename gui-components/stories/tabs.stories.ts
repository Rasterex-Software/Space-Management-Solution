import { storiesOf, addDecorator } from '@storybook/polymer';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

// import { RasterexTabs } from '../components/tabs/rasterex-tabs';
import '../src/components/tabs/rasterex-tabs';
import '../src/components/tabs/rasterex-tab';
import '../src/components/tabs/rasterex-tabpanel';
import './tabs.css';


addDecorator(withKnobs);
addDecorator(withBackgrounds([{ name: 'B1', value: '#00aced' }]))

storiesOf('Tabs', module)
    .add('Example 1', () => {
        // general
        const draggable = boolean('draggable', true, 'general') ? 'draggable' : '';
        const collapsible = boolean('collapsible', true, 'general') ? 'collapsible' : '';
        
        // tab1
        const dismissible1 = boolean('Tab 1 dismissible', true, 'tab1') ? 'dismiss' : '';
        const labelTab1 = text('Tab 1 Label', 'Tab 1', 'tab1'); 
        const contentPanel1 = text('Panel 1 Content', 'Content 1', 'tab1');
        
        // tab2
        const dismissible2 = boolean('Tab 2 dismissible', true, 'tab2') ? 'dismiss' : '';
        const labelTab2 = text('Tab 2 Label', 'Tab 2', 'tab2');
        const contentPanel2 = text('Panel 2 Content', 'Content 2', 'tab2');
        
        // tab3
        const dismissible3 = boolean('Tab 3 dismissible', true, 'tab3') ? 'dismiss' : '';
        const labelTab3 = text('Tab 3 Label', 'Tab 3', 'tab3');
        const contentPanel3 = text('Panel 3 Content', 'Content 3', 'tab3');

        return `<rasterex-tabs ${draggable} ${collapsible}>
            <rasterex-tab ${dismissible1}>${labelTab1}</rasterex-tab>
            <rasterex-tabpanel>${contentPanel1}</rasterex-tabpanel>
            <rasterex-tab ${dismissible2}>${labelTab2}</rasterex-tab>
            <rasterex-tabpanel>${contentPanel2}</rasterex-tabpanel>
            <rasterex-tab ${dismissible3}>${labelTab3}</rasterex-tab>
            <rasterex-tabpanel>${contentPanel3}</rasterex-tabpanel>
        </rasterex-tabs>`
        }
    )
    .add('Example 2', () => {
        const accEl = document.createElement('rasterex-tabs');
        const docFrag = document.createDocumentFragment();

        for (let i = 0; i < 5; i++) {
            const accHeading = document.createElement('rasterex-tab');
            accHeading.innerText = `Tab ${i}`;
            const accPanel = document.createElement('rasterex-tabpanel');
            accPanel.innerHTML = `<h2>Panel ${i}</h2><p>Contents ${i}</p>`;
            docFrag.appendChild(accHeading);
            docFrag.appendChild(accPanel);
        }
        accEl.appendChild(docFrag);

        return accEl;
    });

