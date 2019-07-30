Rails.application.routes.draw do
  resources :decorations
  resources :items
  resources :rooms
  resources :backgrounds
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
