class RoomsController < ApplicationController
  def index
    rooms = Room.all 
    render json: rooms, include: [:user, :background]
  end

  def create
    room = Room.new(params.require(:room).permit(:roomname))
    room.save
    render json: room
  end

end
