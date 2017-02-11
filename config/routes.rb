Rails.application.routes.draw do
	root 'static_pages#home';
	
	devise_for :user 

	get '/profile/:public_name', to:'profiles#show', as: 'profile'
   	get '/profiles/create/', to: 'profiles#create', as: 'create_profile'
   	get '/profile/:public_name/editskill', to: 'profiles#edit_skill', as: 'edit_skill_profile'
  	resources :profiles, :except => [:index,:create,:show]

end
