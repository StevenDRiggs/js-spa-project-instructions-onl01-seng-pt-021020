class MeasuresController < ApplicationController
  def index
    render json: Measure.all
  end

  def show
    ingredient = params[:id].split('-').join(' ')
    measure = Ingredient.find_by(name: ingredient)
    if measure
      render json: {measure: measure.preferred_measure}
    else
      render json: {measure: ''}
    end
  end
end
