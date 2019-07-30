class User < ApplicationRecord
  has_many :rooms
  has_many :backgrounds, through: :rooms
  validates :username, presence: true
  validates :username, uniqueness: true
end
