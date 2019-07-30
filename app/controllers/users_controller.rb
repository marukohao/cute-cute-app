class UsersController < ApplicationController
  def index
    users = User.all 
    users_json = users.map{|user| {id: user.id, username: user.username, backgrounds:user.backgrounds.map{|background| {id: background.id, name: background.name, background_url: background.background_url, items: background.items.map{|item| {id: item.id, name: item.name, room_type: item.room_type, item_url: item.item_url}}}}
    }}
    # backgrounds = user.backgrounds.map{|background| {id: background.id, background_url: background.background_url, items: items}}
    # users_json = users.map{|user| {id: user.id, username: user.username, background: } 
    # backgrounds = user.backgrounds.map{|background| {id: background.id, name: background.name, background_url: background.background_url, items: background.items.map{|item| {id: item.id, name: item.name, item_url: item.item_url}}}}
    # user_json = {id: user.id, username: user.username, background: backgrounds}
    
    render json: users_json
  end

  def show
    user = User.find(params[:id])
    backgrounds = user.backgrounds.map{|background| {id: background.id, name: background.name, background_url: background.background_url, items: background.items.map{|item| {id: item.id, name: item.name, room_type: item.room_type, item_url: item.item_url}}}}
    user_json = {id: user.id, username: user.username, backgrounds: backgrounds}
    render json: user_json
  end

  def create
    user = User.new(params.require(:user).permit(:username))
    if user.save
      render json: user
    else
      render :json => {
        :errors => user.errors.full_messages
      }
    end
  end

  
end
