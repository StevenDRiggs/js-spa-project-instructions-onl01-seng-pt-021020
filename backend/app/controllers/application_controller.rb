class ApplicationController < ActionController::API
  def records_update
    quantity = Quantity.find_by(id: params[:quantity][:id]) || Quantity.create(quantity: params[:quantity][:quantity])
    measure = Measure.find_by(id: params[:measure][:id]) || Measure.create(measure: params[:measure][:measure], divisible: params[:divisible])
    ingredient = Ingredient.find_by(id: params[:ingredient][:id]) || Ingredient.create(name: params[:ingredient][:name], preferred_measure: measure)

    if measure.divisible != params[:divisible]
      measure.divisible = params[:divisible]
      measure.save
    end

    if ingredient.preferred_measure != measure
      ingredient.preferred_measure = measure
      ingredient.save
    end

    render json: 'SUCCESS'
  end
end
