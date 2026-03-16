class IntentSession < ApplicationRecord
  belongs_to :lead, optional: true
  belongs_to :user, optional: true
  belongs_to :region, optional: true
  belongs_to :city, optional: true

  has_many :events, class_name: 'IntentEvent', foreign_key: :session_id, primary_key: :session_id

  scope :recent, -> { order(started_at: :desc) }
  scope :active, -> { where('ended_at IS NULL') }

  def self.ransackable_associations(_auth_object = nil)
    %w[lead user region city events]
  end

  def to_s
    "Sessão #{session_id}"
  end

  def duration
    return nil unless started_at && ended_at
    ended_at - started_at
  end
end
