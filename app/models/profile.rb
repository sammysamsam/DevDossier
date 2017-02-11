class Profile < ApplicationRecord
	validates :public_name, uniqueness: {case_sensitive: true}, presence: true, length: {minimum: 1, maximum: 50}
	validates :first_name, presence: true, length: {minimum: 1, maximum: 50}
	validates :last_name, presence: true, length: {minimum: 1, maximum: 50}
	validates :location, presence: true, length: {minimum: 1, maximum: 50}
	validates :aboutme, length: {minimum: 0, maximum: 600}
	

	belongs_to :user, optional: true

end

#:first_name,:last_name, :languages,:education,:classes,:aboutme