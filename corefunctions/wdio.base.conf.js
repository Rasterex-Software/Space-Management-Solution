const mochaTimeout = process.env.DEBUG ? 9999999 : 15000;
const baseUrl = process.env.BASE_URL ? process.env.BASE_URL: 'http://localhost:8080/';
var fs = require('fs');
const srcOfJsFileToBeTested = process.env.JS_SRC_TO_BE_TESTED; // ?  process.env.JS_SRC_TO_BE_TESTED:'./dist/rxcorefunctions.iife.js';
const shell = require('shelljs');

const mockServerPort = process.env.MOCK_SERVER_PORT ? process.env.MOCK_SERVER_PORT : 9080;
// const mockServerNode = require('mockserver-node');
const mockServer = require('mockserver-client');
const mockServerClient = mockServer.mockServerClient;
const mockServerClientInstance = mockServerClient('localhost', mockServerPort);


const base64Encode = (filepath)=>{
    let bitmap = fs.readFileSync(filepath);
    return new Buffer(bitmap).toString('base64');
}

// TODO improve the way the mockServer rules are loaded. Maybe separate them from this file

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        // // './test/e2e/src/specs/*.ts',
        // './test/e2e/src/specs/general.spec.ts',
        // './test/e2e/src/specs/rxcore.zoom.spec.ts',
        // './test/e2e/src/specs/rxcore.init.spec.ts',
        // './test/e2e/src/specs/rxcore.rotate.spec.ts',
        // './test/e2e/src/specs/rxcore.tools.spec.ts'
        './test/e2e/src/specs/**',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        {
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
            //
            browserName: 'chrome',
            // 'goog:chromeOptions': {
            //     // to run chrome headless the following flags are required
            //     // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
            //     args: ['--headless', '--disable-gpu'],
            // }
        },
        // {
        //     // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        //     // grid with only 5 firefox instances available you can make sure that not more than
        //     // 5 instances get started at a time.
        //     maxInstances: 1,
        //     //
        //     browserName: 'firefox',
        //     // "moz:firefoxOptions": {
        //     //     // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
        //     //     args: ['-headless']
        //     //  }
        // },
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error
    logLevel: 'error',
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],
    // services: ['webdriver'],
    // seleniumLogs: './',
    // seleniumInstallArgs: {
    //     logger: console.log,
    //     drivers: {
    //         chrome: {
    //             version: '2.44',
    //             arch: process.arch,
    //             // baseURL: 'https://chromedriver.storage.googleapis.com',
    //         },
    //         firefox: {
    //             version: '0.23.0',
    //             arch: process.arch,
    //         }
    //     },
    // },
    // seleniumArgs: {
    //     logger: console.log,
    //     drivers: {
    //         chrome: {
    //             version: '2.44'
    //         },
    //         firefox: {
    //             version: '0.23.0'
    //         }
    //     },
    //     // seleniumArgs: ["-port", "4441"],
    //     javaArgs: [
    //      "-Xmx1024m"
    //     ]
    // },
    // skipSeleniumInstall: false,

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec', 'allure'],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: mochaTimeout,
        compilers: [
            'ts-node/register',
            'tsconfig-paths/register'
        ]
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.

    // take screenshot after every test, this will be attached to allure report
    afterTest: function () {
        browser.takeScreenshot()
    },
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        // try {
        //     mockServerNode.stop_mockserver({
        //         serverPort: mockServerPort
        //     }).then(
        //         function () {
        //             console.log("stopped MockServer");
        //         },
        //         function (error) {
        //             console.log(JSON.stringify(error));
        //         }
        //     );
        // } catch (e) {
        //     // do nothing
        // }
        // mockServerNode.start_mockserver({
        //     serverPort: mockServerPort,
        //     // verbose:true,
        //     trace: true
        // }).then(
        //     function () {
        //         console.log("started MockServer");
        //     },
        //     function (error) {
        //         console.log(JSON.stringify(error));
        //     }
        // );

    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        let src = srcOfJsFileToBeTested; // declared at the begining of this file;
        let dest = './test/e2e/lib/rxcorefunctions.iife.js';
        console.log(`Copying ${src} to dest`);
        fs.copyFileSync(src,dest);
        // shell.cp('-f',src,dest);

        // TODO review this and find a better way
        shell.sed('-i',"var OEMFlag = '';","var OEMFlag =  RxConfig.OemFlag || '';",dest);

        mockServerClientInstance.reset().then(
            function () {
              console.log("reset all state");
            },
            function (error) {
              console.log(error);
            }
          );
        // Initialize mock server expectations
        // TODO review/refactor
        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/"
            },
            "httpResponse": {
                // "statusCode": 200,
                // "headers": {
                //     "content-type": ["text/html, charset=UTF-8"]
                // },
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["text/html, charset=UTF-8"]
                    }
                ],
                "body": fs.readFileSync('./test/e2e/index.html').toString(),
                // "body": {
                //     // "not":false,
                //     "type":"XML",
                //     "xml":"<html><body>hello</body></html>",
                //     // "contentType":"text/html",
                // }
                // "body": {
                //     "not":false,
                //     "type":"STRING",
                //     "xml":"<html><body>hello</body></html>",
                //     "contentType":"text/html",
                // }
            }
        });
        // mockServerClientInstance.mockAnyResponse({
        //     "httpRequest": {
        //         "method": "GET",
        //         "path": "/lib/*"
        //     },
        //     "httpForward": {
        //         "host": "192.168.1.223",// "localhost",
        //         "port": 8080,
        //         "scheme": "HTTP"
        //     }
        // });
        // mockServerClientInstance.mockAnyResponse({
        //     "httpRequest": {
        //         "method": "GET",
        //         "path": "/RxConfig.js"
        //     },
        //     "httpForward": {
        //         "host": "192.168.1.223", // "localhost",
        //         "port": 8080,
        //         "scheme": "HTTP"
        //     }
        // });


        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/rxweb/images/note.png"
            },
            "httpResponse": {
                "statusCode":200,
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["image/png"]
                    }
                ],
                "body": {
                    "type":"BINARY",
                    "base64Bytes":base64Encode('./mockserver-data/static/rxweb/images/note.png')
                }
            }
        });
        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/rxweb/welcome.jpg"
            },
            "httpResponse": {
                "headers": [
                    // "content-type": ["image/png"]
                    {
                        "name": "Content-Type",
                        "values": ["image/jpeg"]
                    }
                ],
                "body": {
                    "type":"BINARY",
                    "base64Bytes":base64Encode('./mockserver-data/static/rxweb/welcome.jpg')
                }
            }
        });
        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "POST",
                "path": "/RxBinWeb/RxCSISAPI.dll",
                "queryStringParameters": {
                    "WebClientGetConfig":[]
                },//\?WebClientGetConfig"
                "body": {
                    "type": "XPATH",
                    "xpath": "/RxViewServer[Command='GetConfiguration']"
                }
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["text/xml, charset=UTF-8"]
                    }
                ],
                "body": fs.readFileSync('./mockserver-data/mocks/WebClientGetConfig.xml').toString()
            }
        });

        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "POST",
                "path": "/RxBinWeb/RxCSISAPI.dll",
                // "queryStringParameters": {
                //     "WebClientPublish":[]
                // },
                "body": {
                    // "type": "XPATH",
                    // "xpath": "/RxViewServer[Command='GetFile']/Command | /RxViewServer[FileURL='C:\\Rasterex\\Upload\\040915%20MOBSLAKT.pdf']/FileURL"
                    "type": "XML_SCHEMA",
                    "xmlSchema": `<?xml version="1.0" encoding="UTF-8"?>
                            <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
                                <xs:element name="RxViewServer">
                                        <xs:complexType>
                                                <xs:sequence>
                                                    <xs:element name="Command" type="xs:string" fixed="GetFile"></xs:element>
                                                    <xs:element name="LicenseID" type="xs:string"></xs:element>
                                                    <xs:element name="FileURL">
                                                        <xs:simpleType>
                                                            <xs:restriction base="xs:string">
                                                                <xs:pattern value=".*MOBSLAKT\.pdf"/>
                                                            </xs:restriction>
                                                        </xs:simpleType>
                                                    </xs:element>
                                                </xs:sequence>
                                            </xs:complexType>
                                    </xs:element>
                            </xs:schema>`
                            // <xs:element name="FileURL" type="xs:string" fixed="C:\\Rasterex\\Upload\\040915%20MOBSLAKT.pdf"></xs:element>
                }
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["text/xml, charset=UTF-8"]
                    }
                ],
                "body": fs.readFileSync('./mockserver-data/mocks/WebClientPublish/GetFile_FileUrl_Mobslakt_pdf.xml').toString()
            }
        });

        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/RxBinweb/cache/040915%20mobslakt-1f601-31415104/040915%20mobslakt-1f601-31415104.pdf"
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["application/pdf"]
                    }
                ],
                "body": {
                    "type":"BINARY",
                    "base64Bytes":base64Encode('./mockserver-data/mocks/cache/040915%20mobslakt-1f601-31415104/040915%20mobslakt-1f601-31415104.pdf')
                }
            }
        });
        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/RxBinweb/cache/040915%20mobslakt-1f601-31415104/1_1T.PNG"
            },
            "httpResponse": {
                "headers": {
                    "content-type": ["image/png"]
                },
                "body": {
                    "type":"BINARY",
                    "base64Bytes": base64Encode('./mockserver-data/mocks/cache/040915%20mobslakt-1f601-31415104/1_1T.PNG')
                }
            }
        });
        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "POST",
                "path": "/RxBinWeb/RxCSISAPI.dll",
                // "queryStringParameters": {
                //     "WebClientPublish":[]
                // },
                "body": {
                    // "type": "XPATH",
                    // "xpath": "/RxViewServer[Command='GetFile']/Command | /RxViewServer[FileURL='C:\\Rasterex\\Upload\\demo11.xlsx']/FileURL"
                    "type": "XML_SCHEMA",
                    "xmlSchema": `<?xml version="1.0" encoding="UTF-8"?>
                            <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
                                <xs:element name="RxViewServer">
                                        <xs:complexType>
                                                <xs:sequence>
                                                    <xs:element name="Command" type="xs:string" fixed="GetFile"></xs:element>
                                                    <xs:element name="LicenseID" type="xs:string"></xs:element>
                                                    <xs:element name="FileURL">
                                                        <xs:simpleType>
                                                            <xs:restriction base="xs:string">
                                                                <xs:pattern value=".*demo11\.xlsx"/>
                                                            </xs:restriction>
                                                        </xs:simpleType>
                                                    </xs:element>
                                                </xs:sequence>
                                            </xs:complexType>
                                    </xs:element>
                            </xs:schema>`
                            // <xs:element name="FileURL" type="xs:string" fixed="C:\\Rasterex\\Upload\\demo11.xlsx"></xs:element>
                }
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["text/xml, charset=UTF-8"]
                    }
                ],
                "body": fs.readFileSync('./mockserver-data/mocks/WebClientPublish/GetFile_FileUrl_demo11_xlsx.xml').toString()
            }
        });

        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "GET",
                "path": "/RxBinweb/cache/demo11-59d9-4739574a/demo11-59d9-4739574a.xlsx.pdf"
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["application/pdf"]
                    }
                ],
                "body": {
                    "type":"BINARY",
                    "base64Bytes":base64Encode('./mockserver-data/mocks/cache/demo11-59d9-4739574a/demo11-59d9-4739574a.xlsx.pdf')
                }
            }
        });
        for (let i=1;i<=11;i++) {
            mockServerClientInstance.mockAnyResponse({
                "httpRequest": {
                    "method": "GET",
                    "path": "/RxBinweb/cache/demo11-59d9-4739574a/1_"+i+"T.PNG"
                },
                "httpResponse": {
                    "headers": {
                        "content-type": ["image/png"]
                    },
                    "body": {
                        "type":"BINARY",
                        "base64Bytes": base64Encode('./mockserver-data/mocks/cache/demo11-59d9-4739574a/1_'+i+'T.PNG')
                    }
                }
            });
        }

        mockServerClientInstance.mockAnyResponse({
            "httpRequest": {
                "method": "POST",
                "path": "/RxBinWeb/RxCSISAPI.dll",
                "queryStringParameters": {
                    "WebClientPublish":[]
                },
                "body": {
                    "type": "XPATH",
                    "xpath": "/RxViewServer[Command='GetMarkup']/Command | /RxViewServer[FileURL='']/FileURL"
                }
            },
            "httpResponse": {
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["text/xml, charset=UTF-8"]
                    }
                ],
                "body": fs.readFileSync('./mockserver-data/mocks/WebClientPublish/GetMarkup_FileUrl_empty.xml').toString()
            }
        });

        // mockServerClientInstance.mockAnyResponse({
        //     "httpRequest": {
        //         "method": "POST",
        //         "path": "*"
        //     },
        //     "httpOverrideForwardedRequest": {
        //         "httpRequest":{
        //             "host": "192.168.1.198", // "localhost",
        //             "port": 8080,
        //             "scheme": "HTTP"
        //         }
        //     }
        // });
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    //     require('ts-node/register');
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // afterTest: function (test) {
    // },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function(exitCode, config, capabilities, results) {

        // mockServerNode.stop_mockserver({
        //     serverPort: mockServerPort
        // }).then(
        //     function () {
        //         console.log("stopped MockServer");
        //     },
        //     function (error) {
        //         console.log(JSON.stringify(error));
        //     }
        // );

    }
}
