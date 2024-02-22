# Instructions

## Setup

```
npm i
```

## Preview

```
npm start
```

## Build the static version of storybook

```
npm run build-storybook
```

This will create a folder named storybook-static. The contents of this folder can then be delivered by a webserver.


# Known issues

 The storybook source addon has issues with the action addon. The source code tab will display duplicated code ( for the
 blocks that contain the 'action' method call )
