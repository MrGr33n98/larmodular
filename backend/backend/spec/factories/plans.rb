FactoryBot.define do
  factory :plan do
    sequence(:name) { |n| "Plano #{n}" }
    sequence(:slug) { |n| "plano-#{n}" }
    description { 'Descrição do plano' }
    price_monthly { 197.00 }
    price_yearly { 1970.00 }
    highlighted { false }
    active { true }
    position { 1 }
    
    factory :plan_free do
      name { 'Grátis' }
      slug { 'free' }
      price_monthly { 0 }
      price_yearly { 0 }
    end
    
    factory :plan_pro do
      name { 'Pro' }
      slug { 'pro' }
      price_monthly { 497.00 }
      price_yearly { 4970.00 }
      highlighted { true }
    end
  end
end
