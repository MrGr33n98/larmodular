class Product < ApplicationRecord
  belongs_to :company
  belongs_to :category
  belongs_to :region, optional: true
  belongs_to :city, optional: true
  has_many :reviews
  has_many :favorites
  has_many :product_views
  has_many :quote_requests
  has_many :product_affinities, foreign_key: :product_a_id
  
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :company_id, presence: true
  validates :category_id, presence: true
  
  scope :active, -> { where(active: true) }
  scope :featured, -> { where(featured: true) }
  scope :by_category, ->(category_id) { where(category_id: category_id) }
  scope :by_company, ->(company_id) { where(company_id: company_id) }
  scope :price_range, ->(min, max) { where('base_price >= ? AND base_price <= ?', min, max) if min && max }
  
  def to_s
    name
  end
  
  def price_with_region(region)
    return base_price unless region && base_price
    (base_price * region.tax_multiplier).round(2)
  end
  
  def price_with_discount
    return base_price unless discount_price.present?
    discount_price
  end
  
  def self.friendly_find(param)
    find_by(slug: param) || find_by(id: param)
  end

  def self.ransackable_attributes(auth_object = nil)
    ["active", "area_m2", "base_price", "bathrooms", "bedrooms", "created_at", 
     "featured", "id", "meta_description", "meta_keywords", "meta_title", "name", 
     "slug", "updated_at", "views_count"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["category", "city", "company", "favorites", "product_affinities", "product_views", "quote_requests", "region", "reviews"]
  end

  def meta_title
    read_attribute(:meta_title).presence || "#{name} - #{category&.name} | LARModular"
  end

  def meta_description
    read_attribute(:meta_description).presence || description&.truncate(160, separator: ' ')
  end
end
