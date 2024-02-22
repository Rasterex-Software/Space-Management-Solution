import { storiesOf, addDecorator } from '@storybook/polymer';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import '../src/components/list/rasterex-listbox';
import '../src/components/list/rasterex-item';


addDecorator(withKnobs);
addDecorator(withBackgrounds([{ name: 'B1', value: '#00aced' }]))

storiesOf('List', module)
    .add('Example 1', () => {
            const horizontal =  boolean('Horizontal', false) ? 'horizontal' : '';

            return `
                <rasterex-listbox ${horizontal}>
                    <rasterex-item value="one">First item</rasterex-item>
                    <rasterex-item value="two">Second Item</rasterex-item>
                    <rasterex-item value="three">Three item</rasterex-item>
                    <rasterex-item value="four">Four Item</rasterex-item>
                </rasterex-listbox>
            `
        }
    )

