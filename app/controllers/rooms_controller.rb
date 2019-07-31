class RoomsController < ApplicationController
  def index
    rooms = Room.all 
    render json: rooms, include: [:user, :background]
  end

  def show
    room = Room.find(params[:id])
    render json: room
  end

  def create
    room = Room.new(params.require(:room).permit(:user_id, :background_id))
    room.save
    render json: room
  end

  def destroy
    rooms = Room.all 
    room = Room.find(params[:id])
    room.delete
    render json: rooms
  end

end
