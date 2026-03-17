FactoryBot.define do
  factory :quote_request do
    association :product
    association :company
    status   { 'pending' }
    timeline { 'immediate' }
  end
end
