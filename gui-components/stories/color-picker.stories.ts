import { storiesOf, addDecorator } from '@storybook/polymer';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import '../src/components/color-picker/rasterex-color-picker';

addDecorator(withKnobs);
addDecorator(withBackgrounds([{ name: 'B1', value: '#00aced' }]))

storiesOf('Color Picker', module)
    .add('Basic', () => {

            return `
                <rasterex-color-picker></rasterex-color-picker>
            `
        }
    )