class Background < ApplicationRecord
  has_many :rooms
  has_many :decorations
  has_many :users, through: :rooms
  has_many :items, through: :decorations
end
