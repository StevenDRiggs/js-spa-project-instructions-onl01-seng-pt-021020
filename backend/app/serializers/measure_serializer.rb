class MeasureSerializer < ActiveModel::Serializer
  attributes :id, :measure, :divisible, :ingredients
  has_many :ingredients

  # def ingredients
  #   self.ingredients.collect do |ingredient|
  #     {
  #       name: ingredient.name,
  #       id: ingredient.id
  #     }
  #   end
  # end
end
