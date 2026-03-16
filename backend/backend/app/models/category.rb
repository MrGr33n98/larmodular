class Category < ApplicationRecord
  belongs_to :parent, class_name: 'Category', optional: true
  has_many :children, class_name: 'Category', foreign_key: :parent_id
  has_many :products
  
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  
  scope :active, -> { where(active: true) }
  scope :roots, -> { where(parent_id: nil) }
  scope :by_position, -> { order(position: :asc) }
  scope :ordered, -> { order(position: :asc) }
  
  def to_s
    name
  end
  
  def root?
    parent_id.nil?
  end
  
  def self.friendly_find(param)
    find_by(slug: param) || find_by(id: param)
  end

  def self.ransackable_associations(auth_object = nil)
    ["children", "parent", "products"]
  end
end
