class CreateRegions < ActiveRecord::Migration[7.0]
  def change
    create_table :regions do |t|
      t.string :name, null: false
      t.string :code, null: false # norte, nordeste, sul, sudeste, centro-oeste
      t.string :full_name
      t.decimal :tax_multiplier, precision: 5, scale: 2, default: 1.0
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :regions, :code, unique: true
    add_index :regions, :name
  end
end
