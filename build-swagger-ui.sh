#!/bin/sh

# patches=`pwd`/swagger-ui-patches/*.diff

cd swagger-ui-src
# clean this
rm -rf dist
rm -rf node_modules

# apply patches
#for f in $patches
#do
#  echo "--> patching $f"
#  git apply ${f}
#done

# rebuild swagger-ui
npm install
gulp
git status
cd ../

# expose it to rails
rake sync_swagger_ui
# reset as it was before
cd swagger-ui-src
git reset --hard
cd ../
