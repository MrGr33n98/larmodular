class RegionSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :tax_multiplier, :timezone
end
