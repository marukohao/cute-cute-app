class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :item_url
      t.string :room_type

      t.timestamps
    end
  end
end
