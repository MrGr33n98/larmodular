FactoryBot.define do
  factory :region do
    sequence(:name) { |n| "Região #{n}" }
    sequence(:code) { |n| "regiao-#{n}" }
    tax_multiplier { 1.0 }
    active { true }
  end
end
