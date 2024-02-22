
import { storiesOf, addDecorator } from '@storybook/polymer';
import { html, TemplateResult } from 'lit-html';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { document } from 'global';

import '../src/components/toggle-button/rasterex-toggle-button';
import './toggle.css';

// import '../src/assets/sprites/font-awesome/regular.svg'; // Contains the svg map

addDecorator(withBackgrounds([{name: 'B1', value: '#00aced'}]))

storiesOf('Toggle Button',module)
    .addDecorator(withKnobs)
    .add('Example 1', () => {
        const label = text('Label', 'Button 1');
        const hasIcon = boolean('hasIcon',true)?'has-icon':'';
        const isDisabled = boolean('isDisabled', false)?'disabled':'';
        const isPressed = boolean('isPressed', false)?'pressed':'';
        const svgSpriteMapFile = text('svgSpriteMap', 'assets/sprites/font-awesome/regular.svg');
        const ids = ['address-book', 'address-card', 'angry', 'arrow-alt-circle-down', 'arrow-alt-circle-left',
            'arrow-alt-circle-right', 'arrow-alt-circle-up', 'bell', 'bell-slash', 'bookmark', 'building', 'calendar',
            'calendar-alt', 'calendar-check', 'calendar-minus', 'calendar-plus', 'calendar-times', 'caret-square-down',
            'caret-square-left', 'caret-square-right', 'caret-square-up', 'chart-bar', 'check-circle', 'check-square',
            'circle',
            'clipboard', 'clock', 'clone', 'closed-captioning', 'comment', 'comment-alt', 'comment-dots', 'comments',
            'compass',
            'copy', 'copyright', 'credit-card', 'dizzy', 'dot-circle', 'edit', 'envelope', 'envelope-open', 'eye',
            'eye-slash',
            'file', 'file-alt', 'file-archive', 'file-audio', 'file-code', 'file-excel', 'file-image', 'file-pdf',
            'file-powerpoint',
            'file-video', 'file-word', 'flag', 'flushed', 'folder', 'folder-open', 'font-awesome-logo-full', 'frown',
            'frown-open', 'futbol',
            'gem', 'grimace', 'grin', 'grin-alt', 'grin-beam', 'grin-beam-sweat', 'grin-hearts', 'grin-squint',
            'grin-squint-tears',
            'grin-stars', 'grin-tears', 'grin-tongue', 'grin-tongue-squint', 'grin-tongue-wink', 'grin-wink',
            'hand-lizard',
            'hand-paper', 'hand-peace', 'hand-point-down', 'hand-point-left', 'hand-point-right', 'hand-point-up',
            'hand-pointer',
            'hand-rock', 'hand-scissors', 'hand-spock', 'handshake', 'hdd', 'heart', 'hospital', 'hourglass', 'id-badge',
            'id-card',
            'image', 'images', 'keyboard', 'kiss', 'kiss-beam', 'kiss-wink-heart', 'laugh', 'laugh-beam', 'laugh-squint',
            'laugh-wink',
            'lemon', 'life-ring', 'lightbulb', 'list-alt', 'map', 'meh', 'meh-blank', 'meh-rolling-eyes', 'minus-square',
            'money-bill-alt',
            'moon', 'newspaper', 'object-group', 'object-ungroup', 'paper-plane', 'pause-circle', 'play-circle',
            'plus-square',
            'question-circle', 'registered', 'sad-cry', 'sad-tear', 'save', 'share-square', 'smile', 'smile-beam',
            'smile-wink', 'snowflake', 'square', 'star', 'star-half', 'sticky-note', 'stop-circle', 'sun', 'surprise',
            'thumbs-down', 'thumbs-up', 'times-circle', 'tired', 'trash-alt', 'user', 'user-circle', 'window-close',
            'window-maximize', 'window-minimize', 'window-restore'];
        const svgSpriteId = select('Spriteid',ids,'clock');


        return `
        <p> Customisable button </p>
        <rasterex-toggle-button
            ${hasIcon}
            ${isDisabled}
            ${isPressed}
            svg-sprite-id="${svgSpriteMapFile}#${svgSpriteId}"
            >${label}</rasterex-toggle-button>

        `;
    });


storiesOf('Toggle Button',module)
    .addDecorator(withKnobs)
    .add('Example 2', () => {
        const toggle = document.createElement('rasterex-toggle-button');

        toggle.innerHTML = text('Label', 'Button 1');
        toggle.hasIcon = boolean('hasIcon',true);
        toggle.disabled = boolean('isDisabled', false);
        toggle.pressed = boolean('isPressed', false);
        toggle.svgSpriteId = text('svgSpriteId', 'assets/sprites/font-awesome/regular.svg#clipboard');

        toggle.addEventListener('click', (e:Event) => action('Clicked')(e.target) );
        toggle.addEventListener('change', action('Changed'));

        return toggle;
    });

storiesOf('Toggle Button',module)
    .add('Example 3', () => {
        return `
        <hr>

        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#save"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#user"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#clone"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#hdd"></rasterex-toggle-button>


        <hr/>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-alt"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-archive"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-audio"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-code"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-excel"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-image"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-pdf"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-video"></rasterex-toggle-button>
        <rasterex-toggle-button has-icon svg-sprite-id="assets/sprites/font-awesome/regular.svg#file-word"></rasterex-toggle-button>

        `;
    });