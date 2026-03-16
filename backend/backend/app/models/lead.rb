class Lead < ApplicationRecord
  belongs_to :company
  belongs_to :region, optional: true
  belongs_to :city, optional: true
  belongs_to :user, optional: true
  has_many :intent_events
  has_many :lead_scores
  has_many :quote_requests
  
  validates :name, presence: true
  validates :email, presence: true
  validates :company_id, presence: true
  
  scope :active, -> { where(status: 'active') }
  scope :converted, -> { where(status: 'converted') }
  scope :by_company, ->(company_id) { where(company_id: company_id) }
  scope :by_stage, ->(stage) { where(funnel_stage: stage) }
  scope :hot_leads, -> { where('intent_score > ?', 50) }
  
  FUNNEL_STAGES = %w[awareness consideration decision].freeze
  QUALIFICATION_STATUSES = %w[new contacted qualified converted lost].freeze
  
  def to_s
    "#{name} - #{email}"
  end
  
  def intent_level
    case intent_score
    when 0..20 then 'cold'
    when 21..50 then 'warm'
    when 51..80 then 'hot'
    else 'ready'
    end
  end

  def self.ransackable_associations(auth_object = nil)
    ["city", "company", "intent_events", "lead_scores", "quote_requests", "region", "user"]
  end
end
