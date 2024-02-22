// The only important style is position: absolute on draggable element
class Draggable {
    private elmnt: HTMLElement = {} as HTMLElement;
    private dragItem: HTMLElement | undefined = {} as HTMLElement;
    private overlay: HTMLElement = {} as HTMLElement;

    private currentX = 0;
    private currentY = 0;
    private initialX = 0;
    private initialY = 0;
    private dragging = false;

    /**
     * Initialize draggable
     *  
     * @param element Draggable element
     * @param dragItem Drag item - should be a child of draggable element
     */
    public constructor(element: HTMLElement, dragItem?: HTMLElement) {
        this.elmnt = element;
        this.elmnt.style.position = 'absolute';
        this.dragItem = dragItem || undefined;
        this.createOverlay();
        this.addDraggableEvents();

        // fixes weird safari 10 bug where preventDefault is prevented
        // @see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
        window.addEventListener('touchmove', () => { return; });
    }

    /**
     * Add draggable events - this method can be called again if destroy was called
     */
    public addDraggableEvents() {
        if (this.dragItem) {
            this.dragItem.addEventListener('touchstart', this, false);
            this.dragItem.addEventListener('mousedown', this, false);
            this.dragItem.style.cursor = 'move';
        } else {
            this.elmnt.addEventListener('touchstart', this, false);
            this.elmnt.addEventListener('mousedown', this, false);
            this.elmnt.style.cursor = 'move';
        }
    }

    /**
     * Destroy draggable - remove events
     */
    public destroy() {
        if (this.dragItem) {
            this.dragItem.removeEventListener('mousedown', this);
            this.dragItem.removeEventListener('touchstart', this);
        }
        
        this.elmnt.removeEventListener('mousedown', this);
        this.elmnt.removeEventListener('touchstart', this);
    }

    public handleEvent(e: Event) {
        // Touch / drag
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            this.dragStart(e as MouseEvent);
        } else if (e.type === 'mousemove' || e.type === 'touchmove') {
            this.drag(e as MouseEvent);
        } else if (e.type === 'mouseup' || e.type === 'touchend' || e.type === 'touchcancel') {
            this.dragEnd();
        }
    }

    private createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('draggable-overlay');
        // Don't mix position:fixed with CSS transforms, fixed position is relative 
        // to the element not to the window
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.bottom = '0';
        overlay.style.right = '0';
        overlay.style.left = '0';
        overlay.style.display = 'none';

        // prepend to the same level as the element, that's because if the element has CSS transforms then
        // the position fixed will not work as expected
        this.elmnt.prepend(overlay);
        this.overlay = overlay;
    }

    /**
     * Event handler for drag start(touchstart|mousedown)
     *
     * @param {MouseEvent} e
     */
    private dragStart(e: MouseEvent) {
        e.stopPropagation();

        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.dragging = true;
        this.overlay.style.display = 'block';
        window.addEventListener('touchmove', this, false);
        window.addEventListener('mousemove', this, false);
        window.addEventListener('mouseup', this, false);
        window.addEventListener('touchend', this, false);
        window.addEventListener('touchcancel', this, false);
    }

    /**
     * Event handler for drag move(touchmove|mousemove)
     * TODO: drag feature for responsive layout
     * @param {MouseEvent} e
     */
    private drag(e: MouseEvent) {
        if (this.dragging) {
            e.preventDefault();

            // calculate the new cursor position:
            this.currentX = this.initialX - e.clientX;
            this.currentY = this.initialY - e.clientY;
            this.initialX = e.clientX;
            this.initialY = e.clientY;
            // set the element's new position:
            this.elmnt.style.top = (this.elmnt.offsetTop - this.currentY) + "px";
            this.elmnt.style.left = (this.elmnt.offsetLeft - this.currentX) + "px";

            // cancel any right or bottom style 
            this.elmnt.style.right = 'auto';
            this.elmnt.style.bottom = 'auto';

            // flag, in order to detect if element was dragged
            if (!this.elmnt.hasAttribute('dragged')) {
                this.elmnt.setAttribute('dragged', '');
            }
        }
    }

    /**
     * Event handler for drag end(touchend|mouseup)
     *
     */
    private dragEnd() {
        this.dragging = false;
        this.overlay.style.display = 'none';
        
        window.removeEventListener('touchmove', this);
        window.removeEventListener('mousemove', this);
        window.removeEventListener('touchend', this);
        window.removeEventListener('mouseup', this);
        window.removeEventListener('touchcancel', this);
    }
}

export default Draggable;