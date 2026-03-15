FactoryBot.define do
  factory :region do
    name { 'Sudeste' }
    code { 'sudeste' }
    tax_multiplier { 1.0 }
    timezone { 'America/Sao_Paulo' }
    active { true }
  end
end
