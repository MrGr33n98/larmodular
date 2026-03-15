class AdCampaign < ApplicationRecord
  belongs_to :advertiser
  has_many :banners, class_name: 'AdBanner'

  validates :name, presence: true
  validates :advertiser_id, presence: true

  enum :status, { draft: 'draft', active: 'active', paused: 'paused', completed: 'completed' }, prefix: true

  scope :active, -> { where(status: 'active', active: true) }
  scope :by_advertiser, ->(advertiser_id) { where(advertiser_id: advertiser_id) }

  def to_s
    name
  end

  def budget
    budget_cents / 100.0
  end

  def spent
    spent_cents / 100.0
  end

  def remaining
    budget - spent
  end
end
