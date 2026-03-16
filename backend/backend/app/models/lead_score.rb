class LeadScore < ApplicationRecord
  belongs_to :lead

  validates :lead_id, uniqueness: true

  enum :intent_level, { cold: 'cold', warm: 'warm', hot: 'hot', ready: 'ready' }, prefix: true

  scope :recent, -> { order(calculated_at: :desc) }
  scope :hot, -> { where('score >= 70') }

  def self.ransackable_associations(_auth_object = nil)
    %w[lead]
  end

  def to_s
    "Score #{score} (#{intent_level})"
  end
end
