FactoryBot.define do
  factory :ad_banner do
    association :campaign, factory: :ad_campaign
    association :placement, factory: :ad_placement
    name { "Summer Sale" }
    image_url { "https://example.com/banner.png" }
    target_url { "https://example.com/sale" }
    active { true }
    approved { true }
    priority { 1 }
  end

  factory :ad_campaign do
    association :advertiser
    name { "Main Campaign" }
    status { "active" }
    start_date { Date.today }
    end_date { 1.month.from_now }
  end

  factory :advertiser do
    association :user
    company_name { Faker::Company.name }
    status { "active" }
  end
end
