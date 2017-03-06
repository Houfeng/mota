#!/bin/bash

set -e

electron-packager . Mditor --ignore='node_modules' --overwrite --out=release

node ./bin/release.js

cd ./release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/

cnpm prune --production
cnpm i 
cnpm prune --production

#rm -rf ./node_modules/.[!.]*