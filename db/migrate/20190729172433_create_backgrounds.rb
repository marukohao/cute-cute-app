class CreateBackgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :backgrounds do |t|
      t.string :name
      t.string :background_url

      t.timestamps
    end
  end
end
