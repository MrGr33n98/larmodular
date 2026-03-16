class AdPlacement < ApplicationRecord
  has_many :banners, class_name: 'AdBanner'
  has_many :impressions, class_name: 'AdImpression'
  has_many :clicks, class_name: 'AdClick'
  
  validates :position_key, presence: true, uniqueness: true
  validates :page, presence: true
  validates :location, presence: true
  
  scope :active, -> { where(active: true) }
  scope :by_page, ->(page) { where(page: page) }
  
  def self.ransackable_associations(_auth_object = nil)
    %w[banners impressions clicks]
  end

  def to_s
    "#{page} - #{location}"
  end
  
  def dimensions
    "#{width}x#{height}"
  end
  
  def price_display
    "R$ #{(price_cents / 100.0).round(2)}/semana"
  end
end
