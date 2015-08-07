#!/bin/sh
swagger_client_patch=`pwd`/swagger-ui-patches/swagger-client.diff
swagger_autocomplete_patch=`pwd`/swagger-ui-patches/swagger-ui-2.1-autocomplete.diff

cd swagger-ui-src

rm -rf dist
rm -rf node_modules

npm install

git apply ${swagger_autocomplete_patch}
patch node_modules/swagger-client/browser/swagger-client.js < ${swagger_client_patch}

gulp

cd ../

# expose it to rails
rake sync_swagger_ui

# reset as it was before
cd swagger-ui-src
git reset --hard
cd ../
