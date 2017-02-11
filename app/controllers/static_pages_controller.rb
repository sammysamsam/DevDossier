class StaticPagesController < ApplicationController
	def home
		if (user_signed_in?)			
			@signed_in = true
			if(current_user.profile_id != nil)
				profile = Profile.find(current_user.profile_id)	
				@PN = profile.public_name
			else 
				@PN = ""
			end
		else
			@signed_in = false
		end
	end
end
