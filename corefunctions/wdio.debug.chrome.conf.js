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
            // HTTP_PROXY, HTTPS_PROXY, NO_PROXY env vars can also be used instead of explicitly defining values in here
            proxy: {
                proxyType: "manual",
                httpProxy:"http://127.0.0.1:8081",
                // noProxy: "localhost,127.0.0.1:8080",
            }
        },
    ],
    // logLevel: 'debug',
    services: ['selenium-standalone','devtools'],
};

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

exports.config = merge(commonConf.config, specificConf, { arrayMerge: overwriteMerge});
