#!/bin/sh

# temporary build and sync file

npm run build:static
rsync -avzO --no-perms --delete --exclude=rxconfig.js --exclude=api --exclude=db ./build/ user1@192.168.1.27:/home/user1/rasterex/sm/stage/build

# rsync -avzO --no-perms --delete --exclude=rxconfig.js --exclude=api --exclude=.env --exclude=out ./ user1@192.168.1.27:/home/user1/rasterex/sm/stage/sm-viewer
# rsync -avzO --no-perms --delete --exclude=rxconfig.js --exclude=api --exclude=.env --exclude=out ../rx-events user1@192.168.1.27:/home/user1/rasterex/sm/stage/rx-events
# rsync -avzO --no-perms --delete --exclude=rxconfig.js --exclude=api --exclude=.env --exclude=out ../rx-spacer user1@192.168.1.27:/home/user1/rasterex/sm/stage/rx-spacer