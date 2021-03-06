class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :public_name
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.text :skills
      t.string :location
      t.text :languages
      t.string :education
      t.text :courses
      t.string :aboutme
      t.timestamps
    end
  end
end
