class IntentEvent < ApplicationRecord
  belongs_to :lead, optional: true
  belongs_to :user, optional: true
  belongs_to :product, optional: true
  belongs_to :company, optional: true
  belongs_to :region, optional: true
  belongs_to :city, optional: true

  EVENT_TYPES = %w[page_view product_view search calculator_use simulator_use quote_request favorite_add share contact view_comparison add_to_cart].freeze

  validates :event_type, presence: true, inclusion: { in: EVENT_TYPES }

  scope :recent, -> { order(created_at: :desc) }
  scope :by_session, ->(session_id) { where(session_id: session_id) }
  scope :by_type, ->(type) { where(event_type: type) }
  scope :by_lead, ->(lead_id) { where(lead_id: lead_id) }

  def to_s
    "#{event_type} - #{created_at}"
  end
end
