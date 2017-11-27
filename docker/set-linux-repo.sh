#!/bin/sh

# Add your organizations custom linux repos here
REPO_FILE=/etc/apk/repositories
# ALPINE_MAIN=http://dl-cdn.alpinelinux.org/alpine/v3.6/main
# ALPINE_COMMUNITY=http://dl-cdn.alpinelinux.org/alpine/v3.6/community
# mv $REPO_FILE $REPO_FILE.orig
# touch $REPO_FILE
# echo $ALPINE_MAIN >> $REPO_FILE
# echo $ALPINE_COMMUNITY >> $REPO_FILE
echo "Configured Linux Repos:"
cat $REPO_FILE