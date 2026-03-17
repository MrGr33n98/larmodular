class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :description, :logo_url, :banner_url, :website, :phone, :email,
             :address, :status, :verified, :featured, :region_id, :city_id,
             :products_count, :reviews_count, :average_rating

  attribute :region_name do
    object.region.name if object.region
  end

  attribute :city_name do
    object.city.name if object.city
  end

  attribute :products do
    object.products.active.map { |p| ProductSerializer.new(p).as_json }
  end

  attribute :categories do
    object.categories.map { |c| CategorySerializer.new(c).as_json }
  end
end
