FactoryBot.define do
  factory :product do
    sequence(:name) { |n| "Produto #{n}" }
    sequence(:slug) { |n| "produto-#{n}" }
    description { 'Descrição do produto' }
    base_price { 50000.00 }
    active { true }
    featured { false }
    views_count { 0 }
    favorites_count { 0 }
    association :company
    association :category
    
    factory :product_featured do
      featured { true }
    end
  end
end
