class IngredientsController < ApplicationController
  def index
    render json: Ingredient.all
  end
end
