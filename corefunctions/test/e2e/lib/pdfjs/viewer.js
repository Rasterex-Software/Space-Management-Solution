/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*globals require, chrome */

'use strict';


var pdfjsWebLibs = {
    pdfjsWebPDFJS: window.pdfjsDistBuildPdf
};

(function () {

    (function (root, factory) {
        {
            factory((root.pdfjsWebUIUtils = {}), root.pdfjsWebPDFJS);
        }
    }(this, function (exports, pdfjsLib) {

        var CSS_UNITS = 96.0 / 72.0;
        var DEFAULT_SCALE_VALUE = 'auto';
        var DEFAULT_SCALE = 1.0;
        var UNKNOWN_SCALE = 0;
        var MAX_AUTO_SCALE = 1.25;
        var SCROLLBAR_PADDING = 40;
        var VERTICAL_PADDING = 5;

        var mozL10n = document.mozL10n || document.webL10n;

        var PDFJS = pdfjsLib.PDFJS;

        /**
         * Disables fullscreen support, and by extension Presentation Mode,
         * in browsers which support the fullscreen API.
         * @var {boolean}
         */
        PDFJS.disableFullscreen = (PDFJS.disableFullscreen === undefined ?
            false : PDFJS.disableFullscreen);

        /**
         * Enables CSS only zooming.
         * @var {boolean}
         */
        PDFJS.useOnlyCssZoom = (PDFJS.useOnlyCssZoom === undefined ?
            false : PDFJS.useOnlyCssZoom);

        /**
         * The maximum supported canvas size in total pixels e.g. width * height.
         * The default value is 4096 * 4096. Use -1 for no limit.
         * @var {number}
         */
        PDFJS.maxCanvasPixels = (PDFJS.maxCanvasPixels === undefined ?
            16777216 : PDFJS.maxCanvasPixels);

        /**
         * Disables saving of the last position of the viewed PDF.
         * @var {boolean}
         */
        PDFJS.disableHistory = (PDFJS.disableHistory === undefined ?
            false : PDFJS.disableHistory);

        /**
         * Disables creation of the text layer that used for text selection and search.
         * @var {boolean}
         */
        PDFJS.disableTextLayer = (PDFJS.disableTextLayer === undefined ?
            false : PDFJS.disableTextLayer);

        /**
         * Disables maintaining the current position in the document when zooming.
         */
        PDFJS.ignoreCurrentPositionOnZoom = (PDFJS.ignoreCurrentPositionOnZoom ===
            undefined ? false : PDFJS.ignoreCurrentPositionOnZoom);

        /**
         * Interface locale settings.
         * @var {string}
         */
        PDFJS.locale = (PDFJS.locale === undefined ? navigator.language : PDFJS.locale);

        /**
         * Returns scale factor for the canvas. It makes sense for the HiDPI displays.
         * @return {Object} The object with horizontal (sx) and vertical (sy)
         scales. The scaled property is set to false if scaling is
         not required, true otherwise.
         */
        function getOutputScale(ctx) {
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            var pixelRatio = devicePixelRatio / backingStoreRatio;
            return {
                sx: pixelRatio,
                sy: pixelRatio,
                scaled: pixelRatio !== 1
            };
        }

        /**
         * Scrolls specified element into view of its parent.
         * @param {Object} element - The element to be visible.
         * @param {Object} spot - An object with optional top and left properties,
         *   specifying the offset from the top left edge.
         * @param {boolean} skipOverflowHiddenElements - Ignore elements that have
         *   the CSS rule `overflow: hidden;` set. The default is false.
         */
        function scrollIntoView(element, spot, skipOverflowHiddenElements) {
            // Assuming offsetParent is available (it's not available when viewer is in
            // hidden iframe or object). We have to scroll: if the offsetParent is not set
            // producing the error. See also animationStartedClosure.
            var parent = element.offsetParent;
            if (!parent) {
                console.error('offsetParent is not set -- cannot scroll');
                return;
            }
            var checkOverflow = skipOverflowHiddenElements || false;
            var offsetY = element.offsetTop + element.clientTop;
            var offsetX = element.offsetLeft + element.clientLeft;
            while (parent.clientHeight === parent.scrollHeight ||
                (checkOverflow && getComputedStyle(parent).overflow === 'hidden')) {
                if (parent.dataset._scaleY) {
                    offsetY /= parent.dataset._scaleY;
                    offsetX /= parent.dataset._scaleX;
                }
                offsetY += parent.offsetTop;
                offsetX += parent.offsetLeft;
                parent = parent.offsetParent;
                if (!parent) {
                    return; // no need to scroll
                }
            }
            if (spot) {
                if (spot.top !== undefined) {
                    offsetY += spot.top;
                }
                if (spot.left !== undefined) {
                    offsetX += spot.left;
                    parent.scrollLeft = offsetX;
                }
            }
            parent.scrollTop = offsetY;
        }

        /**
         * Helper function to start monitoring the scroll event and converting them into
         * PDF.js friendly one: with scroll debounce and scroll direction.
         */
        function watchScroll(viewAreaElement, callback) {
            var debounceScroll = function debounceScroll(evt) {
                if (rAF) {
                    return;
                }
                // schedule an invocation of scroll for next animation frame.
                rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
                    rAF = null;

                    var currentY = viewAreaElement.scrollTop;
                    var lastY = state.lastY;
                    if (currentY !== lastY) {
                        state.down = currentY > lastY;
                    }
                    state.lastY = currentY;
                    callback(state);
                });
            };

            var state = {
                down: true,
                lastY: viewAreaElement.scrollTop,
                _eventHandler: debounceScroll
            };

            var rAF = null;
            viewAreaElement.addEventListener('scroll', debounceScroll, true);
            return state;
        }

        /**
         * Helper function to parse query string (e.g. ?param1=value&parm2=...).
         */
        function parseQueryString(query) {
            var parts = query.split('&');
            var params = {};
            for (var i = 0, ii = parts.length; i < ii; ++i) {
                var param = parts[i].split('=');
                var key = param[0].toLowerCase();
                var value = param.length > 1 ? param[1] : null;
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            }
            return params;
        }

        /**
         * Use binary search to find the index of the first item in a given array which
         * passes a given condition. The items are expected to be sorted in the sense
         * that if the condition is true for one item in the array, then it is also true
         * for all following items.
         *
         * @returns {Number} Index of the first array element to pass the test,
         *                   or |items.length| if no such element exists.
         */
        function binarySearchFirstItem(items, condition) {
            var minIndex = 0;
            var maxIndex = items.length - 1;

            if (items.length === 0 || !condition(items[maxIndex])) {
                return items.length;
            }
            if (condition(items[minIndex])) {
                return minIndex;
            }

            while (minIndex < maxIndex) {
                var currentIndex = (minIndex + maxIndex) >> 1;
                var currentItem = items[currentIndex];
                if (condition(currentItem)) {
                    maxIndex = currentIndex;
                } else {
                    minIndex = currentIndex + 1;
                }
            }
            return minIndex; /* === maxIndex */
        }

        /**
         *  Approximates float number as a fraction using Farey sequence (max order
         *  of 8).
         *  @param {number} x - Positive float number.
         *  @returns {Array} Estimated fraction: the first array item is a numerator,
         *                   the second one is a denominator.
         */
        function approximateFraction(x) {
            // Fast paths for int numbers or their inversions.
            if (Math.floor(x) === x) {
                return [x, 1];
            }
            var xinv = 1 / x;
            var limit = 8;
            if (xinv > limit) {
                return [1, limit];
            } else  if (Math.floor(xinv) === xinv) {
                return [1, xinv];
            }

            var x_ = x > 1 ? xinv : x;
            // a/b and c/d are neighbours in Farey sequence.
            var a = 0, b = 1, c = 1, d = 1;
            // Limiting search to order 8.
            while (true) {
                // Generating next term in sequence (order of q).
                var p = a + c, q = b + d;
                if (q > limit) {
                    break;
                }
                if (x_ <= p / q) {
                    c = p; d = q;
                } else {
                    a = p; b = q;
                }
            }
            // Select closest of the neighbours to x.
            if (x_ - a / b < c / d - x_) {
                return x_ === x ? [a, b] : [b, a];
            } else {
                return x_ === x ? [c, d] : [d, c];
            }
        }

        function roundToDivide(x, div) {
            var r = x % div;
            return r === 0 ? x : Math.round(x - r + div);
        }

        /**
         * Generic helper to find out what elements are visible within a scroll pane.
         */
        function getVisibleElements(scrollEl, views, sortByVisibility) {
            var top = scrollEl.scrollTop, bottom = top + scrollEl.clientHeight;
            var left = scrollEl.scrollLeft, right = left + scrollEl.clientWidth;

            function isElementBottomBelowViewTop(view) {
                var element = view.div;
                var elementBottom =
                    element.offsetTop + element.clientTop + element.clientHeight;
                return elementBottom > top;
            }

            var visible = [], view, element;
            var currentHeight, viewHeight, hiddenHeight, percentHeight;
            var currentWidth, viewWidth;
            var firstVisibleElementInd = (views.length === 0) ? 0 :
                binarySearchFirstItem(views, isElementBottomBelowViewTop);

            for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
                view = views[i];
                element = view.div;
                currentHeight = element.offsetTop + element.clientTop;
                viewHeight = element.clientHeight;

                if (currentHeight > bottom) {
                    break;
                }

                currentWidth = element.offsetLeft + element.clientLeft;
                viewWidth = element.clientWidth;
                if (currentWidth + viewWidth < left || currentWidth > right) {
                    continue;
                }
                hiddenHeight = Math.max(0, top - currentHeight) +
                    Math.max(0, currentHeight + viewHeight - bottom);
                percentHeight = ((viewHeight - hiddenHeight) * 100 / viewHeight) | 0;

                visible.push({
                    id: view.id,
                    x: currentWidth,
                    y: currentHeight,
                    view: view,
                    percent: percentHeight
                });
            }

            var first = visible[0];
            var last = visible[visible.length - 1];

            if (sortByVisibility) {
                visible.sort(function(a, b) {
                    var pc = a.percent - b.percent;
                    if (Math.abs(pc) > 0.001) {
                        return -pc;
                    }
                    return a.id - b.id; // ensure stability
                });
            }
            return {first: first, last: last, views: visible};
        }

        /**
         * Event handler to suppress context menu.
         */
        function noContextMenuHandler(e) {
            e.preventDefault();
        }

        /**
         * Returns the filename or guessed filename from the url (see issue 3455).
         * url {String} The original PDF location.
         * @return {String} Guessed PDF file name.
         */
        function getPDFFileNameFromURL(url) {
            var reURI = /^(?:([^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
            //            SCHEME      HOST         1.PATH  2.QUERY   3.REF
            // Pattern to get last matching NAME.pdf
            var reFilename = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
            var splitURI = reURI.exec(url);
            var suggestedFilename = reFilename.exec(splitURI[1]) ||
                reFilename.exec(splitURI[2]) ||
                reFilename.exec(splitURI[3]);
            if (suggestedFilename) {
                suggestedFilename = suggestedFilename[0];
                if (suggestedFilename.indexOf('%') !== -1) {
                    // URL-encoded %2Fpath%2Fto%2Ffile.pdf should be file.pdf
                    try {
                        suggestedFilename =
                            reFilename.exec(decodeURIComponent(suggestedFilename))[0];
                    } catch(e) { // Possible (extremely rare) errors:
                        // URIError "Malformed URI", e.g. for "%AA.pdf"
                        // TypeError "null has no properties", e.g. for "%2F.pdf"
                    }
                }
            }
            return suggestedFilename || 'document.pdf';
        }

        /**
         * Simple event bus for an application. Listeners are attached using the
         * `on` and `off` methods. To raise an event, the `dispatch` method shall be
         * used.
         */
        var EventBus = (function EventBusClosure() {
            function EventBus() {
                this._listeners = Object.create(null);
            }
            EventBus.prototype = {
                on: function EventBus_on(eventName, listener) {
                    var eventListeners = this._listeners[eventName];
                    if (!eventListeners) {
                        eventListeners = [];
                        this._listeners[eventName] = eventListeners;
                    }
                    eventListeners.push(listener);
                },
                off: function EventBus_on(eventName, listener) {
                    var eventListeners = this._listeners[eventName];
                    var i;
                    if (!eventListeners || ((i = eventListeners.indexOf(listener)) < 0)) {
                        return;
                    }
                    eventListeners.splice(i, 1);
                },
                dispatch: function EventBus_dispath(eventName) {
                    var eventListeners = this._listeners[eventName];
                    if (!eventListeners || eventListeners.length === 0) {
                        return;
                    }
                    // Passing all arguments after the eventName to the listeners.
                    var args = Array.prototype.slice.call(arguments, 1);
                    // Making copy of the listeners array in case if it will be modified
                    // during dispatch.
                    eventListeners.slice(0).forEach(function (listener) {
                        listener.apply(null, args);
                    });
                }
            };
            return EventBus;
        })();

        var ProgressBar = (function ProgressBarClosure() {

            function clamp(v, min, max) {
                return Math.min(Math.max(v, min), max);
            }

            function ProgressBar(id, opts) {
                this.visible = true;

                // Fetch the sub-elements for later.
                this.div = document.querySelector(id + ' .progress');

                // Get the loading bar element, so it can be resized to fit the viewer.
                this.bar = this.div.parentNode;

                // Get options, with sensible defaults.
                this.height = opts.height || 100;
                this.width = opts.width || 100;
                this.units = opts.units || '%';

                // Initialize heights.
                this.div.style.height = this.height + this.units;
                this.percent = 0;
            }

            ProgressBar.prototype = {

                updateBar: function ProgressBar_updateBar() {
                    if (this._indeterminate) {
                        this.div.classList.add('indeterminate');
                        this.div.style.width = this.width + this.units;
                        return;
                    }

                    this.div.classList.remove('indeterminate');
                    var progressSize = this.width * this._percent / 100;
                    this.div.style.width = progressSize + this.units;
                },

                get percent() {
                    return this._percent;
                },

                set percent(val) {
                    this._indeterminate = isNaN(val);
                    this._percent = clamp(val, 0, 100);
                    this.updateBar();
                },

                setWidth: function ProgressBar_setWidth(viewer) {
                    if (viewer) {
                        var container = viewer.parentNode;
                        var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
                        if (scrollbarWidth > 0) {
                            this.bar.setAttribute('style', 'width: calc(100% - ' +
                                scrollbarWidth + 'px);');
                        }
                    }
                },

                hide: function ProgressBar_hide() {
                    if (!this.visible) {
                        return;
                    }
                    this.visible = false;
                    this.bar.classList.add('hidden');
                    document.body.classList.remove('loadingInProgress');
                },

                show: function ProgressBar_show() {
                    if (this.visible) {
                        return;
                    }
                    this.visible = true;
                    document.body.classList.add('loadingInProgress');
                    this.bar.classList.remove('hidden');
                }
            };

            return ProgressBar;
        })();

        exports.CSS_UNITS = CSS_UNITS;
        exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
        exports.DEFAULT_SCALE = DEFAULT_SCALE;
        exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
        exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
        exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
        exports.VERTICAL_PADDING = VERTICAL_PADDING;
        exports.mozL10n = mozL10n;
        exports.EventBus = EventBus;
        exports.ProgressBar = ProgressBar;
        exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
        exports.noContextMenuHandler = noContextMenuHandler;
        exports.parseQueryString = parseQueryString;
        exports.getVisibleElements = getVisibleElements;
        exports.roundToDivide = roundToDivide;
        exports.approximateFraction = approximateFraction;
        exports.getOutputScale = getOutputScale;
        exports.scrollIntoView = scrollIntoView;
        //exports.watchScroll = watchScroll;
        exports.binarySearchFirstItem = binarySearchFirstItem;
    }));


    (function (root, factory) {
        {
            factory((root.pdfjsWebDOMEvents = {}), root.pdfjsWebUIUtils);
        }
    }(this, function (exports, uiUtils) {
        var EventBus = uiUtils.EventBus;

        // Attaching to the application event bus to dispatch events to the DOM for
        // backwards viewer API compatibility.
        function attachDOMEventsToEventBus(eventBus) {
            eventBus.on('documentload', function () {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('documentload', true, true, {});
                window.dispatchEvent(event);
            });
            eventBus.on('pagerendered', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagerendered', true, true, {
                    pageNumber: e.pageNumber,
                    cssTransform: e.cssTransform,
                });
                e.source.div.dispatchEvent(event);
            });
            eventBus.on('textlayerrendered', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('textlayerrendered', true, true, {
                    pageNumber: e.pageNumber
                });
                e.source.textLayerDiv.dispatchEvent(event);
            });
            eventBus.on('pagechange', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('pagechange', true, true, window, 0);
                event.pageNumber = e.pageNumber;
                event.previousPageNumber = e.previousPageNumber;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('pagesinit', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagesinit', true, true, null);
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('pagesloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagesloaded', true, true, {
                    pagesCount: e.pagesCount
                });
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('scalechange', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('scalechange', true, true, window, 0);
                event.scale = e.scale;
                event.presetValue = e.presetValue;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('updateviewarea', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('updateviewarea', true, true, window, 0);
                event.location = e.location;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('find', function (e) {
                if (e.source === window) {
                    return; // event comes from FirefoxCom, no need to replicate
                }
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('find' + e.type, true, true, {
                    query: e.query,
                    phraseSearch: e.phraseSearch,
                    caseSensitive: e.caseSensitive,
                    highlightAll: e.highlightAll,
                    findPrevious: e.findPrevious
                });
                window.dispatchEvent(event);
            });
            eventBus.on('attachmentsloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('attachmentsloaded', true, true, {
                    attachmentsCount: e.attachmentsCount
                });
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('sidebarviewchanged', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('sidebarviewchanged', true, true, {
                    view: e.view,
                });
                e.source.outerContainer.dispatchEvent(event);
            });
            eventBus.on('pagemode', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagemode', true, true, {
                    mode: e.mode,
                });
                e.source.pdfViewer.container.dispatchEvent(event);
            });
            eventBus.on('namedaction', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('namedaction', true, true, {
                    action: e.action
                });
                e.source.pdfViewer.container.dispatchEvent(event);
            });
            eventBus.on('presentationmodechanged', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('presentationmodechanged', true, true, {
                    active: e.active,
                    switchInProgress: e.switchInProgress
                });
                window.dispatchEvent(event);
            });
            eventBus.on('outlineloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('outlineloaded', true, true, {
                    outlineCount: e.outlineCount
                });
                e.source.container.dispatchEvent(event);
            });
        }

        var globalEventBus = null;
        function getGlobalEventBus() {
            if (globalEventBus) {
                return globalEventBus;
            }
            globalEventBus = new EventBus();
            attachDOMEventsToEventBus(globalEventBus);
            return globalEventBus;
        }

        exports.attachDOMEventsToEventBus = attachDOMEventsToEventBus;
        exports.getGlobalEventBus = getGlobalEventBus;
    }));








    (function (root, factory) {
        {
            factory((root.pdfjsWebTextLayerBuilder = {}), root.pdfjsWebDOMEvents,
                root.pdfjsWebPDFJS);
        }
    }(this, function (exports, domEvents, pdfjsLib) {

        /**
         * @typedef {Object} TextLayerBuilderOptions
         * @property {HTMLDivElement} textLayerDiv - The text layer container.
         * @property {EventBus} eventBus - The application event bus.
         * @property {number} pageIndex - The page index.
         * @property {PageViewport} viewport - The viewport of the text layer.
         * @property {PDFFindController} findController
         */

        /**
         * TextLayerBuilder provides text-selection functionality for the PDF.
         * It does this by creating overlay divs over the PDF text. These divs
         * contain text that matches the PDF text they are overlaying. This object
         * also provides a way to highlight text that is being searched for.
         * @class
         */
        var TextLayerBuilder = (function TextLayerBuilderClosure() {
            function TextLayerBuilder(options) {
                this.textLayerDiv = options.textLayerDiv;
                this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
                this.renderingDone = false;
                this.divContentDone = false;
                this.pageIdx = options.pageIndex;
                this.pageNumber = this.pageIdx + 1;
                this.matches = [];
                this.viewport = options.viewport;
                this.textDivs = [];
                this.findController = options.findController || null;
                this.textLayerRenderTask = null;
                this._bindMouse();
            }

            TextLayerBuilder.prototype = {
                _finishRendering: function TextLayerBuilder_finishRendering() {
                    this.renderingDone = true;

                    var endOfContent = document.createElement('div');
                    endOfContent.className = 'endOfContent';
                    this.textLayerDiv.appendChild(endOfContent);

                    this.eventBus.dispatch('textlayerrendered', {
                        source: this,
                        pageNumber: this.pageNumber
                    });
                },

                /**
                 * Renders the text layer.
                 * @param {number} timeout (optional) if specified, the rendering waits
                 *   for specified amount of ms.
                 */
                render: function TextLayerBuilder_render(timeout) {
                    if (!this.divContentDone || this.renderingDone) {
                        return;
                    }

                    if (this.textLayerRenderTask) {
                        this.textLayerRenderTask.cancel();
                        this.textLayerRenderTask = null;
                    }

                    this.textDivs = [];
                    var textLayerFrag = document.createDocumentFragment();
                    this.textLayerRenderTask = pdfjsLib.renderTextLayer({
                        textContent: this.textContent,
                        container: textLayerFrag,
                        viewport: this.viewport,
                        textDivs: this.textDivs,
                        timeout: timeout
                    });
                    this.textLayerRenderTask.promise.then(function () {
                        this.textLayerDiv.appendChild(textLayerFrag);
                        this._finishRendering();
                        this.updateMatches();
                    }.bind(this), function (reason) {
                        // canceled or failed to render text layer -- skipping errors
                    });
                },

                setTextContent: function TextLayerBuilder_setTextContent(textContent) {
                    if (this.textLayerRenderTask) {
                        this.textLayerRenderTask.cancel();
                        this.textLayerRenderTask = null;
                    }
                    this.textContent = textContent;
                    this.divContentDone = true;
                },

                convertMatches: function TextLayerBuilder_convertMatches(matches,
                                                                         matchesLength) {
                    var i = 0;
                    var iIndex = 0;
                    var bidiTexts = this.textContent.items;
                    var end = bidiTexts.length - 1;
                    var queryLen = (this.findController === null ?
                        0 : this.findController.state.query.length);
                    var ret = [];
                    if (!matches) {
                        return ret;
                    }
                    for (var m = 0, len = matches.length; m < len; m++) {
                        // Calculate the start position.
                        var matchIdx = matches[m];

                        // Loop over the divIdxs.
                        while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
                            iIndex += bidiTexts[i].str.length;
                            i++;
                        }

                        if (i === bidiTexts.length) {
                            console.error('Could not find a matching mapping');
                        }

                        var match = {
                            begin: {
                                divIdx: i,
                                offset: matchIdx - iIndex
                            }
                        };

                        // Calculate the end position.
                        if (matchesLength) { // multiterm search
                            matchIdx += matchesLength[m];
                        } else { // phrase search
                            matchIdx += queryLen;
                        }

                        // Somewhat the same array as above, but use > instead of >= to get
                        // the end position right.
                        while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
                            iIndex += bidiTexts[i].str.length;
                            i++;
                        }

                        match.end = {
                            divIdx: i,
                            offset: matchIdx - iIndex
                        };
                        ret.push(match);
                    }

                    return ret;
                },

                renderMatches: function TextLayerBuilder_renderMatches(matches) {
                    // Early exit if there is nothing to render.
                    if (matches.length === 0) {
                        return;
                    }

                    var bidiTexts = this.textContent.items;
                    var textDivs = this.textDivs;
                    var prevEnd = null;
                    var pageIdx = this.pageIdx;
                    var isSelectedPage = (this.findController === null ?
                        false : (pageIdx === this.findController.selected.pageIdx));
                    var selectedMatchIdx = (this.findController === null ?
                        -1 : this.findController.selected.matchIdx);
                    var highlightAll = (this.findController === null ?
                        false : this.findController.state.highlightAll);
                    var infinity = {
                        divIdx: -1,
                        offset: undefined
                    };

                    function beginText(begin, className) {
                        var divIdx = begin.divIdx;
                        textDivs[divIdx].textContent = '';
                        appendTextToDiv(divIdx, 0, begin.offset, className);
                    }

                    function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
                        var div = textDivs[divIdx];
                        var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
                        var node = document.createTextNode(content);
                        if (className) {
                            var span = document.createElement('span');
                            span.className = className;
                            span.appendChild(node);
                            div.appendChild(span);
                            return;
                        }
                        div.appendChild(node);
                    }

                    var i0 = selectedMatchIdx, i1 = i0 + 1;
                    if (highlightAll) {
                        i0 = 0;
                        i1 = matches.length;
                    } else if (!isSelectedPage) {
                        // Not highlighting all and this isn't the selected page, so do nothing.
                        return;
                    }

                    for (var i = i0; i < i1; i++) {
                        var match = matches[i];
                        var begin = match.begin;
                        var end = match.end;
                        var isSelected = (isSelectedPage && i === selectedMatchIdx);
                        var highlightSuffix = (isSelected ? ' selected' : '');

                        if (this.findController) {
                            this.findController.updateMatchPosition(pageIdx, i, textDivs,
                                begin.divIdx);
                        }

                        // Match inside new div.
                        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
                            // If there was a previous div, then add the text at the end.
                            if (prevEnd !== null) {
                                appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                            }
                            // Clear the divs and set the content until the starting point.
                            beginText(begin);
                        } else {
                            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
                        }

                        if (begin.divIdx === end.divIdx) {
                            appendTextToDiv(begin.divIdx, begin.offset, end.offset,
                                'highlight' + highlightSuffix);
                        } else {
                            appendTextToDiv(begin.divIdx, begin.offset, infinity.offset,
                                'highlight begin' + highlightSuffix);
                            for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
                                textDivs[n0].className = 'highlight middle' + highlightSuffix;
                            }
                            beginText(end, 'highlight end' + highlightSuffix);
                        }
                        prevEnd = end;
                    }

                    if (prevEnd) {
                        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                    }
                },

                updateMatches: function TextLayerBuilder_updateMatches() {
                    // Only show matches when all rendering is done.
                    if (!this.renderingDone) {
                        return;
                    }

                    // Clear all matches.
                    var matches = this.matches;
                    var textDivs = this.textDivs;
                    var bidiTexts = this.textContent.items;
                    var clearedUntilDivIdx = -1;

                    // Clear all current matches.
                    for (var i = 0, len = matches.length; i < len; i++) {
                        var match = matches[i];
                        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
                        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
                            var div = textDivs[n];
                            div.textContent = bidiTexts[n].str;
                            div.className = '';
                        }
                        clearedUntilDivIdx = match.end.divIdx + 1;
                    }

                    if (this.findController === null || !this.findController.active) {
                        return;
                    }

                    // Convert the matches on the page controller into the match format
                    // used for the textLayer.
                    var pageMatches, pageMatchesLength;
                    if (this.findController !== null) {
                        pageMatches = this.findController.pageMatches[this.pageIdx] || null;
                        pageMatchesLength = (this.findController.pageMatchesLength) ?
                            this.findController.pageMatchesLength[this.pageIdx] || null : null;
                    }

                    this.matches = this.convertMatches(pageMatches, pageMatchesLength);
                    this.renderMatches(this.matches);
                },

                /**
                 * Fixes text selection: adds additional div where mouse was clicked.
                 * This reduces flickering of the content if mouse slowly dragged down/up.
                 * @private
                 */
                _bindMouse: function TextLayerBuilder_bindMouse() {
                    var div = this.textLayerDiv;
                    div.addEventListener('mousedown', function (e) {
                        var end = div.querySelector('.endOfContent');
                        if (!end) {
                            return;
                        }
                        // On non-Firefox browsers, the selection will feel better if the height
                        // of the endOfContent div will be adjusted to start at mouse click
                        // location -- this will avoid flickering when selections moves up.
                        // However it does not work when selection started on empty space.
                        var adjustTop = e.target !== div;
                        adjustTop = adjustTop && window.getComputedStyle(end).
                            getPropertyValue('-moz-user-select') !== 'none';
                        if (adjustTop) {
                            var divBounds = div.getBoundingClientRect();
                            var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
                            end.style.top = (r * 100).toFixed(2) + '%';
                        }
                        end.classList.add('active');
                    });
                    div.addEventListener('mouseup', function (e) {
                        var end = div.querySelector('.endOfContent');
                        if (!end) {
                            return;
                        }
                        end.style.top = '';
                        end.classList.remove('active');
                    });
                },
            };
            return TextLayerBuilder;
        })();

        /**
         * @constructor
         * @implements IPDFTextLayerFactory
         */
        function DefaultTextLayerFactory() {}
        DefaultTextLayerFactory.prototype = {
            /**
             * @param {HTMLDivElement} textLayerDiv
             * @param {number} pageIndex
             * @param {PageViewport} viewport
             * @returns {TextLayerBuilder}
             */
            createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport) {
                return new TextLayerBuilder({
                    textLayerDiv: textLayerDiv,
                    pageIndex: pageIndex,
                    viewport: viewport
                });
            }
        };

        exports.TextLayerBuilder = TextLayerBuilder;
        exports.DefaultTextLayerFactory = DefaultTextLayerFactory;
    }));


}).call(pdfjsWebLibs);






