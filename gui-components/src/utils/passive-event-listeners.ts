let passiveEvtSupport: boolean;

/**
 * Detects browser support for passive event listeners. See
 * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 * @returns {boolean} True if the browser support passive event listeners.
 * @private
 */
function passiveEvtListenersSupported(): boolean {
    if (typeof passiveEvtSupport === 'undefined') {
        passiveEvtSupport = false;
        try {
            Object.defineProperty({}, 'passive', {
                get: () => {
                    passiveEvtSupport = true;
                },
            });
        } catch (e) { console.log(e); }
    }

    return passiveEvtSupport;
}

/**
 * Returns the event options (including passive if the browser supports it)
 * @param {boolean} isPassive Whether the event is passive or not.
 * @returns {Object|boolean} Based on browser support, returns either an
 * object representing the options (including passive), or a boolean.
 */
export function getEvtListenerOptions(isPassive: boolean) {
    return passiveEvtListenersSupported() ? { passive: isPassive } : false;
}
