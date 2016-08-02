#!/bin/bash
# ember build
# BASE_URL="ember-dialog" LOCATION_TYPE="hash" ember ember-cli-jsdoc
rm -rf gh-pages/*
cp -r dist/* gh-pages/
# mv docs gh-pages/
cd gh-pages
git init
git remote add docs git@github.com:wheely/ember-dialog.git
git fetch docs
git checkout --orphan gh-pages
git add .
git commit -am "Site"
git push -f docs gh-pages
git branch -u docs/gh-pages
cd ..
rm -rf gh-pages
