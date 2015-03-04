require "fileutils"
require "bundler/gem_tasks"

desc "Syncronize Swagger UI"
task :sync_swagger_ui do

  source      = ENV['SWAGGER_UI'] || File.join(File.dirname(__FILE__), "swagger-ui-src", "dist")
  destination = File.join File.dirname(__FILE__), "app", "assets"

  js_destination = File.join destination, "javascripts", "swagger-ui2"

  idx = File.join js_destination, "index.js"
  File.read(idx).each_line do | line |
    if line =~ /require (.*)/
      file = "#{source}/#{$1.strip}"
      FileUtils.cp_r file, file.gsub(source, js_destination), verbose: true
    end
  end

  # fonts.
  fonts_source      = File.join source,      "fonts"
  fonts_destination = File.join destination, "fonts"

  Dir[File.join(fonts_source, "droid-sans-v6-latin-*")].each do | file |
    FileUtils.cp_r file, file.gsub(fonts_source, fonts_destination), verbose: true
  end

  oauth_source = File.join source, "lib", "swagger-oauth.js"
  oauth_dest   = File.join destination, "javascripts", "swagger-oauth.js"

  FileUtils.cp_r oauth_source, oauth_dest, verbose: true

  css_destination = File.join destination, "stylesheets", "swagger-ui2"
  css_source      = File.join source, "css"

  idx = File.join css_destination, "index.css"

  File.read(idx).each_line do | line |
    if line =~ /require (.*)\.css/
      file = "#{css_source}/#{$1.strip}.css"
      FileUtils.cp_r file, file.gsub(css_source, css_destination), verbose: true
    end
  end

end
