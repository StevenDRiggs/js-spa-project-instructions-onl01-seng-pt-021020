Rails.application.routes.draw do
  resources :quantities
  resources :measures
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :ingredients
end
