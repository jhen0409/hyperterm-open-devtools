#!/bin/bash

git clone https://github.com/creationix/nvm.git /tmp/.nvm
source /tmp/.nvm/nvm.sh
nvm install "$NODE_VERSION"
nvm use --delete-prefix "$NODE_VERSION"

node --version
npm --version

./fetch-hyperterm.sh

npm install
npm test
