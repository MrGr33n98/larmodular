class CreateAdImpressions < ActiveRecord::Migration[7.0]
  def change
    create_table :ad_impressions do |t|
      t.references :banner, null: false, foreign_key: true
      t.references :placement, null: false, foreign_key: true
      t.string :session_id
      t.string :ip_address
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.references :user, foreign_key: true
      t.string :page_url

      t.timestamps
    end

    add_index :ad_impressions, :banner_id
    add_index :ad_impressions, :session_id
    add_index :ad_impressions, :created_at
  end
end
