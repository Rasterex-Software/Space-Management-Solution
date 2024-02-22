

import { store, RootState } from '../redux/store';

declare var RxCore:any;

export function unselectVectorBlockIfSelected(){
    const state = store.getState();
    let selectedAreaId = undefined;

    try {
        selectedAreaId = (state as RootState).rxcore.selectedArea;
    } catch(e) {
        selectedAreaId = undefined;
    }

    if (selectedAreaId !== undefined && selectedAreaId !== ''){
        RxCore.selectVectorBlock((state as RootState).rxcore.selectedArea);
    }
}
