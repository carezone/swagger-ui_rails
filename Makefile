GULP = node_modules/gulp/bin/gulp.js
SWAGGER_UI = swagger-ui-src
SWAGGER_UI_SRC = $(shell find $(SWAGGER_UI)/src -type f)
PATCHES = $(foreach patch,$(wildcard swagger-ui-patches/*.diff),$(realpath $(patch)))

.PHONY : $(PATCHES) test

all: app/assets/javascripts/swagger-ui2/index.js

$(PATCHES) :
	cd $(SWAGGER_UI); git apply $@
	@echo %@

$(SWAGGER_UI)/dist: $(SWAGGER_UI)/node_modules $(SWAGGER_UI_SRC) $(PATCHES)
	cd $(SWAGGER_UI); $(GULP)

$(SWAGGER_UI)/node_modules: $(SWAGGER_UI)/package.json
	cd $(SWAGGER_UI); npm install
	patch swagger-ui-src/node_modules/swagger-client/browser/swagger-client.js < swagger-ui-patches/swagger-client._diff

$(SWAGGER_UI)/package.json : $(SWAGGER_UI)/.git

$(SWAGGER_UI)/.git:
	git submodule update

clean:
	rm -r $(SWAGGER_UI)/dist
	rm -r $(SWAGGER_UI)/node_modules

test:
	@echo $(PATCHES)

$(SWAGGER_UI)/dist/swagger-ui.js : $(SWAGGER_UI)/dist

app/assets/javascripts/swagger-ui2/index.js: $(SWAGGER_UI)/dist $(SWAGGER_UI_SRC)
	rake sync_swagger_ui
	touch $@

