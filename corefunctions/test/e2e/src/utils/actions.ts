export interface Actions {
    click(selector: string): void;
    doubleClick(selector: string): void;
    buttonDown(selector: string): void;
    buttonUp(selector: string): void;
    moveTo(selector: string, x: number, y: number): void;
}


export class W3CActions implements Actions {
    click(selector: string) {
        // removing hash (#) character from fragment identifier.
        const id = selector.substring(1, selector.length);
        (browser as any).performActions([{
            type: 'pointer',
            id,
            parameters: {
                pointerType: 'mouse'
            },
            actions: [
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
            ]
        }]);
        (browser as any).releaseActions();
    }

    doubleClick(selector: string) {
        // removing hash (#) character from fragment identifier.
        const id = selector.substring(1, selector.length);
        (browser as any).performActions([{
            type: 'pointer',
            id,
            parameters: {
                pointerType: 'mouse'
            },
            actions: [{
                type: 'pointerDown',
                button: 0
            }, {
                type: 'pointerUp',
                button: 0
            }, {
                type: 'pause',
                duration: 10
            }, {
                type: 'pointerDown',
                button: 0
            }, {
                type: 'pointerUp',
                button: 0
            }]
        }]);
    }

    buttonDown(selector: string) {
        // removing hash (#) character from fragment identifier.
        const id = selector.substring(1, selector.length);
        (browser as any).performActions([{
            type: 'pointer',
            id,
            parameters: {
                pointerType: 'mouse'
            },
            actions: [
                { type: 'pointerDown', button: 0 },
            ]
        }]);
    }

    buttonUp(selector: string) {
        // removing hash (#) character from fragment identifier.
        const id = selector.substring(1, selector.length);
        (browser as any).performActions([{
            type: 'pointer',
            id,
            parameters: {
                pointerType: 'mouse'
            },
            actions: [
                { type: 'pointerUp', button: 0 },
            ]
        }]);
        (browser as any).releaseActions();
    }

    moveTo(selector: string, x: number, y: number) {
        // removing hash (#) character from fragment identifier.
        const id = selector.substring(1, selector.length);
        (browser as any).performActions([{
            type: 'pointer',
            id,
            parameters: {
                pointerType: 'mouse'
            },
            actions: [
                { type: 'pointerMove', duration: 0, x: x, y: y }
            ]
        }]);
    }
}

export class JsonWireActions implements Actions {
    click(selector: string) {
        const element:any = $(selector);
        element.buttonDown(0);
        element.buttonUp(0)
    }

    doubleClick(selector: string) {
        this.click(selector); // workaround for chrome browser, sets the right mouse position before triggering doubleClick()
        $(selector).doubleClick();
    }

    buttonDown(selector: string) {
        ($(selector) as any).buttonDown(0);
    }

    buttonUp(selector: string) {
        ($(selector) as any).buttonUp(0);
    }

    moveTo(selector: string, x: number, y: number) {
        $(selector).moveTo(x, y);
    }
}