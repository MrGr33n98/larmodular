class CreatePlans < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.decimal :price_monthly, precision: 10, scale: 2
      t.decimal :price_yearly, precision: 10, scale: 2
      t.json :features, default: []
      t.json :limits, default: {} # products: 10, views: 5000, etc
      t.boolean :highlighted, default: false
      t.boolean :active, default: true
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :plans, :slug, unique: true
    add_index :plans, :active
    add_index :plans, :position
  end
end
