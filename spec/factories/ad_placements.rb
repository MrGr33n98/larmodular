FactoryBot.define do
  factory :ad_placement do
    sequence(:position_key) { |n| "placement_#{n}" }
    page { "home" }
    location { "sidebar" }
    width { 300 }
    height { 250 }
    active { true }
    price_cents { 1000 }
  end
end
