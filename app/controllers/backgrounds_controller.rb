class BackgroundsController < ApplicationController

  def index
    backgrounds = Background.all 
    backgrounds_json = backgrounds.map {|background| {id: background.id, name: background.name, background_url: background.background_url}}
      render json: backgrounds_json
  end
end
