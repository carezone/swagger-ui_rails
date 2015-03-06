module Swagger

  module UiRails2
    class Engine < ::Rails::Engine

      initializer :assets do |config|
        Rails.application.config.assets.precompile += %w{ swagger-ui2.js }
        Rails.application.config.assets.precompile += %w{ swagger-oauth.js }
        Rails.application.config.assets.precompile += %w{ swagger-ui2.css }
        Rails.application.config.assets.precompile += %w{ swagger-ui2/reset.css }
        Rails.application.config.assets.precompile += %w{ swagger-ui2/screen.css }
        Rails.application.config.assets.paths << root.join("app", "assets")
      end
    end
  end
end
