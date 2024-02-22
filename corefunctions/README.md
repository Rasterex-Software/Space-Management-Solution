# README #

## Requirements

### node version ^9.11.2

### npm version ^5.6

### JDK8 for E2E testing

For E2E test you need to install the JDK from https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html. ( Currently tested with jdk-8u201, choose the one specific to your platform ).

### Docker and docker-compose for E2E testing

https://www.docker.com/products/docker-desktop

## Setup

### Check that the node and npm version are compatible
```
node --version
npm --version
```
Node and npm can be managed using nvm. For linux, mac ( https://github.com/creationix/nvm ).
For windows (https://github.com/coreybutler/nvm-windows)

### Building

```
npm install
npm run build
```
This will create some files in the dist folder. The rxcorefunctions.iife.js (or the the minified version rxcorefunctions.iife.min.js )
is compatible with the original rxcorefunctions.js and can be used in the RxView360 code.


### Testing

#### Unit tests can be executed with
```
npm run tests
```

#### e2e testing

You will need docker and java installed. See the Requirements above.

##### Setup/Config

Create a copy of `./test/e2e/RxConfig.dist.js` and name it `./test/e2e/RxConfig.js`.
By default the frontend is assumed to be on http://localhost:8080 and the mockserver for the api on http://localhost:9080)

Note: If you want to change the defaults, you can Edit/Update the value of `baseUrl` from `RxConfig.js`. Make sure that baseURL points to a valid RastereX server and that the server is accessible and responds with a proper `Access-Control-Allow-Origin` header ( the test page/server is accessed on localhost:8080 ).

##### Step 1. Start servers

From command line run:
```
npm run e2e:start
```

This will start:
- a frontend server on http://localhost:8080. This is a basic local server ( that delivers a simple html page containing rxcorefunctions.js and dependencies)
- a mockserver for the api. This is started as a docker container and runs on http://localhost:9080. Documentation about the mockserver can be found on http://www.mock-server.com/. The page detailing how to create expectations ( responses to be returned upon matching reguets) is http://www.mock-server.com/mock_server/creating_expectations.html

Notes:
Currently the expectations for the mockserver are loaded in wdio.base.conf.js before loading the tests ( not before clearing the old ones first).
Ideas for improvement:
 - refactor the creation/initialization of the expectations in a separate standalone file (or files) and use this in the wdio.base.conf.js
 - leave only the common expectations in wdio.base.conf.js and move each test dependant expectation(s) to the corresponding before hook of the testfile
 - preload the expectations in the docker

Things to consider:
 - CORS needs to be enabled for the mockserver ( currently configured in the docker compose file)
 - there are limitations regarding the number of expectations and sizes ( http://www.mock-server.com/mock_server/configuration_properties.html)
 - Debugging can be done using the mockserver api ( http://www.mock-server.com/mock_server/debugging_issues.html )

##### Step 2. Run the E2E test.

In another terminal run:
```
npm run e2e:test
```

Available test commands:
* e2e:test          - same as e2e:test:dev
* e2e:test:dev      - tests the unminified version on chrome
* e2e:test:prod     - tests the minified version on chrome
* e2e:test:legacy   - tests the legacy version on chrome
* e2e:test:chrome   - tests the unminified version on chrome
* e2e:test:firefox  - tests the unminified version on firefox

Note: Avoid moving the mouse cursor or placing it over the automatically controlled browser window, when the test run, as this might interfere with the tests.


The E2E tests are located in `./test/e2e/src/specs/`

##### Run only specific tests

If you want to run only specific tests, append -- --spec ./test/e2e/src/specs/\[filename\] after the test command ( will not work with e2e:test, only with e2e:test:*), where \[filename\] is the file containing the tests to be executed
For example to run only the tests from general.spec.ts, using the unminified source ( on chrome):
```
npm run e2e:test:dev -- --spec ./test/e2e/src/specs/general.spec.ts
```

##### Reports

When the tests are done you can generate reports with following command:
```
npm run e2e:reports
```

## Info

The *legacy* folder contains the original rxcorefunctions.js file
The *src* folder contains the refactored ( or in process of refactoring) code

### Convention regarding TODO tags adding during js to ts transition ###

* TODO:JS->TS:INFO
* TODO:JS->TS:CHECK
* TODO:JS->TS:FIX
* TODO:JS->TS:ADJUST
* TODO:JS->TS:OPTIMIZATION

### In addition to the above comment tags there are also information tags that are not tied to a TODO

*  JS->TS:INFO

### Known issues

During the build process there are warnings regarding circular dependencies. These warnings can be ignored.


### Notes

- the iife and the iife.min js files are compatible with the original rxcorefunctions.js and can be used in the RxView360 code.
- the build process is also capable of producing umd, commonjs and esm builds, however these options have been currently commented out/disabled.
- the oem flag can now also be set from the RxConfig object
```js
    var OEMFlag = RxConfig.OemFlag||'';
```


### Dockerization

Running
```
docker-compose up -d --build
```
will user the Dockerfile and make a multistage build of an image that currently can deliver the artifacts and built files
over http:

- http://localhost:8080/rxcorefunctions.iife.js
- http://localhost:8080/node_modules.tar.gz

The Dockerfile can be later adjusted and integrated in a build pipeline. ( the http server was used as a proof that the files
are built and the artefacts are archived )