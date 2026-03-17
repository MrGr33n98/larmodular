FactoryBot.define do
  factory :product_affinity do
    association :product_a, factory: :product
    association :product_b, factory: :product
    score { 60 }
  end
end
