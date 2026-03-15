class AdCampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :budget_cents, :spent_cents, :targeting,
             :start_date, :end_date, :status, :active, :created_at

  attribute :advertiser_name do
    object.advertiser.name if object.advertiser
  end

  attribute :banners do
    object.banners.active.map { |b| AdBannerSerializer.new(b).as_json }
  end

  def attributes
    data = super
    data[:budget] = (object.budget_cents / 100.0) if object.budget_cents
    data[:spent] = (object.spent_cents / 100.0) if object.spent_cents
    data
  end
end
