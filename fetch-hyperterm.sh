#!/bin/bash

wget https://github.com/zeit/hyperterm/releases/download/v0.7.1/hyperterm-0.7.1-mac.zip -O hyperterm.zip
unzip hyperterm.zip
rm hyperterm.zip
cp .test-hyperterm.js $HOME/.test-hyperterm.js
