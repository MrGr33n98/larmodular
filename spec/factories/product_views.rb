FactoryBot.define do
  factory :product_view do
    association :product
    association :company
    session_id { SecureRandom.hex(8) }
  end
end
