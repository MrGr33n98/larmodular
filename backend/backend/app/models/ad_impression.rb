class AdImpression < ApplicationRecord
  belongs_to :banner
  belongs_to :placement
  belongs_to :region, optional: true
  belongs_to :city, optional: true
  belongs_to :user, optional: true

  scope :recent, -> { order(created_at: :desc) }
  scope :by_banner, ->(banner_id) { where(banner_id: banner_id) }
  scope :by_session, ->(session_id) { where(session_id: session_id) }

  def self.ransackable_associations(_auth_object = nil)
    %w[banner placement region city user]
  end

  def to_s
    "Impressão ##{id} - #{banner.name}"
  end
end
