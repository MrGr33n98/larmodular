class Region < ApplicationRecord
  has_many :cities
  has_many :companies
  has_many :leads
  has_many :products
  
  validates :name, presence: true
  validates :code, presence: true, uniqueness: true
  
  scope :active, -> { where(active: true) }
  
  def to_s
    name
  end
  
  def self.friendly_find(param)
    find_by(slug: param) || find_by(code: param) || find_by(id: param)
  end

  def self.ransackable_associations(auth_object = nil)
    ["cities", "companies", "leads", "products"]
  end
end
