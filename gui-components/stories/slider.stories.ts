import { storiesOf, addDecorator } from '@storybook/polymer';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { document } from 'global';

import '../src/components/slider/rasterex-slider';
import './slider.css';

addDecorator(withKnobs);

storiesOf('Slider', module)
    .addDecorator(withBackgrounds([{ name: 'B1', value: '#00aced' }]))
    .add('Example 1', () => {
            const value=number('value', 10);
            const min=number('min',0);
            const max=number('max',100);
            const step=number('step',1);
            const knobsize=number('knobsize',15);
            const knobradius=number('knobradius',50);
            const disabled=boolean('disabled',false)?'disabled':'';

            return  `<rasterex-slider
                    value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    knobsize=${knobsize}
                    knobradius=${knobradius}
                    ${disabled}>
                </rasterex-slider>`
        }
    )
    .add('Example 2', (): HTMLElement => {
        // TODO fix
        const sliderEl = document.createElement('rasterex-slider');

        sliderEl.value=number('value', 10);
        sliderEl.min=number('min',0);
        sliderEl.max=number('max',100);
        sliderEl.step=number('step',1);
        sliderEl.knobsize=number('knobsize',15);
        sliderEl.knobradius=number('knobradius',50);
        sliderEl.disabled=boolean('disabled',false);

        return sliderEl;
    });
