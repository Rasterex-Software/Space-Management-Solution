export const saveState = (state: any) => {
    let json = localStorage.getItem('__rx_sm__') || '{}';
    let stringifiedNewState = JSON.stringify(state);

    if (stringifiedNewState != json && stringifiedNewState !== '{}') {
        localStorage.setItem('__rx_sm__', stringifiedNewState);
    }
}

export const loadState = () => {
    const json = localStorage.getItem('__rx_sm__') || '{}';

    let state = JSON.parse(json);

    if (state) {
        // Some sane defaults
        // if (state.data && !state.data.categories) {
        //     state.data.categories = [];
        // }
        return state;
    } else {
        return undefined;
    }
}