#!/bin/sh

cd swagger-ui-src
npm install
git apply ../001-Use-SwaggerHttp-for-File-Uploads.diff
rm -rf dist/
npm run-script build
git status
cd ../

rake sync_swagger_ui

cd swagger-ui-src
git reset --hard
cd ../
