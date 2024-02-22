class Collapsible {
    private readonly cssClassName = {
        SHOW: 'show',
        COLLAPSED: 'collapsed'
    };

    private element: HTMLElement;
    private triggerElement: HTMLElement | null;

    private expanded = true;

    public constructor(element: HTMLElement, triggerElement: HTMLElement) {
        this.toggle = this.toggle.bind(this);

        this.element = element;
        this.triggerElement = triggerElement;

        this.attachEvents();
    }

    /**
     * Destroy collapse - remove events
     */
    public destroy() {
        this.removeEvents();
    }


    public toggle() {
        if (this.expanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    public show() {
        if (this.expanded) {
            return;
        }

        this.element.classList.remove(this.cssClassName.COLLAPSED);
        this.element.classList.add(this.cssClassName.SHOW);
        this.element.style.display = 'block';

        this.expanded = true;
    }

    public hide() {
        if (!this.expanded) {
            return;
        }
        this.element.classList.remove(this.cssClassName.SHOW);
        this.element.classList.add(this.cssClassName.COLLAPSED);
        this.element.style.display = 'none';
        this.expanded = false;
    }

    private attachEvents() {
        this.triggerElement!.addEventListener('click', this.toggle);
    }

    private removeEvents() {
        this.triggerElement!.removeEventListener('click', this.toggle);
    }
}

export default Collapsible;