#!/bin/bash

set -e

#icns converter https://iconverticons.com/online/

node ./bin/release.js

#prjroot=$pwd

#install deps
cd ./release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/
cnpm prune --production
cnpm i 
cnpm prune --production

#cd $prjroot
#release/Mditor-darwin-x64/Mditor.app
#build --prepackaged ./