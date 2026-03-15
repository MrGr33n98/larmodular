class CreateProductViews < ActiveRecord::Migration[7.0]
  def change
    create_table :product_views do |t|
      t.references :user, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.references :company, foreign_key: true
      t.string :session_id
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.integer :duration_seconds
      t.string :referrer
      t.string :device_type # desktop, mobile, tablet

      t.timestamps
    end

    add_index :product_views, :product_id
    add_index :product_views, :user_id
    add_index :product_views, :session_id
    add_index :product_views, :created_at
  end
end
