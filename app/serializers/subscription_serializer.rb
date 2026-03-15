class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :status, :stripe_subscription_id, :stripe_customer_id,
             :billing_cycle, :current_period_start, :current_period_end,
             :canceled_at, :cancel_at_period_end, :created_at

  attribute :plan_name do
    object.plan.name if object.plan
  end

  attribute :plan_price do
    object.plan.price_monthly if object.plan
  end
end
