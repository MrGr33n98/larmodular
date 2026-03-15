class CreateAdBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :ad_banners do |t|
      t.references :campaign, null: false, foreign_key: { to_table: :ad_campaigns }
      t.references :placement, null: false, foreign_key: { to_table: :ad_placements }
      t.string :name
      t.string :image_url, null: false
      t.string :target_url, null: false
      t.string :alt_text
      t.integer :impressions_limit
      t.integer :impressions_count, default: 0
      t.integer :clicks_count, default: 0
      t.integer :priority, default: 0
      t.boolean :active, default: true
      t.boolean :approved, default: false

      t.timestamps
    end

    add_index :ad_banners, :active
    add_index :ad_banners, :approved
  end
end
