class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :phone, :avatar_url, :document, :birth_date,
             :gender, :address, :zip_code, :region_id, :city_id, :newsletter,
             :created_at

  attribute :region_name do
    object.region.name if object.region
  end

  attribute :city_name do
    object.city.name if object.city
  end

  attribute :subscription do
    sub = object.subscriptions.active.first
    SubscriptionSerializer.new(sub).as_json if sub
  end

  attribute :company do
    CompanySerializer.new(object.company).as_json if object.company
  end
end
