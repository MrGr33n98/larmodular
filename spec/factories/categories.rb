FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "Categoria #{n}" }
    sequence(:slug) { |n| "categoria-#{n}" }
    description { 'Descrição da categoria' }
    icon { 'home' }
    active { true }
    position { 1 }
    
    factory :category_with_children do
      after(:create) do |category|
        create_list(:category, 3, parent: category)
      end
    end
  end
end
