class RoomsController < ApplicationController
  def index
    rooms = Room.all 
    render json: rooms, include: [:user, :background]
  end

  def create
    room = Room.new(params.require(:room).permit(:user_id, :background_id))
    room.save
    render json: room
  end

end
