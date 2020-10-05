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

  def calculate
    recipe = params[:recipe].to_a
    makes = params[:makes].to_f
    desired = params[:desired].to_f
    multiplier = desired / makes

    scaling_calculation(recipe, makes, desired, multiplier)
  end

  def scaling_calculation(recipe, makes, desired, multiplier)
    new_recipe = recipe.collect do |item|
      quantity = item[:quantity]

      if quantity.to_i.to_s == quantity
        quantity_float = quantity.to_f
        quantity_arr = (quantity_float * multiplier).to_whole_fraction(8)
      else
        quantity_split = quantity.split('/')
        quantity_split = quantity_split[0].split(/\s+/).push(quantity_split[1])
        quantity_split = quantity_split.map do |val|
          val.to_f
        end

        if quantity_split.length == 2
          quantity_float = quantity_split[0] / quantity_split[1]
        elsif quantity_split.length == 3
          quantity_float = (quantity_split[0] * quantity_split[2] + quantity_split[1]) / quantity_split[2]
        end
        quantity_arr = (quantity_float * multiplier).to_whole_fraction(8)
      end

      if quantity_arr[2] == 1
        quantity = "#{quantity_arr[0]}"
      elsif item[:divisible] == false
        multiplier = (quantity_float * multiplier).ceil / quantity_float

        return scaling_calculation(recipe, makes, desired, multiplier)
      elsif quantity_arr[0] >= 1
        quantity = "#{quantity_arr[0]} #{quantity_arr[1]}/#{quantity_arr[2]}"
      else
        quantity = "#{quantity_arr[1]}/#{quantity_arr[2]}"
      end

      item[:quantity] = quantity
      item
    end

    render json: {
      new_recipe: new_recipe,
      makes: (makes * multiplier).floor
    }
  end
end
