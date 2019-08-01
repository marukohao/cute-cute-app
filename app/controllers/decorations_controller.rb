class DecorationsController < ApplicationController
  def index
    decorations = Decoration.all 
    render json: decorations, include: [:item, :room]
  end

  def show
    decoration = Decoration.find(params[:id])
    render json: decoration
  end

  def create
    decoration = Decoration.new(params.require(:decoration).permit(:room_id, :item_id))
    decoration.save
    render json: decoration
  end

  def destroy
    decorations = Decoration.all 
    decoration = Decoration.find(params[:id])
    decoration.delete
    render json: decorations
  end
end
