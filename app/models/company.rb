class Company < ApplicationRecord
  belongs_to :region, optional: true
  belongs_to :city, optional: true
  belongs_to :user, optional: true
  has_many :products
  has_many :reviews
  has_many :leads
  has_many :quote_requests
  has_and_belongs_to_many :categories
  
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  
  scope :active, -> { where(status: 'approved') }
  scope :featured, -> { where(featured: true) }
  scope :verified, -> { where(verified: true) }
  scope :pending, -> { where(status: 'pending') }
  scope :by_region, ->(region_id) { where(region_id: region_id) }
  scope :by_city, ->(city_id) { where(city_id: city_id) }
  scope :by_category, ->(category_id) { joins(:categories).where(categories: { id: category_id }) }
  
  def to_s
    name
  end
  
  def average_rating
    return 0 if reviews_count.zero?
    reviews.where(status: 'approved').average(:rating).to_f.round(1)
  end
  
  def self.friendly_find(param)
    find_by(slug: param) || find_by(id: param)
  end
end
