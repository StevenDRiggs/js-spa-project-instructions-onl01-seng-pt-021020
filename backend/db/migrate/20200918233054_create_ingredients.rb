class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.boolean :divisible, null: false, default: true
      t.string :preferred_measure

      t.timestamps
    end
  end
end
