FactoryBot.define do
  factory :city do
    name { 'São Paulo' }
    slug { 'sao-paulo' }
    state { 'SP' }
    association :region
    active { true }
  end
end
