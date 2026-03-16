class QuoteRequest < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :product
  belongs_to :company
  belongs_to :lead, optional: true

  enum :status, { pending: 'pending', responded: 'responded', accepted: 'accepted', declined: 'declined', expired: 'expired' }, prefix: true
  enum :timeline, { immediate: 'immediate', '1_3_months': '1_3_months', '3_6_months': '3_6_months', '6_12_months': '6_12_months', over_1_year: 'over_1_year' }, prefix: true

  scope :recent, -> { order(created_at: :desc) }
  scope :converted, -> { where(converted: true) }

  def self.ransackable_associations(_auth_object = nil)
    %w[user product company lead]
  end

  def to_s
    "Orçamento ##{id} - #{product.name}"
  end
end
