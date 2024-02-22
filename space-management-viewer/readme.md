## Prerequisites

The app uses `Web Components`, `lit-html`, which is a small library for writing HTML templates with JavaScript string literals, and `lit-element`, a small Web Component base class built on top of it.

This app depends on several npm packages, which you must be able to install. Make sure that you’ve already installed `node.js` and `npm` before moving on to the next step. If you already have node installed, make sure you’re using the latest version – we recommend using `v8.0.0` and above.

## Setup/Config

Create a copy of `./libs/rxcorefunctions/rxconfig.dist.js` and name it `./libs/rxcorefunctions/rxconfig.js`.

Note: If you want to change the defaults, you can Edit/Update `rxconfig.js`

## Installing dependencies

To install the project’s dependencies, run

```
npm install
```

And to install rx libs like gui-components and rx-spacer, run

```
npm run install:rxlibs
```

## Run the app in development mode

To run the app locally, run

```
npm start
```

This will start a local server on port 8081. Open http://localhost:8081 to view your app in the browser. Note that this server can continue running as you’re making changes to your application, which you will see if you refresh the browser tab.

## Production/Static hosting

To build the production site, run:

```
npm run build:static
```

This will create a build output:

```
build/
├── es6-unbundled/
└── ...
```

`es6-unbundled` - Contains unbundled ES6/2015 code using AMD for other browsers that support ES6/2015

## Support serving this build from a non-root path

Open `polymer.json` file and change `basePath` of build configuration, example: `"basePath": "some/other/path"`

This will update the entrypoint's `<base>` tag to support serving this build from a non-root path, such as when performing differential serving based on user agent or serving from a host with multiple projects
