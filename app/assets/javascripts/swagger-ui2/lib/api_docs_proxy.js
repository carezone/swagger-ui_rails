(function() {
  var ApiDocsProxy, port_part;

  if (!window.location.origin) {
    port_part = window.location.port ? ":" + window.location.port : "";
    window.location.origin = window.location.protocol + "//" + window.location.hostname + port_part;
  }

  ApiDocsProxy = (function() {
    var NO_CACHE_HEADERS;

    function ApiDocsProxy() {}

    NO_CACHE_HEADERS = {
      "Cache-Control": "no-cache"
    };

    ApiDocsProxy.prototype.execute = function(httpClient, obj) {
      var patt, res, result;
      this.createLinkElement(obj.url);
      obj.originalUrl = obj.url;
      if (!this.sameOrigin()) {
        if (_.isUndefined(obj.method)) {
          obj.method = obj.type || "POST";
        }
        patt = new RegExp(":\/\/.*\.execute-api\..*amazonaws\.com");
        res = patt.test(obj.originalUrl);
        if (res || window.ApiDocsProxy.beta) {
          obj.url = 'https://apidocsresty.3sca.net/api_docs/proxy';
        } else {
          obj.url = this.locationOrigin() + '/api_docs/proxy';
        }
        obj.url += '?_=' + (new Date).getTime();
        $.extend(obj.headers, NO_CACHE_HEADERS, this.apiDocsHeaders(obj));
      }
      result = httpClient.execute(obj);
      if (!this.sameOrigin()) {
        obj.url = obj.originalUrl;
      }
      return result;
    };

    ApiDocsProxy.prototype.apiDocsHeaders = function(obj) {
      return {
        'X-Apidocs-Method': obj.method,
        'X-Apidocs-Path': this.apiDocsPath(),
        'X-Apidocs-Url': this.desiredOrigin(),
        'X-Apidocs-Query': this.linkElement.search.replace("?", "")
      };
    };

    ApiDocsProxy.prototype.originHttps = function() {
      return window.top.location.protocol === 'https:';
    };

    ApiDocsProxy.prototype.forceHttpsProtocol = function(url) {
      return url.replace(/^http:\/\//i, 'https://');
    };

    ApiDocsProxy.prototype.locationOrigin = function() {
      return window.top.location.origin;
    };

    ApiDocsProxy.prototype.createLinkElement = function(url) {
      this.linkElement = window.document.createElement("a");
      this.linkElement.href = url;
      return this.linkElement;
    };

    ApiDocsProxy.prototype.sameOrigin = function() {
      return this.desiredOrigin() === this.locationOrigin();
    };

    ApiDocsProxy.prototype.apiDocsPath = function() {
      var pathname;
      pathname = this.linkElement.pathname;
      if (pathname.length > 0 && pathname.indexOf('/') !== 0) {
        pathname = '/' + pathname;
      }
      return pathname;
    };

    ApiDocsProxy.prototype.desiredOrigin = function() {
      var portPart;
      if (this.linkElement.port === "443" && this.linkElement.protocol === "https:") {
        portPart = "";
      } else {
        portPart = this.linkElement.port === "" ? "" : ":" + this.linkElement.port;
      }
      return this.linkElement.protocol + "//" + this.linkElement.hostname + portPart;
    };

    return ApiDocsProxy;

  })();

  window.ApiDocsProxy = new ApiDocsProxy();

}).call(this);
