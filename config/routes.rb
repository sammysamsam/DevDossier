Rails.application.routes.draw do
	root 'static_pages#home';
	
	devise_for :user 

   	get '/profile/', to: 'profiles#show'
   	get '/profile/create', to: 'profiles#create', as: 'create_profile'
  	resources :profiles, :except => [:show, :index,:create]

end
