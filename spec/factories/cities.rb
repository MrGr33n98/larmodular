FactoryBot.define do
  factory :city do
    sequence(:name) { |n| "Cidade #{n}" }
    state { 'SP' }
    association :region
    active { true }
  end
end
