class CreateQuoteRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :quote_requests do |t|
      t.references :user, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.references :lead, foreign_key: true
      t.text :message
      t.decimal :budget_min
      t.decimal :budget_max
      t.string :timeline # immediate, 1_3_months, 3_6_months, 6_12_months, over_1_year
      t.integer :intent_score, default: 0
      t.string :status, default: 'pending' # pending, responded, accepted, declined, expired
      t.text :response_message
      t.decimal :quoted_price
      t.boolean :converted, default: false
      t.datetime :converted_at

      t.timestamps
    end

    add_index :quote_requests, :product_id
    add_index :quote_requests, :company_id
    add_index :quote_requests, :lead_id
    add_index :quote_requests, :status
    add_index :quote_requests, :converted
  end
end
