declare var RxCore: any;

const SELECT_COLOR = 'rgba(191,58,209,0.3)';


export function selectVectorBlock(blockId: string) {
    try {
        RxCore.selectVectorBlock(blockId);
    } catch (error) {
        RxCore.setBlockColor(blockId, SELECT_COLOR, true);
    }
}


export function get2DVectorBlocks() {
    return RxCore.get2DVectorBlocks();
}

export function getAreaVectorBlocks(): any {
    RxCore.blockLoadMask('Area*');
    const areas = RxCore.get2DVectorBlocks();
    RxCore.blockLoadMask('');
    return areas;
}

export function changeVectorLayer(index: number) {
    RxCore.changeVectorLayer(index);
}

export function toggleLayers(active: boolean) {
    RxCore.vectorLayersAll(active);
}
