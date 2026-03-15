class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :description
      t.string :logo_url
      t.string :banner_url
      t.text :address
      t.string :phone
      t.string :email
      t.string :website
      t.json :social_media, default: {}
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.json :delivery_areas, default: []
      t.decimal :lead_contact_rate, precision: 3, scale: 2, default: 0.0
      t.integer :rating, default: 0
      t.integer :reviews_count, default: 0
      t.integer :products_count, default: 0
      t.integer :views_count, default: 0
      t.string :status, default: 'pending' # pending, approved, rejected, suspended
      t.boolean :featured, default: false
      t.boolean :verified, default: false
      t.integer :experience_years, default: 0

      t.timestamps
    end

    add_index :companies, :slug, unique: true
    add_index :companies, :status
    add_index :companies, :featured
  end
end
