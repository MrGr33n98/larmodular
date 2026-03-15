class CreateSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true
      t.string :status, default: 'active' # active, canceled, past_due, trialing
      t.string :stripe_subscription_id
      t.string :stripe_customer_id
      t.string :billing_cycle, default: 'monthly' # monthly, yearly
      t.datetime :current_period_start
      t.datetime :current_period_end
      t.datetime :canceled_at
      t.boolean :cancel_at_period_end, default: false
      t.text :metadata, default: "{}"

      t.timestamps
    end

    add_index :subscriptions, :status
    add_index :subscriptions, :stripe_subscription_id, unique: true
  end
end
