class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :plan
  has_many :payments
  
  validates :user_id, presence: true
  validates :plan_id, presence: true
  
  scope :active, -> { where(status: 'active') }
  scope :trialing, -> { where(status: 'trialing') }
  scope :past_due, -> { where(status: 'past_due') }
  
  def self.ransackable_associations(_auth_object = nil)
    %w[user plan payments]
  end

  def to_s
    "#{plan.name} - #{status}"
  end
  
  def active?
    status == 'active' || status == 'trialing'
  end
  
  def canceled?
    status == 'canceled'
  end
  
  def cancel!
    update!(
      status: 'canceled',
      canceled_at: Time.current,
      cancel_at_period_end: false
    )
  end
  
  def current_period_end_date
    current_period_end || (current_period_start + 1.month)
  end
end
