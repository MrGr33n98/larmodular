class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :price_monthly, :price_yearly,
             :features, :limits, :highlighted, :active, :position

  def attributes
    data = super
    data[:price_monthly] = object.price_monthly.to_f if object.price_monthly
    data[:price_yearly] = object.price_yearly.to_f if object.price_yearly
    data
  end
end
