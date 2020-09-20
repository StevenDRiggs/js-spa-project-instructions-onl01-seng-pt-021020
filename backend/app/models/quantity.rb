class Quantity < ApplicationRecord
  def initialize(quantity)
    super(quantity: quantity.strip)
  end
end
