# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require 'swagger-ui_rails2/version'

Gem::Specification.new do |gem|
  gem.name          = "swagger-ui_rails2"
  gem.version       = Swagger::UiRails2::VERSION
  gem.authors       = ["Stjepan Hadjic"]
  gem.email         = ["Stjepan.hadjic@infinum.hr"]
  gem.description   = %q{A gem to add swagger-ui to rails asset pipeline}
  gem.summary       = %q{Add swagger-ui to your rails app easily}
  gem.homepage      = "https://github.com/d4be4st/swagger-ui_rails"
  gem.license       = 'MIT'

  gem.files = Dir["{app,lib}/**/*", "LICENSE.txt", "Rakefile", "README.md"]
  gem.require_paths = ["lib"]

  gem.add_development_dependency "rails", "~> 3.2"
  gem.add_development_dependency "bundler", "~> 1.3"
  gem.add_development_dependency "rake", "~> 10.4"
end
