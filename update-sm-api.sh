#!/bin/sh

# temporary build and sync file

rsync -avzO --no-perms --delete --exclude=node_modules --exclude=rxconfig.js --exclude=.env ./space-management-api-orm/ user1@192.168.1.27:/home/user1/rasterex/sm/stage/space-management-api-orm/
