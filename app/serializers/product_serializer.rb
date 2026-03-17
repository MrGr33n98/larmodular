class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :short_description, :base_price,
             :video_url, :active, :featured, :category_id, :company_id,
             :views_count, :favorites_count, :area_m2, :bedrooms, :bathrooms,
             :warranty_months, :lead_time_days

  attribute :images do
    object.images || []
  end

  attribute :specifications do
    object.specs || {}
  end

  attribute :category_name do
    object.category.name if object.category
  end

  attribute :company_name do
    object.company.name if object.company
  end

  attribute :company_logo do
    object.company.logo_url if object.company
  end

  attribute :average_rating do
    object.company&.average_rating
  end

  attribute :reviews_count do
    object.reviews.approved.count
  end
end
