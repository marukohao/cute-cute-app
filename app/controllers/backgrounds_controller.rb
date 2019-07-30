class BackgroundsController < ApplicationController

  def index
    backgrounds = Background.all 
    backgrounds_json = backgrounds.map {|background| {id: background.id, name: background.name, background_url: background.background_url, items: background.items{|item| {name: item.name, room_type: item.room_type, id: item.id, item_url: item.item_url}}}}
      render json: backgrounds_json
  end
end
