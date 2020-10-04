Rails.application.routes.draw do
  resources :quantities
  resources :measures
  resources :ingredients

  put '/records_update', to: 'application#records_update'
end
