#!/bin/bash

set -e

electron-packager . Mditor --ignore='node_modules' --overwrite --out=release