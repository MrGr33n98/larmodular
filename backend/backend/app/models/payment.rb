class Payment < ApplicationRecord
  belongs_to :subscription
  belongs_to :user

  enum :status, { pending: 'pending', succeeded: 'succeeded', failed: 'failed', refunded: 'refunded' }, prefix: true
  enum :payment_method, { credit_card: 'credit_card', pix: 'pix', bank_transfer: 'bank_transfer' }, prefix: true

  scope :recent, -> { order(created_at: :desc) }
  scope :successful, -> { where(status: 'succeeded') }

  def self.ransackable_associations(_auth_object = nil)
    %w[subscription user]
  end

  def to_s
    "Pagamento ##{id} - #{amount} #{currency}"
  end
end
