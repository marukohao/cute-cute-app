class Room < ApplicationRecord
  belongs_to :user
  belongs_to :background
  has_many :decorations
  has_many :items, through: :decorations, dependent: :destroy

end
