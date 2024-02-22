import { IRxSpacerStore, RxSpacerAnyAction, Unsubscribe } from '../store/store';

declare type Constructor<T> = new (...args: any[]) => T;

interface CustomElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}

export const connect = <S>(store: IRxSpacerStore<S, RxSpacerAnyAction>) =>
    <T extends Constructor<CustomElement>>(baseElement: T) => {
        return class extends baseElement {
            private storeUnsubscribe: Unsubscribe;
            public connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback();
                }
                this.storeUnsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
                this.stateChanged(store.getState());
            }
            public disconnectedCallback() {
                this.storeUnsubscribe();
                if (super.disconnectedCallback) {
                    super.disconnectedCallback();
                }
            }
            /**
             * The `stateChanged(state)` method will be called when the state is updated.
             */

            // tslint:disable-next-line: variable-name no-empty
            public stateChanged(_state: S): void { }
        };
};
