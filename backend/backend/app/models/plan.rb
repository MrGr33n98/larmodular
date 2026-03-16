class Plan < ApplicationRecord
  has_many :subscriptions
  
  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  
  scope :active, -> { where(active: true) }
  scope :highlighted, -> { where(highlighted: true) }
  scope :ordered, -> { order(position: :asc) }
  
  def self.ransackable_associations(_auth_object = nil)
    %w[subscriptions]
  end

  def to_s
    name
  end
  
  def free?
    price_monthly.nil? || price_monthly.zero?
  end
  
  def price_display
    if free?
      'Grátis'
    else
      "R$ #{price_monthly}/mês"
    end
  end
  
  def stripe_monthly_price_id
    "price_#{slug}_monthly"
  end
  
  def stripe_yearly_price_id
    "price_#{slug}_yearly"
  end
end
