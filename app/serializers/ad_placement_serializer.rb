class AdPlacementSerializer < ActiveModel::Serializer
  attributes :id, :position_key, :page, :location, :width, :height,
             :price_cents, :description, :active
end
