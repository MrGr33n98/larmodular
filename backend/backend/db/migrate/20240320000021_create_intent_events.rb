class CreateIntentEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :intent_events do |t|
      t.references :lead, foreign_key: true
      t.string :session_id
      t.references :user, foreign_key: true
      t.references :product, foreign_key: true
      t.references :company, foreign_key: true
      t.references :region, foreign_key: true
      t.references :city, foreign_key: true
      t.string :event_type, null: false # page_view, product_view, search, calculator_use, simulator_use, quote_request, favorite_add, etc
      t.json :event_data, default: {}
      t.string :page_url
      t.string :ip_address
      t.integer :duration_seconds

      t.timestamps
    end

    add_index :intent_events, :lead_id
    add_index :intent_events, :session_id
    add_index :intent_events, :user_id
    add_index :intent_events, :event_type
    add_index :intent_events, :created_at
  end
end
