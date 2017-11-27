#!/bin/sh

# Add your organizations custom npm repos here
# NPM_REPO=https://registry.npmjs.org/
# npm config set registry $NPM_REPO

if [ $NPM_REPO ]; then
    echo "Configured NPM Repo: $NPM_REPO";
fi