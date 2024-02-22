import rxspacer, { RxSpacerState } from './reducers';
import { RxSpacerStore } from './store';

const reducers = {
    rxspacer,
};

export interface RootState {
    rxspacer: RxSpacerState;
}

const store = new RxSpacerStore(reducers);

export default store;
