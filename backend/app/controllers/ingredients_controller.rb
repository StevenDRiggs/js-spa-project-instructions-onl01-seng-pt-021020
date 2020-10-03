class IngredientsController < ApplicationController
  def index
    render json: Ingredient.all
  end

  def update
    ingredient = Ingredient.find(params[:id])

    puts "params: #{params}"
    ingredient.update(ingredient_params)

    render json: ingredient
  end


  private
    def ingredient_params
      params.require([:name, :preferred_measure_id])
    end
end
