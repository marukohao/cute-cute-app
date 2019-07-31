class User < ApplicationRecord
  has_many :rooms
  has_many :backgrounds, through: :rooms
  validates :username, presence: true
  validates :username, uniqueness: true

  def get_items(background)
    self.rooms.each do |room|
      if room.background_id == background.id
        return room.items.map{|item| {id: item.id, name: item.name, room_type: item.room_type, item_url: item.item_url}}
      end
    end
  end

end
