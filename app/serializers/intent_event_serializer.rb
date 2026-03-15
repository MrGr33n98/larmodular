class IntentEventSerializer < ActiveModel::Serializer
  attributes :id, :event_type, :event_data, :page_url, :ip_address,
             :duration_seconds, :created_at

  attribute :product_name do
    object.product.name if object.product
  end

  attribute :company_name do
    object.company.name if object.company
  end
end
