class AddCoverImageToCompaniesAndProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :cover_data, :jsonb
    add_column :companies, :logo_data, :jsonb
    add_column :products, :images_data, :jsonb
    add_column :categories, :icon_data, :jsonb
    add_column :advertisers, :logo_data, :jsonb
    add_column :ad_banners, :image_data, :jsonb
    add_column :users, :avatar_data, :jsonb
  end
end
