class Item < ApplicationRecord
  has_many :decorations
  has_many :rooms, through: :decorations
end
