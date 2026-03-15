class CreateCities < ActiveRecord::Migration[7.0]
  def change
    create_table :cities do |t|
      t.references :region, null: false, foreign_key: true
      t.string :name, null: false
      t.string :state, null: false, limit: 2 # SP, RJ, MG, etc
      t.string :state_name
      t.integer :population
      t.decimal :gdp_index, precision: 5, scale: 2, default: 1.0
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :cities, [:region_id, :state]
    add_index :cities, :name
    add_index :cities, [:state, :name]
  end
end
