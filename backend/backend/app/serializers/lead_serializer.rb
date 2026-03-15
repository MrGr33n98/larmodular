class LeadSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :source, :intent_score, :funnel_stage,
             :qualification_status, :status, :notes, :metadata, :created_at

  attribute :company_name do
    object.company.name if object.company
  end

  attribute :region_name do
    object.region.name if object.region
  end

  attribute :city_name do
    object.city.name if object.city
  end
end
