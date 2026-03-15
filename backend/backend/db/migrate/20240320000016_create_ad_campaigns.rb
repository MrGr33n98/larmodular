class CreateAdCampaigns < ActiveRecord::Migration[7.0]
  def change
    create_table :ad_campaigns do |t|
      t.references :advertiser, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.decimal :budget_cents, default: 0
      t.decimal :spent_cents, default: 0
      t.json :targeting, default: {} # regions, categories, etc
      t.date :start_date
      t.date :end_date
      t.string :status, default: 'draft' # draft, active, paused, completed
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :ad_campaigns, :advertiser_id
    add_index :ad_campaigns, :status
    add_index :ad_campaigns, :active
  end
end
