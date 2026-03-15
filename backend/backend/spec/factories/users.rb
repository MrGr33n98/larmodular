FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password123' }
    name { Faker::Name.name }
    phone { Faker::PhoneNumber.phone_number }
    
    factory :user_with_company do
      after(:create) do |user|
        create(:company, user: user)
      end
    end
  end
end
