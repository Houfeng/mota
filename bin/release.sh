#!/bin/bash

set -e

npm run build

#icns converter https://iconverticons.com/online/

node ./bin/release.js

PRJ_PATH=$PWD

#install deps
cd ./release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/
cnpm prune --production
cnpm i 
cnpm prune --production

#cd $prjroot
#release/Mditor-darwin-x64/Mditor.app
#build --prepackaged ./

#dmg
#electron-installer-dmg $PRJ_PATH/release/Mditor-darwin-x64/Mditor.app mditor