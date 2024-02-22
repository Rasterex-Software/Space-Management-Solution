declare var RxCore: any;

export function init(layout: any) {
    RxCore.initialize(layout);
    RxCore.scaleOnResize(false);
    RxCore.metricUnit('Meter');
    RxCore.scale('1:1');
    RxCore.showMarkupLabels(false);
    RxCore.markupSaveCheck(false);
}

