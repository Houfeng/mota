#!/bin/bash

set -e

#icns converter https://iconverticons.com/online/

electron-packager . Mditor --ignore='node_modules' --overwrite --out=release  --icon=./design/icon.icns

node ./bin/release.js

prjroot=$pwd

cd ./release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/

cnpm prune --production
cnpm i 
cnpm prune --production

#cd $prjroot
#release/Mditor-darwin-x64/Mditor.app
build --prepackaged ./