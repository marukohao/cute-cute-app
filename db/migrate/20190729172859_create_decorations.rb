class CreateDecorations < ActiveRecord::Migration[5.2]
  def change
    create_table :decorations do |t|
      t.references :item, foreign_key: true
      t.references :background, foreign_key: true

      t.timestamps
    end
  end
end
