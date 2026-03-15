class AdvertiserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :logo_url, :phone, :website, :description, :active

  attribute :campaigns_count do
    object.campaigns.count
  end
end
