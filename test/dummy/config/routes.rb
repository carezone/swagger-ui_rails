Dummy::Application.routes.draw do
  get '/swagger/petstore(.:format)', to: 'swagger#petstore'
  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'swagger#petstore.html'
end
