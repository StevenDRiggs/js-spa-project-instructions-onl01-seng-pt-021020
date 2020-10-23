class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.integer :preferred_measure_id

      t.timestamps
    end
  end
end
