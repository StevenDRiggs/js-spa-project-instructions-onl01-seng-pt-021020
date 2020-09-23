class Measure < ApplicationRecord
  has_many :ingredients 


  def initialize(measure)
    super(measure: measure.strip)
  end
end
