class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.references :subscription, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :stripe_payment_intent_id
      t.string :stripe_charge_id
      t.decimal :amount, precision: 10, scale: 2
      t.string :currency, default: 'brl'
      t.string :status, default: 'pending' # pending, succeeded, failed, refunded
      t.string :payment_method
      t.string :description
      t.json :metadata, default: {}
      t.datetime :paid_at
      t.datetime :failed_at

      t.timestamps
    end

    add_index :payments, :stripe_payment_intent_id, unique: true
    add_index :payments, :status
  end
end
