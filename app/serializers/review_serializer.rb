class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :title, :comment, :verified_purchase, :status,
             :company_response, :company_response_text, :company_response_at, :created_at

  attribute :user_name do
    object.user.name if object.user
  end

  attribute :user_avatar do
    object.user.avatar_url if object.user
  end
end
