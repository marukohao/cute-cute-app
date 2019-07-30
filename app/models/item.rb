class Item < ApplicationRecord
  has_many :decorations
  has_many :backgrounds, through: :decorations
end
