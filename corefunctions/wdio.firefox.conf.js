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
            browserName: 'firefox',
            // "moz:firefoxOptions": {
            //     // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            //     args: ['-headless']
            // }
        }
    ]
};

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

exports.config = merge(commonConf.config, specificConf, { arrayMerge: overwriteMerge});
