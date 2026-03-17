class Product < ApplicationRecord
  belongs_to :company
  belongs_to :category
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
  scope :by_category, ->(category_id) { category_id.present? ? where(category_id: category_id) : all }
  scope :by_company, ->(company_id) { company_id.present? ? where(company_id: company_id) : all }
  scope :price_range, ->(min, max) { min.present? && max.present? ? where('base_price >= ? AND base_price <= ?', min, max) : all }
  
  def to_s
    name
  end
  
  def price_with_region(region)
    return base_price unless region && base_price
    (base_price * region.tax_multiplier).round(2)
  end
  
  def price_with_discount
    base_price
  end
  
  def self.friendly_find(param)
    find_by(slug: param) || find_by(id: param)
  end
end
