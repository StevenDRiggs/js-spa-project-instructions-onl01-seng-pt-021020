class Ingredient < ApplicationRecord
  def name=(name)
    super(name.strip.titleize)
  end

  def preferred_measure=(measure)
    self.measure_id = measure.id
  end

  def preferred_measure
    Measure.find(self.measure_id).measure
  end
end
