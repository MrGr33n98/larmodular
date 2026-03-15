class City < ApplicationRecord
  belongs_to :region
  has_many :companies
  has_many :leads
  
  validates :name, presence: true
  validates :state, presence: true
  
  scope :active, -> { where(active: true) }
  scope :by_state, ->(state) { where(state: state.upcase) }
  
  def full_name
    "#{name}, #{state}"
  end
  
  def to_s
    full_name
  end
end
