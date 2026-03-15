class FeatureFlag < ApplicationRecord
  validates :key, presence: true, uniqueness: true

  scope :active, -> { where(active: true) }
  scope :enabled_for_plan, ->(plan) { active.where("? = ANY(plans) OR array_length(plans, 1) IS NULL", plan) }

  def self.enabled?(key, plan = nil)
    flag = find_by(key: key, active: true)
    return false unless flag
    return true if flag.plans.empty?
    flag.plans.include?(plan)
  end

  def to_s
    "FeatureFlag: #{key}"
  end
end
