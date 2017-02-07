class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.text :skills
      t.text :languages
      t.string :education
      t.text :classes
      t.string :aboutme
      t.timestamps
    end
  end
end
