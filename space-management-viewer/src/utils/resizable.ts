// The only important style is position: absolute on draggable element
class Resizable {
    private element: HTMLElement;;
    private resizers: NodeListOf<HTMLElement>;

    private minimum_size = 20;
    private original_width = 0;
    private original_height = 0;
    private original_x = 0;
    private original_y = 0;
    private original_mouse_x = 0;
    private original_mouse_y = 0;
    private currentResizer: HTMLElement;

    public constructor(element: HTMLElement, minSize = 20) {
        this.element = element;
        this.minimum_size = minSize;
        this.resizers = element.querySelectorAll('.resizer');
        this.resize = this.resize.bind(this);

        for (let i = 0; i < this.resizers.length; i++) {
            this.currentResizer = this.resizers[i];
            this.currentResizer.addEventListener('mousedown', (e: MouseEvent) => {
                e.preventDefault()
                this.original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                this.original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                element.style.width = this.original_width + 'px';
                element.style.height = this.original_height + 'px';
                this.original_x = element.getBoundingClientRect().left;
                this.original_y = element.getBoundingClientRect().top;
                this.original_mouse_x = e.pageX;
                this.original_mouse_y = e.pageY;
                window.addEventListener('mousemove', this, false);
                window.addEventListener('mouseup', this, false);

                this.element.dispatchEvent(new CustomEvent('resize-start', {
                    detail: {
                        width: this.element.clientWidth,
                        height: this.element.clientHeight
                    },
                    bubbles: true,
                }));
            })
        }
    }

    public handleEvent(e: Event) {
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            this.resize(e as MouseEvent);
        } else if (e.type === 'mouseup' || e.type === 'touchend' || e.type === 'touchcancel') {
            this.stopResize();
        }
    }


    private resize(e: MouseEvent) {
        if (this.currentResizer.classList.contains('bottom-right')) {
            const width = this.original_width + (e.pageX - this.original_mouse_x);
            const height = this.original_height + (e.pageY - this.original_mouse_y)
            if (width > this.minimum_size) {
                this.element.style.width = width + 'px'
            }
            if (height > this.minimum_size) {
                this.element.style.height = height + 'px'
            }
        }
        else if (this.currentResizer.classList.contains('bottom-left')) {
            const height = this.original_height + (e.pageY - this.original_mouse_y)
            const width = this.original_width - (e.pageX - this.original_mouse_x)
            if (height > this.minimum_size) {
                this.element.style.height = height + 'px'
            }
            if (width > this.minimum_size) {
                this.element.style.width = width + 'px'
                this.element.style.left = this.original_x + (e.pageX - this.original_mouse_x) + 'px'
            }
        }
        else if (this.currentResizer.classList.contains('top-right')) {
            const width = this.original_width + (e.pageX - this.original_mouse_x)
            const height = this.original_height - (e.pageY - this.original_mouse_y)
            if (width > this.minimum_size) {
                this.element.style.width = width + 'px'
            }
            if (height > this.minimum_size) {
                this.element.style.height = height + 'px'
                this.element.style.top = this.original_y + (e.pageY - this.original_mouse_y) + 'px'
            }
        }
        else {
            const width = this.original_width - (e.pageX - this.original_mouse_x)
            const height = this.original_height - (e.pageY - this.original_mouse_y)
            if (width > this.minimum_size) {
                this.element.style.width = width + 'px'
                this.element.style.left = this.original_x + (e.pageX - this.original_mouse_x) + 'px'
            }
            if (height > this.minimum_size) {
                this.element.style.height = height + 'px'
                this.element.style.top = this.original_y + (e.pageY - this.original_mouse_y) + 'px'
            }
        }
    }

    // TODO: check this, triggers all the time???
    private stopResize() {
        window.removeEventListener('mousemove', this);
        
        this.element.dispatchEvent(new CustomEvent('resize-end', {
            detail: {
                width: this.element.clientWidth,
                height: this.element.clientHeight
            },
            bubbles: true,
        }));
    }
}

export default Resizable;