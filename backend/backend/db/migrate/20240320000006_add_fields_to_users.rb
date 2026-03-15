class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone, :string
    add_column :users, :avatar_url, :string
    add_column :users, :role, :string, default: 'buyer' # buyer, seller, admin
    add_column :users, :region_id, :bigint
    add_column :users, :city_id, :bigint
    add_column :users, :active, :boolean, default: true
    
    add_index :users, :role
    add_index :users, :region_id
    add_index :users, :city_id
    
    add_foreign_key :users, :regions
    add_foreign_key :users, :cities
  end
end
