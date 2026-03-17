FactoryBot.define do
  factory :lead_score do
    association :lead
    score { 50 }
    intent_level { 'warm' }
    factors { {} }
    calculated_at { Time.current }
  end
end
