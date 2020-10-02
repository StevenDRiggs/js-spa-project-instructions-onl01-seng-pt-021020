class CreateMeasures < ActiveRecord::Migration[5.2]
  def change
    create_table :measures do |t|
      t.string :measure, null: false
      t.boolean :divisible, null: false, default: true

      t.timestamps
    end
  end
end
