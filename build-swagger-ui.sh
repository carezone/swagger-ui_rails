#!/bin/sh

patches=`pwd`/swagger-ui-patches/*.diff

cd swagger-ui-src
# clean this
rm -rf dist
rm -rf node_modules
# apply patches
for f in $patches
do
  echo "--> patching $f"
  git apply ${f}
done
# do the npm
npm install
npm run-script build
# expose it to rails
git status
cd ../
rake sync_swagger_ui
# reset as it was before
cd swagger-ui-src
git reset --hard
cd ../
