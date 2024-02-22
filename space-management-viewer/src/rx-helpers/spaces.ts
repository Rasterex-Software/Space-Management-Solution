import { RxFileAreaTenants } from "../redux/reducers/files";

declare var RxCore: any;

const SELECT_COLOR = 'rgba(191,58,209,0.3)';

export function resetAreasState() {
    return RxCore.restoreBlockStates();
}

/**
 * 
 * @param areas areas id
 * @param highlight 
 * @param color 
 */
export function highlightFreeSpace(areas: any, highlight = true, color = 'rgba(255,0,0,0.3)') {
    if (areas === undefined || !areas.forEach) {
        return;
    }

    areas.forEach((area: any) => {
        if (area.tenantId === null || area.tenantId === undefined) {
            // review and change this
            try {
                if (!highlight) {
                    RxCore.setBlockColor(area, color, true);
                    RxCore.setBlockColor(area, color, false);
                } else {
                    RxCore.setBlockColor(area, color, highlight);
                }
            } catch (e) { }
        }
    })
}

/**
 * Highlight multiple spaces by unique id
 *
 * @param areas area ids
 * @param highlight
 * @param color
 */
export function highlightSpaces(areasIds: any[], highlight = true, color = SELECT_COLOR) {
    if (areasIds === undefined || !areasIds.forEach) {
        return;
    }

    areasIds.forEach((id: any) => {
        try {
            if (!highlight) {
                RxCore.setBlockColor(id, color, true);
                RxCore.setBlockColor(id, color, false);
            } else {
                RxCore.setBlockColor(id, color, highlight);
            }
        } catch (e) { }
    });
}

export function highlightAllTenantsSpace(areaTenants: RxFileAreaTenants, tenants: any, highlight = true) {
    if (areaTenants === undefined) {
        return;
    }

    Object.keys(areaTenants).forEach((id) => {
        // review and change this
        const tenant = tenants.find((tenant: any) => tenant.id === areaTenants[id])
        try {
            if (!highlight) {
                RxCore.setBlockColor(id, tenant.color, true);
                RxCore.setBlockColor(id, tenant.color, false);
            } else {
                RxCore.setBlockColor(id, tenant.color, highlight);
            }
        } catch (e) { }
    });
        
}

export function highlightTenantSpace(areas: any[], color: string, highlight = true) {
    if (areas) {
        areas.forEach((area: any) => {
            // review and change this
            try {
                if (!highlight) {
                    RxCore.setBlockColor(area.id, color, true);
                    RxCore.setBlockColor(area.id, color, false);
                } else {
                    RxCore.setBlockColor(area.id, color, highlight);
                }
            } catch (e) { }
        });
    }
}

export function createSpacefromBlock(index: any) {
    return RxCore.createSpacefromBlock(index);
}

export function selectRxSpace(blockId: any, multi: boolean = false) {
    return RxCore.selectRxSpace(blockId, multi);
}

export function pickRxSpace(select: boolean = true, multi: boolean = false) {
    return RxCore.pickRxSpace(select, multi);
}

export function getAttributeValue(name: string, area: any, defaultValue:string = '') {
    let retVal = null;

    if (''!==defaultValue){
        retVal = defaultValue;
    }

    if (area !== undefined && area.id) {
        const markup = RxCore.getmarkupobjByGUID(area.id);

        if (markup !== -1 && !markup.hasOwnProperty('empty')) {
            const attributesArray = markup.GetAttributes() as Array<{ name: string, value: string }>;

            if (attributesArray.length === 0) {
                return retVal;
            }

            const attribute = attributesArray.find((element) => element.name === name);
            if (attribute) {
                return attribute.value;
            }
        }
    }

    return retVal;
}

export function getAreaAttributes(areaId: string) {
    if (areaId === undefined || areaId == '') {
        return;
    }
    try {
        const attributes = RxCore.getmarkupobjByGUID(areaId).GetAttributes();

        return attributes.filter((attr: any) => attr.name !== 'SpaceID');
    } catch (error) {

    }
}

export function changeSpaceCustomLabel(blockId: string, text: string) {
    RxCore.changeSpaceCustomLabel(blockId, text);
}

export function setCustomLabelText(text: any, onOff: boolean) {
    RxCore.setCustomLabelText(text, onOff);
}

export function markUpRedraw() {
    RxCore.markUpRedraw();
}

export function hideLabels(onOff:boolean) {
    RxCore.hideLabels(onOff);
    RxCore.markUpRedraw();
}

export function changeLabelSize(size: number) {
    RxCore.setLabelSize(size);
}

export function moveLabelEnable(onOff: boolean) {
    RxCore.moveLabelEnable(onOff);
}

export function changeLabelTransp(value: number) {
    RxCore.changeLabelTransp(value)
}