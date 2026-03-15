class QuoteRequestSerializer < ActiveModel::Serializer
  attributes :id, :message, :budget_min, :budget_max, :timeline, :intent_score,
             :status, :response_message, :quoted_price, :converted, :converted_at, :created_at

  attribute :user_name do
    object.user.name if object.user
  end

  attribute :product_name do
    object.product.name if object.product
  end

  attribute :company_name do
    object.company.name if object.company
  end
end
