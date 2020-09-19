class Ingredient < ApplicationRecord
  def name=(name)
    super(name.singularize.titleize)
  end

  def preferred_measure=(measure)
    self.preferred_measure_id = measure.id
  end

  def preferred_measure
    Measure.find(self.preferred_measure_id).measure
  end
end
