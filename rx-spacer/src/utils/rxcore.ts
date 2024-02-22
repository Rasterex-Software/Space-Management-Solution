declare var RxCore: any;

export function getAttribute(name: string, markupID: string) {
    if (markupID !== undefined || markupID !== null) {
        const markup = RxCore.getmarkupobjByGUID(markupID);

        if (markup !== -1 && markup !== undefined && !markup.hasOwnProperty('empty')) {
            const attributesArray = markup.GetAttributes() as Array<{ name: string, value: string }>;

            if (attributesArray.length === 0) {
                // return null;
                return {
                    name: '',
                    value: '',
                };
            }

            const attribute = attributesArray.find((element) => element.name === name);
            if (attribute) {
                return attribute;
            }
        }
    }

    // return null;
    return {
        name: '',
        value: '',
    };
}
