class Quantity < ApplicationRecord
  def quantity=(quantity)
    super(quantity.strip)
  end
end
