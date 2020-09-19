class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.boolean :divisible, null: false, default: true
      t.integer :preferred_measure_id

      t.timestamps
    end
  end
end
