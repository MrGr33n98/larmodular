class CitySerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :region_id, :state, :timezone

  attribute :region_name do
    object.region.name if object.region
  end
end
