class ProfilesController < ApplicationController
	before_action :authenticate_user!
	

	#GET profile.json
	def show
		if (current_user.profile_id == nil)						#NEW USER
			redirect_to new_profile_path					
		else
			@profile = Profile.find(current_user.profile_id)

			#make editable if project id = user id
			if (@profile.user_id != current_user.profile_id) 	#OTHER USERS
				@editable = false
			else
				@editable = true								#USER
			end
		end
	end

	def new
		@profile = Profile.new
	end

	def create
		#create only if your username has no profile made yet
		if (current_user.profile_id == nil)	
			@profile = Profile.new(profile_params)
			
			#process user inputs
			@profile.first_name = @profile.first_name.capitalize
			@profile.last_name = @profile.last_name.capitalize
			@profile.user_id = current_user.id

			#profile is created
			if @profile.save
				flash[:notice] = "Profile was successfully created"
				current_user.profile_id = @profile.id
				current_user.save

				redirect_to profile_path(public_name: @profile.public_name)
			else
				render 'new'
			end
		else
			redirect_to profile_path
		end
	end

	def edit
		#update only your own profile and profile exists
		profile = Profile.find(current_user.profile_id)
		if(profile && profile.user_id == current_user.profile_id)

			if (profile.update(profile_params))
				flash[:notice] = "Profile was successfully updated"
			else
				puts "\n\n"+ profile.errors.full_messages.to_s
				flash[:notice] = "Profile was unsuccessfully updated"
			end
		end
		redirect_to profile_path(public_name: profile.public_name)
	end



	def edit_skill
		profile = Profile.find(current_user.profile_id)
		if(profile && profile.user_id == current_user.profile_id)
			data = params.require(:profile).permit(:public_name,:skills)
			if (profile.update_attribute(:skills, data[:skills]) )
				flash[:notice] = "Profile was successfully updated"
			else
				flash[:notice] = "Profile was unsuccessfully updated : " + profile.errors.full_messages.to_s
			end
		end
		redirect_to profile_path(public_name: profile.public_name, opened_page: "edit skill")
	end

#############

	private
		def profile_params
			params.require(:profile).permit(:public_name,:first_name,:last_name,:skills,:location,:education,:courses,:aboutme)
		end


end
