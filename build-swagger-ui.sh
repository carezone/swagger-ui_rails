#!/bin/sh

patches=`pwd`/swagger-ui-patches/*.diff

cd swagger-ui-src
npm install

for f in $patches
do
  echo "--> patching $f"
  git apply ${f}
done

rm -rf dist/
npm run-script build
git status
cd ../

rake sync_swagger_ui

cd swagger-ui-src
git reset --hard
cd ../
