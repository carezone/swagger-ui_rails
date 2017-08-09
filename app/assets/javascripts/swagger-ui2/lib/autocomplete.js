(function() {
  var ThreeScaleAutoComplete, ThreeScaleSwaggerUi, swagger_ui_load;

  ThreeScaleAutoComplete = (function() {
    function ThreeScaleAutoComplete() {
      this.currentTip = null;
      this.currentField = null;
      $(document).on("click", "div.apidocs-signin-message a", (function(_this) {
        return function(event) {
          window.location = ThreeScaleAutoComplete.Config.login_url;
          return false;
        };
      })(this));
      $(document).on("click", "#swagger-ui-container", (function(_this) {
        return function(event) {
          if (_this.currentTip !== null && !$(event.target).is("input,select")) {
            return _this.currentTip.hide();
          }
        };
      })(this));
      $(document).on("click", ".apidocs-param-tips li", (function(_this) {
        return function(event) {
          _this.currentField.val($(event.currentTarget).attr('data-value'));
          return _this.currentTip.hide();
        };
      })(this));
      $(document).on("focus", "input[type=text]", (function(_this) {
        return function(event) {
          if (_this.currentTip !== null) {
            return _this.currentTip.hide();
          }
        };
      })(this));
      $(document).on("focus", "input[data-threescale-name]", (function(_this) {
        return function(event) {
          var pos, type;
          _this.currentField = $(event.currentTarget);
          type = _this.currentField.attr("data-threescale-name");
          if ($.trim(type) === "") {
            return false;
          }
          _this.currentTip = +ThreeScaleAutoComplete.DataStatus === 401 ? $(".apidocs-param-tips.apidocs-signin-message") : $(".apidocs-param-tips." + type);
          pos = _this.getPosition();
          _this.currentTip.css({
            top: pos[0],
            left: pos[1]
          }).fadeIn("fast");
          return false;
        };
      })(this));
    }

    ThreeScaleAutoComplete.prototype.getPosition = function() {
      var pos;
      pos = this.currentField.offset();
      return [pos.top - 50, pos.left + this.currentField.width() + 10];
    };

    return ThreeScaleAutoComplete;

  })();

  ThreeScaleAutoComplete.init = function(account_type) {
    return $.getJSON(ThreeScaleAutoComplete.Config.data_url[account_type], ThreeScaleAutoComplete.handleData);
  };

  ThreeScaleAutoComplete.handleData = function(data) {
    var html, template;
    ThreeScaleAutoComplete.DataStatus = data.status;
    if (+data.status === 200) {
      template = Handlebars.compile(ThreeScaleAutoComplete.TipTemplate);
      html = _.reduce(data.results, function(memo, values, key) {
        values = {
          type: key,
          items: values,
          description: ThreeScaleAutoComplete.TipDescriptions[key]
        };
        return memo + template(values);
      }, "");
      $("body").append(html);
    }
    return new ThreeScaleAutoComplete();
  };

  ThreeScaleAutoComplete.Config = {
    data_url: {
      provider: "/p/admin/api_docs/account_data.json",
      buyer: "/api_docs/account_data.json"
    },
    login_url: "/api_docs/login"
  };

  ThreeScaleAutoComplete.TipDescriptions = {
    metric_names: "Latest 5 metrics",
    metric_ids: "Latest 5 metrics",
    app_keys: "First application key from the latest five applications",
    app_ids: "Latest 5 applications (across all accounts and services)",
    application_ids: "Latest 5 applications",
    user_keys: "First user key from latest 5 applications",
    account_ids: 'Latest 5 accounts',
    access_token: 'Access Token',
    user_ids: 'First user (admin) of the latest 5 account',
    service_ids: 'Latest 5 services',
    admin_ids: 'Latest 5 users (admin) from your account',
    service_plan_ids: 'Latest 5 service plans',
    application_plan_ids: 'Latest 5 application plans',
    account_plan_ids: 'Latest 5 account plans',
    client_ids: 'Client IDs from the latest five applications',
    client_secrets: 'Client secrets from the latest five applications'
  };

  ThreeScaleAutoComplete.DataStatus = 401;

  ThreeScaleAutoComplete.TipTemplate = "<div class='apidocs-param-tips {{type}}' style='display:none;'>\n  <p class='apidocs-tip-description'>{{this.description}}</p>\n  <ul>\n    {{#each items}}\n      <li data-value='{{value}}'><strong>{{name}}</strong> <span>{{value}}</span></li>\n    {{/each}}\n  </ul>\n</div>";

  swagger_ui_load = SwaggerUi.prototype.load;

  ThreeScaleSwaggerUi = (function() {
    function ThreeScaleSwaggerUi(swagger_ui_load) {
      this.swagger_ui_load = swagger_ui_load;
    }

    ThreeScaleSwaggerUi.prototype.load = function(account_type) {
      ThreeScaleAutoComplete.init(account_type || "buyer");
      return swagger_ui_load.apply(this.swagger_ui_load);
    };

    return ThreeScaleSwaggerUi;

  })();

  SwaggerUi.prototype.load = function(account_type) {
    return new ThreeScaleSwaggerUi(this).load(account_type);
  };

}).call(this);
