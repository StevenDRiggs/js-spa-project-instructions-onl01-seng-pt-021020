class QuantitiesController < ApplicationController
  def index
    render json: Quantity.all
  end

  def create
    quantity = Quantity.create(quantity_params)

    render json: quantity
  end

  private
    def quantity_params
      params.require(:quantity).permit(:quantity)
    end
end
