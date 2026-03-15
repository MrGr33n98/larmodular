class AdBanner < ApplicationRecord
  belongs_to :campaign, class_name: 'AdCampaign'
  belongs_to :placement, class_name: 'AdPlacement'

  validates :image_url, presence: true
  validates :target_url, presence: true

  scope :active, -> { where(active: true, approved: true) }
  scope :approved, -> { where(approved: true) }
  scope :by_placement, ->(placement_id) { where(placement_id: placement_id) }

  def to_s
    name || "Banner ##{id}"
  end
end
