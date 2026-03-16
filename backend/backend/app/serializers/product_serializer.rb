class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :base_price, :price_with_discount, :images,
             :specifications, :highlights, :video_url, :active, :featured, :category_id,
             :company_id, :region_id, :city_id, :views_count, :favorites_count,
             :meta_title, :meta_description, :meta_keywords

  attribute :category_name do
    object.category.name if object.category
  end

  attribute :company_name do
    object.company.name if object.company
  end

  attribute :company_logo do
    object.company.logo_url if object.company
  end

  attribute :region_price do
    object.base_price if object.region_id
  end

  attribute :average_rating do
    object.company.average_rating if object.company
  end

  attribute :reviews_count do
    object.reviews_count || 0
  end
end
