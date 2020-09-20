class QuantitiesController < ApplicationController
  def index
    render json: Quantity.all
  end
end
