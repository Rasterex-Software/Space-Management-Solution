#!/bin/sh

# temporary build and sync file

npm run build
rsync -avzO --no-perms --delete --exclude=rxconfig.js  ./build/ user1@192.168.1.27:/home/user1/rasterex/spacer/stage/build