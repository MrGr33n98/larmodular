class Advertiser < ApplicationRecord
  belongs_to :user, optional: true
  has_many :campaigns, class_name: 'AdCampaign'

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  scope :active, -> { where(active: true) }

  def self.ransackable_associations(_auth_object = nil)
    %w[user campaigns]
  end

  def to_s
    name
  end
end
