
/**
 * @template T the type of the action's `type` tag.
 */
export interface RxSpacerAction<T = any> {
    type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent users who are extending `Action.
 */
export interface RxSpacerAnyAction extends RxSpacerAction {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any;
}

/**
 * @template A Returned action type.
 */
export type RxSpacerActionCreator<A> = (...args: any[]) => A;

/**
 * *Do not put API calls into reducers.*
 *
 * @template S The type of state consumed and produced by this reducer.
 * @template A The type of actions the reducer can potentially respond to.
 */
export type RxSpacerReducer<S = any, A extends RxSpacerAction = RxSpacerAnyAction> = (
    state: S | undefined,
    action: A,
) => S;

/**
 * Function to remove listener added by `IRxSpacerStore.subscribe()`.
 */
export type Unsubscribe = () => void;

/**
 * A store is an object that holds the application's state tree.
 * There should only be a single store in a app, as the composition
 * happens on the reducer level.
 *
 * @template S The type of state held by this store.
 * @template A the type of actions which may be dispatched by this store.
 */
export interface IRxSpacerStore<S = any, A extends RxSpacerAction = RxSpacerAnyAction> {
    dispatch(action: A): void;
    getState(): S;
    subscribe(listener: () => void): Unsubscribe;
}

export class RxSpacerStore implements IRxSpacerStore {
    private subscribers: Array<(state: any) => void>;
    private reducers: { [key: string]: RxSpacerReducer };
    private state: { [key: string]: any };
    private action: RxSpacerAction;

    constructor(reducers = {}, initialState = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState, {} as RxSpacerAnyAction);
    }

    public getState() {
        return this.state;
    }

    public getAction() {
        return this.action;
    }

    public subscribe(fn: () => void) {
        this.subscribers = [...this.subscribers, fn];

        return () => {
            this.subscribers = this.subscribers.filter((sub) => sub !== fn);
        };
    }

    public dispatch(action: RxSpacerAnyAction) {
        this.action = action;
        this.state = this.reduce(this.state, action);
        this.notify();
    }

    private notify() {
        this.subscribers.forEach((fn) => fn(this.getState()));
    }

    private reduce(state: { [key: string]: any }, action: RxSpacerAnyAction) {
        const newState = {} as { [key: string]: any };
        for (const prop in this.reducers) {
            if (this.reducers.hasOwnProperty(prop)) {
                newState[prop] = this.reducers[prop](state[prop], action);
            }
        }

        return newState;
    }
}
