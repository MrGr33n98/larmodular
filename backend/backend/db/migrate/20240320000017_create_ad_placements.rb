class CreateAdPlacements < ActiveRecord::Migration[7.0]
  def change
    create_table :ad_placements do |t|
      t.string :position_key, null: false
      t.string :page, null: false # home, product, company, list, comparison
      t.string :location, null: false # topo, rodape, lateral, nativo
      t.integer :width
      t.integer :height
      t.decimal :price_cents, default: 0
      t.text :description
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :ad_placements, :position_key, unique: true
    add_index :ad_placements, [:page, :location]
    add_index :ad_placements, :active
  end
end
