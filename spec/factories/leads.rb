FactoryBot.define do
  factory :lead do
    sequence(:name) { |n| "Lead #{n}" }
    sequence(:email) { |n| "lead#{n}@example.com" }
    phone { '+5511999999999' }
    source { 'organic' }
    intent_score { 0 }
    funnel_stage { 'awareness' }
    qualification_status { 'new' }
    status { 'active' }
    association :company
    association :region
    association :city
    
    factory :lead_hot do
      intent_score { 75 }
      funnel_stage { 'decision' }
      qualification_status { 'qualified' }
    end
  end
end
