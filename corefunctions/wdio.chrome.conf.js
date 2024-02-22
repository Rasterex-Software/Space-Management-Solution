// import merge from 'deepmerge';
// Load common/default config
// import commonConf from "./wdio.common.conf.js";
// import commonConf from "./wdio.conf";

var merge = require('deepmerge');
var commonConf = require('./wdio.base.conf.js');


let specificConf =  {
    capabilities:[
        {
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
            //
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--disable-extensions',
                    // '--headless',
                    // '--disable-gpu',
                    // '--window-size=1200,800',
                    // 'log-level=3',
                    '--disable-dev-shm-usage'

            ]},
        },
    ],
};

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

exports.config = merge(commonConf.config, specificConf, { arrayMerge: overwriteMerge});
