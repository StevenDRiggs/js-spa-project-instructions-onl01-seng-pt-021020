class Measure < ApplicationRecord
  def initialize(measure)
    super(measure: measure.strip)
  end
end
