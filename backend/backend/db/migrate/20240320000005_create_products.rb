class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.references :company, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.text :short_description
      t.decimal :base_price, precision: 12, scale: 2
      t.json :specs, default: {}
      t.json :images, default: []
      t.string :video_url
      t.integer :warranty_months, default: 12
      t.integer :lead_time_days
      t.integer :area_m2
      t.integer :bedrooms, default: 0
      t.integer :bathrooms, default: 0
      t.integer :views_count, default: 0
      t.integer :favorites_count, default: 0
      t.integer :quotes_count, default: 0
      t.boolean :featured, default: false
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :products, :slug, unique: true
    add_index :products, :company_id
    add_index :products, :category_id
    add_index :products, :active
    add_index :products, :featured
    add_index :products, :base_price
  end
end
